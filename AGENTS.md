# AGENTS.md

Instructions for AI agents working on this blog.

## Blog Platform

This is a [Bridgetown](https://www.bridgetownrb.com/) static site. Blog posts are written in Markdown and stored in `src/_posts/`.

## Post File Format

### Filename Convention

```
YYYY-MM-DD-title-with-dashes.md
```

### Frontmatter

Required fields:

```yaml
---
layout: post
title: "Post Title Here"
date: YYYY-MM-DD HH:MM:SS +0000
author: Guillermo Gutierrez
---
```

Optional: `permalink` for custom URLs (e.g., `/blog/post_name.html`).

### Code Blocks

Use Jekyll/Liquid highlight tags, not fenced code blocks:

```
{% highlight ruby %}
def example
  puts "Hello"
end
{% endhighlight %}
```

Supported languages: `ruby`, `bash`, `javascript`, `json`, `shell`, etc.

### Internal Links

Link to other posts using Jekyll's `link` tag:

```
[post title]({% link _posts/YYYY-MM-DD-post-name.md %})
```

## Writing Style

### Voice and Tone

- **First-person perspective**: Use "I've", "my", "I find". The author shares personal experiences and opinions.
- **Reflective and thoughtful**: Posts explore ideas rather than just present facts.
- **Technical but accessible**: Explain concepts before diving into implementation details.
- **Educational, not promotional**: Even when introducing personal projects, focus on the problems they solve and the ideas behind them.
- **No emojis**: Keep the tone professional and straightforward.

### Structure

1. **Opening paragraph**: Connect to personal experience, previous posts, or broader context. Avoid jumping straight into technical details.

2. **Problem context**: Explain why something matters before showing how it works. The "why" comes before the "how".

3. **Section headers**: Use `##` for main sections and `###` for subsections. Headers should be descriptive.

4. **Code examples**: Keep them practical and illustrative. Show real-world usage rather than contrived examples.

5. **Conclusion**: Tie themes together. Connect ideas back to broader principles or the author's ongoing journey.

### References and Links

- **Connect to previous posts**: When relevant, reference earlier articles to build continuity.
- **Cite thought leaders**: Reference authors like Martin Fowler, Kent Beck, Michael Feathers when discussing software concepts.
- **Link to external resources**: Documentation, books, and articles that support the discussion.
- **Link to projects**: GitHub repositories, documentation sites, etc.

### Emphasis

- Use **bold** for key terms or concepts being introduced.
- Use *italics* sparingly for emphasis or book titles.
- Use inline `code` for technical terms, commands, method names, etc.

### Personal Context

The author references work experiences at:
- **DNSimple**: Current work, primarily Ruby on Rails
- **BuntPlanet**: Past work, Java codebases

These references provide authenticity and ground technical discussions in real-world experience.

## Topics and Themes

Recurring themes in the blog:

- **Testing**: Expressive tests, composable matchers, TDD practices, grey-box testing
- **Software design**: SOLID principles, technical debt, refactoring
- **Continuous learning**: Antifragile skills, core principles over trends
- **Developer tools**: Productivity improvements, workflow automation
- **Legacy software**: Working with and improving existing codebases

## Example Post Opening

Good (reflective, connects to experience):
> In my previous post about the joy of composable matchers, I shared my appreciation for expressive, composable test assertions and how they've shaped my approach to software testing over the years.

Avoid (too direct, no context):
> Today I'm releasing a new library called Minicrest. Here's how to install it.

## Other guidelines

- Don't use em-dashes
- Always use single quotes instead of ’ characters and double quotes for quotation marks

## Checklist for New Posts

- [ ] Filename follows `YYYY-MM-DD-title.md` format
- [ ] Frontmatter includes layout, title, date, and author
- [ ] Opening paragraph provides context or connects to previous work
- [ ] Explains "why" before "how"
- [ ] Code examples use `{% highlight %}` tags
- [ ] Internal links use `{% link %}` tag
- [ ] No emojis
- [ ] Conclusion ties themes together
