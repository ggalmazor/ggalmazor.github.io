---
layout: post
title:  "Evaluating downsampling algorithms"
date:   2024-08-17 12:00:00 +0200
permalink: /blog/evaluating_downsampling_algorithms.html
author: Guillermo Gutierrez
---

I've been playing around with ChatGPT lately and I wondered if it could help me compare some time-series downsampling algorithms like [the one I implemented for Java]({% link _posts/2020-01-01-largest-triangle-downsampling-lib.md %}).

When I asked ChatGPT about algorithms that would keep local extrema, it suggested Perceptually Important Points (PIP), Top-K Significant Extremes, Douglas-Peucker Algorithm (RDP), Extreme Point Sampling (EPS), and Local Extrema Retention (LER). It was funny to see that Largest-Triangle Three-Buckets wasn't in the list, but when I asked specifically about it, it was aware of it.

Despite asking, it wasn't fully clear to me how they compared to one each other because their description, pros and cons felt too similar, so I figured it might as well help me test them with some graphs.

I asked it to produce some Ruby scripts with their implementations, plotting code, and some code to generate a somewhat realistic synthetic time-series to test them.

The time-series to downsample is the same in all examples and it has 500 points, which will be downsampled to 50 points, or in the vicinity (for RDP). These are the results:

![Image showcasing the EPS algorithm](/images/downsampling/eps.png)
![Image showcasing the LER algorithm](/images/downsampling/ler.png)
![Image showcasing the LTTB algorithm](/images/downsampling/lttb.png)
![Image showcasing the PIP algorithm](/images/downsampling/pip.png)
![Image showcasing the RDP algorithm](/images/downsampling/rdp_epsilon_3.png)
![Image showcasing the TOPK algorithm](/images/downsampling/topk.png)

I've created a [gist](https://gist.github.com/ggalmazor/758bba14035f323267d0c3b6970ff552) in GitHub with the sources for the Ruby script, and a copy of my chat with ChatGPT is available [here](https://chatgpt.com/share/795b3e53-4d6a-48d8-8dbe-473e112d50a3)

## Insights

An `epsilon` value of `3` would get me in the vicinity of the 50 points for the downsampled series in RDP, which is the target for the rest.

Funnily enough, LTTB is not faring too well compared to the others, especially when compared to PIP or RDP.