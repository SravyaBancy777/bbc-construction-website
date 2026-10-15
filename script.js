/* Bharadwaj Building Construction - shared site interactions */

// Footer year (every page has a #year span)
var yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Highlight the current page in the nav (body carries data-page)
var page = document.body.getAttribute("data-page");
if (page) {
  document.querySelectorAll(".main-nav a").forEach(function (a) {
    if (a.getAttribute("data-nav") === page) a.classList.add("active");
  });
}

// Mobile nav toggle
var navToggle = document.getElementById("navToggle");
var mainNav = document.getElementById("mainNav");
if (navToggle && mainNav) {
  navToggle.addEventListener("click", function () { mainNav.classList.toggle("open"); });
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { mainNav.classList.remove("open"); });
  });
}

// Sticky header shadow on scroll
var header = document.getElementById("siteHeader");
if (header) {
  window.addEventListener("scroll", function () {
    header.style.boxShadow = window.scrollY > 10 ? "0 4px 18px rgba(0,0,0,.35)" : "none";
  }, { passive: true });
}

// Quote form (contact page): validate, then hand off to the visitor's email app.
// Swap this for a form backend (Formspree, Netlify Forms) when deploying.
var form = document.getElementById("quoteForm");
if (form) {
  var formNote = document.getElementById("formNote");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = true;

    form.querySelectorAll("[required]").forEach(function (field) {
      var bad = !field.value.trim() ||
        (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
      field.classList.toggle("invalid", bad);
      if (bad) valid = false;
    });

    if (!valid) {
      formNote.textContent = "Please fill in the highlighted fields.";
      formNote.className = "form-note err";
      return;
    }

    var data = new FormData(form);
data.append("form-name", form.getAttribute("name"));

function mailtoFallback() {
  var body = [
    "Name: " + data.get("name"),
    "Phone: " + data.get("phone"),
    "Email: " + data.get("email"),
    "Project type: " + data.get("type"),
    "",
    data.get("details")
  ].join("\n");
  window.location.href =
    "mailto:bharadwajbuildingconstructions@gmail.com?subject=" +
    encodeURIComponent("Site visit request - " + data.get("type")) +
    "&body=" + encodeURIComponent(body);
}

formNote.textContent = "Sending…";
formNote.className = "form-note";

fetch("/", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams(data).toString()
}).then(function (res) {
  if (!res.ok) throw new Error("submit failed");
  formNote.textContent = "Thanks! Your request has been sent. We'll call you back within one business day.";
  formNote.className = "form-note ok";
  form.reset();
}).catch(function () {
  mailtoFallback();
  formNote.textContent = "Opening your email app to send the request…";
  formNote.className = "form-note ok";
  form.reset();
});
});

}

// Project gallery lightbox (projects page only)
(function () {
  var lightbox = document.getElementById("lightbox");
  if (!lightbox || typeof PROJECT_GALLERIES === "undefined") return;

  var mediaBox = document.getElementById("lbMedia");
  var captionEl = document.getElementById("lbCaption");
  var counterEl = document.getElementById("lbCounter");
  var items = [], index = 0;

  function render() {
    var item = items[index];
    mediaBox.innerHTML = "";
    var el;
    if (item.type === "video") {
      el = document.createElement("video");
      el.src = item.src; el.controls = true;
    } else {
      el = document.createElement("img");
      el.src = item.src; el.alt = item.caption || "";
    }
    mediaBox.appendChild(el);
    captionEl.textContent = item.caption || "";
    counterEl.textContent = (index + 1) + " / " + items.length;
  }
 function open(key) {
  items = PROJECT_GALLERIES[key] || [];
  if (!items.length) return;
  index = 0;
  render();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function close() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  mediaBox.innerHTML = ""; // stops any playing video
}

  function step(d) { index = (index + d + items.length) % items.length; render(); }

  document.querySelectorAll(".project-card[data-project]").forEach(function (card) {
    card.addEventListener("click", function () { open(card.getAttribute("data-project")); });
  });
  lightbox.querySelectorAll("[data-close]").forEach(function (el) { el.addEventListener("click", close); });
  document.getElementById("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); step(-1); });
  document.getElementById("lbNext").addEventListener("click", function (e) { e.stopPropagation(); step(1); });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
