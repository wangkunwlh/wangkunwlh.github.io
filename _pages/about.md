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

I am a postdoctoral researcher at the Institute of Microstructure Technology, Karlsruhe Institute of Technology (KIT). My work explores **sustainable thermal management** through elastocaloric heat pumps, soft active regenerators, and numerical design for scalable solid-state cooling systems.

My research connects functional materials, mechanical design, additive manufacturing, and heat-transfer modelling. I am particularly interested in low-cost elastocaloric devices based on soft materials and porous regenerative architectures.

Please see my [research](/research/) and [publications](/publications/), or get in touch by email.

<section class="home-news">
  <h2>News</h2>
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
