import { visitParents } from 'unist-util-visit-parents';

export const saveRoamRefs = () => (tree, file) => {
    const astro = file.data.astro;
    const ids = astro.ids || (astro.ids = {});

    visitRoamRefs(tree, (/** @type string */ value, node) => {
        let anchor = '';
        if (node.type === 'org-data') {
            anchor = '';
        } else if (node.type === 'section') {
            const headline = node.children[0];
            const data = (headline.data = headline.data || {});
            if (!data?.hProperties?.id) {
                // The headline doesn't have an html id assigned.
                //
                // Assign an html id property based on org id property, so
                // the links are not broken.
                data.hProperties = data.hProperties || {};
                data.hProperties.id = id;
            }

            anchor = '#' + data?.hProperties?.id;
        }

        const refs = value.split(/\s+/).filter((x) => !!x);
        refs.forEach((ref) => {
            ids[ref] = anchor;
        });
    });
}

function visitRoamRefs(tree, f) {
    visitParents(
        tree,
        { type: 'node-property', key: 'ROAM_REFS' },
        (property, ancestors) => {
            const value = property.value;

            let parent = ancestors.pop();
            while (
                parent &&
                parent.type !== 'section' &&
                parent.type !== 'org-data'
            ) {
                parent = ancestors.pop();
            }

            if (parent) {
                f(value, parent);
            }
        }
    );
}
