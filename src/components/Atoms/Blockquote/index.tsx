import styles from "./index.module.sass";

const Blockquote = ({ ...props }) => {
  return (
    <blockquote className={styles.blockquote}>{props.children}</blockquote>
  );
};

export default Blockquote;
