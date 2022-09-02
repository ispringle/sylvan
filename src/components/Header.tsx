import Link from 'next/link'

const Header = () => {
    return (
        <header>
            <Link href="/"><a className="branding">
                <pre id="logo"> _               _     _</pre>
                <pre id="logo">(_)             (_)   | |</pre>
                <pre id="logo"> _  __ _ _ __    _ ___| |_</pre>
                <pre id="logo">| |/ _` | '_ \  | / __| __|</pre>
                <pre id="logo">| | (_| | | | |_| \__ \ |_</pre>
                <pre id="logo">|_|\__,_|_| |_(_)_|___/\__|</pre>
            </a></Link>
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
                        <Link href="/loci"><a>Loci</a></Link>
                    </li>
                    <li>
                        <Link href="/literate"><a>Literate</a></Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
