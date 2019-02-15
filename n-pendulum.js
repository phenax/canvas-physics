

import Screen from './lib/Screen';
import Pendulum from './lib/Pendulum';
import Rod from './lib/Rod';
import { drawPendulum, drawScreen, clearScreen } from './lib/draw';
import { onNextFrame, renderCanvas } from './lib/utils';

let count = 0;
const runFrameLoop = (pendulum, screen) => {
  // Draw
  screen
    |> clearScreen
    |> drawScreen
    |> drawPendulum(pendulum);

  // calculateGravity(pendulum);
  pendulum
  // calculateGravity(pendulum);

  if(++count > 180) return;
  onNextFrame(() => runFrameLoop(pendulum, screen));
};

const $root = document.getElementById('root');
const $canvas = renderCanvas($root, { width: 700, height: 600 });

const screen = Screen($canvas, { origin: [350, 300] });

const pendulum = Pendulum({
  rods: [
    Rod({ length: 100, mass: 10, angle: 0, pivot: { x: 0, y: 0 } }),
  ],
});

runFrameLoop(pendulum, screen);

