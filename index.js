import Screen from './lib/Screen';
import Box, { CONTACT_DELTA, moveBox, collide, isInContact } from './lib/Box';
import { drawBox, drawScreen, clearScreen } from './lib/draw';
import { onNextFrame, renderCanvas } from './lib/utils';

// Wall collision
const collideWithWall = box => collide(box, Box({ mass: Infinity }));

let count = 0;
const runFrameLoop = (b1, b2, screen) => {
  // Draw
  screen
    |> clearScreen
    |> drawScreen
    |> drawBox(b1)
    |> drawBox(b2);

  let [ nextBox1, nextBox2 ] = [ b1, b2 ].map(moveBox);

  count++;

  // Wall collisions
  if(nextBox1.position < CONTACT_DELTA && nextBox1.velocity < 0)
    nextBox1 = collideWithWall(nextBox1);
  if(nextBox2.position < CONTACT_DELTA && nextBox2.velocity < 0)
    nextBox2 = collideWithWall(nextBox2);

  // Box collision
  if (isInContact(b1, b2)) {
    const [bx1, bx2] = [collide(nextBox1, nextBox2), collide(nextBox2, nextBox1)];
    nextBox1 = bx1;
    nextBox2 = bx2;
  }

  if(count > 80) return;
  onNextFrame(() => runFrameLoop(nextBox1, nextBox2, screen));
};

const $root = document.getElementById('root');
const $canvas = renderCanvas($root);

const screen = Screen($canvas, { origin: [20, 250] });

const box1 = Box({ mass: 1, position: 400, velocity: 0 });
const box2 = Box({ mass: 500, position: 500, velocity: -5 });

runFrameLoop(box1, box2, screen);

