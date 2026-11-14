# Portfolio — React + GSAP + Lenis

An animated portfolio starter: smooth scrolling, a letter-by-letter hero reveal, scroll-triggered fade-ins, words that light up as you scroll, infinite skill marquees, a pinned horizontal project gallery with 3D tilt cards, a magnetic contact button and a custom cursor.

## 1. Run it locally

You need **Node.js 20 or newer**.

```bash
npm install
npm run dev
```

Open the link it prints (usually http://localhost:5173).

## 2. Make it yours

| What | Where |
|---|---|
| All text: name, intro, about, skills, projects, email, socials | `src/data.js` |
| Colours and fonts | top of `src/index.css` (`:root`) |
| Project screenshots | put images in `public/projects/` and set `image: '/projects/your-file.png'` in `src/data.js` |
| Favicon | `public/favicon.svg` |
| Page title / description | `index.html` |

## 3. Project structure

```
src/
  data.js              ← your content
  index.css            ← all styles
  App.jsx              ← page layout (order of sections)
  lib/gsap.js          ← registers GSAP plugins
  lib/lenis.js         ← smooth scroll + scrollToTarget()
  hooks/useReveal.js   ← fade-in for any element with data-reveal
  components/
    Navbar.jsx         ← hide-on-scroll nav + progress bar
    Hero.jsx           ← animated title, gradient blobs
    About.jsx          ← scroll-lit statement + stats
    Skills.jsx         ← marquees + skill cards
    Projects.jsx       ← pinned horizontal gallery, tilt cards
    Contact.jsx        ← magnetic email button
    Cursor.jsx         ← custom cursor ring
    Footer.jsx
```

**Tip:** to fade in any new element on scroll, add `data-reveal` to it and call `useReveal(sectionRef)` in its section.

## 4. Deploy free on Render

1. Push this folder to a new GitHub repo.
2. On Render: **New → Static Site** → pick the repo.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Deploy. Every push to GitHub redeploys automatically.

## Notes

- Animations turn off automatically for visitors with "reduce motion" enabled in their system settings.
- On phones, the project gallery stacks vertically and the cursor and tilt effects are disabled.
