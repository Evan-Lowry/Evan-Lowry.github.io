const grid = document.getElementById("project-grid");
const chips = document.querySelectorAll(".chip");

function matches(project, filter) {
  if (filter === "all") return true;
  const categories = Array.isArray(project.category)
    ? project.category
    : [project.category];
  return categories.includes(filter);
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isVideo(src) {
  return /\.(mp4|webm|ogv)(\?|#|$)/i.test(src);
}

function primaryCategory(project) {
  return Array.isArray(project.category) ? project.category[0] : project.category;
}

// Brand marks live in assets/tech/ (devicons, fetched once, served locally).
// Anything without a real logo — concepts like "Search", "ZK", "GDScript" —
// keeps a text pill so the row never shows a broken image.
const TECH_ICONS = {
  Python: "python.svg",
  TypeScript: "typescript.svg",
  FastAPI: "fastapi.svg",
  React: "react.svg",
  Swift: "swift.svg",
  SwiftUI: "swift.svg",
  Java: "java.svg",
  "C++": "cplusplus.svg",
  "Next.js": "nextjs.svg",
  Express: "express.svg",
  MongoDB: "mongodb.svg",
  Godot: "godot.svg",
  OpenGL: "opengl.svg",
};

// Black marks that disappear on the dark tiles — flipped to white in CSS.
const INVERT_ICONS = new Set(["Next.js", "Express"]);

const BLUETOOTH_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b1bac4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4v16M7 4l10 5-10 5M7 12l10 5-10 5"/></svg>`;

function tagHTML(tag) {
  if (tag === "Bluetooth") {
    return `<li class="tag-icon" title="Bluetooth" aria-label="Bluetooth">${BLUETOOTH_SVG}</li>`;
  }
  const file = TECH_ICONS[tag];
  if (file) {
    const invert = INVERT_ICONS.has(tag) ? ` class="invert"` : "";
    return `<li class="tag-icon" title="${tag}"><img src="assets/tech/${file}" alt="${tag}"${invert} loading="lazy" width="22" height="22" /></li>`;
  }
  return "";
}

function mediaHTML(project) {
  const slug = slugify(project.title);
  if (project.demo && project.demo.src) {
    const src = project.demo.src;
    const poster = project.demo.poster ? ` poster="${project.demo.poster}"` : "";
    const inner = isVideo(src)
      ? `<video muted loop playsinline preload="metadata"${poster} src="${src}"></video>`
      : `<img loading="lazy" src="${src}" alt="${project.title} demo" />`;
    return `
      <div class="card-media has-demo">
        ${inner}
      </div>`;
  }
  return `
    <div class="card-media is-empty${project.wellNote ? " is-notice" : ""}" aria-hidden="true">
      ${project.wellNote ? "" : `<span class="empty-dir">assets/demos/${slug}.mp4</span>`}
      ${project.wellNote ? `<span class="empty-note">${project.wellNote}</span>` : `<span class="empty-hint">drop a demo here — plays on hover</span>`}
    </div>`;
}

function render(filter) {
  const items = projects.filter((project) => matches(project, filter));

  grid.innerHTML = items
    .map(
      (project, i) => `
      <article class="card" data-cat="${primaryCategory(project)}" tabindex="0">
        <div class="card-bar" aria-hidden="true">
          <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
          <span class="card-bar-title">~/${slugify(project.title)}</span>
        </div>
        <div class="card-body">
        <p class="card-top"><span class="card-meta">${project.meta}</span><span class="card-index">${String(i + 1).padStart(2, "0")}/</span></p>
        ${mediaHTML(project)}
        <h3>${project.title}</h3>
        <p>${project.blurb}</p>
        <ul class="tags">
          ${project.tags.map((tag) => tagHTML(tag)).filter(Boolean).join("")}
        </ul>
        ${
          project.links.length
            ? `<div class="links">${project.links
                .map((link) => `<a href="${link.href}" target="_blank" rel="noopener">↗ ${link.label}</a>`)
                .join("")}</div>`
            : `<p class="card-note">$ no public repo — ask me for a demo</p>`
        }
        </div>
      </article>`
    )
    .join("");
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((item) => item.classList.remove("is-active"));
    chip.classList.add("is-active");
    render(chip.dataset.filter);
  });
});

// Hover-to-play: event delegation so re-renders keep working.
// Mouse + keyboard focus both trigger; touch taps toggle.
function findVideo(card) {
  return card ? card.querySelector(".card-media video") : null;
}

function playVideo(video) {
  if (!video) return;
  const attempt = video.play();
  if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
}

function stopVideo(video) {
  if (!video) return;
  video.pause();
  try {
    video.currentTime = 0;
  } catch (_) {
    /* not loaded yet — fine */
  }
}

grid.addEventListener("pointerover", (e) => {
  const card = e.target.closest(".card");
  if (!card || !grid.contains(card)) return;
  card.classList.add("is-hot");
  playVideo(findVideo(card));
});

grid.addEventListener("pointerout", (e) => {
  const card = e.target.closest(".card");
  if (!card || !grid.contains(card)) return;
  if (card.contains(e.relatedTarget)) return;
  card.classList.remove("is-hot");
  stopVideo(findVideo(card));
});

grid.addEventListener("focusin", (e) => {
  const card = e.target.closest(".card");
  if (!card || !grid.contains(card)) return;
  card.classList.add("is-hot");
  playVideo(findVideo(card));
});

grid.addEventListener("focusout", (e) => {
  const card = e.target.closest(".card");
  if (!card || !grid.contains(card)) return;
  card.classList.remove("is-hot");
  stopVideo(findVideo(card));
});

// Touch: first tap previews the demo instead of following a link.
grid.addEventListener(
  "touchstart",
  (e) => {
    const card = e.target.closest(".card");
    const video = findVideo(card);
    if (!video || !card.classList.contains("is-hot")) return;
    // already previewing — let the tap through
  },
  { passive: true }
);

// Subtle grid drift — same vibe, barely there.
const bg = document.querySelector(".grid-bg");
let raf = null;
window.addEventListener(
  "mousemove",
  (e) => {
    if (!bg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      bg.style.transform = `translate(${x}px, ${y}px)`;
      raf = null;
    });
  },
  { passive: true }
);

render("all");

// External links (anything http) open in a new tab.
// Same-page anchors and mailto: stay put.
document.querySelectorAll('a[href^="http"]').forEach((a) => {
  a.target = "_blank";
  a.rel = "noopener";
});
