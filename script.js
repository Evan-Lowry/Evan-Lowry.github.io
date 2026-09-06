const grid = document.getElementById("project-grid");
const chips = document.querySelectorAll(".chip");

function render(filter) {
  const items = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  grid.innerHTML = items
    .map(
      (project) => `
      <article class="card">
        <p class="card-meta">${project.meta}</p>
        <h3>${project.title}</h3>
        <p>${project.blurb}</p>
        <ul class="tags">
          ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
        ${
          project.links.length
            ? `<div class="links">${project.links
                .map((link) => `<a href="${link.href}">${link.label}</a>`)
                .join("")}</div>`
            : `<p class="card-note">No public repository.</p>`
        }
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

render("all");
