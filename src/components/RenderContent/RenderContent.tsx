import React from "react";

import { unified } from "unified";
import rehype2react from "rehype-react";

import { Blockquote, Img, Link } from "../Atoms";

const processor = unified().use(rehype2react, {
  createElement: React.createElement,
  Fragment: React.Fragment,
  components: {
    a: Link,
    blockquote: Blockquote,
    img: Img,
  },
});

const RenderContent = ({ hast }) => {
  return <>{processor.stringify(hast)}</>;
};

export default RenderContent;
