---
layout: post
title:  "Largest Triangle downsampling library for Java 8"
date:   2020-01-01 12:00:00 +0200
permalink: /blog/largest_triangle_downsampling_lib.html
author: Guillermo Gutierrez
---

In 2016, while working at [BuntPlanet](https://buntplanet.com" class="link dim dark-blue fw5), I had to implement a Java8 time-series downsampling algorithm for a big-data app about water service pipe networks.

I decided to open-source it at [github.com/ggalmazor/lt_downsampling_java8](https://github.com/ggalmazor/lt_downsampling_java8" class="link dim dark-blue fw5)

The app we were building had a very rich UI with lots of graphs. It could query and plot time series with a one-second resolution of entire water networks, perform comparisons between different moments in time, do data aggregations on the fly, etc.

We ended up realizing that:

1. Heavy data transfer from backend to frontend had a substantial negative impact on UX
2. It doesn't make sense fitting 800 data points (probably even half that) in an 800px wide graph anyway

We also realized that it was challenging for off-the-shelf graphing libs to keep up with the data we were feeding them.

Therefore, we started trying to aggregate data as a way for reducing the volume we needed to handle but depending on the "zoom level" or granularity of the aggregation we used, **we would lose important features** of the underlying graph we wanted to show our customers: relevant peaks and valleys would randomly disappear.

After getting frustrated with this for some time, we started investigating this matter in more depth and we found some promising downsampling algorithms.

Of all of them, one stood out as a perfect candidate for what we were trying to achieve: [**Largest Triangle, Three Buckets**](/assets/SS_MSthesis.pdf) (LTTB from now on)

After digesting the paper and studying some existing implementations we got a good understanding of how it worked.

The most important feature is that the algorithm's main goal is to reduce the number of data points while not losing any relevant visual features. 🤯

One of the things that I find most interesting is that LTTB was developed from similar algorithms applied in cartography to simplify map coastlines. This is why it makes a lot of sense that no relevant visual feature is lost in the downsampling process.

LTTB doesn't produce statistically representative series, meaning that properties such as max, min, avg, median, etc. won't be similar to the ones from the input series.

This wasn't an issue for us, so we decided to bring LTTB to our product.

Our product was implemented in Java8 and I was in all the rage about streams and parallel processing. We already had an ETLs platform in place that was ingesting big-data scale payloads with Spark on Java, so implementing LTTB in Java8 was a really nice project to take on for me.

This is how the [lt_downsampling_java8](https://github.com/ggalmazor/lt_downsampling_java8) library was born.

Time passed, the product evolved beyond LTTB, and I eventually forgot about it.

However, a couple of weeks ago, I got completely blown away: A GitHub user opened an issue and they even contributed with a fix for some scenario that my original implementation didn't handle correctly.

Amazing!

I didn't expect anyone would be using my library for real, even less they would be willing to contribute and make it better. It made my day :)

As a result, I took the chance to do a bit of housekeeping on the repo, review the code a bit, add some examples, and write this post to share some small pieces of my personal history. I have really good memories of the challenges I faced during that project.

I'm really grateful for the time I worked on that project with [@artolamola](https://twitter.com/artolamola" class="link dim dark-blue fw5), [@chewiebrian](https://twitter.com/chewiebrian" class="link dim dark-blue fw5), [@epplestun](https://twitter.com/epplestun" class="link dim dark-blue fw5), and other great colleagues. We all learned a lot. ❤️
