const MAX_SIZE = 100;

const boxUnits = {
  size: 20,
  position: 0.5,
  velocity: 0.7,
};

const Box = ({ mass, position = 0, velocity = 0 }) => ({
  mass,
  size: Math.min(mass * boxUnits.size, MAX_SIZE),
  position: position * boxUnits.position,
  velocity: velocity * boxUnits.velocity,
});

// moveBox :: Box -> Box
export const moveBox = box => ({
  ...box,
  position: box.position + box.velocity,
});

// distance :: (Box, Box) -> Number
export const distance = (b1, b2) => b2.position - (b1.size + b1.position);

const isDiverging = (b1, b2) => Math.abs(b1.velocity) > Math.abs(b2.velocity) && b1.velocity * b2.velocity > 0;

// isInContact :: (Box, Box) -> Boolean
export const isInContact = (b1, b2) =>
  distance(b1, b2) <= 0 && !isDiverging(b1, b2);

const adjustOverlap = (b1, b2) => {
  if(b1.mass < b2.mass)
    return b1.position > b2.position - b1.size ? b2.position - b1.size : b1.position;
  return b1.position;
};

// collide :: (Box, Box) -> Box
export const collide = (b1, b2) => {
  if (b1.mass === Infinity) return b1;
  if (b2.mass === Infinity) return {
    ...b1,
    velocity: -b1.velocity,
  };

  if(b1.mass > b2.mass) {
    if(b1.position === b2.size) return {
      ...b1,
      velocity: 0,
    };
  }

  const momentumB2 = b2.mass * b2.velocity;
  const massDiff = b1.mass - b2.mass;
  const totalMass = b1.mass + b2.mass;

  return {
    ...b1,
    position: adjustOverlap(b1, b2),
    velocity: (2 * momentumB2 + b1.velocity * massDiff) / totalMass,
  };
};

export default Box;
