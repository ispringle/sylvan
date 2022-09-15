import { Link } from "../Atoms";
import OrgDrawer from "../OrgDrawer";

const Footer = ({ ...props }) => {
  return (
    <footer>
      <div id="footerLeft" className="footerSection">
        {props.nodrawer ? "" : <OrgDrawer {...props} />}
      </div>
      <div id="footerMid" className="footerSection"></div>
      <div id="footerRight" className="footerSection">
        <div className="license">
          <p>Creative Commons</p>
          <Link
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >
            BY-NC-SA
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
