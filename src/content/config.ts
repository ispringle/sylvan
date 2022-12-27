import { z, defineCollection } from "astro:content";
// import { slugify } from "@utils";

// idk why this doesn't work but maybe someday it will
// const slug = ({defaultSlug}) => slugify(defaultSlug);
//when ^ starts working, delete this down here
const slug = ({ defaultSlug }) =>
  defaultSlug
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^\w\-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-/, "")
    .replace(/-+$/, "");

const blog = defineCollection({
  slug,
  schema: {
    title: z.string(),
    public: z.boolean(),
    draft: z.boolean(),
    created: z.date(),
    updated: z.date(),
    tags: z.array(z.string()).optional().default(["uncategorized"]),
  },
});

const site = defineCollection({
  slug,
  schema: {
    title: z.string(),
    public: z.boolean(),
    draft: z.boolean(),
    created: z.date(),
    updated: z.date(),
  },
});

export const collections = {
  blog,
  site,
};
