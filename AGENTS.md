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

- **First-person perspective**: Use "I've", "my", "I find", "In my experience". The author shares personal experiences and opinions throughout.
- **Reflective and thoughtful**: Posts explore ideas rather than just present facts. The writing has a contemplative quality, drawing connections between experiences and broader principles.
- **Technical but accessible**: Explain concepts before diving into implementation details. Never assume the reader knows specialized terminology without context.
- **Educational, not promotional**: Even when introducing personal projects, focus on the problems they solve and the ideas behind them.
- **No emojis**: Keep the tone professional and straightforward.
- **Conversational without being casual**: Use phrases like "We've all been there", "Let's clear the air", or "The fun part begins" to create connection, but maintain professional depth.
- **Confident but not prescriptive**: Share opinions and approaches while acknowledging that context matters. Avoid absolute statements about "the right way" to do things.

### Sentence Patterns and Rhythm

- **Vary sentence length**: Mix short, punchy sentences ("It's cleaner, right?") with longer explanatory ones. Short sentences create emphasis; longer ones provide nuance.
- **Use rhetorical questions sparingly**: "What's the magic behind composable matchers?" or "Why does this matter?" can introduce sections, but don't overuse them.
- **Direct address to reader**: Occasionally use "Let me give you a concrete example" or "Imagine you're verifying..." to engage the reader directly.
- **Transitional flow**: Move naturally between sections rather than using abrupt headers. End paragraphs with thoughts that lead into the next topic.

### Word Choice and Phrasing

- **Prefer active voice**: "I've come to realize" rather than "It has been realized".
- **Use precise technical vocabulary**: Don't shy away from terms like "paradigm", "abstraction", "cohesion", "behavior-preserving" when they're the right words.
- **Explain jargon contextually**: When using specialized terms, weave the explanation naturally into the prose rather than parenthetical definitions.
- **Metaphors and analogies**: Use them to illuminate concepts (e.g., technical debt as "deferred investment", tests as "safety net"), but don't overextend them.
- **Avoid hedging language**: Prefer "I find that..." over "I kind of think that maybe...". Be direct about opinions.

### Authenticity Markers

- **Ground abstractions in real experience**: Reference specific situations from BuntPlanet (Java), DNSimple (Ruby/Rails), or other concrete work contexts.
- **Show evolution of thinking**: It's appropriate to reference how understanding has changed over time ("Over the years, I've come to realize...").
- **Acknowledge complexity**: Don't oversimplify. When something is nuanced, say so: "Side-effects can be tricky, though."
- **Genuine enthusiasm**: Express interest in the craft naturally ("Refactoring is one of software development's most creative, fun, and satisfying parts") without excessive superlatives.

### Structure

1. **Opening paragraph**: Connect to personal experience, previous posts, or broader context. Never jump straight into technical details. The first paragraph should establish why this topic matters and ground it in lived experience.

2. **Problem context**: Explain why something matters before showing how it works. The "why" comes before the "how". Spend time establishing the problem space before presenting solutions.

3. **Section headers**: Use `##` for main sections and `###` for subsections. Headers should be descriptive and often use gerunds or conceptual phrases ("Reducing Complexity", "Testing the behavior", "Understanding Technical Debt as Deferred Investment").

4. **Code examples**: Keep them practical and illustrative. Show real-world usage rather than contrived examples. When showing code, follow up with analysis of what makes it good or problematic ("This works, but there are problems...").

5. **Comparative examples**: When arguing for an approach, show "before and after" or "without/with" comparisons. Let the reader see the contrast.

6. **Conclusion**: Tie themes together. Connect ideas back to broader principles or the author's ongoing journey. Conclusions often include forward-looking statements or invitations to explore further.

### Opening Patterns

Good openings in this blog typically:
- Start with a broad observation or realization: "Over the years, I've come to realize that..."
- Connect to previous writing: "In my previous post about..."
- Establish shared experience: "We've all been there - working in complex codebases..."
- Set up a problem or tension: "The software ecosystem evolves at an incredible pace... For many of us in tech, this creates a sense of constant pressure..."

Avoid openings that:
- Jump straight to "Today I'm releasing..." or "Here's how to..."
- Start with definitions without context
- Begin with generic statements that could apply to any blog

### Closing Patterns

Strong conclusions in this blog:
- Summarize key takeaways with bold headers for scanning
- Circle back to the opening theme
- End with an invitation or encouragement: "If you're working with complex systems... I recommend diving into composable matchers."
- Connect to the author's broader philosophy: "These tools reflect ideas I've valued throughout my career..."

Avoid conclusions that:
- Simply restate what was said
- End abruptly without synthesis
- Add new ideas that weren't developed in the body

### References and Links

- **Connect to previous posts**: When relevant, reference earlier articles to build continuity. This creates a body of work that readers can explore.
- **Cite thought leaders**: Reference authors like Martin Fowler, Kent Beck, Michael Feathers, GeePaw Hill, Ward Cunningham, Nassim Taleb when discussing software concepts. Include links to their work.
- **Link to external resources**: Documentation, books, and articles that support the discussion.
- **Link to projects**: GitHub repositories, documentation sites, etc.

### Intellectual Influences and Citation Style

The blog draws on established voices in software development. When citing these authors:

- **Martin Fowler**: Referenced for refactoring, technical debt quadrant, design patterns. Often quoted directly with attribution.
- **Kent Beck**: Referenced for TDD, XP, the phrase "Make the change easy, then make the easy change."
- **Michael Feathers**: Referenced for working with legacy code, managing technical debt.
- **GeePaw Hill**: Referenced for Microtest TDD and grey-box testing approaches.
- **Ward Cunningham**: Referenced as originator of the technical debt metaphor.
- **Nassim Taleb**: Referenced for the concept of antifragility.

When using quotes:
- Use blockquotes (`>`) for direct quotations
- Include attribution with a `<footnote>` tag containing author name and source link
- Add emphasis with `**bold**` within quotes when highlighting key phrases

### Emphasis

- Use **bold** for key terms or concepts being introduced.
- Use *italics* sparingly for emphasis or book titles.
- Use inline `code` for technical terms, commands, method names, etc.

### Personal Context

The author references work experiences at:
- **DNSimple**: Current work, primarily Ruby on Rails, Node.js. References to team retrospectives, facades pattern, certificate management.
- **BuntPlanet**: Past work, complex Java codebases. Where appreciation for Hamcrest and expressive testing developed.

These references provide authenticity and ground technical discussions in real-world experience.

### Distinctive Voice Elements

What makes this blog's voice recognizable:

1. **Practitioner perspective**: Writing comes from someone actively working on real systems, not abstract theorizing. Examples are drawn from actual work, not hypotheticals.

2. **Long-term view**: Posts often reference "over the years" and show how thinking has evolved. There's a sense of accumulated wisdom rather than hot takes.

3. **Integration of ideas**: The blog connects concepts across domains - functional programming informing OOP understanding, economic thinking applied to technical debt, testing philosophy connected to refactoring safety.

4. **Measured confidence**: Opinions are stated clearly but without dismissing alternatives. "In my experience" and "I've found that" rather than "You should always" or "Never do this."

5. **Craft appreciation**: Genuine enjoyment of well-designed systems, elegant tests, and thoughtful code comes through. Software development is treated as a craft worth caring about.

6. **Teaching through sharing**: Posts aim to help others by sharing what has worked, not to show off expertise. The tone is collegial, not authoritative.

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

Good (establishes broader context first):
> The software ecosystem evolves at an incredible pace. New frameworks, languages, and tools emerge daily, making it challenging to stay current. For many of us in tech, this creates a sense of constant pressure...

Good (grounds in personal realization):
> Over the years, I've come to realize that great tests are more than just a way to check if a system works. They're a form of **documentation** that helps developers understand not just the system's internals but also what users expect...

Avoid (too direct, no context):
> Today I'm releasing a new library called Minicrest. Here's how to install it.

Avoid (generic opening):
> Testing is important in software development. This post will discuss testing approaches.

## Example Prose Patterns

### Introducing a concept

Good:
> Technical debt is often misunderstood as merely a byproduct of poor coding practices. In reality, it's a strategic decision - akin to a financial loan - where immediate gains are made at the expense of future obligations.

Avoid:
> Technical debt is when you write bad code quickly. Let me explain what it is.

### Transitioning to examples

Good:
> Let me give you a concrete example. Imagine you're verifying that your business logic makes an HTTPS request to an external service using the correct authentication token.

Avoid:
> Here is an example:

### Acknowledging complexity

Good:
> Side-effects can be tricky, though. In a nutshell, they include mutating the global state, I/O operations, and altering the execution flow (exceptions!).

Avoid:
> Side effects are complicated so I won't explain them fully here.

### Drawing conclusions from examples

Good:
> It's cleaner, right? Here's why: The matchers can handle scalar values and other matchers, making it easy to compose expectations in a **single expression**.

Avoid:
> As you can see, this is better.

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
