import styles from "./index.module.sass";

const Title = ({ ...props }) => {
  return (
    <div id={props?.id ? props.id : "title"} className={styles.title}>
      {props.children}
    </div>
  );
};

export default Title;
