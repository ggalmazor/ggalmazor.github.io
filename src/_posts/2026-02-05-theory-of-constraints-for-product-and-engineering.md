---
layout: post
title: "Theory of Constraints for product development and engineering"
date: 2026-02-05 00:00:00 +0
author: Guillermo Gutierrez
---

Over the years, I've noticed a pattern in how teams respond to pressure: they try to go faster everywhere. More features, more hires, more tools, more process. The assumption seems to be that if we're not delivering enough value, we must not be working hard enough or smart enough across the board. But I've come to believe this instinct is often counterproductive. With finite time and resources, trying to improve everything means the one thing that actually limits the system, the bottleneck that determines throughput, doesn't get addressed with the focus it needs. Effort gets spread thin, and the business wastes time on improvements that don't move the needle while opportunities slip by.

This realization led me back to a management philosophy I first encountered years ago but didn't fully appreciate until I started working extensively with legacy systems: the **Theory of Constraints** (TOC). Developed by Eliyahu Goldratt in his 1984 book [*The Goal*](https://amzn.to/4rvBPtp), TOC offers a deceptively simple premise: every system has at least one constraint that limits its output. Improving anything other than that constraint is, at best, wasted effort. At worst, it can actively harm by creating inventory pileups, diverting focus, and giving leadership a false sense of progress.

Some of what I'm about to describe may sound striking at first, particularly the idea that you should deliberately ignore certain problems or leave code untouched even when it bothers you. But I hope to provide enough arguments to show why this mental model has become central to how I think about product development and engineering work. TOC isn't a silver bullet, but it offers a clarifying lens for decisions that otherwise devolve into competing intuitions.

In this post, I want to explore TOC from two angles that have become central to my work: the business and product development side, where constraints often hide upstream of execution, and the engineering side, particularly regarding strategic project planning and technical debt repayment in legacy software projects.

> **New to TOC?** If you're not familiar with the Theory of Constraints, I recommend starting with [Asana's beginner guide](https://asana.com/resources/theory-of-constraints) for a quick overview, or [Smartsheet's comprehensive guide](https://www.smartsheet.com/all-about-theory-of-constraints) for a deeper dive. This post assumes some familiarity with the basics and focuses on applying TOC to product and engineering contexts.

![Pattern convergence](/images/toc/pattern_convergence.png)

## The Five Focusing Steps

Before diving into applications, let me briefly outline TOC's core framework. Goldratt proposed five focusing steps for managing constraints:

1. **Identify** the constraint: find what's actually limiting throughput
2. **Exploit** it: maximize its efficiency without major investment
3. **Subordinate** everything else: align all other work to support the constraint
4. **Elevate** it: invest to expand capacity if exploitation isn't enough
5. **Repeat**: once resolved, a new constraint will emerge

The power of this framework lies in its focus. Instead of spreading effort thin across improvements that might not matter, you concentrate resources where they'll have the most impact. The constraint is the leverage point. Everything else is secondary.

What makes this counterintuitive is the subordination step. It means deliberately under-utilizing resources that aren't on the constraint path. A machine running at 100% efficiency is wasted effort if its output just piles up waiting for a downstream bottleneck. The same applies to teams, processes, and individual contributors. Local optimization can harm global throughput.

## The Product Constraint Problem

In my experience, product teams often assume their constraint is engineering capacity. "If only we could build faster" becomes the default explanation for why value isn't reaching customers quickly enough. But I've come to believe this diagnosis is frequently wrong, or at least incomplete. The constraints that limit value delivery often sit upstream of execution, in the messy territory of figuring out what to build and why.

### Guesswork dressed up as strategy

Teams can lack a clear signal about what customers actually need. Customer feedback may be fragmented, filtered through sales or support, or simply absent. Internal business goals, such as revenue targets, competitive positioning, or strategic pivots, add another layer of complexity. These goals don't always align neatly with customer pain points, and navigating the tension between "what customers are asking for" and "what the business needs to achieve" requires judgment that's hard to systematize.

Without a strong signal from either direction, prioritization can become guesswork dressed up as strategy. The loudest stakeholder wins, or the roadmap ossifies around assumptions no one revisits. I've seen teams spend months building features that seemed important in a planning meeting but that customers greeted with indifference, or that moved metrics the business had quietly stopped caring about.

### Describing problems without solution bias

Even when a legitimate problem is identified, teams can struggle to articulate it cleanly. Problem statements may arrive pre-loaded with a specific solution the author already has in mind. This tendency is natural; we're problem-solvers by inclination, and it feels inefficient to describe a problem without immediately proposing a solution. But solution bias forecloses exploration. It anchors the estimation around one approach before considering alternatives. It can lock teams into building something specific rather than solving an important problem.

The symptom is familiar: every "problem" in the backlog reads like a feature spec. The discovery that should happen before commitment happens during implementation, when it's expensive to change course. Or it doesn't happen at all, and the team ships something that technically matches the spec but misses the underlying need.

### Estimating actual effort

Once a problem is described and solutions assessed, organizations can routinely underestimate the work required. The system may harbor unknown technical debt, hidden dependencies, or blocking uncertainties that only surface mid-execution. Timelines slip, scope gets cut, or the team delivers something that doesn't quite solve the original problem because they ran out of time to do it properly.

These estimation failures compound over time. Teams learn not to trust their own plans. Product managers pad timelines defensively. Engineers become cynical about commitments. The planning process itself starts to feel like theater, a ritual everyone performs while privately expecting reality to diverge from the script.

### Ship fast, learn slow

Doing the due diligence to prevent all of the above takes time and attention. Talking to customers, writing clear problem statements, spiking technical risk, and aligning on business priorities. That time comes from the same people who are already executing on planned projects.

> **Discovery work has no ticket, no sprint points, no visible output.** It loses to delivery work in almost any prioritization framework.

So the cycle can repeat: ship fast, learn slow, wonder why roadmaps don't survive contact with reality.

What makes this particularly insidious is that skipping due diligence doesn't just lead to building the wrong thing; it also leads to building the wrong thing. It also tends to generate technical debt. When teams rush into execution without fully understanding the problem or the system they're modifying, they make expedient choices that accumulate as future constraints. A feature built on an incomplete understanding may work, but it often does so in a way that's hard to extend, test, or reason about. Over time, this debt can compound until it becomes the system's primary constraint, at which point the original sin of insufficient discovery has transformed into an engineering problem that everyone treats as separate from product decisions. But the root cause was upstream.

![Signal and noise](/images/toc/pattern_signal_noise.png)

### Applying TOC to Product Strategy

Through a TOC lens, these issues form a constraint chain, each one potentially limiting the next. The first question becomes: which of these is the primary constraint right now? Is the team building the wrong things because the customer signal is weak? Building the right things wrong because problem statements are solution-biased? Getting blindsided by complexity because estimation doesn't account for hidden debt? Or simply not investing in upstream work because discovery always loses to delivery?

Goldratt's framework suggests working through this systematically. First, exploit the current constraint before adding resources. If the customer signal is weak, can you get closer to support tickets, sales calls, or usage data without hiring a dedicated researcher? If problem statements tend toward solution bias, can you enforce a "problem-only" first draft that gets reviewed before solutions are discussed? If business goals are unclear, can you push for explicit prioritization criteria rather than trying to infer them?

Then, subordinate other activities to protect the constraint. This might mean explicitly reserving time for discovery, shielding certain people from execution work, or accepting that some sprints will look "slower" because the real bottleneck is upstream of code. It can feel uncomfortable to subordinate delivery to discovery, especially when stakeholders are asking for features. But if discovery is the constraint, more delivery just means building things more efficiently that miss the mark.

Only after exploiting and subordinating should you elevate by investing in additional capacity. Hire dedicated research. Bring in someone to de-risk estimates. Restructure how problem definitions are written and reviewed. These investments make sense once you've confirmed that the constraint is real and that you've exhausted cheaper ways to address it.

TOC also introduces what Goldratt called **Throughput Accounting**: measuring value delivered rather than activities completed. Applied to product work, this reframes how we think about productivity.

> **Output isn't outcome.** Features shipped that miss the problem represent waste, regardless of how efficiently they were built.

Velocity means little if the constraint is upstream; building faster just means failing faster when you're solving the wrong problems or serving the wrong goals. The real metric, though it's hard to measure cleanly, is how often shipped work actually resolves the customer pain or business need it targets.

![Upstream constraints](/images/toc/upstream_constraints.png)

The strategic implication is uncomfortable but clarifying: stop asking "how do we ship more?" and start asking "why does shipped work keep missing the mark?" The constraint may not be execution capacity at all. It may be the quality of decisions made before execution begins, whether those decisions concern customer needs, business priorities, or both.

## Technical Debt Through a TOC Lens

I've written before about [understanding technical debt]({% link _posts/2024-09-02-understanding_technical_debt.md %}) as a deferred investment rather than simply a liability. TOC adds another dimension to that perspective: not all technical debt is equal, and the distinction that matters most is whether the debt sits on the constraint.

Consider three categories. First, debt in a non-bottleneck area. From a TOC perspective, this is low priority. Paying it down won't increase throughput. The code might be ugly, the tests sparse, the patterns outdated. But if work doesn't flow through this part of the system in a way that limits delivery, improving it is a distraction. It feels productive because you can see the improvement, but it doesn't move the needle on what actually matters.

Second, debt in the constraint. This is high priority. Even small improvements here can amplify system-wide delivery. If your deployment pipeline is the bottleneck and held together by brittle scripts and manual steps, fixing those issues has an outsized impact. An hour spent here is worth more than a day spent polishing code that isn't on the critical path.

Third, and most interesting, debt that creates constraints. Consider a monolithic application where different business verticals share database tables. The coupling isn't in any one module; it's in the shared data model. When one vertical needs to evolve its schema, it has to coordinate with every other vertical that touches those tables. Areas of the system that should be able to change independently become entangled. The shared tables become a coordination bottleneck that shapes everything else. Paying down this kind of debt doesn't just improve one area; it can shift the constraint entirely, unlocking the ability for verticals to evolve at their own pace. That's a strategic move rather than routine maintenance, and it deserves to be evaluated as such.

![pattern_pressure.png](/images/toc/pattern_pressure.png)

### Strategic Technical Debt Repayment

The common approach of dedicating a fixed percentage of each sprint to technical debt, spread across whatever feels most pressing, can produce disappointing results. The effort gets diluted. Engineers work on what bothers them rather than what constrains the system. Progress feels slow because it is; you're improving many things slightly rather than one thing significantly.

TOC suggests a more focused alternative. Start by identifying where technical debt is actually limiting throughput, not just annoying developers or offending aesthetic sensibilities. Then exploit the current constraint by working around the debt temporarily if possible, buying time to address it properly. Subordinate other refactoring efforts; resist the temptation to polish non-bottleneck code just because it's satisfying to clean up. Elevate by investing specifically in the debt that's choking delivery. And repeat as the constraint shifts, because it will shift.

This connects to what I wrote about in [Refactoring is spelled T E S T]({% link _posts/2024-08-26-refactoring_is_spelled_t_e_s_t.md %}). Refactoring requires tests to be safe, and tests require understanding the system's behavior. But TOC adds a prioritization layer: understand and test the behavior that's on the constraint path first. You can't refactor everything, so refactor what matters. And "what matters" isn't determined by code quality in the abstract; it's determined by where the constraint lives.

## Engineering Constraints in Legacy Systems

Legacy systems are constraint-rich environments. I've encountered variations of the same patterns across different organizations and technology stacks, and TOC provides a useful frame for thinking about them.

Deployment pipelines can become constraints when release cycles are long or when deployments require manual coordination. The symptom is batched releases, fear of deploying, and features that sit finished but unshipped. The TOC response is to exploit by reducing batch size where possible, making each deployment smaller and less risky, then to elevate by investing in CI/CD infrastructure if exploitation isn't enough.

Coupled architecture can become a constraint when changes to one component cascade unpredictably to others. The symptom is that simple changes require complex coordination, and developers spend more time managing dependencies than evolving the system. The TOC response is to identify the coupling hotspots, the specific modules or interfaces where coupling is most acute, and to subordinate feature work to decouple those areas. Not all coupling needs to be addressed; only the coupling on the constraint path.

Key-person dependencies can become constraints when knowledge is concentrated in a few individuals. Work queues are assigned to specific engineers because they're the only ones who understand certain systems. The TOC response is to exploit by ruthlessly protecting people's time, removing distractions and non-essential work, then to elevate by documenting, pairing, and spreading knowledge so the constraint diffuses.

Test coverage gaps can become constraints when fear of change slows everything down. Engineers avoid modifying certain areas because they can't be confident that their changes won't break something. The TOC response is to identify the highest-risk paths, the code that changes most often, or that's most critical to delivery, and to write tests there first. Complete coverage isn't the goal; coverage on the constraint path is.

Legacy modernization efforts often fail because teams try to fix everything or rewrite from scratch. TOC offers a different frame. The **Strangler Fig Pattern**, where you incrementally replace only the parts of a legacy system that constrain you, aligns well with TOC thinking. You prioritize migration paths based on where the constraint lives, not on what's oldest or ugliest. And you measure throughput, not progress. "We modernized 40% of the codebase" is a vanity metric if the constraint is in the remaining 60%.

![Bottleneck flow](/images/toc/pattern_bottleneck_flow.png)

## Impactful or tractable?

One of the most insidious patterns I've observed in engineering, especially in organizations with legacy systems, is the gravitational pull toward visible, completable work that doesn't touch the constraint. Refactoring a stable module that rarely changes. Upgrading dependencies in a service that isn't on the critical path. Writing tests for low-risk code while high-risk code remains uncovered. Endless cleanup sprints that produce satisfying diffs but don't accelerate delivery.

The pull request looks clean. Velocity metrics stay healthy. Standup feels productive. Meanwhile, the actual constraint sits untouched because addressing it is messy, cross-functional, or politically fraught. It requires coordinating with other teams, touching scary infrastructure, or confronting decisions that were made years ago by people who are no longer around to explain them.

> **Tractable work is seductive.** Constraints are hard. That's why they're constraints.

Teams can optimize for tickets closed rather than for improved throughput. Old backlog items acquire a false sense of legitimacy just by existing; surely, if it's been in the backlog for 2 years, it must be important? But longevity isn't important.

The TOC reframe is blunt: every hour spent on non-constraint work is an hour not spent on the constraint. Worse, it can be actively counterproductive, creating a false sense of progress that masks the real problem. A team closing 50 tickets while ignoring the constraint may be less effective than a team closing 10 tickets that are actually on the bottleneck.

Two questions help cut through this. First: Will completing this work increase the rate at which value flows through the system? Second: are we doing this because it's impactful, or because it's tractable?

![Impactful_vs_tractable](/images/toc/impactful_vs_tractable.png)

The uncomfortable corollary, and one I've come to embrace, is that it may be correct to leave large portions of legacy code untouched, even ugly, debt-ridden code, if it's not on the constraint path. TOC gives teams permission to be strategically negligent about non-bottleneck areas. That permission can be liberating once you accept it. Not everything needs to be fixed. Not everything needs to be improved. The question isn't whether code is good; it's whether improving it would help.

## Aligning Product and Engineering

The most powerful application of TOC I've seen is when product and engineering recognize they're often constrained by the same upstream issues and stop blaming each other for downstream symptoms.

When discovery is the constraint, both teams benefit from investing in understanding customer problems and business priorities before debating solutions or estimates. Engineering shouldn't complain about unclear requirements while doing nothing to help clarify them. Product shouldn't throw specs over the wall and expect accurate estimates from engineers who weren't involved in shaping the work.

When problem definition is the constraint, engineering should push back on solution-shaped specs, and product should welcome that pushback as a quality gate rather than an obstruction. The goal is a clear problem statement that both teams understand and believe in, not a predetermined solution that engineering is expected to implement without question.

When estimation keeps failing, the constraint might be undiscovered technical debt or hidden complexity that no one accounted for. Engineering needs time to spike risk before committing to timelines. The product needs to budget for uncertainty rather than penalizing it. Both teams need to accept that estimates are guesses, and that the appropriate response to uncertainty is investigation, not pressure.

When a legacy system is the constraint, both teams should agree on targeted modernization rather than broad refactoring or indefinite feature freezes. The constraint determines what gets modernized, not the code's age or how much it bothers developers to look at it.

The key question for leadership in any of these situations is: where is the constraint today, and are product and engineering both subordinating to it? Or are they optimizing locally while pointing fingers at each other? TOC doesn't eliminate the tension between these functions, but it provides a shared language for discussing it.

![Chain link](/images/toc/pattern_chain_link.png)

## Finding Your Constraint

TOC isn't a new idea. Gene Kim's *The Phoenix Project* applied it to IT and DevOps over a decade ago. Goldratt's *Critical Chain* extended it to project management. The ideas have been absorbed into lean manufacturing, agile development, and countless management frameworks. But I keep returning to the original formulation because the core insight remains sharp:

> **Focus matters more than effort**, and focus requires identifying what actually limits throughput.

In my own work, I've found that simply naming the constraint changes the conversation. It shifts discussions from "how do we do more?" to "what's preventing value from flowing?" It gives teams permission to say no to work that doesn't address the bottleneck. And it provides a framework for the uncomfortable truth that sometimes the right thing to do is to leave things alone, even when they bother us, because fixing them won't move the needle.

What's your constraint? If you're not sure, look for the queues. Look for where work piles up waiting. Look for the decisions that never get made, the approvals that take forever, the handoffs that introduce delays. And then ask honestly: is your team subordinating to that constraint, or optimizing around it while the bottleneck remains unaddressed?

The answer might be uncomfortable. But at least you'll know where to focus.

![Ripple](/images/toc/pattern_ripple.png)

## A Corollary for the Age of Agentic Coding

As I was writing this post, a question kept nagging at me: Does any of this change now that AI can write code? When execution becomes dramatically faster and cheaper, does TOC become less relevant?

I've come to believe the opposite. AI amplifies the importance of constraint thinking rather than diminishing it.

[The Moltbook incident](https://www.youtube.com/watch?v=6OXE65fjjsU) from just last week illustrates this vividly. Moltbook is a social network for AI agents that went viral almost immediately after launch. The founder, Matt Schlicht, was candid about how it was built: he "didn't write one line of code" and instead directed an AI assistant to create the entire platform. This approach, sometimes called "vibe coding," produced a working product fast enough to capture a cultural moment. Within days, the site had hundreds of thousands of users and was drawing attention from figures like Elon Musk and Andrej Karpathy.

Then, security researchers discovered the entire database was publicly accessible. A misconfigured Supabase backend meant anyone could read and write to all platform data: 1.5 million API authentication tokens, tens of thousands of email addresses, and private messages between agents. Anyone could take control of any AI agent on the platform and post whatever they wanted. The vulnerability wasn't the result of sophisticated hacking; it was a basic configuration oversight that no one caught because the code was generated rapidly without security review. The founder admitted that no one thought to check the database's security before the project's explosive growth.

This is TOC in action, though not in the way Goldratt intended. The constraint wasn't code production; Moltbook proved you can build and ship a functional platform remarkably fast with AI assistance.

> **The constraint was human judgment**: security review, architectural understanding, the kind of due diligence that catches a wide-open database before it goes live.

When execution speed increases but review capacity doesn't, you don't eliminate bottlenecks. You just move them, and the new bottleneck may be less visible until something breaks publicly.

When building is slow, that slowness masks problems upstream. You can't build the wrong thing that fast anyway, so mistakes in discovery and prioritization hurt less than they otherwise might. But when an agent can scaffold a feature in hours, the constraint shifts hard toward "did we choose the right problem?" and "did we define it well?"

> **Building the wrong thing faster is just failing faster.** The cost of poor upstream decisions, measured in wasted effort and accumulated debt, goes up, not down.

The busy-work trap becomes more dangerous, too. AI is excellent at producing clean, visible output for tractable tasks. It can churn through backlog tickets that don't touch the constraint with impressive velocity. The PRs look good. The diffs are satisfying. But if those tickets weren't on the constraint path, you've just automated the production of work that doesn't matter. The illusion of progress becomes more convincing, which makes it harder to recognize that the real bottleneck remains unaddressed.

There's also a new form of technical debt to consider, and Moltbook exemplifies it. When teams generate code they don't fully understand, that lack of understanding is itself a liability. The system grows in ways that are hard to reason about, debug, and evolve. You might not even know what your system does until a security researcher tells you. The constraint can shift toward comprehension and maintainability rather than production speed. We may find ourselves in situations where the bottleneck isn't writing code or even deciding what to build; it's understanding what we've already built well enough to change it safely, or to know whether it's secure in the first place.

What doesn't get automated away is human judgment: prioritization, taste, understanding customer problems, navigating business tradeoffs, reviewing AI output for subtle errors or dangerous oversights. These become the scarce resources. And scarce resources, in TOC terms, are exactly where constraints live.

The punchline, I think, is this: AI makes execution cheaper, which makes the cost of working on the wrong thing relatively higher. TOC's emphasis on identifying the right constraint before optimizing becomes more important, not less. The teams that thrive won't be the ones that generate the most code; they'll be the ones that focus their newfound capacity on the bottlenecks that actually matter, and that maintain enough understanding of their systems to know when something is wrong.

This is the mental model I keep returning to. It doesn't answer every question, but it sharpens the questions worth asking.

## Further Reading

- [*The Goal*](https://amzn.to/4rvBPtp) by Eliyahu Goldratt (1984), the original introduction to TOC as a business novel
- [*The Phoenix Project*](https://amzn.to/3ZNg6kS) by Gene Kim, Kevin Behr, and George Spafford (2013), applying TOC to IT operations
- [*Critical Chain*](https://amzn.to/4qTOA13) by Goldratt (1997), TOC for project management
- [TOCICO](https://www.tocico.org/), the Theory of Constraints International Certification Organization
