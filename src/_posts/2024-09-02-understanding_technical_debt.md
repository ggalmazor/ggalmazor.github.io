---
layout: post
title:  "Understanding technical debt"
date:   2024-09-02 12:00:00 +0200
permalink: /blog/understanding_technical_debt.html
---

## Understanding technical debt

In our latest DNSimple team retrospective, a shared concern emerged: technical debt. Recognizing its growing impact on our work, we've decided to address it together. This blog post aims to help us understand technical debt and its implications for our projects. By viewing technical debt as a deferred investment in our codebase, I'll explore how it affects our ability to deliver value and how we can manage it strategically moving forward.

In today's fast-paced software development environment, teams often face the pressure to deliver features rapidly. This urgency can lead to technical debt: shortcuts in code quality and design that speed up delivery but create long-term challenges. However, rather than viewing technical debt purely as a liability, it's helpful to see it as a **deferred investment** in code design. This blog post explores how companies can strategically manage this deferred investment by aligning it with their product and engineering roadmaps, emphasizing small delivery cycles, and making deliberate choices about when and where to invest in paying down technical debt.

### Understanding Technical Debt as Deferred Investment

Technical debt is often misunderstood as merely a byproduct of poor coding practices. In reality, it's a strategic decision - akin to a financial loan - where immediate gains are made at the expense of future obligations. By deferring investment in code design, teams can deliver value more quickly to users or meet critical deadlines, with the understanding that they will need to "repay" this debt by improving the codebase in the future.

This deferred investment can take many forms:

*Intentional Debt*: Taken on knowingly to meet a critical deadline or to validate a product idea quickly. [Martin Fowler](https://martinfowler.com), a well-known software architect, discusses this in his [Technical Debt Quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html), distinguishing between deliberate and inadvertent debt.

*Accidental Debt*: Accumulated due to evolving requirements, lack of expertise, or insufficient planning.

The key is to manage this debt carefully, much like financial debt, to ensure it doesn't spiral out of control and hinder future progress.

### Economic Perspective: Cost, Value, Risk, and Debt

Viewing technical debt through an economic lens helps teams make informed decisions about when to incur and when to pay down debt:

**Cost**

*Immediate Cost Savings*: Opting for quicker solutions can save time and resources in the short term, allowing teams to meet deadlines or deliver features faster.

*Long-Term Costs*: The deferred investment in code design must eventually be addressed. If ignored, the cost of maintenance, refactoring, and potential system failures can escalate. This concept is supported by [Ward Cunningham](https://www.youtube.com/watch?v=pqeJFYwnkjE), who coined the term technical debt, likening it to borrowing time that must be repaid.

**Value**

*Short-Term Value*: The primary benefit of deferring investment in code design is delivering value to users sooner. This can be particularly beneficial in competitive markets where time-to-market is critical.

*Long-Term Value*: Paying down technical debt ensures that the codebase remains maintainable, scalable, and adaptable, preserving or even increasing the software's value over time. In his book [Extreme Programming Explained](https://www.amazon.com/Extreme-Programming-Explained-Embrace-Change/dp/0321278658), Kent Beck emphasizes the importance of refactoring to enhance long-term value.

**Risk**

*Technical Risk*: Accumulated technical debt can increase the risk of bugs, security vulnerabilities, and system instability. These risks are often compounded if debt is not managed properly over time. Michael Feathers, author of [Working Effectively with Legacy Code](https://a.co/d/4XwT2jb), discusses the challenges of dealing with technical debt in legacy systems and the importance of managing it to reduce such risks.

*Business Risk*: Unaddressed technical debt can have significant business implications, such as losing competitive advantage or facing operational issues. A strategic approach to debt management mitigates these risks.

**Debt**

Like financial debt, technical debt involves "interest" - the additional cost incurred over time if the debt is not paid down. This interest manifests in slower development cycles, increased complexity, and reduced flexibility. [Martin Fowler's writings](https://martinfowler.com/articles/designDead.html) on design debt widely discuss this concept.

### Aligning Technical Debt Management with the Product Roadmap

Aligning repayment with the product and engineering roadmap is essential for managing technical debt effectively. This ensures that investment in code quality is made where it matters most, supporting upcoming features or technical initiatives that align with business goals.

**Strategic Prioritization Based on Roadmap**

The product roadmap should guide which parts of the codebase need investment. If a feature is crucial for an upcoming release, the corresponding code should be refactored to reduce technical debt before the feature is implemented. This aligns with Kent Beck's advice: "Make the change easy, then make the easy change." Beck's work on Extreme Programming emphasizes the importance of preparing the codebase for future changes.

**Small Delivery Cycles**

Managing technical debt becomes a continuous process in methodologies like [Shape Up](https://basecamp.com/shapeup), used by Basecamp, or agile practices, which emphasize small, iterative delivery cycles. By breaking down development into smaller cycles, teams can regularly assess and address technical debt in targeted areas, ensuring the codebase remains healthy and adaptable.

**Selective Debt Management**

Not all technical debt needs to be repaid immediately. Stable parts of the codebase that are not central to upcoming features can carry their debt longer, allowing teams to focus resources on more critical areas. This selective approach ensures that efforts are concentrated where they will have the most significant impact.

### Best Practices for Managing Technical Debt

Rather than relying heavily on metrics, which can often fall short in capturing the nuances of code design, focus on these practices:

**Incremental Refactoring**

Integrate refactoring into regular development cycles, particularly in areas of the codebase that align with upcoming roadmap priorities. This approach minimizes disruptions while steadily improving the codebase. [Refactoring: Improving the Design of Existing Code](https://martinfowler.com/books/refactoring.html) by Martin Fowler is an essential resource in this practice.

**Technical Debt Backlog**

Maintain a backlog specifically for technical debt items. This backlog allows teams to track debt systematically and ensure it is addressed per the product roadmap. The backlog should be revisited regularly during planning sessions to reprioritize based on the latest business needs. This practice is supported by [Jez Humble](https://continuousdelivery.com/), a Continuous Delivery proponent who emphasizes the importance of managing debt as part of an iterative process.

**Open Communication**

Encourage ongoing communication between developers, product managers, and business stakeholders to ensure everyone understands the trade-offs in managing technical debt. Transparent discussions help prioritize debt repayment effectively and avoid surprises during development. This approach is aligned with the practices promoted by [Michael Feathers](https://michaelfeathers.silvrback.com/), who highlights the critical role of communication in managing legacy systems and technical debt.

### Balancing Innovation and Sustainability

Taking on technical debt can be a strategic choice that supports rapid innovation, but it must be balanced with the need for sustainable growth:

**Strategic Debt for Innovation**

In fast-moving markets, it may be necessary to incur technical debt to deliver features quickly and capture market share. However, this debt should be managed with a clear repayment plan, ensuring it doesn't impede future innovation. Thought leaders like Eric Ries in [The Lean Startup](https://theleanstartup.com/) discuss the value of speed and iteration, even at the cost of technical debt, provided it is managed effectively.

**Sustainable Growth through Regular Investment**

Over time, teams should shift focus to paying down debt in areas that could hinder long-term development. This deferred investment ensures the codebase remains robust and adaptable, supporting the product's evolution as business needs change.

## Conclusion

Technical debt is an inevitable part of software development, but when viewed as a deferred investment, it becomes a tool for strategic growth rather than a burden. By aligning technical debt management with the product roadmap, focusing on small, manageable delivery cycles, and prioritizing debt repayment based on business goals, companies can balance the need for immediate delivery with long-term sustainability. This approach ensures that software products remain innovative and resilient, ready to meet the challenges of a dynamic market.

For developers and non-technical managers alike, understanding technical debt as a strategic, deferred investment is crucial for building software that meets today's needs and is prepared for tomorrow's opportunities.

I also want to take this chance to recommend my friend and colleague Luis Artola's [book on Software Economics](https://leanpub.com/software-economics), where he describes an economic mental model about software development.