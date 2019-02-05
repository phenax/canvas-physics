const MAX_SIZE = 100;

const boxUnits = {
  size: 30,
  position: 0.5,
  velocity: 0.5,
};

const Box = ({ mass, position = 0, velocity = 0 }) => ({
  mass,
  size: (mass * boxUnits.size) > MAX_SIZE ? MAX_SIZE : (mass *  boxUnits.size),
  position: position * boxUnits.position,
  velocity: velocity * boxUnits.velocity,
});

export const moveBox = box => ({
  ...box,
  position: box.position + box.velocity,
});

export default Box;
