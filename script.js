const fallbackProfile = {
  name: "Kunwa Wang",
  role: "Researcher",
  summary:
    "Personal academic website for research, publications, projects, teaching, and collaboration.",
  photo: "https://avatars.githubusercontent.com/u/36334039?v=4",
  facts: [
    { label: "Name", value: "Kunwa Wang" },
    { label: "GitHub", value: "wangkunwlh" },
    { label: "Email", value: "wangkunwlh@outlook.com" },
    { label: "Website", value: "wangkunwlh.github.io" }
  ],
  actions: [
    { label: "Contact", url: "mailto:wangkunwlh@outlook.com", style: "primary" },
    { label: "GitHub", url: "https://github.com/wangkunwlh", style: "secondary" }
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
      authors: "Kunwa Wang",
      venue: "Journal or conference, year",
      description: "Briefly summarize the contribution in one sentence.",
      links: [{ label: "PDF", url: "#" }]
    }
  ],
  projects: [
    {
      title: "Research Project",
      description: "A concise description of the project, research question, and current status.",
      tags: ["Research", "Open Science"],
      links: [{ label: "Code", url: "https://github.com/wangkunwlh" }]
    }
  ],
  teaching: [
    {
      date: "Year",
      title: "Course, talk, workshop, or academic service",
      description: "Add teaching assistantships, guest lectures, invited talks, and service roles."
    }
  ],
  cv: {
    summary: "Upload your CV PDF to assets/cv.pdf, then set the URL below to assets/cv.pdf.",
    links: [{ label: "Email for CV", url: "mailto:wangkunwlh@outlook.com", style: "primary" }]
  },
  contactNote: "For academic collaboration, research discussion, or project inquiries.",
  contact: [
    { label: "Email", url: "mailto:wangkunwlh@outlook.com" },
    { label: "GitHub", url: "https://github.com/wangkunwlh" }
  ]
};

const $ = (selector) => document.querySelector(selector);

function createLink(link, className = "text-link") {
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

function createButton(link) {
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
  renderProjects(profile.projects);
  renderTeaching(profile.teaching);
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

function renderProjects(items) {
  const nodes = items.map((entry) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const body = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const tags = document.createElement("div");

    title.textContent = entry.title;
    description.textContent = entry.description;
    tags.className = "tag-list";
    tags.replaceChildren(...(entry.tags || []).map(createTag));
    body.append(title, description, tags);

    const links = document.createElement("div");
    links.className = "project-links";
    links.replaceChildren(...(entry.links || []).map((link) => createLink(link)));

    card.append(body, links);
    return card;
  });
  $("#project-grid").replaceChildren(...nodes);
}

function createTag(text) {
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = text;
  return tag;
}

function renderTeaching(items) {
  const nodes = items.map((entry) => {
    const item = document.createElement("article");
    item.className = "timeline-item";
    item.innerHTML = `<div class="timeline-date"></div><h3></h3><p></p>`;
    item.querySelector(".timeline-date").textContent = entry.date;
    item.querySelector("h3").textContent = entry.title;
    item.querySelector("p").textContent = entry.description;
    return item;
  });
  $("#teaching-list").replaceChildren(...nodes);
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

setupNavigation();
loadProfile().then(renderProfile);
