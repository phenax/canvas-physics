
const Screen = ($canvas, { width, height, origin: [ x = 0, y = height ] = [] } = {}) => {
  const screen = {
    $canvas,
    width: width || $canvas.width,
    height: height || $canvas.height,
    ctx: $canvas.getContext('2d'),
  };

  screen.fromOrigin = (posX, posY) => ({
    x: x + posX,
    y: y + posY,
  });
  screen.fromOriginPos = pos => screen.fromOrigin(pos.x, pos.y);

  return screen;
};

export default Screen;
