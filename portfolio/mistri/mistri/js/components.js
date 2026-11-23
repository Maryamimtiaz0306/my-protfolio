// Reusable UI builders. Each takes one data object and returns a DOM element.

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatPrice(n) { return "Rs " + n.toLocaleString("en-PK") + "/hr"; }
function getService(id) { return services.find(s => s.id === id); }
function initials(name) { return name.split(" ").slice(0, 2).map(w => w[0]).join(""); }

function createServiceCard(service) {
  const card = el("button", "service-card");
  card.type = "button";
  card.dataset.service = service.id;
  card.append(el("span", "service-icon", service.icon), el("h3", null, service.name), el("p", null, service.blurb));
  return card;
}

function createProviderCard(p) {
  const card = el("article", "provider-card");
  const head = el("div", "provider-head");
  head.append(el("div", "avatar", initials(p.name)));
  const who = el("div");
  who.append(el("h3", null, p.name), el("p", "muted", getService(p.service).name + " · " + p.area));
  head.append(who);

  const meta = el("p", "provider-meta");
  meta.append(el("span", "rating", "★ " + p.rating.toFixed(1)), document.createTextNode(" (" + p.reviews + " reviews) · " + p.years + " yrs experience"));

  const foot = el("div", "provider-foot");
  foot.append(el("strong", null, formatPrice(p.rate)));
  if (p.verified) foot.append(el("span", "badge", "ID verified"));

  const btn = el("button", "btn btn-small", "Request " + p.name.split(" ")[0]);
  btn.type = "button";
  btn.dataset.provider = p.id;
  card.append(head, meta, foot, btn);
  return card;
}

function createTestimonialCard(t) {
  const card = el("figure", "testimonial");
  card.append(el("div", "stars", "★".repeat(t.rating) + "☆".repeat(5 - t.rating)));
  card.append(el("blockquote", null, t.text));
  card.append(el("figcaption", null, t.name + ", " + t.area));
  return card;
}

function renderInto(container, items, builder) {
  container.replaceChildren(...items.map(builder));
}
