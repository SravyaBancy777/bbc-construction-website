# Bharadwaj Building Construction — Website

A complete multi-page website for the company. Plain HTML/CSS/JS, no build tools, no frameworks.

## IMPORTANT: how to open it correctly

**Extract the entire ZIP first, keeping the folder structure as-is** — then double-click `index.html` inside the extracted `construction-website` folder.

If you open `index.html` straight from inside the ZIP (e.g. via the browser's built-in ZIP viewer), the styling and images will be missing — the page needs `styles.css`, `script.js` and the `images/` folder sitting next to it. That is why it can look plain and unstyled.

## Pages

| Page | Contents |
|---|---|
| `index.html` | Home — hero, stats, services preview, featured projects, why-us, CTA banner |
| `services.html` | Full services — 6 services, each with a "What's included" list |
| `projects.html` | Projects gallery — Sri Nilayam, Happy Home Duplex, Bhuvanagiri Township Homes |
| `about.html` | Company story, trust badges, 4-step process |
| `contact.html` | Site-visit request form + address, phones, email, Instagram, hours |

Shared across pages: `styles.css` (all styling), `script.js` (nav highlighting, mobile menu, form handling), `images/` (photos).

## Files

| File | What it is |
|---|---|
| `index.html`, `services.html`, `projects.html`, `about.html`, `contact.html` | The five pages — same header/nav/footer on each |
| `styles.css` | All styling — colours live in the `:root` variables at the top |
| `script.js` | Highlights the current page in the nav, mobile menu, form validation + email handoff |
| `images/` | Hero + 3 project photos (AI-generated placeholders — replace with real site photos) |

## Customising

- **Colours**: edit the `:root` variables at the top of `styles.css` (`--brand`, `--bg-dark`, etc.) — one change applies to all five pages.
- **Photos**: replace the files in `images/` keeping the same filenames.
- **Projects**: duplicate a `.project-card` block in `projects.html`; the grid expands automatically.
- **Navigation**: the menu is copied into each HTML file — if you add/remove a page, update the `<nav>` block in all five files.

## Company email

The site uses the business's Gmail (`bharadwajbuildingconstructions@gmail.com`), matching the Instagram profile. For a custom-domain address later (e.g. `contact@bharadwajconstruction.in`): buy the domain, then use Zoho Mail's free tier (up to 5 users free on your own domain), then update the email in `contact.html` and the `mailto:` in `script.js`.

## Making the contact form real

Right now the form validates input and opens the visitor's email app with a pre-filled message (works with zero backend). For enquiries to land directly in your inbox: **Formspree** (free tier — add `action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag) or **Netlify Forms** (free on Netlify hosting — add the `netlify` attribute).

## Going live

1. (Optional) Buy a custom domain — e.g. `bharadwajconstruction.in`.
2. Host free: upload the whole `construction-website` folder via **Netlify Drop** (app.netlify.com/drop) or push to GitHub → **GitHub Pages**.
3. Point the domain at the host (both give step-by-step DNS instructions).
4. Add the website link to the Instagram bio (@bharadwajconstructions).
5. Claim the free **Google Business Profile** — no listing exists yet (checked Oct 2026); keep name, address, phones and hours identical everywhere.

## Launch checklist

- [ ] Real project photos replace the AI placeholders
- [ ] Form wired to Formspree/Netlify (or keep the email-app handoff)
- [ ] Website URL added to the Instagram bio
- [ ] Google Business Profile claimed with matching details
- [ ] Tested on a phone — all five pages
