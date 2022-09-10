const Title = ({ ...props }) => {
  return <div id={props?.id ? props.id : "title"}>{props.children}</div>;
};

export default Title;
