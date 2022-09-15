import React from "react";
import NextLink from "next/link";

import styles from "./index.module.sass";

const Link = ({ href, ...props }) => {
  return (
    <NextLink href={href} passHref={true}>
      <a href={href} className={styles.link} {...props} />
    </NextLink>
  );
};

export default Link;
