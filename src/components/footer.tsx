import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <div className="footerLeft"></div>
      <div className="footerMid"></div>
      <div className="footerRight">
        <div className="license">
          <p>Creative Commons</p>
          <Link rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            <a>BY-NC-SA</a>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
