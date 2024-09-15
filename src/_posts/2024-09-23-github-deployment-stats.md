---
layout: post
title: "GitHub Deployment stats"
date: 2024-08-23 00:00:00 +0
---

There is no easy way to get information about the performance of GitHub Deployments due to some quirks of their
lifecycle, and that the GH CLI command doesn't support Deployments. I was looking for something similar
to [this extension](https://github.com/fchimpan/gh-workflow-stats) for Deployments, but didn't find anything either.To
get some insights about how they're doing, one can only resort to GitHub's REST API.

A naive approach would consist on calculating the time from each Deployment's `created_at` and `update_at` attributes.
After all, Deployments update their `updated_at` value every time they receive a new status, and we could assume the
`success` status is a terminal status.

However, when a deployment receives a `success` status, [GitHub automatically adds an
`inactive` status](https://docs.github.com/en/rest/deployments/deployments?apiVersion=2022-11-28#inactive-deployments)
to all prior non-transient, non-productive deployments with the same environment name. This is a behavior that can be
disabled when creating the deployment, but it means that the `success` status can't be considered a terminal status.
Deployments might receive an `inactive` status way after they received the `success` status, increasing artificially the
time between creation and update times.

To work around this, we can calculate the Deployment's duration as the time between its creation and the creation of the
`success` status (if any). Unfortunately,
the [listDeploymentStatus](https://docs.github.com/en/rest/deployments/statuses?apiVersion=2022-11-28#list-deployment-statuses)
endpoint doesn't support filtering by status, forcing us to pull them all until we find the one we're looking for.

Summing up, here's what we need to do to figure out the duration stats of GitHub Deployments for a given repo and
environment:

- [List a good sample of Deployments](https://docs.github.com/en/rest/deployments/deployments?apiVersion=2022-11-28#list-deployments).
- For each Deployment:
    - [List all their statuses](https://docs.github.com/en/rest/deployments/statuses?apiVersion=2022-11-28#list-deployment-statuses)
      and set aside their `success` status.
    - Calculate the duration as the seconds that have passed from the Deployment's creation and the `success` status
      creation datetimes.
- Compute the count, average, min and max values and return them.

This plan involves an important amount of queries, so I built a quick NodeJS script that would get it done with Octokit.
I also added a "cutoff date" feature to segregate stats to groups before and after the cutoff date and see how a change
in the associated deployment pipeline had in their durations. Here's the script hosted as a GitHub Gist:

<script src="https://gist.github.com/ggalmazor/bde7bcda0b8e76340b530f1f51c7a4d9.js"></script>

Once I validated that the plan worked, I shifted on looking at how GitHub CLI extensions can be built. It turns out that they're pretty easy to build. There's even a [GitHub CLI command to create them](https://cli.github.com/manual/gh_extension_create):

{% highlight bash %}
$ gh extension create chuchu
✓ Created directory gh-chuchu
✓ Initialized git repository
✓ Made initial commit
✓ Set up extension scaffolding

gh-chuchu is ready for development!

Next Steps
- run 'cd gh-chuchu; gh extension install .; gh chuchu' to see your new extension in action
- run 'gh repo create' to share your extension with others

For more information on writing extensions:
https://docs.github.com/github-cli/github-cli/creating-github-cli-extensions
{% endhighlight %}

It's basically about creating some git repo at GitHub called `gh-whatever` with an executable `gh-whatever` file located at the root of the repo. Easy enough 🤷‍♂️

Unfortunately, I wanted to leverage the NodeJS script I already had built, so I went down the rabbit hole of the `--precompiled other` option. You can develop GitHub CLI extensions in any language as long as you provide a `scripts/build.sh` script that compiles executable binaries for a set of platforms and architectures at `dist`.

After making some searches and trying stuff out, I found a strategy that was promising:
- Use [Rollup](https://rollupjs.org/) to transpile and package the NodeJS 22 ES6 modules code into a NodeJS 14 CommonJS code (don't get me started on why this was needed, please)
- Use [vercel/pkg](https://github.com/vercel/pkg) to compile executable binaries to *some* of the required platform and architecture combinations

You can check the code [here](https://github.com/ggalmazor/gh-deployment-stats/tree/nodejs_version). I was able to produce binaries in my computer, and the GitHub Workflow responsible for building and publishing them was working as well, but for some reason, once installed as a GitHub CLI extension, it didn't work as expected.

Ultimately, I was going back and forth with the tooling, settings, runtime versions, and I wasn't able to produce binaries for all required platform and architecture combinations anyway, so I threw the towel on NodeJS and decided to port it to Go, which looked like better supported by the existing tooling.

The end result works reasonabily well:

{% highlight bash %}
$ gh deployment-stats -cutoff 2024-08-01T12:00:00Z foo bar main
Fetched 500 deployments for main:
... fetching deployment statuses .................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................... Done
- 182 old successful deployments: avg 181 secs, min/max: 127/664 secs
- 301 new successful deployments: avg 206 secs, min/max: 55/684 secs
{% endhighlight %}

Check the code at [ggalmazor/gh-deployment-stats](https://github.com/ggalmazor/gh-deployment-stats). I'm already considering many improvements: filtering deployments by other criteria, new aggregations and stats, using other targets to compute different durations, nicer UI, and many other.

I consider this is good enough for now. Let's see how it goes. I wonder how many people will use it, if any. You can install it with:

{% highlight bash %}
$ gh extension install ggalmazor/gh-deployment-stats
{% endhighlight %}


