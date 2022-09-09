import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header>
      <ThemeToggle />
      <Link href="/">
        <a className="branding">
          {/* prettier-ignore */}
          <div id="logo">
            <pre className="logo"> _               _     _</pre>
            <pre className="logo">(_)             (_)   | |</pre>
            <pre className="logo"> _  __ _ _ __    _ ___| |_</pre>
            <pre className="logo">| |/ _` | '_ \  | / __| __|</pre>
            <pre className="logo">| | (_| | | | |_| \__ \ |_</pre>
            <pre className="logo">|_|\__,_|_| |_(_)_|___/\__|</pre>
          </div>
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/book">
              <a>Books</a>
            </Link>
          </li>
          <li>
            <Link href="/loci">
              <a>Loci</a>
            </Link>
          </li>
          <li>
            <Link href="/literate">
              <a>Literate</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
