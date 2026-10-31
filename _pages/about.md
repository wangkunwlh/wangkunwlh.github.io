---
layout: about
title: Home
permalink: /
# The theme generates the home/About navigation item automatically.
nav: false
subtitle: Postdoctoral Researcher at the Institute of Microstructure Technology, Karlsruhe Institute of Technology
profile:
  align: right
  image: prof_pic.jpg
  image_circular: false
  more_info: >
    <p>Karlsruhe, Germany</p>
    <p>Karlsruhe Institute of Technology</p>
    <p><a href="mailto:kun.wang@kit.edu">kun.wang@kit.edu</a></p>
selected_papers: false
social: true
announcements:
  enabled: false
  scrollable: true
  limit: 5
latest_posts:
  enabled: false
  scrollable: true
  limit: 3
---

<div class="home-intro">
  <p>My research examines how caloric materials and regenerative architectures can be translated into practical <strong>solid-state cooling</strong> technologies. I develop and study elastocaloric heat pumps, with particular attention to the coupling between material response, heat transfer, and cycle operation.</p>

  <p>Current work combines mechanics, thermal-fluid modelling, and additive manufacturing to design soft and porous regenerators with low actuation loads and improved heat exchange. The broader aim is to establish scalable, efficient alternatives to vapour-compression cooling where compactness, durability, and reduced environmental impact matter.</p>

  <p>Please see my <a href="/research/">research</a> and <a href="/publications/">publications</a>, or get in touch by email.</p>
</div>

<section class="home-news">
  <h2><a href="{{ '/blog/' | relative_url }}">News</a></h2>
  {% include news.liquid limit=true %}
</section>

<section class="home-latest-posts">
  <h2>Latest posts</h2>
  {% include latest_posts.liquid %}
</section>

<section class="home-recent-publications">
  <h2>Recent publications</h2>
  <div class="recent-publication-grid">
    {% for publication in site.data.recent_publications %}
      <a class="recent-publication-card" href="https://doi.org/{{ publication.doi }}" target="_blank" rel="external noopener">
        <img src="{{ publication.image | relative_url }}" alt="{{ publication.alt }}">
        <span class="recent-publication-title">{{ publication.title }}</span>
        <span class="recent-publication-authors">{{ publication.authors }}</span>
      </a>
    {% endfor %}
  </div>
  <a class="all-publications-btn" href="{{ '/publications/' | relative_url }}">All publications</a>
</section>
