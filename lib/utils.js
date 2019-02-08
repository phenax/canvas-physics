
// Debugging + hot reload issue with timers
(window.cleanup || []).forEach(fn => fn());
window.cleanup = [];

export const renderCanvas = $root => {
  while($root.firstChild) $root.removeChild($root.firstChild);

  const $canvas = document.createElement('canvas');
  $canvas.style.border = '1px solid #ccc';
  $canvas.style.backgroundColor = '#f9f9f9';
  $canvas.width = 700;
  $canvas.height = 300;

  $root.appendChild($canvas);
  return $canvas
};


export const onNextFrame = fn => {
  const t = setTimeout(fn, 50);
  window.cleanup.push(() => clearTimeout(t));
};

export const withPrivateState = fn => ctx => {
  ctx.beginPath();
  ctx.save();
  fn(ctx);
  ctx.restore();
  return ctx;
};
