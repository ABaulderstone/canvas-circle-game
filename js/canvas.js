export function setupCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  // Set the internal canvas size to CSS size * devicePixelRatio
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr); // scale drawing so 1 unit = 1 CSS pixel

  return ctx;
}
