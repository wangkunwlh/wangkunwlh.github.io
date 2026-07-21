---
layout: default
title: Blog
permalink: /blog/
nav: true
nav_order: 2
pagination:
  enabled: true
  collection: posts
  per_page: 5
  permalink: /page/:num/
---
<div class="post">{% include blog.liquid %}</div>