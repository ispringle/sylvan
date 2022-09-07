const Title = ({ ...props }) => {
  console.log(props);
  return <div id="title">{props.children}</div>;
};

export default Title;
