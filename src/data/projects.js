// Placeholder data — matches the Decap CMS field schema exactly
// (title, role, year, tags, cover, images, description) so that
// once the CMS is live, swapping this for real content loaded
// from content/projects/*.md is a straight field-for-field match.
// See src/data/loadProjects.js (added once CMS is active) for the
// real loader — this file is temporary scaffolding.

const PROJECTS = [
  {
    id: "project-one",
    title: "Project Title",
    role: "Brand Identity",
    year: "2026",
    tags: ["branding", "print"],
    cover: "/images/placeholder-1.jpg",
    images: ["/images/placeholder-1.jpg"],
    description: "A short description of the brief, your approach, and the outcome.",
    size: "large",
  },
  {
    id: "project-two",
    title: "Project Title",
    role: "Editorial Design",
    year: "2025",
    tags: ["editorial", "typography"],
    cover: "/images/placeholder-2.jpg",
    images: ["/images/placeholder-2.jpg"],
    description: "Another short project description goes here.",
    size: "medium",
  },
  {
    id: "project-three",
    title: "Project Title",
    role: "Packaging",
    year: "2025",
    tags: ["packaging"],
    cover: "/images/placeholder-3.jpg",
    images: ["/images/placeholder-3.jpg"],
    description: "Another short project description goes here.",
    size: "small",
  },
];

export default PROJECTS;
