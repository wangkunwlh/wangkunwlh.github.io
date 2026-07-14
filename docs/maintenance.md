# Maintenance Guide

This website is intentionally simple: no build step, no dependency installation, and no framework lock-in. GitHub Pages can serve it directly from the `main` branch.

## What To Edit

- `data/profile.json`: most website content, including your biography, research focus, selected publications, work experience, CV link, and profile/contact links.
- `assets/cv.pdf`: your current CV. Add this file when you are ready, then update the CV link in `data/profile.json`.
- `styles.css`: colors, typography, spacing, and responsive layout.
- `index.html`: page structure. You rarely need to edit this unless you add a new section.

## Add A Publication

Open `data/profile.json`, find the `publications` array, and add an object like this:

```json
{
  "title": "Paper Title",
  "authors": "Kun Wang, Coauthor Name",
  "venue": "Conference or Journal, 2026",
  "description": "One sentence explaining the main contribution.",
  "links": [
    { "label": "PDF", "url": "assets/paper-title.pdf" },
    { "label": "DOI", "url": "https://doi.org/..." },
    { "label": "Code", "url": "https://github.com/wangkunwlh/repo" }
  ]
}
```

Keep commas valid: every item except the last item in an array needs a trailing comma.

## Add Work Experience

Open `data/profile.json`, find the `experience` array, and add:

```json
{
  "date": "2026 - Present",
  "title": "Position, Institution",
  "description": "A concise description of the role, lab, department, or supervisor."
}
```

## Add A Profile Icon Link

For Google Scholar, ORCID, ResearchGate, LinkedIn, or email links, use an icon link:

```json
{
  "label": "ResearchGate",
  "url": "https://www.researchgate.net/profile/Kun-Wang-161?ev=hdr_xprf",
  "icon": "assets/icons/researchgate.svg"
}
```

## Update Your CV

1. Save your CV as `assets/cv.pdf`.
2. In `data/profile.json`, change the `cv.links` section to:

```json
"links": [
  { "label": "Download CV", "url": "assets/cv.pdf", "style": "primary" }
]
```

## Local Preview

From this repository folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Publish With GitHub Pages

Create a public repository named exactly:

```text
wangkunwlh.github.io
```

Then upload or push these files to the repository's `main` branch. For a user site with this special repository name, GitHub Pages will publish it at:

```text
https://wangkunwlh.github.io
```

If the site does not appear immediately, wait a few minutes and check the repository's Settings > Pages page.

## Recommended Operating Rhythm

- Update publications whenever a paper is accepted, posted to arXiv, or gets code/data.
- Update CV at least once per semester.
- Keep the homepage concise: selected publications and work experience should be enough for most visitors.
- Prefer stable links: DOI, arXiv, ORCID, Google Scholar, ResearchGate, LinkedIn, and institutional profiles.
