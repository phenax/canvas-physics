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

const CONTACT_DELTA = 0;

const distance = (b1, b2) => b2.position - (b1.size + b1.position);

const isInContact = (b1, b2) => distance(b1, b2) <= CONTACT_DELTA;

const collide = (b1, b2) => {
  if (b1.mass === Infinity) return b1;
  if (b2.mass === Infinity) return {
    ...b1,
    velocity: -b1.velocity,
  };

  const momentum2 = b2.mass * b2.velocity;
  const massDiff = b1.mass - b2.mass;
  const totalMass = b1.mass + b2.mass;

  return {
    ...b1,
    velocity: (2 * momentum2 + b1.velocity * massDiff) / totalMass,
  };
};

// Wall collision
const collideWithWall = box => collide(box, Box({ mass: Infinity }));

let count = 0;
const renderFrame = (b1, b2, screen) => {
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
    console.log(bx1.position, bx1.velocity, bx2.position, bx2.velocity);
    nextBox1 = bx1;
    nextBox2 = { ...bx2, position: bx2.position + 10, velocity: 0 };
  }

  if(count > 130) return;
  onNextFrame(() => renderFrame(nextBox1, nextBox2, screen));
};


const screen = Screen($canvas, { origin: [20, 200] });

const box1 = Box({ mass: 1, position: 400, velocity: 0 });
const box2 = Box({ mass: 500, position: 500, velocity: -5 });

renderFrame(box1, box2, screen);


