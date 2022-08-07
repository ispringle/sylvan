import report from 'vfile-reporter';
import * as path from 'path';

import { processor } from './pipeline';

// We serve posts from "public" directory, so that we don't have to
// copy assets.
//
// If you change this directory, make sure you copy all assets
// (images, linked files) to the public directory, so that next.js
// serves them.
// const pagesDirectory = path.join(process.cwd(), 'public');
const pagesDirectory = path.join(process.cwd(), 'public');
const blackListedPaths = ["todo.org", "inbox.org",]

const loadPosts = async () => {
    const files = await new Promise((resolve, reject) =>
        processor.run(pagesDirectory, (err, files) => {
            console.error(report(err || files, { quiet: true }));
            if (err) reject(err);
            else resolve(files);
        })
    );
    const posts = Object.fromEntries(files.map((f) => [f.data.slug, f]));
    return posts;
};

const allPosts = async () => {
    const posts = await loadPosts();
    return posts;
};

export async function getAllPaths() {
    const posts = await loadPosts();
    return Object.keys(posts);
}

export async function getPostBySlug(slug) {
    const posts = await allPosts();
    const post = await posts[slug];
    return post;
}

export async function getAllPosts() {
    const posts = await allPosts();
    return await Promise.all(Object.values(posts));
}
