declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		typeof entryMap[C][keyof typeof entryMap[C]] & Render;

	type BaseCollectionConfig<S extends import('astro/zod').ZodRawShape> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<import('astro/zod').ZodObject<S>>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends import('astro/zod').ZodRawShape>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	export function getEntry<C extends keyof typeof entryMap, E extends keyof typeof entryMap[C]>(
		collection: C,
		entryKey: E
	): Promise<typeof entryMap[C][E] & Render>;
	export function getCollection<
		C extends keyof typeof entryMap,
		E extends keyof typeof entryMap[C]
	>(
		collection: C,
		filter?: (data: typeof entryMap[C][E]) => boolean
	): Promise<(typeof entryMap[C][E] & Render)[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		import('astro/zod').ZodObject<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			injectedFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"Blogging-With-Obsidian.md": {
  id: "Blogging-With-Obsidian.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"a-better-template-func.md": {
  id: "a-better-template-func.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"a-few-days-with-ox-hugo.md": {
  id: "a-few-days-with-ox-hugo.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"a-wip.md": {
  id: "a-wip.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"astro-was-a-failure-to-launch.md": {
  id: "astro-was-a-failure-to-launch.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"baby-incoming.md": {
  id: "baby-incoming.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"code-example.md": {
  id: "code-example.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"commonplacing.md": {
  id: "commonplacing.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"contentlayer-is-cool.md": {
  id: "contentlayer-is-cool.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"deployment-how-do.md": {
  id: "deployment-how-do.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"emacs-from-scratch-part-0.md": {
  id: "emacs-from-scratch-part-0.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"example-org-file.md": {
  id: "example-org-file.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"fare-thee-well-emacs.md": {
  id: "fare-thee-well-emacs.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"giving-ox-hugo-another-try.md": {
  id: "giving-ox-hugo-another-try.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"hard-at-work.md": {
  id: "hard-at-work.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"hello-world.md": {
  id: "hello-world.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"i-am-back.md": {
  id: "i-am-back.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"index.md": {
  id: "index.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"indie-web.md": {
  id: "indie-web.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"keeping-some-content-private.md": {
  id: "keeping-some-content-private.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"literate-dots-part-1.md": {
  id: "literate-dots-part-1.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"migrating-to-org-mode.md": {
  id: "migrating-to-org-mode.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"moving-the-blog.md": {
  id: "moving-the-blog.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"my-dirt-hack-to-template-files.md": {
  id: "my-dirt-hack-to-template-files.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"new-puppy.md": {
  id: "new-puppy.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"nice-new-look.md": {
  id: "nice-new-look.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"perhaps-a-new-path-for-sylvan.md": {
  id: "perhaps-a-new-path-for-sylvan.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"playing-with-hugo.md": {
  id: "playing-with-hugo.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"publishing-with-org-publish.md": {
  id: "publishing-with-org-publish.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"setting-up-a-firewall.md": {
  id: "setting-up-a-firewall.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"some-changes.md": {
  id: "some-changes.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"still-undecided.md": {
  id: "still-undecided.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"tangle-all-the-things.md": {
  id: "tangle-all-the-things.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"the-case-of-the-wrong-date.md": {
  id: "the-case-of-the-wrong-date.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"the-time-is-wrong.md": {
  id: "the-time-is-wrong.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"vercel-woes.md": {
  id: "vercel-woes.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"whats-next-for-sylvan.md": {
  id: "whats-next-for-sylvan.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"why-i-migrated-from-k8s.md": {
  id: "why-i-migrated-from-k8s.md",
  slug: string,
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},
"site": {
"about.md": {
  id: "about.md",
  slug: string,
  body: string,
  collection: "site",
  data: InferEntrySchema<"site">
},
"root.md": {
  id: "root.md",
  slug: string,
  body: string,
  collection: "site",
  data: InferEntrySchema<"site">
},
},

	};

	type ContentConfig = typeof import("./config");
}
