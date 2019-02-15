
const Rod = ({ length, mass, thickness = 10, pivot = { x: 0, y: 0 }, angle = 0, angularVelocity = 0 } = {}) => {
  const rod = {
    thickness,
    length,
    mass,
    angle,
    pivot,
    angularVelocity,
  };

  rod.tail = () => ({
    x: rod.pivot.x + (rod.length * Math.cos(angle - (Math.PI / 2))),
    y: rod.pivot.y - (rod.length * Math.sin(angle - (Math.PI / 2))),
  })

  return rod;
};

export default Rod;
