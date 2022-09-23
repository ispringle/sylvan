import styles from "./index.module.sass";

const Title = ({ ...props }) => {
  const subtitle = props.subtitle || "";
  return (
    <>
      <h1 id={props?.id ? props.id : "title"} className={styles.title}>
        {props.children}
      </h1>
      <p id="subtitle">{subtitle}</p>
    </>
  );
};

export default Title;
