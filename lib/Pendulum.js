
import Rod from './Rod';

const { cos, sin, pow } = Math;
const GRAVITY = 0.4;

const Pendulum = ({ rods }) => ({
  rods,
});

export const getAngularAccelerations = pendulum => {
  const { rods: [rod1, rod2] } = pendulum;

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

export default Pendulum;
