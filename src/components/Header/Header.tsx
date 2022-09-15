import { Link, Logo, Nav } from "../Atoms";

const Header = () => {
  return (
    <header>
      <Link href="/" className="centered branding nobracket">
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
