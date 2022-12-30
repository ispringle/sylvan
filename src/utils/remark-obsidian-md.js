import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import slugify from "./slugify.js";

/**
 * This is an "embeded link" (aka wiki-style):
 * [[./path/to/foo#optional-heading|This is foo]]
 */
const BRACKET_LINK_REGEX =
  /\[\[(?<uri>[a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)#?(?<heading>[a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\|?(?<desc>[a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\]\]/g;
const isBracketLink = (str) => str.match(BRACKET_LINK_REGEX);

/**
 * This is an "embedded link" (aka wiki-style):
 * ![[./path/to/foo]]
 *
 * This doesn't currently support embedding at the heading level, I'm working on it though
 */
const EMBED_LINK_REGEX =
  /!\[\[(?<uri>[a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)#?(?<heading>[a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\|?(?<desc>[a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\]\]/g;
const isEmbedLink = (str) => str.match(EMBED_LINK_REGEX);

/**
 * This is for external links, ie:
 * https://foo.tld
 * ftp://foo.tld
 */
const EXTERNAL_LINK_REGEX = /\:\/\//g;
const isExternalLink = (str) => str.match(EXTERNAL_LINK_REGEX);

/**
 * This is a "callout":
 * [!note]
 * Note text
 */
const CALLOUT_REGEX = /\[!(?<kind>[\w]+)\]\n(?<value>.*)/g;
const isCallout = (str) => str.match(CALLOUT_REGEX);

// Selfevident
const imageExtensions = ["svg", "png", "jpg", "jpeg", "gif", "webp", "avif"];
const IMAGE_EXTENSIONS_REGEX = new RegExp(`\\.(${imageExtensions.join("|")})$`);
const isImage = (str) => str.match(IMAGE_EXTENSIONS_REGEX);

function parseEmbedLink(node, inner) {
  const { uri, heading, desc } = EMBED_LINK_REGEX.exec(inner).groups;
  let href = "";
  if (isImage(uri)) {
    return;
  } else if (isExternalLink) {
    href = uri;
  } else {
    href = uri
      ? heading
        ? slugify(uri, "#", heading)
        : slugify(uri)
      : heading
        ? slugify("#", heading)
        : "";
  }

  const html = `<a href=${href}>${desc || href}</a>`;
  node.type = "html";
  node.value = inner.replace(EMBED_LINK_REGEX, html);
  return node;
}

function parseBracketLink(node, inner) {
  const { uri, heading, desc } = BRACKET_LINK_REGEX.exec(inner).groups;
  let href = "";
  if (isImage(uri)) {
    return;
  } else if (isExternalLink) {
    href = uri;
  } else {
    href = uri
      ? heading
        ? slugify(uri, "#", heading)
        : slugify(uri)
      : heading
        ? slugify("#", heading)
        : "";
  }

  const html = `<a href=${href}>${desc || href}</a>`;
  node.type = "html";
  node.value = inner.replace(BRACKET_LINK_REGEX, html);
  return node;
}

function parseCallout(node, inner) {
  const { kind, value } = CALLOUT_REGEX.exec(inner).groups;
  const html = `
      <div class="callout">
        <div class="callout-kind ${kind}">
          ${kind}
        </div>
        <div class="callout-text">
          ${value}
        </div>
      </div>
    `;
  node.type = "html";
  node.value = html;
  return node;
}

function visitor(node) {
  let value = toString(node);
  if (isCallout(value)) {
    node = parseCallout(node, value);
    value = toString(node);
  }
  // if (isEmbedLink(value)) {
  //   node = parseEmbedLink(node, value);
  //   value = toString(node);
  // }
  // if (isBracketLink(value)) {
  //   node = parseBracketLink(node, value);
  // }
  return node;
}

function remarkObsidian(options = {}) {
  return function(tree, file) {
    visit(tree, "paragraph", visitor);
  };
}

export default remarkObsidian;
