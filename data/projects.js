/**
 * projects.js — Portfolio content
 *
 * HOW TO ADD A NEW PROJECT:
 * 1. Add a thumbnail:     assets/thumbnails/project-name-thumbnail.jpg
 * 2. Add process photos:  assets/process/project-name-01.jpg  (etc.)
 * 3. Copy one object below, paste it at the top of the array, fill it in.
 * 4. Save — the page rebuilds automatically.
 *
 * SUPPORTED VIDEO TYPES:
 *   "youtube"      → paste the normal watch URL or youtu.be short link
 *   "google-drive" → paste the "anyone with link can view" share URL
 *   "link"         → shows an "Open Project" button (no embed)
 *
 * PROCESS IMAGES: up to ~4 images shown as floating polaroid frames.
 * DETAIL IMAGES:  optional smaller images shown below the process cluster.
 */

const projects = [
  {
    title: "Field Notes",
    category: "Video Essay",
    year: "2026",
    description: "A short visual study about place, memory, and quiet movement in familiar spaces.",
    type: "youtube",
    url: "https://www.youtube.com/watch?v=wza0UxcoxY8",
    thumbnail: "assets/thumbnails/field-notes-thumbnail.jpg",
    processImages: [
      {
        src: "assets/process/field-notes-01.jpg",
        alt: "Location still — Field Notes",
        caption: "Location still"
      },
      {
        src: "assets/process/field-notes-02.jpg",
        alt: "Sketch notes — Field Notes",
        caption: "Sketch"
      },
      {
        src: "assets/process/field-notes-03.jpg",
        alt: "Editing notes — Field Notes",
        caption: "Editing notes"
      }
    ],
    detailImages: [
      {
        src: "assets/process/field-notes-detail-01.jpg",
        alt: "Detail — Field Notes",
        caption: "Detail"
      }
    ],
    tags: ["video", "research", "visual story"]
  },
  {
    title: "Small Observations",
    category: "Short Film",
    year: "2025",
    description: "A series of observational clips capturing the overlooked: morning routines, corner shops, the sound of rain on a tin roof.",
    type: "youtube",
    url: "https://www.youtube.com/watch?v=REPLACE_WITH_VIDEO_ID",
    thumbnail: "assets/thumbnails/small-observations-thumbnail.jpg",
    processImages: [
      {
        src: "assets/process/small-observations-01.jpg",
        alt: "Behind the scenes — Small Observations",
        caption: "Behind the scenes"
      },
      {
        src: "assets/process/small-observations-02.jpg",
        alt: "Street still — Small Observations",
        caption: "Street still"
      }
    ],
    detailImages: [],
    tags: ["film", "observational", "short"]
  },
  {
    title: "Archive Experiment",
    category: "Design Research",
    year: "2024",
    description: "An experiment in archiving personal ephemera — ticket stubs, receipts, handwritten notes — into a visual document that reads like a diary.",
    type: "google-drive",
    url: "https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/view?usp=sharing",
    thumbnail: "assets/thumbnails/archive-experiment-thumbnail.jpg",
    processImages: [
      {
        src: "assets/process/archive-experiment-01.jpg",
        alt: "Source materials — Archive Experiment",
        caption: "Source materials"
      },
      {
        src: "assets/process/archive-experiment-02.jpg",
        alt: "Layout test — Archive Experiment",
        caption: "Layout test"
      },
      {
        src: "assets/process/archive-experiment-03.jpg",
        alt: "Final spread — Archive Experiment",
        caption: "Final spread"
      }
    ],
    detailImages: [
      {
        src: "assets/process/archive-experiment-detail-01.jpg",
        alt: "Detail spread — Archive Experiment",
        caption: "Spread detail"
      }
    ],
    tags: ["design", "archive", "print"]
  }
];
