#!/usr/bin/env python3
"""Add missing journal articles from the owner's public ORCID record.

Existing BibTeX entries are intentionally never modified so that curated fields
such as ``selected``, ``pdf``, ``code``, and ``preview`` remain intact.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
SOCIALS_FILE = ROOT / "_data" / "socials.yml"
BIB_FILE = ROOT / "_bibliography" / "papers.bib"
COVERS_FILE = ROOT / "_data" / "journal_covers.json"
RECENT_IMAGES_FILE = ROOT / "_data" / "recent_publication_images.json"
RECENT_PUBLICATIONS_FILE = ROOT / "_data" / "recent_publications.json"
USER_AGENT = "KunWangWebsite/1.0 (mailto:kun.wang@kit.edu)"


def get_json(url: str, accept: str = "application/json") -> dict:
    request = Request(url, headers={"Accept": accept, "User-Agent": USER_AGENT})
    try:
        with urlopen(request, timeout=30) as response:
            return json.load(response)
    except (HTTPError, URLError, TimeoutError) as error:
        raise RuntimeError(f"Could not fetch {url}: {error}") from error


def load_orcid_id() -> str:
    match = re.search(
        r"^orcid_id:\s*([^#\s]+)",
        SOCIALS_FILE.read_text(encoding="utf-8"),
        flags=re.MULTILINE,
    )
    if not match:
        raise RuntimeError("Missing 'orcid_id' in _data/socials.yml")
    return match.group(1)


def load_journal_covers() -> dict[str, str]:
    """Return locally stored official-cover previews, keyed by journal title."""
    data = json.loads(COVERS_FILE.read_text(encoding="utf-8"))
    return {
        journal: details["preview"]
        for journal, details in data.items()
        if (ROOT / "assets" / "img" / "publication_preview" / details.get("preview", "")).is_file()
    }


def extract_dois(orcid_record: dict) -> set[str]:
    dois: set[str] = set()
    for group in orcid_record.get("group", []):
        for external_id in group.get("external-ids", {}).get("external-id", []):
            if external_id.get("external-id-type") == "doi":
                value = external_id.get("external-id-value", "").strip().lower()
                if value:
                    dois.add(value.removeprefix("https://doi.org/"))
    return dois


def existing_dois(bibtex: str) -> set[str]:
    return {
        doi.strip().lower()
        for doi in re.findall(r'\bdoi\s*=\s*[{\"]([^}\"]+)', bibtex, flags=re.IGNORECASE)
    }


def tex(value: str) -> str:
    return value.replace("&", r"\&").replace("%", r"\%").replace("#", r"\#")


def article_key(metadata: dict, used_keys: set[str]) -> str:
    author = (metadata.get("author") or [{}])[0].get("family", "publication")
    year = str((metadata.get("issued", {}).get("date-parts", [[""]])[0] or [""])[0])
    words = re.findall(r"[a-z0-9]+", " ".join(metadata.get("title", [])).lower())
    stem = "".join(words[:2]) or "publication"
    candidate = re.sub(r"[^a-z0-9]", "", f"{author}{year}{stem}".lower())
    key, suffix = candidate, 2
    while key in used_keys:
        key = f"{candidate}{suffix}"
        suffix += 1
    return key


def render_article(metadata: dict, key: str, preview: str | None) -> str:
    authors = " and ".join(
        f"{author.get('family', '')}, {author.get('given', '')}".strip(", ")
        for author in metadata.get("author", [])
    )
    year = str(metadata["issued"]["date-parts"][0][0])
    fields = [
        ("title", tex(" ".join(metadata.get("title", [])))),
        ("author", tex(authors)),
        ("journal", tex(" ".join(metadata.get("container-title", [])))),
        ("year", year),
        ("doi", metadata["DOI"].lower()),
    ]
    for name, source_name in (("volume", "volume"), ("number", "issue"), ("pages", "page")):
        if metadata.get(source_name):
            fields.append((name, str(metadata[source_name])))
    if preview:
        fields.append(("preview", preview))
    body = ",\n  ".join(f"{name} = {{{value}}}" for name, value in fields)
    return f"@article{{{key},\n  {body}\n}}\n"


def bibtex_articles(bibtex: str) -> list[dict[str, str]]:
    """Read the article fields needed for the homepage in source order."""
    articles: list[dict[str, str]] = []
    for entry in re.finditer(r"@article\s*{([^,]+),(.*?)(?=^@|\Z)", bibtex, re.MULTILINE | re.DOTALL | re.IGNORECASE):
        fields = {
            name.lower(): value.strip()
            for name, value in re.findall(r"\b([A-Za-z]+)\s*=\s*{([^}]*)}", entry.group(2))
        }
        if fields.get("title") and fields.get("doi") and fields.get("year"):
            articles.append(fields)
    return articles


def write_recent_publications(bibtex: str) -> None:
    """Publish the three newest BibTeX articles for the homepage cards."""
    image_overrides = json.loads(RECENT_IMAGES_FILE.read_text(encoding="utf-8"))
    articles = bibtex_articles(bibtex)
    recent = sorted(articles, key=lambda article: int(re.search(r"\d{4}", article["year"]).group()), reverse=True)[:3]
    cards = []
    for article in recent:
        doi = article["doi"].lower()
        override = image_overrides.get(doi, {})
        image = override.get("image")
        if not image:
            image = f"/assets/img/publication_preview/{article.get('preview', 'research-elastocaloric.svg')}"
        cards.append(
            {
                "title": article["title"],
                "doi": doi,
                "year": article["year"],
                "image": image,
                "alt": override.get("alt", f"Publication preview for {article['title']}"),
            }
        )
    RECENT_PUBLICATIONS_FILE.write_text(json.dumps(cards, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    bibtex = BIB_FILE.read_text(encoding="utf-8")
    known_dois = existing_dois(bibtex)
    known_keys = set(re.findall(r"@\w+\s*{([^,]+),", bibtex))
    journal_covers = load_journal_covers()
    orcid_id = load_orcid_id()
    record = get_json(f"https://pub.orcid.org/v3.0/{orcid_id}/works")

    additions: list[str] = []
    for doi in sorted(extract_dois(record)):
        if doi in known_dois:
            continue
        try:
            metadata = get_json(f"https://api.crossref.org/works/{doi}").get("message", {})
        except RuntimeError:
            # ORCID may also contain DataCite datasets or other non-Crossref works.
            print(f"Skipping non-Crossref DOI: {doi}")
            continue
        if metadata.get("type") != "journal-article" or not metadata.get("container-title"):
            continue
        key = article_key(metadata, known_keys)
        known_keys.add(key)
        journal = " ".join(metadata.get("container-title", []))
        preview = journal_covers.get(journal)
        additions.append(render_article(metadata, key, preview))
        if not preview:
            print(f"No cover mapping for {journal}; add one to _data/journal_covers.json.")
        print(f"Adding {metadata['DOI']}: {' '.join(metadata.get('title', []))}")

    if not additions:
        write_recent_publications(bibtex)
        print("No missing journal articles found.")
        return
    updated_bibtex = bibtex.rstrip() + "\n\n" + "\n".join(additions)
    BIB_FILE.write_text(updated_bibtex, encoding="utf-8")
    write_recent_publications(updated_bibtex)
    print(f"Added {len(additions)} journal article(s) to {BIB_FILE.relative_to(ROOT)}.")


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as error:
        print(error, file=sys.stderr)
        sys.exit(1)
