

import Screen from './lib/Screen';
import Pendulum from './lib/Pendulum';
import Rod from './lib/Rod';
import { drawPendulum, drawScreen, clearScreen } from './lib/draw';
import { onNextFrame, renderCanvas } from './lib/utils';

const GRAVITY = -0.005;

const angularAcceleration = rod =>
  12 * GRAVITY * Math.sin(rod.angle) / rod.length;

let count = 0;
const runFrameLoop = (pendulum, screen) => {
  // Draw
  screen
    |> clearScreen
    |> drawScreen
    |> drawPendulum(pendulum);

  pendulum = Pendulum({
    rods: pendulum.rods.map(rod => {
      const angularVelocity = rod.angularVelocity + angularAcceleration(rod);
      return Rod({
        ...rod,
        angularVelocity,
        angle: rod.angle + angularVelocity,
      });
    })
  });

  if(++count > 2000) return;
  onNextFrame(() => runFrameLoop(pendulum, screen));
};

const $root = document.getElementById('root');
const $canvas = renderCanvas($root, { width: 700, height: 600 });

const screen = Screen($canvas, { origin: [350, 300] });

const pendulum = Pendulum({
  rods: [
    Rod({ length: 100, mass: 10, angle: Math.PI / 2, pivot: { x: 0, y: 0 } }),
    // Rod({ length: 100, mass: 10, angle: Math.PI / 2, pivot: { x: 100, y: 0 } }),
  ],
});

runFrameLoop(pendulum, screen);

