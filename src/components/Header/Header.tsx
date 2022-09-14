import { Link } from "../Atoms";

const Header = () => {
  return (
    <header>
      <Link href="/" className="branding">
        {/* prettier-ignore */}
        <div id="logo">
            <pre className="logo"> _               _     _</pre>
            <pre className="logo">(_)             (_)   | |</pre>
            <pre className="logo"> _  __ _ _ __    _ ___| |_</pre>
            <pre className="logo">| |/ _` | '_ \  | / __| __|</pre>
            <pre className="logo">| | (_| | | | |_| \__ \ |_</pre>
            <pre className="logo">|_|\__,_|_| |_(_)_|___/\__|</pre>
          </div>
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
