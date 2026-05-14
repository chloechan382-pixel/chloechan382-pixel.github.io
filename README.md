# Portfolio Site

One-page editorial portfolio — cream paper background, forest green typography, polaroid process frames, embedded videos. Hosted on GitHub Pages.

---

## File structure

```
index.html              Main page (all sections)
styles.css              Design system + component styles
script.js               Renders project sections, lazy-loads video iframes
data/projects.js        ← Edit this to add/update projects
assets/
  images/
    about-portrait.jpg  ← Replace with your portrait photo
  thumbnails/           Project thumbnail images (optional)
  process/              Process + detail photos for each project
README.md               This file
```

---

## How to replace the about portrait

Drop your photo at:
```
assets/images/about-portrait.jpg
```
Recommended: square or portrait crop, at least 600 × 800 px.  
If the file is missing a labelled placeholder appears instead.

---

## How to add a new project

Open `data/projects.js` and add an object at the **top** of the `projects` array:

```js
{
  title: "My New Project",
  category: "Video Essay",
  year: "2026",
  description: "One or two sentences describing the project.",
  type: "youtube",          // "youtube" | "google-drive" | "link"
  url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  thumbnail: "assets/thumbnails/my-project-thumbnail.jpg",
  processImages: [
    {
      src: "assets/process/my-project-01.jpg",
      alt: "Describe this image",
      caption: "Short caption"
    }
  ],
  detailImages: [],         // optional smaller frames below the cluster
  tags: ["video", "research"]
}
```

Save — the page rebuilds automatically. No build tools needed.

---

## How to add process photos

1. Place photos in `assets/process/`.  
   Name them clearly: `project-name-01.jpg`, `project-name-02.jpg`, etc.

2. Reference them in the `processImages` array of the project object:
   ```js
   processImages: [
     { src: "assets/process/project-name-01.jpg", alt: "...", caption: "..." },
     { src: "assets/process/project-name-02.jpg", alt: "...", caption: "..." }
   ]
   ```

3. Up to ~4 process images display as floating polaroid frames.

---

## How to add detail images

Same as process images but placed in `detailImages`.  
These render as smaller frames below the main cluster:

```js
detailImages: [
  { src: "assets/process/project-name-detail-01.jpg", alt: "...", caption: "..." }
]
```

---

## How to link a YouTube video

Paste the normal watch URL:
```
https://www.youtube.com/watch?v=VIDEO_ID
```
or a short link:
```
https://youtu.be/VIDEO_ID
```
Set `type: "youtube"`. The embed URL is generated automatically.

---

## How to link a Google Drive video

1. In Google Drive, right-click → Share → "Anyone with the link can view".
2. Copy the share link:
   ```
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   ```
3. Paste it as `url` and set `type: "google-drive"`.

---

## How to use a plain link (no embed)

Set `type: "link"`. The project section shows an **Open project** button instead of an iframe.

---

## How to edit bio details

Open `index.html` and find `id="about"`. Edit the text inside `.about-row` elements directly:
- Replace `[Your Name]`, `[Your City, Country]`, and the bio paragraph with your own text.
- Add or remove rows as needed — copy any `.about-row` div and edit the label and value.

---

## How to publish on GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch** → `main` / `root`.
4. Click **Save**. Live at `https://USERNAME.github.io/REPO/` within a minute.

No build tools, no dependencies, no server required.

---

## Design system reference

All values live in `:root` in `styles.css`.

| Variable | Purpose |
|---|---|
| `--color-cream` | Main page background |
| `--color-forest` | Headings, logo |
| `--color-hand-red` | Accent lines, "about me:" heading, hover underlines |
| `--color-charcoal` | Body text |
| `--color-muted` | Secondary text |
| `--font-display` | Cormorant Garamond — headings |
| `--font-body` | Lora — paragraphs |
| `--font-hand` | Caveat — "about me:" label |
| `--shadow-soft/frame/lift` | Polaroid frame shadows |
| `--space-1` … `--space-10` | Spacing scale |
| `--radius-sm/md/lg` | Border radius |
