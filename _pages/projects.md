---
layout: page
title: Research
permalink: /research/
description: Research directions and active projects in sustainable thermal management.
nav: true
nav_order: 3
display_categories: [devices, modeling]
horizontal: false
---
<div class="projects">
{% for category in page.display_categories %}
<a id="{{ category }}" href="#{{ category }}"><h2 class="category">{{ category }}</h2></a>
{% assign categorized_projects = site.projects | where: "category", category | sort: "importance" %}
<div class="row row-cols-1 row-cols-md-3">{% for project in categorized_projects %}{% include projects.liquid %}{% endfor %}</div>
{% endfor %}
</div>