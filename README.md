# Kun Wang Academic Website

Source repository for [wangkunwlh.github.io](https://wangkunwlh.github.io/). The site uses the al-folio v1 Jekyll theme and deploys automatically when changes are pushed to `main`.

## Daily update workflow

1. Edit or add the file listed below.
2. In GitHub Desktop, write a summary, commit, then **Push origin** to `main`.
3. Open the repository **Actions** tab and wait for **Deploy website to GitHub Pages** to complete successfully. Deployment normally takes a few minutes.

## What to edit

| What you want to change | File or folder |
| --- | --- |
| Home-page biography and profile image | `_pages/about.md` and `assets/img/` |
| Email, Google Scholar, ORCID, GitHub, LinkedIn | `_data/socials.yml` |
| Blue link/accent colour | `_sass/_themes.scss` |
| Social icons at the bottom of the home page | `_sass/_components.scss` |
| Publications, DOI/PDF/code/supplementary links | `_bibliography/papers.bib` and `assets/pdf/` |
| Research project cards | `_projects/` |
| News list on the home page | `_news/` |
| Blog posts | `_posts/` |
| Web CV | `assets/json/resume.json` |
| Gallery images and captions | `assets/img/gallery/` and `_pages/gallery.md` |

## Colours and bottom social icons

The site now uses the official blue token (`v.$blue-color`) in `_sass/_themes.scss`, for both light and dark modes. To choose another colour later, change the two `--global-theme-color` and `--global-hover-color` values in that file; keep the surrounding syntax unchanged.

The large icons in the second screenshot are the social icons at the bottom of the home page, not the footer logo. Their size is set in `_sass/_components.scss`:

```scss
.social {
  .contact-icons {
    font-size: 2.5rem;
  }
}
```

Use `2rem` for smaller icons or `3rem` for larger icons, then push to `main`.

## Images: where to put them and how large

- **Profile photo:** place it in `assets/img/`, then set `image: your-photo.webp` in `_pages/about.md`.
- **Gallery:** place files in `assets/img/gallery/`, then replace the `src` path and the paragraph caption in `_pages/gallery.md`.
- **Publication thumbnail:** place it in `assets/img/publication_preview/`, then set `preview = {filename.webp}` in the BibTeX entry.
- Preferred format: **WebP** or JPG for photos; use PNG only where transparency is needed.
- Recommended sizes: profile `800 × 800 px`; gallery `1600 × 900 px` (or another consistent 16:9 crop); publication preview `800 × 450 px`; social-preview image `1200 × 630 px`.
- Keep ordinary photos below **1–2 MB** each. GitHub browser uploads are limited to 25 MiB per file; Git can push files up to 100 MiB, but GitHub blocks larger files. Keep the full repository and published Pages site below 1 GB in practice.

## Add a blog post (easy: Markdown only)

Create a file such as `_posts/2026-07-21-my-first-update.md` (the date must be in the file name):

```markdown
---
layout: post
title: My first research update
date: 2026-07-21 09:00:00+0200
description: One-sentence summary shown on the blog list.
tags: [elastocaloric, research]
---

Write the post here. Markdown supports headings, lists, links, images, and equations.
```

Push it to `main`; it will appear automatically on Blog and in the home-page “latest posts” list. No HTML or programming is required for normal posts.

## Add or replace the CV PDF

The CV page is generated from `assets/json/resume.json`. To also offer a downloadable PDF:

1. Save the file as `assets/pdf/Kun_Wang_CV.pdf`.
2. Add this line below the front matter in `_pages/cv.md`:

```markdown
[Download my CV as PDF]({{ '/assets/pdf/Kun_Wang_CV.pdf' | relative_url }})
```

Use a clear file name and keep the PDF below 10 MB when possible.

### Add CV sections: Languages, Talks & Posters

`Languages` is a built-in JSON Resume section. Add it at the same top level as `work` and `education` in `assets/json/resume.json`:

```json
"languages": [
  { "language": "Chinese", "fluency": "Native" },
  { "language": "English", "fluency": "Professional working proficiency" }
]
```

The current JSON Resume CV renderer supports standard sections only (`work`, `education`, `publications`, `skills`, `languages`, and others listed in `_config.yml`). A new custom key such as `talks` will **not** appear automatically.

For a separately titled **Talks & Posters** module, use the existing RenderCV option when you are ready to migrate the full CV: fill `_data/cv.yml`, add a `Talks & Posters:` section under `cv.sections`, then change `cv_format: jsonresume` to `cv_format: rendercv` in `_pages/cv.md`. RenderCV accepts custom section names. Do not switch formats until `_data/cv.yml` has been replaced with your own data; its current contents are only a sample CV.

## Gallery and publication examples

To replace a Gallery item in `_pages/gallery.md`, change both the filename and text:

```html
<img class="img-fluid rounded" src="{{ '/assets/img/gallery/kit-lab.webp' | relative_url }}" alt="Elastocaloric test rig">
<p class="mt-2">Testing an elastocaloric regenerator at KIT.</p>
```

For a paper in `_bibliography/papers.bib`, add only links that exist:

```bibtex
@article{your2026paper,
  title = {Paper title},
  author = {Wang, Kun and Coauthor, A.},
  year = {2026},
  journal = {Journal Name},
  doi = {10.xxxx/xxxxx},
  pdf = {your-paper.pdf},
  code = {https://github.com/your-account/your-code},
  supp = {your-supplement.pdf},
  preview = {your-thumbnail.webp},
  selected = {true}
}
```

Place relative `pdf` and `supp` files in `assets/pdf/`; `preview` files belong in `assets/img/publication_preview/`.

## Local preview (optional)

If Ruby/Bundler and Node.js are installed, run from the repository folder:

```bash
npm ci
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>. If you do not preview locally, GitHub Actions is still the final deployment check.

## References

GitHub Pages recommends keeping the source repository and published site within 1 GB. GitHub web uploads are capped at 25 MiB per file; normal Git pushes are capped at 100 MiB per file. See [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) and [GitHub large-file limits](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).

## License

The site is based on al-folio, distributed under the MIT License.