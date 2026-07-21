# Kun Wang Academic Website

Source repository for [wangkunwlh.github.io](https://wangkunwlh.github.io/), the academic website of Kun Wang, Postdoctoral Researcher at the Institute of Microstructure Technology, Karlsruhe Institute of Technology (KIT).

The site uses [al-folio](https://github.com/alshedivat/al-folio), a Jekyll theme for academic websites.

## Website content

- About, Blog, Research, Publications, Gallery, CV, and Contact pages
- BibTeX-managed publications with DOI links, selected papers, and thumbnails
- Research projects and news
- Dark mode and responsive layout

## Update content

| Content | Location |
| --- | --- |
| Personal profile and site settings | _config.yml, _data/socials.yml, _pages/about.md |
| Publications | _bibliography/papers.bib |
| Research projects | _projects/ |
| News | _news/ |
| Blog posts | _posts/ |
| CV | assets/json/resume.json |
| Gallery images | assets/img/gallery/ |

For a publication, add optional BibTeX fields such as pdf, code, and supp only when the corresponding files or URLs are available.

## Local preview

Install Ruby, Bundler, Node.js, and ImageMagick, then run:

~~~bash
npm ci
bundle install
bundle exec jekyll build
bundle exec jekyll serve
~~~

Open http://localhost:4000.

## Deployment

The GitHub Actions deployment workflow runs only when changes are pushed to main or master. The current al-folio version is on al-folio-v1; merge that branch into main and push it to deploy the new website.

~~~bash
git checkout main
git merge al-folio-v1
git push origin main
~~~

GitHub Pages deployment can take a few minutes. Check the repository Actions tab for the Deploy site workflow result.

## License

The site is based on al-folio, distributed under the MIT License.