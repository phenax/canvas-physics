import Screen from './lib/Screen';
import Box, { moveBox } from './lib/Box';
import { drawBox, drawScreen, clearScreen } from './lib/draw';

(window.cleanup || []).forEach(fn => fn());
window.cleanup = [];

const $root = document.getElementById('root');
while($root.firstChild) $root.removeChild($root.firstChild);

const $canvas = document.createElement('canvas');
$canvas.style.border = '1px solid #ccc';
$canvas.style.backgroundColor = '#f9f9f9';
$canvas.width = 700;
$canvas.height = 300;

$root.appendChild($canvas);


const onNextFrame = fn => {
  const t = setTimeout(fn, 50);
  window.cleanup.push(() => clearTimeout(t));
};

const CONTACT_DELTA = 1;

const isInContact = (box1, box2) => {
  const check = (b1, b2) => {
    const gap = b2.position - (b1.size + b1.position);
    return gap < CONTACT_DELTA;
  }

  return box1.position < box2.position
    ? check(box1, box2)
    : check(box2, box1);
};

const collide = (b1, b2) => {
  const momentum2 = b2.mass * b2.velocity;
  const massDiff = b1.mass - b2.mass;
  const totalMass = b1.mass + b2.mass;

  // Shift to prevent the sticky block bug.
  const shift =
    b1.position < b2.position &&
    b2.position - (b1.position + b1.size) < CONTACT_DELTA
      ? CONTACT_DELTA : 0;

  return {
    ...b1,
    position: b1.position - shift,
    velocity: (2 * momentum2 - b1.velocity * massDiff) / totalMass,
  };
};

// Wall collision
const collideWithWall = box => ({
  ...box,
  velocity: -box.velocity,
});

let count = 0;
const renderFrame = (b1, b2, screen) => {
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
    console.log(bx1.position, bx1.velocity, bx2.position, bx2.velocity);
    nextBox1 = bx1;
    nextBox2 = bx2;
    // console.log('COLLISON ALERT');
  }

  if(count > 100) return;
  onNextFrame(() => renderFrame(nextBox1, nextBox2, screen));
};


const screen = Screen($canvas, { origin: [10, 200] });

const box1 = Box({ mass: 1, position: 400, velocity: 0 });
const box2 = Box({ mass: 100, position: 500, velocity: -5 });

renderFrame(box1, box2, screen);


