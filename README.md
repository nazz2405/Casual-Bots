# Casual Bots

A responsive, no-build team website for a three-player **Brawl Stars** esports squad. It is designed as a static site, so it is lightweight, easy to edit, and ready for free GitHub Pages hosting.

## What is included

- Modern responsive landing page with a custom Casual Bots visual identity
- Three animated roster cards and expandable player profiles
- Editable team tag, practice schedule, game focus, community URL, and player details
- Mobile navigation, accessible dialog, keyboard focus styles, reduced-motion support, and a custom 404 page
- GitHub Actions workflow to deploy the site to GitHub Pages

## Edit your team details

All day-to-day content is in one file:

```text
docs/site-data.js
```

Update the `team` values and the three objects inside `players`. You can change names, handles, roles, favorite Brawlers, trophies, win rate, bios, player colors, schedule, and your Discord/YouTube/Instagram link without touching the layout.

For example:

```js
{
  name: "YOUR NAME",
  handle: "@your_handle",
  role: "AGGRO · ENTRY",
  favoriteBrawler: "Max",
  trophy: "42,500",
  winRate: "64%",
  // ...
}
```

## Run locally

There is no install step. From the repository root, run either:

```bash
python3 -m http.server 8000 --directory docs
```

Then visit `http://localhost:8000` in a browser.

## GitHub Pages deployment

This project uses GitHub Pages’ built-in branch deployment, so it does not require npm, a paid host, or a GitHub Actions workflow. The published site files are in `docs/` — a folder GitHub Pages supports directly.

To make the free site live:

1. Open the repository’s **Settings → Pages** page on GitHub.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the branch **`arena/01a080b8-casual-bots`** and folder **`/docs`**, then click **Save**.
4. GitHub will build the site and show the public URL. For this repository it will normally be:

   ```text
   https://nazz2405.github.io/Casual-Bots/
   ```

After this one-time setting, every push to that branch updates the live website automatically. If you later merge this work into `main`, switch the Pages source to `main` and `/docs` to keep publishing from the default branch.

> GitHub Pages is free for public repositories. This repository is public at the time this site was created.

## Project structure

```text
.
├── docs/
│   ├── index.html                       # Page structure
│   ├── styles.css                       # Responsive visual design
│   ├── script.js                        # Interactions and roster rendering
│   ├── site-data.js                     # Edit team and player content here
│   ├── 404.html                         # GitHub Pages error page
│   └── assets/favicon.svg
└── README.md
```

## Notes

This is an unofficial fan team website. Brawl Stars is a trademark of Supercell; this project does not claim an affiliation with Supercell.
