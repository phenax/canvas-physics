import { compose } from 'ramda';

const withPrivateState = fn => ctx => {
  ctx.beginPath();
  ctx.save();
  fn(ctx);
  ctx.restore();
  return ctx;
};

const drawText = (text, { x, y }, styles) => withPrivateState(ctx => {
  const { color = '#333', font = 'normal 10px Arial', textAlign = 'left' } = styles;
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.fillText(text, x, y);
  return ctx;
});

// drawBox :: Box -> Screen -> Screen
export const drawBox = ({ position, velocity, size, mass } = {}) => screen => {
  const { ctx, fromOrigin } = screen;
  const { x, y } = fromOrigin(position, 0);

  ctx.beginPath();
  ctx.save();
  // ctx.fillStyle = `rgba(0, 0, 0, ${size/130})`;
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.rect(x, y - size, size, size);
  ctx.stroke();
  ctx.restore();

  const textStats = compose(
    drawText(`m = ${mass}`, { x, y: y - size - 5 }, {
      color: '#333',
      font: 'normal normal 10px monospace',
      textAlign: 'left',
    }),
    drawText(`vel = ${velocity.toFixed(2)}`, { x: x + (size/2), y: y + 18 }, {
      color: '#333',
      font: 'normal normal 10px monospace',
      textAlign: 'center',
    })
  );

  textStats(ctx);

  return screen;
};

// drawScreen :: Screen -> Screen
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

// clearScreen :: Screen -> Screen
export const clearScreen = s => {
  s.ctx.clearRect(0, 0, s.width, s.height);
  return s;
};
