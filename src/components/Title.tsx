const Title = ({ ...props }) => {
  return <div id={props?.title ? props.title : "title"}>{props.children}</div>;
};

export default Title;
