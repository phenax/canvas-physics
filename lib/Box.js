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

export const moveBox = box => ({
  ...box,
  position: box.position + box.velocity,
});

export default Box;
