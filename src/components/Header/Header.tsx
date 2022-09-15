import { Link, Logo, Nav } from "../Atoms";
import styles from "./index.module.sass";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.branding}>
        <Logo />
      </Link>
      <Nav
        links={[
          { text: "About", uri: "/about" },
          { text: "Blog", uri: "/blog" },
          { text: "Books", uri: "/book" },
          { text: "Literate", uri: "/literate" },
          { text: "Loci", uri: "/loci" },
        ]}
      />
    </header>
  );
};

export default Header;
