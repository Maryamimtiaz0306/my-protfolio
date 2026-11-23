// Wires everything together once the page has loaded.

function populateSelects() {
  const filterSel = document.getElementById("categorySelect");
  filterSel.add(new Option("All services", "all"));
  services.forEach(s => filterSel.add(new Option(s.name, s.id)));

  const formSel = document.getElementById("service");
  formSel.add(new Option("Choose a service", ""));
  services.forEach(s => formSel.add(new Option(s.name, s.id)));
}

function scrollToId(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function initNav() {
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  const setOpen = open => {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
}

function initFilters() {
  const search = document.getElementById("searchInput");
  search.addEventListener("input", debounce(() => { filterState.query = search.value; renderProviders(); }, 200));
  document.getElementById("categorySelect").addEventListener("change", e => setCategory(e.target.value));
  document.getElementById("sortSelect").addEventListener("change", e => { filterState.sort = e.target.value; renderProviders(); });
  document.getElementById("resetFilters").addEventListener("click", () => {
    filterState.query = ""; search.value = "";
    document.getElementById("sortSelect").value = filterState.sort = "rating";
    setCategory("all");
  });

  // Hero search: copy the query into the provider search and jump there.
  document.getElementById("heroSearch").addEventListener("submit", e => {
    e.preventDefault();
    filterState.query = document.getElementById("heroQuery").value;
    search.value = filterState.query;
    renderProviders();
    scrollToId("providers");
  });

  // Service cards set the category filter.
  document.getElementById("serviceGrid").addEventListener("click", e => {
    const card = e.target.closest(".service-card");
    if (!card) return;
    setCategory(card.dataset.service === filterState.category ? "all" : card.dataset.service);
    scrollToId("providers");
  });

  // "Request" buttons pre-fill the contact form.
  document.getElementById("providerGrid").addEventListener("click", e => {
    const btn = e.target.closest("button[data-provider]");
    if (!btn) return;
    const p = providers.find(x => x.id === Number(btn.dataset.provider));
    const form = document.getElementById("inquiryForm");
    form.elements.service.value = p.service;
    form.elements.message.value = "I would like to book " + p.name + " (" + p.area + "). The job: ";
    form.elements.message.dispatchEvent(new Event("input"));
    scrollToId("contact");
    form.elements.name.focus({ preventScroll: true });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateSelects();
  renderInto(document.getElementById("serviceGrid"), services, createServiceCard);
  renderInto(document.getElementById("testimonialGrid"), testimonials, createTestimonialCard);
  renderProviders();
  initNav();
  initFilters();
  initForm();
  document.getElementById("year").textContent = new Date().getFullYear();
});
