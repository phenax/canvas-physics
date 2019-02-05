
const Screen = ($canvas, { width, height, origin: [ x = 0, y = height ] = [] } = {}) => ({
  $canvas,
  width: width || $canvas.width,
  height: height || $canvas.height,
  ctx: $canvas.getContext('2d'),
  fromOrigin: (posX, posY) => ({
    x: x + posX,
    y: y + posY,
  }),
});

export default Screen;
