// Contact links — now CMS-driven (see public/admin/config.yml,
// "Contact Links" collection). `dot` picks which accent color
// (cyan/purple/pink) marks that row. Sorted by the editable `order`
// field, lowest first.

const contactModules = import.meta.glob("/content/contacts/*.json", { eager: true });

function unwrap(mod) {
  return mod && typeof mod === "object" && "default" in mod ? mod.default : mod;
}

export const CONTACTS = Object.values(contactModules)
  .map(unwrap)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
