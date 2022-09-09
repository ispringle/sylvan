import Head from "next/head";

const setParentDimensions = (e) => {
  const parentEl = e.target.parentNode;
  const width = e.target.width;
  const height = e.target.height;
  e.target.parentNode.style.width = width + "px";
  e.target.parentNode.style.height = height + "px";
  console.log(width, height, parentEl);
};

const Img = ({ src, alt, ...props }) => {
  const imageEl = <img src={src} alt={alt} onLoad={setParentDimensions} />;

  return (
    <span className="image" onLoad={() => console.log("loaded")}>
      {imageEl}
      <svg className="overlay" id="filterMatrix">
        <feColorMatrix
          result="original"
          id="svgcolormatrix"
          type="matrix"
          values="-1 -1 -1 -1 -1 1 1 1 0 0 -1 -1 -1 -1 -1 2 2 2 0.8 0"
        ></feColorMatrix>
      </svg>
    </span>
  );
};

export default Img;
