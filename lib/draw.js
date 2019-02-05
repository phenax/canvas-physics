
export const drawScreen = screen => {
  const { ctx, fromOrigin, width, height } = screen;

  const origin = fromOrigin(0, 0);

  ctx.beginPath();
  ctx.strokeStyle = '#888';
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(width, origin.y);
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(origin.x, 0);
  ctx.stroke();

  return screen;
};

export const drawBox = ({ position, size } = {}) => screen => {
  const { ctx, fromOrigin } = screen;
  const { x, y } = fromOrigin(position, 0);

  ctx.beginPath();
  ctx.strokeStyle = '#333';
  ctx.rect(x, y - size, size, size);
  ctx.stroke();

  return screen;
};

export const clearScreen = s => {
  s.ctx.clearRect(0, 0, s.width, s.height);
  return s;
};
