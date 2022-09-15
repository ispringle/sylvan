import styles from "./index.module.sass";

const Logo = () => {
  return (
    <>
      {/* prettier-ignore */}
      <div className={styles.logo}>
        <pre> _               _     _</pre>
        <pre>(_)             (_)   | |</pre>
        <pre> _  __ _ _ __    _ ___| |_</pre>
        <pre>| |/ _` | '_ \  | / __| __|</pre>
        <pre>| | (_| | | | |_| \__ \ |_</pre>
        <pre>|_|\__,_|_| |_(_)_|___/\__|</pre>
      </div>
    </>
  );
};

export default Logo;
