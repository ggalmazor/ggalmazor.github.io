---
layout: post
title: "Introducing Minicrest and GWT"
date: 2026-01-18 00:00:00 +0
author: Guillermo Gutierrez
---

In my previous post about [the joy of composable matchers]({% link _posts/2024-09-30-the-joy-of-composable-matchers.md %}), I shared my appreciation for expressive, composable test assertions and how they've shaped my approach to software testing over the years. That post explored how tools like Hamcrest, Hamjest, and RSpec's composable matchers help developers focus on what truly matters in their tests while hiding unnecessary complexity.

What I didn't mention was that I had started working on bringing that same expressiveness to Ruby's Minitest. Today, I'm excited to share [Minicrest](https://github.com/ggalmazor/minicrest), a library that brings Hamcrest-style composable matchers to Minitest. I'm also introducing [GWT](https://github.com/ggalmazor/gwt), a CLI tool for managing git worktrees that addresses a different kind of friction in my daily workflow.

## Minicrest: Filling a Gap in the Ruby Testing Ecosystem

At DNSimple, I primarily work with Ruby on Rails codebases. While RSpec offers excellent support for composable matchers through its [`Composable`](https://rspec.info/blog/2014/01/new-in-rspec-3-composable-matchers/) mixin and matcher [chaining](https://www.rubydoc.info/gems/rspec-expectations/RSpec%2FMatchers%2FDSL%2FMacros:chain), not all Ruby projects use RSpec. Some teams prefer Minitest for its simplicity and minimal footprint. Yet Minitest users have lacked a comparable solution for building expressive, composable assertions.

Minicrest aims to fill that gap. It provides a fluent API centered on `assert_that`, combined with a rich library of matchers that can be composed using boolean and collection operators. This approach directly reflects the philosophy I described in my earlier post: tests should hide what's unimportant and highlight the key behaviors.

### From Scattered Assertions to Unified Expressions

The challenge with traditional Minitest assertions is that complex verifications require multiple independent assertions. Each assertion stands alone, and when failures occur, you only see one failure at a time. More importantly, the intent of the test becomes scattered across multiple lines.

Consider verifying that a collection contains specific elements matching certain criteria. With standard Minitest assertions, you might write several separate checks. With Minicrest, you can express the entire expectation in a single, composable expression:

{% highlight ruby %}
assert_that(users).matches(
  all_items(
    has_attribute(:email, matches_pattern(/@example\.com$/)) &
    has_attribute(:age, is_greater_than(18))
  )
)
{% endhighlight %}

When this test fails, Minicrest provides detailed failure messages that describe both what was expected and where the mismatch occurred. This is a direct benefit of the Hamcrest-style approach I've valued since my Java days at BuntPlanet.

### Building Domain-Specific Matchers

One aspect of composable matchers I find particularly valuable is how they enable the creation of domain-specific testing vocabularies. As I mentioned in [the joy of composable matchers]({% link _posts/2024-09-30-the-joy-of-composable-matchers.md %}), our testing approach at BuntPlanet naturally evolved into special-purpose testing DSLs aligned with the system's Ubiquitous Language.

Minicrest supports this through a simple matcher registration mechanism:

{% highlight ruby %}
class IsValidEmail < Minicrest::Matcher
  def matches?(actual)
    actual.is_a?(String) && actual.match?(/\A[\w.]+@[\w.]+\z/)
  end

  def description
    "be a valid email address"
  end
end

Minicrest.register_matcher(:valid_email) { IsValidEmail.new }
{% endhighlight %}

Once registered, the matcher integrates seamlessly with all other matchers:

{% highlight ruby %}
assert_that(user.email).is(valid_email)
{% endhighlight %}

This extensibility allows teams to gradually build a testing vocabulary that reflects their domain, making tests more readable and reducing the cognitive load for anyone working with the codebase.

For more details on available matchers and usage patterns, see the [full documentation](https://ggalmazor.com/minicrest/).

## GWT: Reducing Friction with Git Worktrees

While Minicrest addresses testing expressiveness, GWT tackles a different problem: the friction around git worktrees.

Git worktrees are a powerful feature introduced in Git 2.5 that let you check out multiple branches simultaneously in separate directories. This capability is invaluable when you're deep in feature work and need to quickly address an unrelated bug or review a colleague's pull request. Instead of stashing changes and switching branches, you simply open another worktree.

Despite their utility, worktrees remain underutilized. Part of the reason is that the native git commands are verbose and lack the quality-of-life features developers have come to expect from modern CLI tools. Managing worktrees often involves remembering exact paths, manually copying configuration files, and switching between terminal windows and editors.

### Streamlining the Worktree Workflow

GWT wraps git worktree commands with an interactive, user-friendly interface. The core commands map to typical worktree operations:

{% highlight bash %}
gwt ls                    # List all worktrees in a clean table format
gwt create                # Interactively create a new worktree
gwt delete                # Remove worktrees with interactive selection
gwt open                  # Launch configured editor with worktree path
{% endhighlight %}

The `create` command presents a searchable list of branches and guides you through specifying the worktree path. It's the kind of interaction that removes the friction of remembering syntax and reduces context-switching.

### Parallel Work with Coding Agents

One factor that pushed me to build GWT was the rise of coding agents like [Claude Code](https://docs.anthropic.com/en/docs/claude-code). These tools can autonomously explore codebases, write code, and run tests, but they work best when they have exclusive access to a working directory. Running multiple agents on the same checkout leads to conflicts: uncommitted changes interfere with each other, and agents step on each other's work.

Git worktrees solve this problem elegantly. Each worktree is an independent checkout with its own working directory, so you can run multiple coding agents in parallel without interference. One agent can work on a refactoring task in one worktree while another implements a new feature in a different worktree. Both operate on the same repository, share the same commit history, but their working directories remain isolated.

This pattern has transformed how I approach larger initiatives. Instead of committing to a single approach, I can explore multiple solutions to the same problem in parallel. Each worktree becomes a focused experiment: one agent might tackle a refactoring using composition while another tries inheritance, or one explores a third-party library while another implements a custom solution. When the work is done, I can compare the results and choose the approach that best fits the context.

The benefits extend beyond exploration. Each worktree maintains a clear, isolated context. There's no risk of mixing unrelated changes or losing track of what belongs where. Abandoning an approach that doesn't pan out is as simple as deleting a worktree. And because each initiative lives on its own branch, code review becomes more focused: reviewers see one coherent change rather than interleaved commits from multiple efforts.

GWT makes this workflow practical by removing the friction of worktree management. Creating a new worktree for an agent takes seconds, and the automatic file copying ensures each worktree has the configuration it needs. When the work is done, cleanup is just as simple.

### Automating the Setup

One pain point I experienced repeatedly was the need to copy untracked configuration files to new worktrees. IDE settings, environment variables, and local configuration files aren't tracked in git but are essential for development. Every time I created a worktree, I had to remember which files to copy.

GWT solves this through its configuration file. In `.gwt/config`, you specify which files or directories to copy automatically:

{% highlight json %}
{
  "version": "2.0",
  "editor": {
    "type": "custom",
    "command": "idea"
  },
  "filesToCopy": [".idea", ".env", ".env.local"]
}
{% endhighlight %}

Now, every new worktree starts ready for development, with IDE settings and environment variables in place. The editor integration means I can go from "I need to check this branch" to "I'm working on this branch in my IDE" in seconds.

### Installation

GWT is available for macOS and Linux:

{% highlight bash %}
curl -fsSL https://raw.githubusercontent.com/ggalmazor/gwt/main/install.sh | bash
{% endhighlight %}

Run `gwt config setup` to configure your editor and files to copy.

## Reducing Friction, Increasing Focus

Both Minicrest and GWT share a common goal: reducing friction so developers can focus on what matters. Minicrest removes the noise from test assertions, letting developers express expectations clearly and receive meaningful feedback when things go wrong. GWT removes the friction from git worktrees, turning a powerful but underused feature into something practical for daily use.

These tools reflect ideas I've valued throughout my career: expressiveness, composability, and the importance of small improvements that compound over time. They're open source and available on GitHub:

- [Minicrest](https://github.com/ggalmazor/minicrest)
- [GWT](https://github.com/ggalmazor/gwt)
