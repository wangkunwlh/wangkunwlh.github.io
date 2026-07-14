const fallbackProfile = {
  name: "Kun Wang",
  role: "Postdoctoral Researcher, Ph.D.",
  summary:
    "Research on sustainable thermal management, elastocaloric heat pumps, soft active regenerators, and scalable solid-state cooling systems.",
  photo: "https://avatars.githubusercontent.com/u/36334039?v=4",
  facts: [
    { label: "Current position", value: "Postdoctoral Researcher, Institute of Microstructure Technology, KIT" },
    { label: "Research focus", value: "Elastocaloric cooling, regenerative heat pumps, magnetocaloric materials, additive manufacturing" },
    { label: "Education", value: "Ph.D., Technical University of Denmark; M.S., University of Chinese Academy of Sciences" },
    { label: "Profiles", value: "Google Scholar, ORCID, ResearchGate, LinkedIn" }
  ],
  actions: [
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=2DVz9pgAAAAJ&hl=en", icon: "assets/icons/google-scholar.svg" },
    { label: "ORCID", url: "https://orcid.org/0000-0002-3202-1872", icon: "assets/icons/orcid.svg" },
    { label: "ResearchGate", url: "https://www.researchgate.net/profile/Kun-Wang-161?ev=hdr_xprf", icon: "assets/icons/researchgate.svg?v=20260714-rg-logo" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/kun-wang-wk8837/", icon: "assets/icons/linkedin.svg" },
    { label: "Email", url: "mailto:kun.wang@kit.edu", icon: "assets/icons/email.svg" }
  ],
  research: [
    {
      title: "Research Direction",
      description:
        "Replace this placeholder with your main research direction, key questions, and methods."
    },
    {
      title: "Methods And Tools",
      description:
        "Add the models, datasets, laboratory methods, field methods, or software tools central to your work."
    }
  ],
  publications: [
    {
      title: "Add your first selected publication",
      authors: "Kun Wang",
      venue: "Journal or conference, year",
      description: "Briefly summarize the contribution in one sentence.",
      links: [{ label: "PDF", url: "#" }]
    }
  ],
  experience: [
    {
      date: "Mar 2024 - Present",
      title: "Postdoctoral Researcher, Karlsruhe Institute of Technology",
      description: "Institute of Microstructure Technology, Karlsruhe, Germany."
    }
  ],
  cv: {
    summary: "Upload your CV PDF to assets/cv.pdf, then set the URL below to assets/cv.pdf.",
    links: [{ label: "Email for CV", url: "mailto:kun.wang@kit.edu", style: "primary" }]
  },
  contactNote: "For academic collaboration, research discussion, or project inquiries.",
  contact: [
    { label: "Email", url: "mailto:kun.wang@kit.edu", icon: "assets/icons/email.svg" },
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=2DVz9pgAAAAJ&hl=en", icon: "assets/icons/google-scholar.svg" },
    { label: "ORCID", url: "https://orcid.org/0000-0002-3202-1872", icon: "assets/icons/orcid.svg" },
    { label: "ResearchGate", url: "https://www.researchgate.net/profile/Kun-Wang-161?ev=hdr_xprf", icon: "assets/icons/researchgate.svg?v=20260714-rg-logo" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/kun-wang-wk8837/", icon: "assets/icons/linkedin.svg" }
  ]
};

const $ = (selector) => document.querySelector(selector);

function createLink(link, className = "text-link") {
  if (link.icon) return createIconLink(link);

  const anchor = document.createElement("a");
  anchor.href = link.url;
  anchor.textContent = link.label;
  anchor.className = className;

  if (link.url.startsWith("http")) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }

  return anchor;
}

function createIconLink(link) {
  const anchor = document.createElement("a");
  anchor.href = link.url;
  anchor.className = "icon-link";
  anchor.title = link.label;
  anchor.setAttribute("aria-label", link.label);

  const image = document.createElement("img");
  image.src = link.icon;
  image.alt = "";
  image.width = 24;
  image.height = 24;

  const label = document.createElement("span");
  label.className = "sr-only";
  label.textContent = link.label;

  anchor.append(image, label);

  if (link.url.startsWith("http")) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }

  return anchor;
}

function createButton(link) {
  if (link.icon) return createIconLink(link);

  const style = link.style === "secondary" ? "button secondary" : "button";
  return createLink(link, style);
}

function renderProfile(profile) {
  document.title = profile.name;
  $(".brand-text").textContent = profile.name;
  $(".brand-mark").textContent = profile.initials || initials(profile.name);
  $("#profile-role").textContent = profile.role;
  $("#hero-title").textContent = profile.name;
  $("#profile-summary").textContent = profile.summary;
  $("#profile-photo").src = profile.photo;
  $("#profile-photo").alt = `Portrait of ${profile.name}`;
  $("#contact-note").textContent = profile.contactNote;
  $("#cv-summary").textContent = profile.cv.summary;
  $("#footer-text").innerHTML = `© <span id="year">${new Date().getFullYear()}</span> ${profile.name}.`;

  renderList("#hero-actions", profile.actions, createButton);
  renderFacts(profile.facts);
  renderResearch(profile.research);
  renderPublications(profile.publications);
  renderTimeline("#experience-list", profile.experience || profile.teaching || []);
  renderList("#cv-actions", profile.cv.links, createButton);
  renderList("#contact-links", profile.contact, createLink);
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function renderList(selector, items, mapper) {
  const container = $(selector);
  container.replaceChildren(...items.map(mapper));
}

function renderFacts(facts) {
  const nodes = facts.map((fact) => {
    const item = document.createElement("div");
    item.className = "fact-item";
    item.innerHTML = `<span class="fact-label"></span><span class="fact-value"></span>`;
    item.querySelector(".fact-label").textContent = fact.label;
    item.querySelector(".fact-value").textContent = fact.value;
    return item;
  });
  $("#fact-grid").replaceChildren(...nodes);
}

function renderResearch(items) {
  const nodes = items.map((entry) => {
    const item = document.createElement("article");
    item.className = "research-item";
    item.innerHTML = `<h3></h3><p></p>`;
    item.querySelector("h3").textContent = entry.title;
    item.querySelector("p").textContent = entry.description;
    return item;
  });
  $("#research-list").replaceChildren(...nodes);
}

function renderPublications(items) {
  const nodes = items.map((entry) => {
    const item = document.createElement("article");
    item.className = "publication-item";

    const body = document.createElement("div");
    const title = document.createElement("h3");
    const meta = document.createElement("p");
    const description = document.createElement("p");

    title.textContent = entry.title;
    meta.className = "publication-meta";
    meta.textContent = [entry.authors, entry.venue].filter(Boolean).join(" · ");
    description.textContent = entry.description || "";

    body.append(title, meta);
    if (entry.description) body.append(description);

    const links = document.createElement("div");
    links.className = "publication-links";
    links.replaceChildren(...(entry.links || []).map((link) => createLink(link)));

    item.append(body, links);
    return item;
  });
  $("#publication-list").replaceChildren(...nodes);
}

function renderTimeline(selector, items) {
  const nodes = items.map((entry) => {
    const item = document.createElement("article");
    item.className = "timeline-item";
    item.innerHTML = `<div class="timeline-date"></div><h3></h3><p></p>`;
    item.querySelector(".timeline-date").textContent = entry.date;
    item.querySelector("h3").textContent = entry.title;
    item.querySelector("p").textContent = entry.description;
    return item;
  });
  $(selector).replaceChildren(...nodes);
}

async function loadProfile() {
  try {
    const response = await fetch("data/profile.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`Profile request failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn("Using fallback profile data.", error);
    return fallbackProfile;
  }
}

function setupNavigation() {
  const button = $(".nav-toggle");
  const menu = $("#site-menu");

  button.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }
  });
}

function setupRevealAnimations() {
  const targets = document.querySelectorAll(
    ".hero-copy, .portrait-wrap, .section-heading, .fact-item, .research-item, .publication-item, .timeline-item, .cv-panel, .contact-links"
  );

  targets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 45}ms`);
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  targets.forEach((target) => observer.observe(target));
}

setupNavigation();
loadProfile().then((profile) => {
  renderProfile(profile);
  setupRevealAnimations();
});
