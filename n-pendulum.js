

import Screen from './lib/Screen';
import Pendulum from './lib/Pendulum';
import Rod from './lib/Rod';
import { drawPendulum, drawScreen, clearScreen } from './lib/draw';
import { onNextFrame, renderCanvas } from './lib/utils';

const { cos, sin, pow } = Math;

const GRAVITY = 1;

const dependentAngularAcceleration = (rod1, rod2) => {
  const mratio = 1 + rod1.mass + rod2.mass;
  const angDiff = rod1.angle - rod2.angle;
  const cosDiff = cos(angDiff);
  const sinDiff = sin(angDiff);
  const divFactor = mratio - cosDiff^2;

  const [ tVel1, tVel2 ] = [rod1, rod2].map(r => r.length * pow(r.angularVelocity, 2));

  let angAcc1 = GRAVITY * (sin(rod2.angle) * cosDiff - mratio * sin(rod1.angle));
  angAcc1 -= sinDiff*(tVel2 + tVel1*cosDiff);
  angAcc1 /= rod1.length * divFactor;

  let angAcc2 = GRAVITY * mratio * (sin(rod1.angle)*cosDiff - sin(rod2.angle))
  angAcc2 += sinDiff*(mratio*tVel1 + tVel2*cosDiff)
  angAcc2 /= rod1.length * divFactor

  return [angAcc1, angAcc2];
};

let count = 0;
const runFrameLoop = (pendulum, screen) => {
  // Apply gravity
  const [ rod1, rod2 ] = pendulum.rods;

  // Apply dependent effect
  const [angAcc1, angAcc2] = dependentAngularAcceleration(rod1, rod2);
  const [angVel1, angVel2] =
    [rod1.angularVelocity + angAcc1, rod2.angularVelocity + angAcc2];
  const tail = rod1.tail();
  pendulum = Pendulum({
    rods: [
      Rod({
        ...rod1,
        angle: rod1.angle + angVel1,
        angularVelocity: angVel1,
      }),
      Rod({
        ...rod2,
        pivot: tail,
        angle: rod2.angle + angVel2,
        angularVelocity: angVel2,
      }),
    ],
  });

  // Draw
  screen
    |> clearScreen
    |> drawScreen
    |> drawPendulum(pendulum);

  if(++count > 2000) return;
  onNextFrame(() => runFrameLoop(pendulum, screen));
};

const $root = document.getElementById('root');
const $canvas = renderCanvas($root, { width: 700, height: 600 });

const screen = Screen($canvas, { origin: [350, 300] });

const pendulum = Pendulum({
  rods: [
    Rod({ length: 100, mass: 20, angle: Math.PI / 2 }),
    Rod({ length: 100, mass: 10, angle: Math.PI / 2 }),
  ],
});

runFrameLoop(pendulum, screen);

