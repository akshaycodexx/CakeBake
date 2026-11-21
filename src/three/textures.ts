import * as THREE from 'three';

function finalizeTexture(
  canvas: HTMLCanvasElement,
  maxAnisotropy: number,
  wrapRepeat = false,
): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(maxAnisotropy || 4, 8);
  if (wrapRepeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
  } else {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
  }
  tex.needsUpdate = true;
  return tex;
}

export function createWhippedCreamTexture(
  baseHex: string,
  maxAnisotropy: number,
): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, size, size);

  // Soft artisanal palette-knife horizontal cream ribs
  for (let y = 0; y < size; y += 8) {
    const wave = Math.sin(y * 0.16) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.03 + wave * 0.04})`;
    ctx.fillRect(0, y, size, 3);
    ctx.fillStyle = `rgba(73, 37, 29, ${0.015 + (1 - wave) * 0.015})`;
    ctx.fillRect(0, y + 4, size, 2);
  }

  // Subtle vanilla-bean / airy whipped cream texture
  for (let i = 0; i < 420; i++) {
    const px = Math.abs((Math.sin(i * 19.13) * 43758.5453) % 1) * size;
    const py = Math.abs((Math.cos(i * 41.79) * 19283.123) % 1) * size;
    ctx.fillStyle = i % 5 === 0 ? 'rgba(92, 56, 40, 0.08)' : 'rgba(255, 255, 255, 0.07)';
    ctx.fillRect(px, py, 1.8, 1.8);
  }

  return finalizeTexture(canvas, maxAnisotropy, false);
}

export function createStrawberryTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, size);
  grad.addColorStop(0, '#D92B45');
  grad.addColorStop(0.55, '#E43A55');
  grad.addColorStop(1, '#F16872');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Achenes (tiny warm golden strawberry seeds arranged neatly)
  const rows = 14;
  const cols = 18;
  for (let r = 1; r < rows - 1; r++) {
    for (let c = 0; c < cols; c++) {
      const offsetX = r % 2 === 0 ? 0 : size / cols / 2;
      const sx = ((c / cols) * size + offsetX) % size;
      const sy = (r / rows) * size;
      ctx.beginPath();
      ctx.ellipse(sx, sy, 1.6, 2.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(246, 208, 134, 0.78)';
      ctx.fill();
    }
  }

  return finalizeTexture(canvas, maxAnisotropy, true);
}

export function createPorcelainTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#FFFBF7';
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 12; i++) {
    const x = (i / 12) * size;
    const grad = ctx.createRadialGradient(x, size / 2, 2, x, size / 2, 70);
    grad.addColorStop(0, 'rgba(240, 224, 212, 0.25)');
    grad.addColorStop(1, 'rgba(255, 251, 247, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  return finalizeTexture(canvas, maxAnisotropy, true);
}

export function createSoftGroundShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.06,
    size / 2,
    size / 2,
    size * 0.48,
  );
  grad.addColorStop(0, 'rgba(73, 37, 29, 0.34)');
  grad.addColorStop(0.5, 'rgba(73, 37, 29, 0.14)');
  grad.addColorStop(1, 'rgba(73, 37, 29, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}
