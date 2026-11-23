// Inquiry form validation. Each rule returns an error message or "" when valid.

const rules = {
  name(v) {
    v = v.trim();
    if (!v) return "Enter your full name.";
    if (v.length < 3) return "Name must be at least 3 characters.";
    if (!/^[A-Za-z\u0600-\u06FF][A-Za-z\u0600-\u06FF .'-]*$/.test(v)) return "Use letters only in your name.";
    return "";
  },
  email(v) {
    v = v.trim();
    if (!v) return "Enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email, like name@example.com.";
    return "";
  },
  phone(v) {
    const digits = v.replace(/[\s-]/g, "");
    if (!digits) return "Enter your mobile number.";
    if (!/^(03\d{9}|\+923\d{9})$/.test(digits)) return "Use a Pakistani mobile number, like 0300 1234567.";
    return "";
  },
  service(v) { return v ? "" : "Choose the service you need."; },
  message(v) {
    v = v.trim();
    if (!v) return "Describe the job.";
    if (v.length < 20) return "Add a few more details (at least 20 characters).";
    return "";
  }
};

function validateField(form, field) {
  const input = form.elements[field];
  const msg = rules[field](input.value);
  document.getElementById(field + "Error").textContent = msg;
  input.classList.toggle("invalid", Boolean(msg));
  input.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
}

function initForm() {
  const form = document.getElementById("inquiryForm");
  const success = document.getElementById("formSuccess");
  const message = form.elements.message;
  const count = document.getElementById("messageCount");

  Object.keys(rules).forEach(field => {
    const input = form.elements[field];
    input.addEventListener("blur", () => validateField(form, field));
    input.addEventListener("input", () => { if (input.classList.contains("invalid")) validateField(form, field); });
  });
  message.addEventListener("input", () => { count.textContent = message.value.length + " / 500"; });

  form.addEventListener("submit", e => {
    e.preventDefault();
    success.hidden = true;
    const results = Object.keys(rules).map(f => validateField(form, f));
    const firstBad = Object.keys(rules).find((f, i) => !results[i]);
    if (firstBad) { form.elements[firstBad].focus(); return; }

    // Week 1: no backend yet. A later week will send this data to a server.
    success.textContent = "Thanks, " + form.elements.name.value.trim().split(" ")[0] + ". We received your request and will reply by email.";
    success.hidden = false;
    form.reset();
    count.textContent = "0 / 500";
  });
}
