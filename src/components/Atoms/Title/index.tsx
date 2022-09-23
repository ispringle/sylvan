import styles from "./index.module.sass";

const Title = ({ subtitle, ...props }) => {
  console.log(props);
  return (
    <>
      <h1 id={props?.id ? props.id : "title"} className={styles.title}>
        {props.children}
      </h1>
      {subtitle ? <p id="subtitle">{subtitle}</p> : null}
    </>
  );
};

export default Title;
