import handlers from './handlers.js';
import { smarty } from './smartypants.ts';
import { frontmatter } from './frontmatter.js';
import { saveRoamRefs } from './roam-refs.js';

export default [
    frontmatter,
    saveRoamRefs,
    [smarty, { oldschool: true }],
]

export {
    handlers,
    smarty,
    frontmatter,
    saveRoamRefs
}
