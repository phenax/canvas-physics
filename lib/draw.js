
export const drawScreen = screen => {
  const { ctx, fromOrigin, width, height } = screen;

  const origin = fromOrigin(0, 0);

  ctx.beginPath();
  ctx.strokeStyle = '#aaa';
  ctx.lineWidth = 0.4;
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(width, origin.y);

  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(origin.x, 0);
  ctx.stroke();

  return screen;
};

export const drawBox = ({ position, velocity, size, mass } = {}) => screen => {
  const { ctx, fromOrigin } = screen;
  const { x, y } = fromOrigin(position, 0);

  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.rect(x, y - size, size, size);
  ctx.stroke();
  ctx.restore();
  ctx.closePath();

  ctx.beginPath();
  ctx.save();
  ctx.fillStyle = '#555';
  ctx.lineWidth = 0.3;
  ctx.font = 'normal normal 10px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`m = ${mass}`, x, y - size - 5, size);
  ctx.textAlign = 'center';
  ctx.fillText(`vel = ${velocity.toFixed(2)}`, x + (size/2), y + 18);
  ctx.restore();
  ctx.closePath();

  return screen;
};

export const clearScreen = s => {
  s.ctx.clearRect(0, 0, s.width, s.height);
  return s;
};
