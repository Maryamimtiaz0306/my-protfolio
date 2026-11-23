// Search, category filter and sorting for the providers list.

const filterState = { query: "", category: "all", sort: "rating" };

function applyFilters() {
  const q = filterState.query.trim().toLowerCase();
  let list = providers.filter(p => {
    const matchesCategory = filterState.category === "all" || p.service === filterState.category;
    const haystack = (p.name + " " + getService(p.service).name + " " + p.area).toLowerCase();
    return matchesCategory && (!q || haystack.includes(q));
  });

  const sorters = {
    rating: (a, b) => b.rating - a.rating,
    priceLow: (a, b) => a.rate - b.rate,
    priceHigh: (a, b) => b.rate - a.rate,
    experience: (a, b) => b.years - a.years
  };
  return list.sort(sorters[filterState.sort]);
}

function renderProviders() {
  const results = applyFilters();
  const grid = document.getElementById("providerGrid");
  renderInto(grid, results, createProviderCard);
  document.getElementById("emptyState").hidden = results.length > 0;
  document.getElementById("resultCount").textContent =
    results.length === 1 ? "1 professional found" : results.length + " professionals found";
}

function setCategory(id) {
  filterState.category = id;
  document.getElementById("categorySelect").value = id;
  document.querySelectorAll(".service-card").forEach(c => c.classList.toggle("selected", c.dataset.service === id));
  renderProviders();
}

function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}
