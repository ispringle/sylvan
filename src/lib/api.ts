import * as path from "path";

import { build } from "./pipeline";
import { Page } from "./build";

export type { Page };

const postsDirectory = path.join(process.cwd(), "public");
const blacklistedDirectories = new Set([]);
const specialPages = new Set(["/"]);

const dump = build({
  root: postsDirectory,
  blacklistedDirectories,
  specialPages,
});

export async function getAllPaths(): Promise<string[]> {
  const posts = await dump;
  return Object.keys(posts);
}

export async function getPostBySlug(slug: string): Promise<Page | undefined> {
  const posts = await dump;
  return posts[slug];
}

export async function getPostsByType(type: string): Promise<Page | undefined> {
  return await getAllPosts().then((posts) =>
    posts.filter((post) => (post.pageType = type))
  );
}

export async function getAllPosts(): Promise<Record<string, Page>> {
  const posts = await dump;
  return Object.values(posts);
}
