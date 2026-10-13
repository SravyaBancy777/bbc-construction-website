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
    var body = [
      "Name: " + data.get("name"),
      "Phone: " + data.get("phone"),
      "Email: " + data.get("email"),
      "Project type: " + data.get("type"),
      "",
      data.get("details")
    ].join("\n");

    // Opens the visitor's email client with the site-visit request pre-filled.
    window.location.href =
      "mailto:bharadwajbuildingconstructions@gmail.com?subject=" +
      encodeURIComponent("Site visit request - " + data.get("type")) +
      "&body=" + encodeURIComponent(body);

    formNote.textContent = "Opening your email app to send the request…";
    formNote.className = "form-note ok";
    form.reset();
  });
}
