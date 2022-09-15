import { useEffect } from "react";

import styles from "./404.module.sass";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Custom404({ ...props }) {
  useEffect(() => {
    let reqPath = window.location.href.split("ian.ist");
    if (reqPath.length < 2) {
      reqPath = window.location.href.split("3000");
    }
    let path = reqPath[1];
    if (path == "/") {
      path = "/index.html";
    } else {
      path = path + ".html";
    }
    Array.from(document.getElementsByClassName("path")).forEach(
      (el) => (el.innerHTML = path)
    );
  });
  return (
    <>
      <div id="primary-column">
        <Header />
        <div className={styles.e404}>
          <div className={styles.monitor}>
            <div className={styles.bezel}>
              <div className={styles.crt}>
                <div className={styles.terminal}>
                  <p>
                    user@ian.ist:/var/www/$ cat .<span className="path"></span>
                  </p>
                  <p>
                    cat: .<span className="path"></span>: no such file or
                    directory
                  </p>
                  <p>user@ian.ist:/var/www/$ </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} nodrawer />
    </>
  );
}
