---
layout: home
---

{% assign posts_by_year = collections.posts.resources | group_by_exp: "post", "post.date | date: '%Y'" | json: 2 %}
{% assign post_years = collections.posts.resources | map: "data" | map: "date" | transform: "year" | json: 2 %}
{% assign links_by_year = site.data.external_links | group_by_exp: "link", "link.date | date: '%Y'" | json: 2 %}
{% assign link_years = site.data.external_links | transform: "date" | transform: "year" | json: 2 %}
{% assign years = post_years | concat: link_years | uniq | sort | reverse %}

{% for year in years %}

# {{ year }}

{% assign posts = posts_by_year | where: "name", year | first %}
{% for post in posts.items %}
[{{ post.title }}]({{post.relative_url}})
{% endfor %}

{% assign links = links_by_year | where: "name", year | first %}
{% for link in links.items %}
*{{ link.type }}* - [{{ link.title }}]({{link.url}})
{% endfor %}

{% endfor %}