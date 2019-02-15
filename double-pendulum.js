

import Screen from './lib/Screen';
import Rod from './lib/Rod';
import Pendulum, { getAngularAccelerations } from './lib/Pendulum';
import { drawPendulum, drawScreen, clearScreen } from './lib/draw';
import { onNextFrame, renderCanvas } from './lib/utils';

const runFrameLoop = (pendulum, screen) => {
  let [ rod1, rod2 ] = pendulum.rods;

  // Apply dependent effect
  const [angAcc1, angAcc2] = getAngularAccelerations(pendulum);
  const [angVel1, angVel2] = [rod1.angularVelocity + angAcc1, rod2.angularVelocity + angAcc2];

  rod1 = Rod({
    ...rod1,
    angle: rod1.angle + angVel1,
    angularVelocity: angVel1,
  });
  rod2 = Rod({
    ...rod2,
    angle: rod2.angle + angVel2,
    angularVelocity: angVel2,
  });
  pendulum = Pendulum({
    rods: [
      rod1,
      Rod({
        ...rod2,
        pivot: rod1.tail(),
      }),
    ],
  });

  // Draw
  screen
    |> clearScreen
    |> drawScreen
    |> drawPendulum(pendulum);

  onNextFrame(() => runFrameLoop(pendulum, screen));
};

const $root = document.getElementById('root');
const $canvas = renderCanvas($root, { width: 700, height: 600 });

const screen = Screen($canvas, { origin: [350, 300] });

const pendulum = Pendulum({
  rods: [
    Rod({ length: 100, mass: 10, angle: Math.PI / 2 + .9 }),
    Rod({ length: 150, mass: 20, angle: Math.PI / 2 }),
  ],
});

runFrameLoop(pendulum, screen);

