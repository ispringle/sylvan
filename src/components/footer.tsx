import Link from 'next/link'

import PropertiesDrawer from './PropertiesDrawer'

const Footer = ({ ...props }) => {
    return (
        <footer>
            <div id="footerLeft" className='footerSection'>
                <PropertiesDrawer {...props} />
            </div>
            <div id="footerMid" className='footerSection'>❦</div>
            <div id="footerRight" className='footerSection'>
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
