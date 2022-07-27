import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/"><a>Home</a></Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
