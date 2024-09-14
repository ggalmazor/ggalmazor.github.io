---
layout: post
title:  "Legacy software and Grey-box testing"
date:   2024-08-24 12:00:00 +0200
permalink: /blog/legacy_software_and_grey_box_testing.html
---

After years of experience, I've come to understand that the tests I write can vary significantly in size and scope, which contrasts with the principles of the Microtest TDD approach. However, my primary focus when writing tests is not on their size but on thoroughly describing the <span data-tooltip="System Under Test">SUT</span>'s behavior, including its outputs and side-effects. While small tests are beneficial, reducing their size isn't my primary objective.

Concentrating on behavior ensures that my tests remain decoupled from the implementation details. This allows me to refine the code's design without fear of inadvertently altering or breaking the system's behavior. Yet, my tests do contain some details about the system's inner workings, especially when it comes to verifying side effects. For example, my tests may involve setting up databases, verifying third-party service requests, or checking local file changes. These aspects place my tests at the boundary where internal system details meet external interactions.

This approach aligns closely with the principles of **Grey-box testing**.

As a concept, Grey-box testing doesn't have a singular origin or inventor. It evolved organically within the software testing community as practitioners began to see the value in combining black-box and white-box testing—merging external and internal perspectives for a more comprehensive testing approach.

Upon reviewing my previous blog post about [Legacy Software and Grey-box Microtest TDD]({% link _posts/2022-08-01-legacy-software-and-microtest-tdd.md %}), I realized that my writing is centered on the Grey-box aspect of testing. This post clarifies that distinction.