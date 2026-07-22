// Data model for the works system — now CMS-driven.
//
// Content is authored through the admin panel (Sveltia CMS, see
// public/admin/config.yml) and committed to the repo as JSON files
// under content/designs/ and content/collections/. This file just
// loads those files at build time and reshapes them into the same
// DESIGNS/COLLECTIONS arrays (and the same helper functions) that
// the rest of the app already depends on — nothing downstream needed
// to change for this migration.
//
// Two content types:
//   - "design": a single piece of work — title, image(s), optional
//     reference images, description, date. This is the atomic unit.
//   - "collection": a themed grouping of designs — title, description,
//     date, and a list of member design ids. A design can belong to
//     zero, one, or several collections.
//
// The CMS only exposes ONE direction of that relationship (a
// collection picks its member designs, via `designIds`) to avoid
// asking editors to keep two lists in sync by hand — each design's
// `collections` list is derived here automatically from that.
//
// `public` controls whether a work shows up on the public Works page
// and landing preview at all — turn it off in the CMS to keep
// something authored but hidden from visitors, without deleting it.

const designModules = import.meta.glob("/content/designs/*.json", { eager: true });
const collectionModules = import.meta.glob("/content/collections/*.json", { eager: true });

function unwrap(mod) {
  return mod && typeof mod === "object" && "default" in mod ? mod.default : mod;
}

const rawDesigns = Object.values(designModules).map(unwrap);
const rawCollections = Object.values(collectionModules).map(unwrap);

export const COLLECTIONS = rawCollections.map((c) => ({
  id: c.id,
  type: "collection",
  title: c.title,
  date: c.date,
  description: c.description,
  designIds: c.designIds ?? [],
  public: c.public ?? true,
}));

export const DESIGNS = rawDesigns.map((d) => ({
  id: d.id,
  type: "design",
  title: d.title,
  date: d.date,
  description: d.description,
  images: d.images ?? [],
  references: d.references ?? [],
  collections: COLLECTIONS.filter((c) => (c.designIds || []).includes(d.id)).map((c) => c.id),
  featured: d.featured ?? false,
  public: d.public ?? true,
}));

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

/**
 * The designs to show in the homepage preview — whatever's marked
 * "Featured on homepage" in the CMS, newest first. If fewer than
 * `limit` are marked featured, the newest non-featured public
 * designs fill the remaining slots so the preview is never sparse
 * just because nothing's been flagged yet.
 */
export function getFeaturedWorks(limit = 4) {
  const publicDesigns = getPublicWorks().filter((w) => w.type === "design");
  const featured = publicDesigns.filter((w) => w.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  const rest = publicDesigns.filter((w) => !w.featured);
  return [...featured, ...rest].slice(0, limit);
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
