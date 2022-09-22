import Head from "next/head";

const setParentDimensions = (e) => {
  const parentEl = e.target.parentNode;
  const width = e.target.width;
  const height = e.target.height;
  e.target.parentNode.style.width = width + "px";
  e.target.parentNode.style.height = height + "px";
};

const Img = ({ src, alt, ...props }) => {
  const imageEl = <img src={src} alt={alt} onLoad={setParentDimensions} />;

  return (
    <span className="image">
      <picture>
        {imageEl}
        <svg className="overlay" id="filterMatrix">
          <feColorMatrix
            result="original"
            id="svgcolormatrix"
            type="matrix"
            values="-1 -1 -1 -1 -1 1 1 1 0 0 -1 -1 -1 -1 -1 2 2 2 0.8 0"
          ></feColorMatrix>
        </svg>
      </picture>
    </span>
  );
};

export default Img;
