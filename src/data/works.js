// Data model for the works system.
//
// Two content types:
//   - "design": a single piece of work — title, image(s), optional
//     reference images, description, date. This is the atomic unit.
//   - "collection": a themed grouping of designs — title, description,
//     date, and a list of member design ids. A design can belong to
//     zero, one, or several collections (many-to-many via
//     design.collections).
//
// `public` controls whether a work shows up on the public Works page
// and landing preview at all — set false to keep something in the
// data but hidden from visitors.
//
// This file is hand-authored placeholder data today. The shape is
// deliberately what a future CMS/admin panel would produce (flat
// records, string ids, ISO dates) so swapping this for a real data
// source later is a straight drop-in, not a rewrite.

export const DESIGNS = [
  {
    id: "design-one",
    type: "design",
    title: "Project Title",
    date: "2026-01-10",
    description: "A short description of the brief, your approach, and the outcome.",
    images: ["/images/placeholder-1.jpg"],
    references: [],
    collections: ["collection-one"],
    public: true,
  },
  {
    id: "design-two",
    type: "design",
    title: "Project Title",
    date: "2025-11-02",
    description: "Another short project description goes here.",
    images: ["/images/placeholder-2.jpg"],
    references: [],
    collections: ["collection-one"],
    public: true,
  },
  {
    id: "design-three",
    type: "design",
    title: "Project Title",
    date: "2025-08-18",
    description: "Another short project description goes here.",
    images: ["/images/placeholder-3.jpg"],
    references: [],
    collections: [],
    public: true,
  },
  {
    id: "design-four",
    type: "design",
    title: "Project Title",
    date: "2025-06-04",
    description: "Another short project description goes here.",
    images: ["/images/placeholder-1.jpg"],
    references: [],
    collections: [],
    public: true,
  },
];

export const COLLECTIONS = [
  {
    id: "collection-one",
    type: "collection",
    title: "Collection Title",
    date: "2026-01-10",
    description: "A short description of what ties this collection together.",
    designIds: ["design-one", "design-two"],
    public: true,
  },
];

function coverOf(work) {
  if (work.type === "collection") {
    const first = DESIGNS.find((d) => d.id === work.designIds[0]);
    return first?.images?.[0] ?? null;
  }
  return work.images?.[0] ?? null;
}

/** All public works (designs + collections), newest first, each with a resolved `cover`. */
export function getPublicWorks() {
  return [...DESIGNS, ...COLLECTIONS]
    .filter((w) => w.public)
    .map((w) => ({ ...w, cover: coverOf(w) }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** Public designs and public collections, each newest first, kept separate. */
export function getPublicWorksSplit() {
  const all = getPublicWorks();
  return {
    designs: all.filter((w) => w.type === "design"),
    collections: all.filter((w) => w.type === "collection"),
  };
}

/** A single work (design or collection) by id, or undefined. */
export function getWorkById(id) {
  return DESIGNS.find((d) => d.id === id) ?? COLLECTIONS.find((c) => c.id === id);
}

/** The resolved design records that belong to a collection. */
export function getCollectionDesigns(collection) {
  return collection.designIds
    .map((id) => DESIGNS.find((d) => d.id === id))
    .filter(Boolean);
}

/** The resolved collection records a design belongs to. */
export function getDesignCollections(design) {
  return (design.collections ?? [])
    .map((id) => COLLECTIONS.find((c) => c.id === id))
    .filter(Boolean);
}
