import fs from "fs";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { unified } from "unified";
import { toMarkdown } from "mdast-util-to-markdown";
import { gfmFootnoteToMarkdown } from "mdast-util-gfm-footnote";
import { gfmStrikethroughToMarkdown } from "mdast-util-gfm-strikethrough";
import remarkGfm from "remark-gfm";
import slugify from "./slugify";
import { remark } from "remark";

const BRACKET_LINK_REGEX =
  /\[\[([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)#?([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\|?([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\]\]/g;
const EMBED_LINK_REGEX = /!\[\[([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)\]\]/g;
const CALLOUT_REGEX = /\[!(?<kind>[\w]+)\]\n(?<value>.*)\<\/p\>/g;
const EXTERNAL_LINK_REGEX = /\:\/\//g;

const imageExtensions = ["svg", "png", "jpg", "jpeg", "gif", "webp", "avif"];
const imgExtRegex = new RegExp(`\\.(${imageExtensions.join("|")})$`);
const isImage = (path) => imgExtRegex.test(path);

const defaultTitleToURL = (uri) => {
  if (uri.match(EXTERNAL_LINK_REGEX)) {
    return uri;
  }
  return `/${slugify(uri, { lower: true })}`;
};

const makeImageNode = (url, position, alt = "", title = null) => {
  return {
    type: "image",
    url,
    title,
    alt,
    position,
  };
};

const fetchEmbedContent = (fileName, options) => {
  const filePath = `${options.markdownFolder}/${fileName}.md`;
  return fs.readFileSync(filePath, "utf8");
};

export const parseBracketLink = (
  bracketLink,
  titleToUrl = defaultTitleToURL
) => {
  const [match] = bracketLink.matchAll(BRACKET_LINK_REGEX);

  if (!match) return bracketLink;

  const [, link, heading, text] = match;
  const href = titleToUrl(link);

  if (heading && text) {
    return {
      href: `${href}#${slugify(heading, { lower: true })}`,
      title: text,
    };
  }

  if (heading) {
    return {
      href: `${href}#${slugify(heading, { lower: true })}`,
      title: link,
    };
  }

  if (text) {
    return { href, title: text };
  }

  return { href, title: link };
};

const remarkObsidian =
  (options = {}) =>
  (tree) => {
    const {
      markdownFolder = `${process.cwd()}/content`,
      titleToUrl = defaultTitleToURL,
    } = options;

    visit(tree, "paragraph", (node, index, parent) => {
      const markdown = toMarkdown(node, {
        extensions: [gfmFootnoteToMarkdown(), gfmStrikethroughToMarkdown],
      });
      const paragraph = String(
        unified().use(remarkParse).use(remarkHtml).processSync(markdown)
      );
      if (paragraph.match(CALLOUT_REGEX)) {
        const [, kind, value] = CALLOUT_REGEX.exec(paragraph);
        node.type = "div";
        node.children = [
          {
            type: "text",
            attributes: {
              name: "class",
              value: kind,
            },
            value,
            position: node.children[0].position,
          },
        ];
        return node;
      }
      if (paragraph.match(EMBED_LINK_REGEX)) {
        const [, fileName] = EMBED_LINK_REGEX.exec(paragraph);

        if (node.children.some(({ type }) => type === "inlineCode")) {
          return node;
        } else if (isImage(fileName)) {
          node.children[0] = makeImageNode(
            "/" + fileName,
            node.children[0].position
          );
          return node;
        }
        const content = fetchEmbedContent(fileName, options);

        if (!content) return node;

        const embedTree = remark()
          .use(remarkFrontmatter)
          .use(remarkGfm)
          .parse(content);

        plugin(options)(embedTree);

        parent.children.splice(index, 1, embedTree);

        return node;
      }

      if (paragraph.match(BRACKET_LINK_REGEX)) {
        const [, link, , text] = BRACKET_LINK_REGEX.exec(paragraph);
        if (isImage(link)) {
          node.children[0] = makeImageNode(
            "/" + link,
            node.position,
            text,
            text
          );
          return node;
        }
        const html = paragraph.replace(
          BRACKET_LINK_REGEX,
          (bracketLink, link, heading, text) => {
            const href = titleToUrl(link, markdownFolder);
            if (
              node.children.some(
                ({ value, type }) =>
                  value === bracketLink && type === "inlineCode"
              )
            ) {
              return bracketLink;
            } else if (heading && text) {
              return `<a href="${href}#${slugify(heading, {
                lower: true,
              })}" title="${text}">${text}</a>`;
            } else if (heading) {
              return `<a href="${href}#${slugify(heading, {
                lower: true,
              })}" title="${link}">${link}</a>`;
            } else if (text) {
              return `<a href="${href}" title="${text}">${text}</a>`;
            } else {
              return `<a href="${href}" title="${link}">${link}</a>`;
            }
          }
        );

        if (html === paragraph) return node;

        delete node.children; // eslint-disable-line

        return Object.assign(node, { type: "html", value: html });
      }

      return node;
    });

    visit(tree, "paragraph", (node) => {
      const paragraph = toString(node);
      const highlightRegex = /==(.*)==/g;

      if (paragraph.match(highlightRegex)) {
        const html = paragraph.replace(highlightRegex, (markdown, text) => {
          if (
            node.children.some(
              ({ value, type }) => value === markdown && type === "inlineCode"
            )
          ) {
            return markdown;
          }

          if (
            node.children.some(
              (n) => n.type === "strong" && text === toString(n)
            )
          ) {
            return `<mark><b>${text}</b></mark>`;
          }

          return `<mark>${text}</mark>`;
        });

        if (html === paragraph) return node;

        delete node.children; // eslint-disable-line

        return Object.assign(node, { type: "html", value: `<p>${html}</p>` });
      }

      return node;
    });
  };

export default remarkObsidian;
