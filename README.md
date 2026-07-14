# Kun Wang Academic Website

This repository contains the source for `https://wangkunwlh.github.io`.

The site is a static personal academic website designed for GitHub Pages. It has no build step and no package dependencies, so normal updates are simple text edits.

## Site Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── data/
│   └── profile.json
├── assets/
│   └── cv.pdf
├── docs/
│   └── maintenance.md
├── robots.txt
├── sitemap.xml
└── .nojekyll
```

## Quick Edit

Most content lives in:

```text
data/profile.json
```

Edit that file to update the biography, research focus, selected publications, work experience, CV links, and profile/contact links.

## Local Preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deployment

Create a public GitHub repository named exactly:

```text
wangkunwlh.github.io
```

Push these files to the `main` branch. GitHub Pages will publish the website at:

```text
https://wangkunwlh.github.io
```

More detailed maintenance notes are in `docs/maintenance.md`.

中文上线与运营维护指南见 `docs/operations-zh.md`。
