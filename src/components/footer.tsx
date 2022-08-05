import Link from 'next/link'

const Footer = () => {
    return (
        <footer>
            <div className="footerLeft">
                <div id="postamble">
                    <p className="author">Author: Ian Shepard Pringle</p>
                    <p className="compiledDate">Compiled: 2022-08-03 Wed 23:08</p>
                    <p className="creator">
                        Made with: <a rel="noreferrer" target="_blank" title="Emacs 28.1" href="https://www.gnu.org/software/emacs/">Emacs</a> <a rel=" noreferrer" target="_blank" title="Orgmode 9.5.2" href="https://orgmode.org">Orgmode</a> & <a rel="noreferrer" target="_blank" title="NextJS" href="https://nextjs.org">NextJS</a>
                    </p>
                </div>
            </div>
            <div className="footerMid"></div>
            <div className="footerRight">
                <div className="license">
                    <p>Creative Commons</p>
                    <Link rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                        <a>BY-NC-SA</a>
                    </Link>
                </div>
            </div>
        </footer >
    )
}

export default Footer
