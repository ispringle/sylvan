const Img = ({ src, alt, ...props }) => {
  return (
    <span className="image">
      <img src={src} alt={alt} />
      <span className="overlay" />
    </span>
  );
};

export default Img;
