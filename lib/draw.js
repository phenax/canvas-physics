import { compose } from 'ramda';
import { withPrivateState } from './utils';

const drawText = (text, { x, y }, styles) => withPrivateState(ctx => {
  const { color = '#333', font = 'normal 10px Arial', textAlign = 'left' } = styles;
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.fillText(text, x, y);
});

const drawLine = (p1, p2, styles) => withPrivateState(ctx => {
  const { border: { color, size } } = styles;
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
});

// drawBox :: Box -> Screen -> Screen
export const drawBox = ({ position, velocity, size, mass } = {}) => screen => {
  const { ctx, fromOrigin } = screen;
  const { x, y } = fromOrigin(position, 0);

  const textStyles = {
    color: '#333',
    font: 'normal normal 10px monospace',
    textAlign: 'left',
  };

  const block = compose(
    withPrivateState(ctx => {
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.rect(x, y - size, size, size);
      ctx.stroke();
    }),
    drawText(`m: ${mass}`, { x, y: y - size - 5 }, textStyles),
    drawText(`vel: (${velocity.toFixed(2)})`, { x: x + (size/2), y: y + 18 }, {
      ...textStyles,
      textAlign: 'center',
    })
  );

  block(ctx);
  return screen;
};

export const drawPendulum = pendulum => screen => {
  const { ctx, fromOriginPos } = screen;

  withPrivateState(ctx => {
    ctx.strokeStyle = '#333';
    ctx.lineCap = 'round';

    pendulum.rods.forEach(rod => {
      const { x, y } = fromOriginPos(rod.pivot);
      const tail = fromOriginPos(rod.tail());
      ctx.lineWidth = rod.thickness;
      ctx.moveTo(x, y);
      ctx.lineTo(tail.x, tail.y);
      ctx.stroke();
    });
  })(ctx);

  return screen;
};

// drawScreen :: Screen -> Screen
export const drawScreen = screen => {
  const { ctx, fromOrigin, width, height } = screen;

  const origin = fromOrigin(0, 0);
  const lineStyles = { border: { color: '#aaa', size: 0.4 } };

  const horizontalLine = drawLine({ ...origin, x: 0 }, { ...origin, x: width }, lineStyles);
  const verticalLine =   drawLine({ ...origin, y: height }, { ...origin, y: 0 }, lineStyles);

  compose(horizontalLine, verticalLine)(ctx);
  return screen;
};

// clearScreen :: Screen -> Screen
export const clearScreen = s => {
  s.ctx.clearRect(0, 0, s.width, s.height);
  return s;
};
