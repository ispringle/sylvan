import Link from 'next/link'
import Image from 'next/image'

import PropertiesDrawer from './PropertiesDrawer'
import triquerta from '../../public/triquerta.svg'

const Footer = ({ ...props }) => {
    return (
        <footer>
            <div id="footerLeft" className='footerSection'>
                <PropertiesDrawer {...props} />
            </div>
            <div id="footerMid" className='footerSection'>
                {/* <Image className='flueron' src={triquerta} width={"50em"} height={"50em"} /> */}
                <img className='flueron' src={"fleuron.svg"} />
            </div>
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
