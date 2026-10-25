# UMAR TECH — Personal Portfolio of Umar Yahaya Usman

> “Turning Ideas Into Digital Experiences.”

A premium, cinematic, fully responsive single-page portfolio built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide icons**. Dark navy (`#050B12`) atmosphere, electric-cyan (`#27BFFF`) accents, self-hosted Space Grotesk / Inter variable fonts, and an honest, editable content layer.

---

## 1. Quick start

```bash
npm install       # install dependencies
npm run dev       # development server → http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build → http://localhost:4173
```

In this Arena session the production build is already running as the **live preview** (the “UMAR TECH portfolio preview” process). Every change you make can be re-published with `npm run build`.

### Scripts

| Script              | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Vite dev server with hot reload                     |
| `npm run build`     | `tsc --noEmit` type-check, then optimized Vite build |
| `npm run preview`   | Serves `dist/` locally (what you should test before publishing) |
| `npm run typecheck` | TypeScript check only                               |
| `node scripts/qa.mjs` | Headless-browser QA: console errors, failed requests, horizontal overflow at 320/375/390/768/1024/1440 px, plus interaction screenshots (requires `npm i -D playwright && npx playwright install chromium`) |

---

## 2. Project structure

```
├── index.html                  # SEO meta, Open Graph, JSON-LD, favicon, preload
├── public/
│   ├── favicon.svg             # UYU monogram favicon
│   ├── robots.txt
│   ├── sitemap.xml             # template — replace placeholder domain
│   ├── 404.html                # custom, on-brand 404 page
│   └── images/projects/        # sample project/gallery visuals (replace freely)
├── src/
│   ├── config/site.ts          # ★ ALL editable content lives here
│   ├── index.css               # design tokens, components, motion, reduced-motion
│   ├── main.tsx / App.tsx      # composition + canonical/og:url runtime handling
│   ├── lib/                    # hooks (scroll-spy, focus trap), utils, scroll helpers
│   └── components/             # Navbar, Hero, Marquee, About, Skills, Projects,
│                               # Services, Process, Gallery, Journey, Testimonials,
│                               # Contact, Footer, BackToTop, Modal, SmartImage…
└── scripts/qa.mjs              # automated visual/overflow/console QA
```

---

## 3. Editing your content

**Everything editable is in one file: `src/config/site.ts`.** No component edits needed for content changes.

| What you want to change            | Where in `site.ts`                          |
| ---------------------------------- | ------------------------------------------- |
| Name, brand, motto, headlines      | `brand`, `hero`                              |
| Hero photograph                    | `hero.image` (Cloudinary URL + responsive `srcSet`, alt text, dimensions) |
| About narrative + profile panel    | `about.paragraphs`, `about.info`             |
| Skill categories & items           | `skills.categories`                          |
| Proficiency bars (off by default)  | set `skills.showProficiency: true` and give each category a real `level` (0–100) |
| Projects (title, text, image, link)| `projects.items[]` — set `link` to a real URL when you have one; set `placeholder: false` once the visual is your own work |
| Services                           | `services.items[]`                           |
| Gallery images & categories        | `gallery.items[]` — add/remove entries freely |
| Achievements timeline              | `journey.items[]` (empty = honest “My journey is evolving” card) |
| Testimonials (hidden by default)   | `testimonials.enabled: true` + real quotes only |
| Social links                       | `socials[]` — empty `url` renders a disabled “soon” chip, never a fake link |
| Public email                       | `email` (appears in contact + footer once set) |
| Contact form backend               | `contact.endpoint` (+ optional `contact.accessKey`) |
| Live domain (SEO)                  | `siteUrl` — updates canonical + `og:url` at runtime |

### Replacing images

- **Hero photo:** currently your Cloudinary portrait, served with responsive transforms (`w_640/960/1280`). Swap `hero.image.src`/`srcSet`/`width`/`height`/`alt` if you re-upload.
- **Projects & gallery:** drop files into `public/images/…` and point `image`/`src`/`full` at them (e.g. `/images/work/flyer-01.jpg`), or use hosted URLs. Remove the `Sample visual` tag by setting `placeholder: false`.
- Every `<img>` has width/height or a fixed aspect ratio (no layout shift), lazy-loading below the fold, and a branded fallback panel if a request fails on a weak connection.

### Connecting the contact form (before going live)

The form validates locally and **never pretends to send**. With no backend configured it shows an honest “not connected yet” panel with a copy-to-clipboard fallback. To enable real delivery:

1. **Formspree:** create a form at formspree.io → set `contact.endpoint = 'https://formspree.io/f/yourFormId'`.
2. **Web3Forms:** create a form at web3forms.com → set `contact.endpoint = 'https://api.web3forms.com/submit'` and `contact.accessKey = 'your-public-key'` (public keys are safe in front-end code; never put secret keys here).
3. Any JSON-accepting endpoint works — the payload is `{ name, email, subject, projectType, message }`.

Spam protection included: hidden honeypot field + minimum-time trap; server-side validation remains the responsibility of your form provider.

---

## 4. Publishing online

Build first: `npm run build` (output in `dist/`).

- **Netlify:** drag & drop `dist/`, or connect the repo with build command `npm run build` and publish directory `dist`. `404.html` is picked up automatically.
- **Vercel:** import the repo; framework preset “Vite”; build `npm run build`, output `dist`.
- **Cloudflare Pages:** build `npm run build`, output `dist`.
- **GitHub Pages:** set `base: '/your-repo-name/'` in `vite.config.ts`, build, and publish `dist/` (e.g. with `actions/deploy-pages`). Note: anchor-link navigation works fine on Pages.

After deploying with a real domain:

1. Set `siteUrl: 'https://your-domain.com'` in `src/config/site.ts` (canonical + Open Graph URL update automatically).
2. Replace `https://your-domain.example` in `public/sitemap.xml` and uncomment the sitemap line in `public/robots.txt`.
3. Submit the sitemap in Google Search Console when ready.

No analytics or tracking cookies are present — if you add any later, update the Privacy Policy modal (in `Footer.tsx`) and disclose them properly.

---

## 5. Design & engineering notes

- **Identity:** original UYU monogram (silver U cradling a cyan Y node) used in navbar, footer and favicon; cinematic dark-navy system with hairline borders, restrained glassmorphism and soft cyan glows — inspired in mood only by premium entertainment sites, with no copied assets.
- **Motion:** Framer Motion scroll reveals, hero clip-path image reveal, animated cyan rule, marquee band, gallery layout animations — all disabled or reduced automatically under `prefers-reduced-motion`, with content fully readable when animation is off.
- **Accessibility:** skip link, semantic landmarks, scroll-spy nav with `aria-current`, focus-trapped dialogs (project modal, lightbox, legal docs), keyboard lightbox arrows + Escape, visible focus rings, labelled form fields with `aria-invalid`/`aria-describedby`, touch-friendly targets.
- **Performance:** ~104 KB gzip JS + ~8 KB gzip CSS, self-hosted variable fonts (no third-party font requests), preconnected + preloaded hero with responsive `srcset`, lazy images below the fold, no background video, no layout shift.
- **Honesty by design:** sample visuals are visibly tagged, disabled social chips instead of guessed handles, no invented clients/awards/testimonials/statistics, and a journey section that says “evolving” until real milestones are added.

---

## 6. QA status (last automated pass)

- ✅ No console errors or warnings, no failed requests
- ✅ No horizontal overflow at 320 / 375 / 390 / 768 / 1024 / 1440 px
- ✅ Nav scroll-spy, mobile menu, project modal, gallery filters, lightbox, form validation and honest draft state all verified via `scripts/qa.mjs`

Re-run any time with `node scripts/qa.mjs` while `npm run preview` is running.
