---
layout: page
title: Blog
permalink: /blog/
nav: true
nav_order: 2
description: Notes on thermal management, elastocalorics, and research life.
---

{% if site.posts.size > 0 %}
  {% for post in site.posts %}
  <article class="mb-4">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
    {% if post.description %}<p>{{ post.description }}</p>{% endif %}
  </article>
  {% endfor %}
{% else %}
  <p>Posts will appear here.</p>
{% endif %}