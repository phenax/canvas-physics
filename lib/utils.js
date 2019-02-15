
// Debugging + hot reload issue with timers
(window.cleanup || []).forEach(fn => fn());
window.cleanup = [];

export const renderCanvas = ($root, { width = 700, height = 300 } = {}) => {
  while($root.firstChild) $root.removeChild($root.firstChild);

  const $canvas = document.createElement('canvas');
  $canvas.style.border = '1px solid #ccc';
  $canvas.style.backgroundColor = '#f9f9f9';
  $canvas.width = width;
  $canvas.height = height;

  $root.appendChild($canvas);
  return $canvas
};


export const onNextFrame = (fn, fps) => {
  const frameId = requestAnimationFrame(fn);
  window.cleanup.push(() => cancelAnimationFrame(frameId));
};

export const withPrivateState = fn => ctx => {
  ctx.beginPath();
  ctx.save();
  fn(ctx);
  ctx.restore();
  return ctx;
};
