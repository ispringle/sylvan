import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <Link href="/"><a className="branding"><span className="title">Ian S. Pringle</span></a></Link>
      <nav>
        <ul>
          <li>
            <Link href="/about"><a>About</a></Link>
          </li>
          <li>
            <Link href="/blog"><a>Blog</a></Link>
          </li>
          <li>
            <Link href="/book"><a>Books</a></Link>
          </li>
          <li>
            <Link href="/grok"><a>Grok</a></Link>
          </li>
          <li>
            <Link href="/projects"><a>Projects</a></Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
