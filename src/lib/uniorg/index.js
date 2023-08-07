import handlers from './handlers.js';
import { smarty } from './smartypants.ts';
import { frontmatter } from './frontmatter.js';
import { linkAttachments } from './link-attachments.js';
import { saveRoamRefs } from './roam-refs.js';
import { uniorgSlug } from 'uniorg-slug';

export default [
    frontmatter,
    uniorgSlug,
    linkAttachments,
    saveRoamRefs,
    [smarty, { oldschool: true }],
]

export {
    handlers,
    smarty,
    frontmatter,
    saveRoamRefs
}
