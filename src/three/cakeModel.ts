import * as THREE from 'three';
import type { CakeFlavorStyle } from '../types/cake';
import {
  createPorcelainTexture,
  createStrawberryTexture,
  createWhippedCreamTexture,
} from './textures';

export interface FloatingAccent {
  mesh: THREE.Object3D;
  baseY: number;
  baseX: number;
  baseZ: number;
  speed: number;
  phase: number;
  amplitude: number;
  spinSpeed: number;
}

export interface HeroCakeRig {
  root: THREE.Group;
  cakeGroup: THREE.Group;
  floatingAccents: FloatingAccent[];
  candleFlame: THREE.Mesh | null;
  candleLight: THREE.PointLight | null;
  dispose: () => void;
}

/**
 * Generates an organic pillowed buttercream cake cylinder with softly rounded shoulders.
 */
function createPillowedTierGeometry(radius: number, height: number): THREE.LatheGeometry {
  const bevel = 0.065;
  const pts: THREE.Vector2[] = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(radius - bevel * 0.85, 0),
    new THREE.Vector2(radius - bevel * 0.25, bevel * 0.22),
    new THREE.Vector2(radius, bevel * 0.72),
    new THREE.Vector2(radius + 0.008, height * 0.5),
    new THREE.Vector2(radius, height - bevel * 0.85),
    new THREE.Vector2(radius - bevel * 0.22, height - bevel * 0.25),
    new THREE.Vector2(radius - bevel * 0.8, height),
    new THREE.Vector2(0, height),
  ];
  const geo = new THREE.LatheGeometry(pts, 72);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Generates an organic multi-harmonic glaze drip skirt hugging a cake tier rim.
 */
function createGlossyDripGeometry(radius: number, tierHeight: number): THREE.BufferGeometry {
  const segR = 112;
  const segH = 14;
  const skirtH = tierHeight * 0.64;
  const geo = new THREE.CylinderGeometry(
    radius + 0.015,
    radius + 0.015,
    skirtH,
    segR,
    segH,
    true,
  );

  const pos = geo.attributes.position;
  const halfH = skirtH / 2;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const angle = Math.atan2(z, x);

    const t = (y + halfH) / (halfH * 2); // 0 bottom, 1 top
    const wave =
      0.5 +
      0.34 * Math.sin(angle * 13 + 0.35) +
      0.16 * Math.cos(angle * 22 - 0.9);
    const dripReach = tierHeight * (0.12 + 0.44 * wave);
    const newY = halfH - (1 - t) * dripReach;
    const swell = Math.sin((1 - t) * Math.PI) * 0.012;
    const scale = 1 + swell / radius;

    pos.setXYZ(i, x * scale, newY, z * scale);
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * Generates a realistic plump strawberry mesh with green leafy crown.
 */
function createStrawberryMesh(
  berryMat: THREE.Material,
  leafMat: THREE.Material,
  scale = 1,
): THREE.Group {
  const group = new THREE.Group();

  const pts: THREE.Vector2[] = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.042, 0.012),
    new THREE.Vector2(0.072, 0.045),
    new THREE.Vector2(0.078, 0.088),
    new THREE.Vector2(0.066, 0.132),
    new THREE.Vector2(0.036, 0.162),
    new THREE.Vector2(0.0, 0.172),
  ];
  const berryGeo = new THREE.LatheGeometry(pts, 28);
  berryGeo.computeVertexNormals();
  const berry = new THREE.Mesh(berryGeo, berryMat);
  berry.castShadow = true;
  group.add(berry);

  // Flip apex upwards slightly tucked into calyx
  berry.rotation.z = Math.PI;
  berry.position.y = 0.155;

  const leafGeo = new THREE.ConeGeometry(0.022, 0.075, 4);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(Math.cos(a) * 0.035, 0.155, Math.sin(a) * 0.035);
    leaf.rotation.z = -Math.PI / 2 + 0.25;
    leaf.rotation.y = -a;
    group.add(leaf);
  }

  group.scale.setScalar(scale);
  return group;
}

/**
 * Generates a piped whipped cream rosette swirl using helical TubeGeometry.
 */
function createCreamRosetteGeometry(): THREE.TubeGeometry {
  const points: THREE.Vector3[] = [];
  const turns = 2.6;
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const radius = (1 - t * 0.85) * 0.085;
    const y = t * 0.095;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, 44, 0.022, 8, false);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Delicate sculpted rose from layered curved petals for rose & classic accents.
 */
function createSculptedRose(petalMat: THREE.Material, scale = 1): THREE.Group {
  const rose = new THREE.Group();
  const petalGeo = new THREE.SphereGeometry(0.085, 14, 12, 0, Math.PI * 0.85, 0.15, Math.PI * 0.65);

  const bud = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 12), petalMat);
  bud.position.y = 0.05;
  rose.add(bud);

  const rings = [
    { count: 5, r: 0.042, tilt: 0.42, y: 0.042, s: 0.72 },
    { count: 7, r: 0.075, tilt: 0.75, y: 0.032, s: 1.0 },
  ];

  rings.forEach((ring, ri) => {
    for (let i = 0; i < ring.count; i++) {
      const a = (i / ring.count) * Math.PI * 2 + ri * 0.45;
      const p = new THREE.Mesh(petalGeo, petalMat);
      p.position.set(Math.cos(a) * ring.r, ring.y, Math.sin(a) * ring.r);
      p.rotation.y = -a + Math.PI / 2;
      p.rotation.x = ring.tilt;
      p.scale.setScalar(ring.s);
      p.castShadow = true;
      rose.add(p);
    }
  });

  rose.scale.setScalar(scale);
  return rose;
}

/**
 * Sleek scalloped porcelain & brushed gold pedestal stand.
 */
function createPorcelainStand(
  porcelainMat: THREE.Material,
  goldMat: THREE.Material,
): { group: THREE.Group; platterY: number } {
  const group = new THREE.Group();

  const pts: THREE.Vector2[] = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.58, 0),
    new THREE.Vector2(0.58, 0.03),
    new THREE.Vector2(0.42, 0.07),
    new THREE.Vector2(0.16, 0.14),
    new THREE.Vector2(0.12, 0.25),
    new THREE.Vector2(0.15, 0.34),
    new THREE.Vector2(0.24, 0.41),
    new THREE.Vector2(1.22, 0.46),
    new THREE.Vector2(1.28, 0.51),
    new THREE.Vector2(1.23, 0.54),
    new THREE.Vector2(0, 0.54),
  ];

  const standGeo = new THREE.LatheGeometry(pts, 72);
  standGeo.computeVertexNormals();
  const stand = new THREE.Mesh(standGeo, porcelainMat);
  stand.castShadow = true;
  stand.receiveShadow = true;
  group.add(stand);

  const rimBand = new THREE.Mesh(new THREE.TorusGeometry(1.26, 0.012, 12, 72), goldMat);
  rimBand.rotation.x = Math.PI / 2;
  rimBand.position.y = 0.515;
  group.add(rimBand);

  return { group, platterY: 0.54 };
}

export function buildHeroCakeSceneModel(
  style: CakeFlavorStyle,
  isSimplifiedMobile: boolean,
  maxAnisotropy: number,
): HeroCakeRig {
  const root = new THREE.Group();
  const cakeGroup = new THREE.Group();
  root.add(cakeGroup);

  const floatingAccents: FloatingAccent[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];

  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    geometries.push(g);
    return g;
  };
  const trackMat = <T extends THREE.Material>(m: T): T => {
    materials.push(m);
    return m;
  };

  // Procedural textures
  const creamTex = createWhippedCreamTexture(style.creamHex, maxAnisotropy);
  const berryTex = createStrawberryTexture(maxAnisotropy);
  const porcelainTex = createPorcelainTexture(maxAnisotropy);
  textures.push(creamTex, berryTex, porcelainTex);

  // Calibrated PBR Material Palette
  const porcelainMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      map: porcelainTex,
      roughness: 0.22,
      metalness: 0.02,
      clearcoat: 0.72,
      clearcoatRoughness: 0.14,
    }),
  );

  const goldMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xd9a85c,
      metalness: 0.9,
      roughness: 0.22,
      anisotropy: 0.7,
    }),
  );

  const buttercreamMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      map: creamTex,
      roughness: 0.52,
      metalness: 0.0,
      sheen: 0.35,
      sheenRoughness: 0.6,
      sheenColor: new THREE.Color('#FFFFFF'),
    }),
  );

  const rosetteMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: style.rosetteHex,
      roughness: 0.48,
      metalness: 0.0,
    }),
  );

  const dripMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: style.dripHex,
      roughness: 0.14,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    }),
  );

  const strawberryMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      map: berryTex,
      roughness: 0.26,
      metalness: 0.0,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
    }),
  );

  const blueberryMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: 0x2c2b4f,
      roughness: 0.34,
      metalness: 0.05,
      clearcoat: 0.4,
    }),
  );

  const leafMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x4e7c3e,
      roughness: 0.55,
      metalness: 0.0,
    }),
  );

  const chocolateMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: 0x3b1f17,
      roughness: 0.28,
      metalness: 0.04,
      clearcoat: 0.45,
    }),
  );

  const roseMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xd9415e,
      roughness: 0.56,
      metalness: 0.0,
    }),
  );

  const pistaMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x739c44,
      roughness: 0.55,
    }),
  );

  // 1. Sleek Porcelain Stand
  const stand = createPorcelainStand(porcelainMat, goldMat);
  stand.group.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) geometries.push((obj as THREE.Mesh).geometry);
  });
  cakeGroup.add(stand.group);

  // 2. Two Sculptural Tiers
  const tiers = [
    { radius: 0.98, height: 0.58 },
    { radius: 0.68, height: 0.52 },
  ];

  const beadGeo = trackGeo(new THREE.SphereGeometry(0.025, 10, 8));
  const rosetteGeo = trackGeo(createCreamRosetteGeometry());
  const berryCountPerTier = isSimplifiedMobile ? 6 : 8;

  let currentY = stand.platterY;

  tiers.forEach((tier, idx) => {
    const tierGeo = trackGeo(createPillowedTierGeometry(tier.radius, tier.height));
    const tierMesh = new THREE.Mesh(tierGeo, buttercreamMat);
    tierMesh.position.y = currentY;
    tierMesh.castShadow = true;
    tierMesh.receiveShadow = true;
    cakeGroup.add(tierMesh);

    // Delicate piped bead trim around tier foot
    const beadCount = isSimplifiedMobile ? 26 : 36;
    const beadInst = new THREE.InstancedMesh(beadGeo, rosetteMat, beadCount);
    const dummy = new THREE.Object3D();
    for (let b = 0; b < beadCount; b++) {
      const a = (b / beadCount) * Math.PI * 2;
      dummy.position.set(
        Math.cos(a) * (tier.radius + 0.012),
        currentY + 0.025,
        Math.sin(a) * (tier.radius + 0.012),
      );
      dummy.scale.setScalar(idx === 0 ? 1.05 : 0.92);
      dummy.updateMatrix();
      beadInst.setMatrixAt(b, dummy.matrix);
    }
    beadInst.instanceMatrix.needsUpdate = true;
    beadInst.computeBoundingSphere();
    cakeGroup.add(beadInst);

    // Glossy glaze drip on top tier & subtle ledge glaze on bottom tier
    if (idx === 1 || style.id === 'dark-truffle' || style.id === 'strawberry-cream') {
      const dripGeo = trackGeo(createGlossyDripGeometry(tier.radius, tier.height));
      const dripMesh = new THREE.Mesh(dripGeo, dripMat);
      dripMesh.position.y = currentY + tier.height - (tier.height * 0.64) / 2 + 0.005;
      dripMesh.castShadow = !isSimplifiedMobile;
      cakeGroup.add(dripMesh);

      const topGlazeGeo = trackGeo(
        new THREE.CylinderGeometry(tier.radius - 0.04, tier.radius - 0.04, 0.016, 64),
      );
      const topGlaze = new THREE.Mesh(topGlazeGeo, dripMat);
      topGlaze.position.y = currentY + tier.height + 0.004;
      topGlaze.receiveShadow = true;
      cakeGroup.add(topGlaze);
    }

    // Piped Cream Rosettes along tier rim / shoulder
    const ringRadius = idx === 0 ? tier.radius - 0.14 : tier.radius - 0.12;
    for (let r = 0; r < berryCountPerTier; r++) {
      const angle = (r / berryCountPerTier) * Math.PI * 2 + idx * 0.35;
      const swirl = new THREE.Mesh(rosetteGeo, rosetteMat);
      swirl.position.set(
        Math.cos(angle) * ringRadius,
        currentY + tier.height + 0.008,
        Math.sin(angle) * ringRadius,
      );
      swirl.scale.setScalar(idx === 0 ? 0.95 : 0.9);
      swirl.castShadow = !isSimplifiedMobile;
      cakeGroup.add(swirl);
    }

    // Bottom tier shoulder strawberries tucked next to every other cream swirl
    if (idx === 0) {
      const shoulderCount = isSimplifiedMobile ? 4 : 6;
      for (let s = 0; s < shoulderCount; s++) {
        const a = (s / shoulderCount) * Math.PI * 2 + 0.25;
        const berry = createStrawberryMesh(strawberryMat, leafMat, 0.72);
        berry.position.set(
          Math.cos(a) * (tier.radius - 0.14),
          currentY + tier.height + 0.01,
          Math.sin(a) * (tier.radius - 0.14),
        );
        berry.rotation.z = 0.22;
        berry.rotation.y = -a;
        cakeGroup.add(berry);
      }
    }

    currentY += tier.height;
  });

  // 3. Signature Top Crown Cluster (Strawberries + Blueberries + Chocolate Shards or Roses)
  const crownY = currentY + 0.012;
  const crownRadius = 0.44;
  const topBerries = isSimplifiedMobile ? 5 : 6;

  for (let i = 0; i < topBerries; i++) {
    const a = (i / topBerries) * Math.PI * 2;
    if (style.accentBerry === 'rose' && i % 2 === 0) {
      const rose = createSculptedRose(roseMat, 1.05);
      rose.position.set(Math.cos(a) * 0.24, crownY, Math.sin(a) * 0.24);
      cakeGroup.add(rose);
    } else {
      const strawberry = createStrawberryMesh(strawberryMat, leafMat, 0.96);
      strawberry.position.set(
        Math.cos(a) * crownRadius * 0.68,
        crownY,
        Math.sin(a) * crownRadius * 0.68,
      );
      strawberry.rotation.set(0.18, -a, 0.25);
      cakeGroup.add(strawberry);
    }
  }

  // Plump Blueberries nestled between strawberries
  const blueberryGeo = trackGeo(new THREE.SphereGeometry(0.042, 16, 14));
  const blueberryCount = isSimplifiedMobile ? 5 : 9;
  for (let b = 0; b < blueberryCount; b++) {
    const a = (b / blueberryCount) * Math.PI * 2 + 0.4;
    const r = 0.18 + (b % 2) * 0.16;
    const bb = new THREE.Mesh(blueberryGeo, blueberryMat);
    bb.position.set(Math.cos(a) * r, crownY + 0.036, Math.sin(a) * r);
    bb.scale.set(1, 0.88, 1);
    cakeGroup.add(bb);
  }

  // Sculpted Chocolate Shards / Gold Leaf / Pistachio Slivers on Crown
  if (style.accentBerry === 'pistachio') {
    const pistaGeo = trackGeo(new THREE.BoxGeometry(0.042, 0.014, 0.022));
    const pistaInst = new THREE.InstancedMesh(pistaGeo, pistaMat, 18);
    const dummy = new THREE.Object3D();
    for (let p = 0; p < 18; p++) {
      const a = p * 2.39996;
      const r = 0.08 + (p / 18) * 0.34;
      dummy.position.set(Math.cos(a) * r, crownY + 0.016, Math.sin(a) * r);
      dummy.rotation.set(0.1, a, 0.2);
      dummy.updateMatrix();
      pistaInst.setMatrixAt(p, dummy.matrix);
    }
    pistaInst.instanceMatrix.needsUpdate = true;
    pistaInst.computeBoundingSphere();
    cakeGroup.add(pistaInst);
  } else {
    const curlGeo = trackGeo(new THREE.TorusGeometry(0.075, 0.015, 8, 22, Math.PI * 1.15));
    const curlCount = style.accentBerry === 'chocolate' ? 6 : 3;
    for (let c = 0; c < curlCount; c++) {
      const a = (c / curlCount) * Math.PI * 2 + 0.2;
      const curl = new THREE.Mesh(curlGeo, chocolateMat);
      curl.position.set(Math.cos(a) * 0.16, crownY + 0.06, Math.sin(a) * 0.16);
      curl.rotation.set(0.65, a, 0.35);
      cakeGroup.add(curl);
    }
  }

  // Slender Artisan Gold-Dipped Birthday Candle at Crown Center
  const waxMat = trackMat(new THREE.MeshStandardMaterial({ color: 0xfff7ec, roughness: 0.38 }));
  const candle = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.02, 0.022, 0.24, 18)),
    waxMat,
  );
  candle.position.set(0, crownY + 0.12, 0);
  candle.castShadow = !isSimplifiedMobile;
  cakeGroup.add(candle);

  const collar = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.025, 0.025, 0.022, 18)),
    goldMat,
  );
  collar.position.set(0, crownY + 0.012, 0);
  cakeGroup.add(collar);

  const flameMat = trackMat(
    new THREE.MeshBasicMaterial({
      color: 0xffd166,
    }),
  );
  const candleFlame = new THREE.Mesh(
    trackGeo(new THREE.ConeGeometry(0.019, 0.065, 12)),
    flameMat,
  );
  candleFlame.position.set(0, crownY + 0.28, 0);
  cakeGroup.add(candleFlame);

  const candleLight = isSimplifiedMobile
    ? null
    : new THREE.PointLight(0xffb554, 1.1, 2.2, 2);
  if (candleLight) {
    candleLight.position.set(0, crownY + 0.32, 0);
    cakeGroup.add(candleLight);
  }

  // 4. Gently Floating Peripheral Strawberries & Petals (Desktop only)
  if (!isSimplifiedMobile) {
    const floatSpecs = [
      { angle: 0.45, r: 1.38, y: 1.72, s: 0.65, speed: 1.15, phase: 0.0 },
      { angle: 2.35, r: 1.44, y: 1.25, s: 0.58, speed: 0.95, phase: 1.8 },
      { angle: 4.15, r: 1.35, y: 1.56, s: 0.62, speed: 1.05, phase: 3.1 },
      { angle: 5.5, r: 1.48, y: 0.98, s: 0.52, speed: 1.25, phase: 4.5 },
    ];
    floatSpecs.forEach((f) => {
      const miniBerry = createStrawberryMesh(strawberryMat, leafMat, f.s);
      const bx = Math.cos(f.angle) * f.r;
      const bz = Math.sin(f.angle) * f.r;
      miniBerry.position.set(bx, f.y, bz);
      miniBerry.rotation.set(0.25, f.angle, 0.2);
      root.add(miniBerry);

      floatingAccents.push({
        mesh: miniBerry,
        baseX: bx,
        baseY: f.y,
        baseZ: bz,
        speed: f.speed,
        phase: f.phase,
        amplitude: 0.065,
        spinSpeed: 0.35,
      });
    });
  }

  // Track helper mesh geometries for full disposal
  cakeGroup.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const g = (obj as THREE.Mesh).geometry;
      if (g && !geometries.includes(g)) {
        geometries.push(g);
      }
    }
  });
  root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const g = (obj as THREE.Mesh).geometry;
      if (g && !geometries.includes(g)) {
        geometries.push(g);
      }
    }
  });

  // Center cake slightly downward so full stand + flame sit comfortably in hero frame
  root.position.y = -0.82;

  const dispose = () => {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
  };

  return {
    root,
    cakeGroup,
    floatingAccents,
    candleFlame,
    candleLight,
    dispose,
  };
}
