import uniorgPlugins, { handlers } from './uniorg/index.js';
import rehypePlugins from './rehype/index.js';

export default {
    uniorgParseOptions: {
        useSubSuperscripts: '{}',
    },
    uniorgRehypeOptions: {
        handlers,
    },
    uniorgPlugins,
    rehypePlugins
};
