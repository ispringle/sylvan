// @ts-nocheck
// TODO Fix the typing here re: uniorg-slug

import { unified } from 'unified';

import { NodeProperty } from 'uniorg';
import orgParse from 'uniorg-parse';
import org2rehype from 'uniorg-rehype';
import extractKeywords from 'uniorg-extract-keywords';
import { uniorgSlug } from 'uniorg-slug';
import { visit } from 'unist-util-visit';
import { visitIds } from 'orgast-util-visit-ids';

const processor = unified()
  .use(orgParse)
  .use(extractKeywords)
  .use(extractProperties)
  .use(uniorgSlug)
  .use(extractIds)
  .use(org2rehype)
  .use(toJson);

export default async function orgToHtml(file) {
  try {
    return await processor.process(file);
  } catch (e) {
    console.error('failed to process file', file.path, e);
    throw e;
  }
}

function extractProperties() {
  return transformer;

  function transformer(tree: any, file: any) {
    const data = file.data || (file.data = {});
    data.properties = {}

    // const props = tree.children[0]?.children?.[0];
    // console.log(tree.filter(prop => prop.type == "property-drawer"))
    // const props = tree.children.filter(child => child.type == 'property-drawer')?.[0]
    // console.log(props)
    // props?.children.forEach(node => data.properties[node.key] = node.value)
    visit(tree, 'node-property', (prop: NodeProperty) => {
      data.properties[prop.key.toLowerCase()] = prop.value;
    });
  }
}

function extractIds() {
  return transformer;

  function transformer(tree, file) {
    const data = file.data || (file.data = {});
    // ids is a map: id => #anchor
    const ids = data.ids || (data.ids = {});

    visitIds(tree, (id, node) => {
      if (node.type === 'org-data') {
        ids[id] = '';
      } else if (node.type === 'section') {
        const headline = node.children[0];
        if (!headline.data?.hProperties?.id) {
          // The headline doesn't have an html id assigned. (Did you
          // remove uniorg-slug?)
          //
          // Assign an html id property based on org id property.
          headline.data = headline.data || {};
          headline.data.hProperties = headline.data.hProperties || {};
          headline.data.hProperties.id = id;
        }

        ids[id] = '#' + headline.data.hProperties.id;
      }
    });
  }
}

/** A primitive compiler to return node as is without stringifying. */
function toJson() {
  this.Compiler = (node) => {
    return node;
  };
}
