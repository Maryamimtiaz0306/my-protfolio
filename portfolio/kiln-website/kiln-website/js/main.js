// ---------- Mobile menu ----------
const toggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
toggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

// ---------- Project slider ----------
const slides = document.querySelectorAll(".slide");
const dotsBox = document.getElementById("dots");
let current = 0;
let timer;

slides.forEach((_, i) => {
  const d = document.createElement("button");
  d.className = "dot";
  d.setAttribute("aria-label", "Show project " + (i + 1));
  d.addEventListener("click", () => { show(i); restart(); });
  dotsBox.appendChild(d);
});
const dots = dotsBox.querySelectorAll(".dot");

function show(i) {
  current = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle("active", n === current));
  dots.forEach((d, n) => d.classList.toggle("active", n === current));
}
function restart() {
  clearInterval(timer);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    timer = setInterval(() => show(current + 1), 5000);
  }
}
document.getElementById("next").addEventListener("click", () => { show(current + 1); restart(); });
document.getElementById("prev").addEventListener("click", () => { show(current - 1); restart(); });
show(0);
restart();

// ---------- Highlight current section in nav ----------
const links = document.querySelectorAll(".nav-links a");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section").forEach(s => observer.observe(s));

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
