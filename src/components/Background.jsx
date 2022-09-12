import { useEffect } from "react";

const Background = ({ ...props }) => {
  const backgroundCanvasId = "background";
  useEffect(() => {
    const canvas = document.getElementById(backgroundCanvasId);
    var context = canvas.getContext("2d");

    var size = 800;
    var step = 20;
    var dpr = window.devicePixelRatio;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    context.scale(dpr, dpr);

    context.lineCap = "square";
    context.lineWidth = 2;

    function draw(x, y, width, height) {
      var leftToRight = Math.random() >= 0.5;

      if (leftToRight) {
        context.moveTo(x, y);
        context.lineTo(x + width, y + height);
      } else {
        context.moveTo(x + width, y);
        context.lineTo(x, y + height);
      }

      context.stroke();
    }

    for (var x = 0; x < size; x += step) {
      for (var y = 0; y < size; y += step) {
        draw(x, y, step, step);
      }
    }
  });

  return (
    <>
      <canvas id={backgroundCanvasId} />
      {props.children}
    </>
  );
};

export default Background;
