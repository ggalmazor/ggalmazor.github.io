---
layout: post
title: "The joy of composable matchers"
date: 2024-09-30 00:00:00 +0
---

Over the years, I've come to realize that great tests are more than just a way to check if a system works. They're a form of **documentation** that helps developers understand not just the system's internals but also what users expect and how the application interacts with its infrastructure. Expressive tests are invaluable - they cut through the noise, **hide unnecessary details**, and bring key behaviors into sharp focus. The result? Tests that are easier to read, maintain, and evolve over time.

Back at BuntPlanet, I worked on some pretty complex Java codebases, where my appreciation for **expressiveness** in testing took root. We relied on JUnit and [Hamcrest](https://hamcrest.org/) to verify correctness and make the system's behavior clear and easy for others on the team to understand. Over time, our approach naturally evolved into special-purpose testing DSLs that aligned perfectly with the system's **Ubiquitous Language**. This shift didn't just make our tests more expressive - it made onboarding new developers a breeze and reduced the **cognitive load** for the entire team.

I've carried that same philosophy to DNSimple, where I primarily work with Ruby on Rails codebases using RSpec. Recently, I've also introduced [Hamjest](https://github.com/rluba/hamjest), a Hamcrest clone for Node.js, to bring the same level of **composability and expressiveness** to our tests there. Across all these experiences, I've seen firsthand how composable matchers and a solid test toolset help developers focus on what truly matters, stripping away unnecessary complexity and creating tests that are easier to maintain and a pleasure to expand.

## How Composable Matchers Help

What's the magic behind composable matchers? It's simple - they let you write flexible, expressive assertions that can adapt to the needs of your codebase. Imagine breaking down complex assertions into smaller, reusable components. That's precisely what composable matchers allow you to do. They make your tests easier to write, read, and, crucially, maintain as your project grows.

When each test focuses on relevant outputs and side effects, you **avoid over-specifying** or cluttering your tests with irrelevant details. Composable matchers help you hone in on what truly matters, keeping your test suite lean and resilient. No more bloated tests that fall apart when minor changes are made - **just clean, precise assertions**.

## Reducing Complexity

We've all been there - working in complex codebases, dealing with intricate data structures, and fighting the urge to throw in too many assertions or checks. With composable matchers, you don't have to worry about tests becoming bloated or fragile. Instead, they let you focus on the specific outputs or side effects you care about without dragging in non-essential parts of the system.

Let me give you a concrete example. Imagine you're verifying that your business logic makes an HTTPS request to an external service using the correct authentication token. If you were to use built-in Jest matchers, you might write something like this:

{% highlight javascript %}
const calls = fetchMock.calls(); // returns an array of [url: string, options: {}]
const call = calls.find(call => call[0] === 'https://foo.example.net')
expect(call).not.toBeUndefined();
expect(call[1].headers["Authentication"]).toEqual('some token');
{% endhighlight %}

This works, but there are problems:
- Lines 2 and 3 feel awkward. They create a sense of implicit assertions, which could break the test unexpectedly.
- You're also not handling `null`/`undefined` values, which could cause the test to fail for unintended reasons. Adding checks would make it even more bloated.

Now, let's see how Hamjest simplifies this:

{% highlight javascript %}
assertThat(fetchMock.calls(), hasItem(allOf(
  atIndex(0, 'https://foo.example.net'),
  atIndex(1, hasProperty('headers', hasProperty('Authorization', 'some token'))),
)));
{% endhighlight %}

It's cleaner, right? Here's why:
- The matchers can handle scalar values and other matchers, making it easy to compose expectations in a **single expression**.
- We're explicitly verifying all expectations at once, clearly **showing what should happen**.
- There's no need for null-checks - the composed matchers navigate the data as needed, and when things go wrong, they produce **rich failure messages** that tell you exactly where the test failed.

{% highlight shell %}
Expected: an array containing (an array with a value at index 0 matching 
  "https://foo.example.net" and an array with a value at index 1 matching an
  object with {headers: an object with {Authorization: "some token"}})
but:
item 0: an array with a value at index 0 matching "https://foo.example.net": 
  Item at index <0> was "https://bar.example.net" instead of 
  "https://foo.example.net"
item 1: an array with a value at index 1 matching an object with {headers: an 
  object with {Authorization: "some token"}}: Item at index <1> was 
  {"headers":{"Content-Type":"application/json"}} instead of an object with 
  {headers: an object with {Authorization: "some token"}}
{% endhighlight %}

## Custom matchers

One of the best things about Hamjest is how easy it is to create **custom matchers**. Remember that `atIndex` matcher I used in the last example? It's a custom matcher we created. Here's what the implementation looks like:

{% highlight javascript %}
import { asMatcher } from 'hamjest';

export function atIndex(index, valueOrMatcher) {
  const matcher = asMatcher(valueOrMatcher);
  
  return {
    matches(actual) {
      return matcher.matches(actual[index]);
    },
    describeTo(description) {
      description
        .append(`an array with a value at index ${index} matching `)
        .appendDescriptionOf(matcher);
    },
    describeMismatch(actual, description) {
      description
        .append('Item at index ')
        .appendValue(index)
        .append(' was ')
        .appendValue(actual[index])
        .append(' instead of ')
        .appendDescriptionOf(matcher);
    },
  };
};
{% endhighlight %}

With this, you can easily compose matchers and maintain the readability and clarity of your tests. Jest also supports custom matchers, but composition typically happens inside the matcher implementation, while RSpec gives you tools like matcher [chaining](https://www.rubydoc.info/gems/rspec-expectations/RSpec%2FMatchers%2FDSL%2FMacros:chain) and the [`Composable`](https://rspec.info/blog/2014/01/new-in-rspec-3-composable-matchers/) mixin, which help bridge that gap.

Here's an RSpec example:

{% highlight ruby %}
expect(["barn", 2.45]).to contain_exactly(
    the_number(2.5).within_of(0.1),
    a_string_starting_with("bar")
)
{% endhighlight %}

It's straightforward yet highly expressive, showing the power of custom matchers to make your tests cleaner and more focused.

## Summing up

No matter your stack, composable matchers give you the tools to **create expressive, maintainable tests**. They help you hide what's unimportant and **highlight the key behaviors**. Whether working on a small project or a complex system, focusing on composability in your test suite will make it easier for new contributors to understand how things work and ensure that your tests **remain resilient** over time.

If you're working with complex systems or data structures, I recommend diving into composable matchers. They'll change the way you think about writing tests and make maintaining them a much more pleasant experience.