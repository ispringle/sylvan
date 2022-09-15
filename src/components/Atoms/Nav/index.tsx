import styles from "./index.module.sass";
import { Link } from "../index";

const Nav = ({ links, ...props }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        {links.map((l) => (
          <li key={l.text}>
            <Link href={l.uri}>{l.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
