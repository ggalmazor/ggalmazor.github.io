---
layout: post
title:  "Adapting testing practices to OLAP systems"
date:   2024-09-16 08:00:00 +0200
---

In most software systems, the business logic resides within the application code, and the database serves as a repository for persisting and retrieving objects. However, <span data-tooltip="Online Analytical Processing">OLAP</span> systems often shift part of the business logic into SQL queries, particularly in Big Data and Business Intelligence applications. This introduces unique challenges in testing and verifying our system's behavior.

We have already established that [testing is about verifying the system's behavior]({% link _posts/2024-08-24-legacy-software-and-grey-box-testing.md %}) through its outputs and side effects, and that the best place to do this is at the boundaries of the system's business logic while avoiding making any assumptions about internal implementation details.

However, when most of the business logic is implemented in SQL instead of the programming language of our choice our testing approach must adapt.

This can be disorienting and challenging at first, but we must double down on our commitment to describing the system's behavior through our tests. We must guarantee that the software we ship behaves as our stakeholders and users expect while preparing it for further changes.

We are used to implementing our tests in isolation. We like them to be small and fast, and we often replace real interactions with external systems with test doubles that behave in an acceptable similar way.

We write some integration tests to compensate for the lack of testing the actual interaction with the external system. However, these tests focus not on the business logic and all its combinatorial complexity but on the interaction itself.

Approaches like Hexagonal Architecture encourage us to describe these interactions in terms of the business logic's needs and to keep them as narrow as possible, which helps significantly with the integration tests.

Even though I understand there can be solid reasons to avoid interactions with live databases in tests, the ones I write always interact with live databases if possible. I consider database persistence to be a crucial part of the system's behavior that must be verified, and extracting those interactions to specific tests would leave a gap that would defeat their purpose.

Similarly, the fact that some of our business logic is now in SQL doesn't mean we can forget all the best practices, principles, and tooling we love and care about. We just need to acknowledge the fact, roll up our sleeves, and apply the same standards as in the rest of the codebase.

In typical software systems, we follow a "testing pyramid" model with many unit tests at the base. some integration tests in the middle, and few end-to-end tests at the top. However, as SQL-centric business logic grows, this pyramid starts to change its shape. Instead of many small, fast unit tests around our business logic, we find ourselves with many larger, more complex integration tests. And that's okay.

Integration tests that deal with live databases come with their own set of challenges, but they are magnified when dealing with OLAP workloads: data structures are more intricate, more tables are involved, more data is needed to support the operation we're testing, etc.

- **Database Migrations**: Tests must run against the most recent database structure. 

   Inconsistencies can arise without proper alignment between tests and database migrations, especially if migrations aren't automated or managed in the same codebase.

- **Test Interactions**: Tests insert and read data relevant to the tested scenario and clean it up afterward. 

   If tests share the same database, isolating test data is critical to prevent harmful interactions. Strategies like running tests in transactions that are rolled back afterward or using separate schemas can mitigate this issue.

- **Complex Test Setups**: Complex data scenarios may require extensive test setups involving multiple insertions across different datasets. 

   Investing in sophisticated tooling to automate these setups can help reduce verbosity and simplify test maintenance.

- **Non-deterministic behaviors**: The system's clock (including the local timezone) can be a source of problems that are hard to debug and stabilize, especially when there are mixed conventions regarding date-time data types or multiple sources of truth for concepts like `now` or `today`.

In addition to these concerns, OLAP workloads often depend heavily on the user's input, especially in Business Intelligence applications where the database query we're formulating is unknown beforehand. Instead, we must compose it based on the user's input, including which tables to `JOIN`, which `GROUPING SET`s to define, or which aggregations to run on the data.

The combinatorial complexity can be overwhelming to a point where it's not cost-effective anymore to create test contexts for every possible combination of factors. Instead, we must divide and conquer:

- The main tests can pin the key behaviors we provide to our users from the outer boundary of our system: data can be filtered, grouped, aggregated, etc. Verifying every possible combination of filters, grouping sets, and aggregations is unnecessary.
- Support for every possible filter, grouping set, aggregation, etc., can be verified in isolation - against a live database - in a separate test suite.

## Conclusion

Ultimately, SQL-centric OLAP systems demand adaptations in the testing strategy. While we can't rely on lightweight unit tests, we can apply the same principles to ensure the system behaves as expected, including database interactions. 

Testing practices need to evolve as these systems grow in complexity, challenging teams to improve their skills and develop more sophisticated tools to meet the demands of modern software systems.




