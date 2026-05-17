/**
 * ============================================================
 *  PROJECTS.JS  —  ADD / EDIT YOUR WORK HERE
 * ============================================================
 *
 *  Each project is one { } block inside the [ ] array below.
 *  To add a new project: copy one full block, paste it at the
 *  TOP of the list (before the first {), and fill it in.
 *  Save the file — the page updates automatically.
 *
 *  ── VIDEO TYPES ──────────────────────────────────────────
 *  YouTube       →  type: "youtube"
 *                   url:  paste the normal youtube.com/watch?v= link
 *                         OR a youtu.be/XXXX short link
 *
 *  Google Drive  →  type: "google-drive"
 *                   url:  right-click file in Drive → Share →
 *                         "Anyone with the link" → copy link
 *
 *  No embed      →  type: "link"
 *                   Shows an "Open project" button instead of a player.
 *
 *  ── PHOTOS ───────────────────────────────────────────────
 *  Drop photos into:   assets/process/
 *  Name them clearly:  my-project-01.jpg, my-project-02.jpg …
 *  Then reference them in processImages / detailImages below.
 *  Up to 4 processImages show as floating frames beside the video.
 *  detailImages are optional extras — leave the array [] empty if unused.
 *
 * ============================================================
 */

const projects = [

  /* ──────────────────────────────────────────────────────────
     PROJECT 1  (shows first / at the top of the page)
     ────────────────────────────────────────────────────────── */
  {
    title:       "Field Notes",            // ← YOUR PROJECT TITLE
    category:    "Video Essay",            // ← CATEGORY shown in small caps
    year:        "2026",                   // ← YEAR

    description: "A short visual study about place, memory, and quiet movement in familiar spaces.",
    // ↑ One or two sentences about the project.

    type: "youtube",                       // ← "youtube" | "google-drive" | "link"
    url:  "https://www.youtube.com/watch?v=wza0UxcoxY8",
    // ↑ PASTE YOUR VIDEO LINK HERE
    url2: "https://www.youtube.com/watch?v=RhobC6RbzRg",
url3: "https://www.youtube.com/watch?v=6TIl-3xs-og",

    

    thumbnail: "assets/thumbnails/field-notes-thumbnail.jpg",
    // ↑ Optional thumbnail — not currently displayed but useful to keep

    processImages: [
      // ↓ Photos that float beside the video. Add or remove lines freely.
      //   Drop the image files into  assets/process/  first.
      { src: "assets/process/field-notes-01.jpg",  alt: "Sketch notes",    caption: "Image 1" },
      { src: "assets/process/field-notes-02.jpg",  alt: "Chaem and friend with moral dilemma cards",  caption: "Image 2" },
      { src: "assets/process/field-notes-03.jpg",  alt: "ASL professors in studio",   caption: "Image 3" }
      // ← Add more lines here if you have more photos (up to ~4 looks best)
    ],

   detailImages: [],

    tags: ["video", "research", "visual story"]
    // ↑ Short labels shown under the title. Add as many as you like.
  },

  /* ──────────────────────────────────────────────────────────
     PROJECT 2
     ────────────────────────────────────────────────────────── */
  {
    title:       "Small Observations",     // ← YOUR PROJECT TITLE
    category:    "Short Film",             // ← CATEGORY
    year:        "2025",                   // ← YEAR

    description: "A series of observational clips capturing the overlooked: morning routines, corner shops, the sound of rain on a tin roof.",

    type: "youtube",
format: "shorts",
url:  "https://www.youtube.com/shorts/L5_gvoBYQ8c",                    // ← VIDEO TYPE
    url2:  "https://www.youtube.com/shorts/PhW4xruDqMc",
    url3: "https://www.youtube.com/shorts/b0927naS_Ww",
    // ↑ REPLACE THIS with your real YouTube link

    thumbnail: "assets/thumbnails/small-observations-thumbnail.jpg",

    processImages: [
      { src: "assets/process/small-observations-01.jpg", alt: "Behind the scenes", caption: "Image 5" },
      { src: "assets/process/forbes clash of colleges pic.JPG", alt: "Street still",       caption: "Image 6" }
    ],

    detailImages: [],  // ← empty = no detail images for this project

    tags: ["film", "observational", "short"]
  },

  /* ──────────────────────────────────────────────────────────
     PROJECT 3
     ────────────────────────────────────────────────────────── */
  {
    title:       "Archive Experiment",     // ← YOUR PROJECT TITLE
    category:    "Design Research",        // ← CATEGORY
    year:        "2024",                   // ← YEAR

    description: "An experiment in archiving personal ephemera — ticket stubs, receipts, handwritten notes — into a visual document that reads like a diary.",

   type: "youtube",           // ← VIDEO TYPE
    url:  "https://www.youtube.com/watch?v=-sQv68r94SI",
   
    // ↑ REPLACE THIS with your real YouTube link

    thumbnail: "assets/thumbnails/archive-experiment-thumbnail.jpg",

    processImages: [
      { src: "assets/process/archive-experiment-01.jpg", alt: "Source materials", caption: "Image 7" },
      { src: "assets/process/archive-experiment-02.jpg", alt: "Layout test",       caption: "Image 8" },
      { src: "assets/process/archive-experiment-03.jpg", alt: "Final spread",      caption: "Image 9" }
    ],

   detailImages: [],

    tags: ["design", "archive", "print"]
  }

  /* ──────────────────────────────────────────────────────────
     TO ADD ANOTHER PROJECT:
     Copy the block above (from the opening { to the closing }),
     paste it here, change the content, save.
     ────────────────────────────────────────────────────────── */

];
