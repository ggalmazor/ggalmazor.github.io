---
layout: post
title: "GitHub Deployment stats"
date: 2024-09-23 00:00:00 +0
---

GitHub provides robust support for Deployments via its API, but when it comes to understanding the performance and lifecycle of those Deployments, things can get tricky. While the GitHub CLI is incredibly useful for many tasks, it currently lacks native support for querying Deployments.

I was searching for something similar to [this extension](https://github.com/fchimpan/gh-workflow-stats) for GitHub Workflows but couldn't find anything for Deployments. So, I turned to GitHub's REST API to gain insights into Deployment performance.

A naive approach would be to calculate the time between a Deployment's `created_at` and `updated_at` timestamps. After all, Deployments update their `updated_at` value every time they receive a new status, and we could assume that the `success` status marks the end of a Deployment.

However, this assumption is flawed. When a deployment receives a `success` status, [GitHub automatically adds an `inactive` status](https://docs.github.com/en/rest/deployments/deployments?apiVersion=2022-11-28#inactive-deployments) to all previous non-transient, non-productive deployments with the same environment name. This behavior can be disabled, but it means that the `success` status isn't always the terminal status for a deployment. The deployment might receive an `inactive` status much later, artificially extending the `updated_at` value.

To address this, we can calculate the Deployment's duration as the time between its `created_at` timestamp and the creation of the `success` status (if any). Unfortunately, the [listDeploymentStatus](https://docs.github.com/en/rest/deployments/statuses?apiVersion=2022-11-28#list-deployment-statuses) endpoint doesn't support filtering by status, so we must pull all statuses for each Deployment until we find the one we're looking for.

### Steps to Gather Deployment Stats

To gather statistics for GitHub Deployments in a given repo and environment:

1. [List a sample of Deployments](https://docs.github.com/en/rest/deployments/deployments?apiVersion=2022-11-28#list-deployments).
2. For each Deployment:
    - [List all statuses](https://docs.github.com/en/rest/deployments/statuses?apiVersion=2022-11-28#list-deployment-statuses), and filter out the `success` status.
    - Calculate the duration as the difference between the Deployment's `created_at` timestamp and the `success` status's creation time.
3. Compute the count, average, min, and max duration values.

This approach involves a significant number of queries, so I built a quick NodeJS script to automate the process using Octokit. You can view the script below:

<script src="https://gist.github.com/ggalmazor/bde7bcda0b8e76340b530f1f51c7a4d9.js"></script>

Once I validated that the plan worked, I decided to explore GitHub CLI extensions. Here's how easy it is to [create](https://cli.github.com/manual/gh_extension_create) one:

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

However, since I had already built the script in NodeJS, I opted to use the `--precompiled` option, which allows you to use any language as long as you provide a script to compile the necessary binaries.

You can find the code for the NodeJS version [here](https://github.com/ggalmazor/gh-deployment-stats/tree/nodejs_version). After some trial and error, I decided to port the tool to Go, which was better supported by GitHub CLI's tooling.

## Final Result

The Go version of the extension works as expected. Here's an example:

{% highlight bash %}
$ gh deployment-stats -cutoff 2024-08-01T12:00:00Z foo bar main
Fetched 500 deployments for main:
... fetching deployment statuses .................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................... Done
- 182 old successful deployments: avg 181 secs, min/max: 127/664 secs
- 301 new successful deployments: avg 206 secs, min/max: 55/684 secs
  {% endhighlight %}

Check the code at [ggalmazor/gh-deployment-stats](https://github.com/ggalmazor/gh-deployment-stats). There are several improvements I plan to implement, but for now, it's good enough. You can install it using the command:

{% highlight bash %}
$ gh extension install ggalmazor/gh-deployment-stats
{% endhighlight %}