import { OrgTime } from "../Atoms";
import styles from "./index.module.sass";

export interface OrgDrawerProps {
  properties: { [key: string]: string };
}

const OrgDrawer = ({ ...props }) => {
  const properties = props.properties;
  delete properties["author"];
  return (
    <div title="properties" className={styles.psuedoDrawer}>
      <div className={styles.drawerRow}>
        <span className="key">author</span>
        <span>Ian Shepard Pringle</span>
      </div>
      {Object.keys(properties).map((k) => {
        return (
          <div key={k} className={styles.drawerRow}>
            <span className="key">{k}</span>
            <span>{properties[k]}</span>
          </div>
        );
      })}
      <div className={styles.drawerRow}>
        <span className="key">compiled</span>
        <span>
          <OrgTime dateStr={process.env.NEXT_PUBLIC_BUILD_TIME} />
        </span>
      </div>
      <div className={styles.drawerRow}>
        <span className="key">made_with</span>
        <div className="linkList">
          <a
            rel="noreferrer"
            target="_blank"
            title="Emacs 28.1"
            href="https://www.gnu.org/software/emacs/"
          >
            Emacs
          </a>
          <a
            rel=" noreferrer"
            target="_blank"
            title="Orgmode 9.5.2"
            href="https://orgmode.org"
          >
            Orgmode
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            title={"NextJS " + process.env.NEXT_PUBLIC_NEXT_JS_VERSION}
            href="https://nextjs.org"
          >
            NextJS
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrgDrawer;
