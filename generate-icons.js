// Generate simple PWA icons
const { createCanvas } = require('canvas') || {};
const fs = require('fs');
const path = require('path');

// Fallback: create minimal 1x1 PNG placeholder if canvas not available
function minimalPNG(size) {
  // Minimal valid PNG: 1x1 pink pixel
  // Using Buffer for a simple approach
  const { createCanvas } = require('canvas');
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#F2E9E4';
  ctx.fillRect(0, 0, size, size);

  // Circle
  const cx = size / 2, cy = size / 2, r = size * 0.35;
  ctx.fillStyle = '#C9A9A6';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Inner heart shape
  ctx.fillStyle = '#FFFFFF';
  const hs = size * 0.2;
  ctx.beginPath();
  ctx.moveTo(cx, cy + hs * 0.5);
  ctx.bezierCurveTo(cx - hs, cy - hs * 0.5, cx - hs * 1.2, cy + hs * 0.3, cx, cy + hs * 1.3);
  ctx.bezierCurveTo(cx + hs * 1.2, cy + hs * 0.3, cx + hs, cy - hs * 0.5, cx, cy + hs * 0.5);
  ctx.fill();

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, 'icons', `icon-${size}.png`), buf);
  console.log(`Created icon-${size}.png`);
}

try {
  minimalPNG(192);
  minimalPNG(512);
  console.log('Icons generated!');
} catch (e) {
  console.log('canvas not available, creating placeholder icons...');
  // Create minimal valid PNG files
  // Smallest valid PNG (1x1 transparent) as fallback
  const png1x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  fs.writeFileSync(path.join(__dirname, 'icons', 'icon-192.png'), png1x1);
  fs.writeFileSync(path.join(__dirname, 'icons', 'icon-512.png'), png1x1);
  console.log('Placeholder icons created (install canvas for proper icons: npm install canvas)');
}
