import { Link, Logo } from "../Atoms";

const Header = () => {
  return (
    <header>
      <Link href="/" className="branding">
        <Logo className="centered" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/book">Books</Link>
          </li>
          <li>
            <Link href="/loci">Loci</Link>
          </li>
          <li>
            <Link href="/literate">Literate</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
