import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CAKE_FLAVOR_STYLES } from '../data/cakes';
import type { CakeFlavorStyleId } from '../types/cake';
import { buildHeroCakeSceneModel, type HeroCakeRig } from './cakeModel';
import { createSoftGroundShadowTexture } from './textures';

interface CakeScene3DProps {
  flavorStyleId: CakeFlavorStyleId;
}

const _pointerTarget = { x: 0, y: 0 };

export function CakeScene3D({ flavorStyleId }: CakeScene3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const styleIdRef = useRef<CakeFlavorStyleId>(flavorStyleId);
  const rebuildRef = useRef<(() => void) | null>(null);

  const [webglUnavailable, setWebglUnavailable] = useState(false);

  styleIdRef.current = flavorStyleId;

  useEffect(() => {
    rebuildRef.current?.();
  }, [flavorStyleId]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isMobileViewport = window.innerWidth < 768 || isCoarsePointer;

    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas').getContext('webgl2');
        if (!probe) return true;
        const ext = probe.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
        const gpu = String(probe.getParameter(param));
        probe.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 520;

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : isMobileViewport ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = !isSoftwareGl && !isMobileViewport;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglUnavailable(true);
    };
    const onContextRestored = () => {
      setWebglUnavailable(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    const scene = new THREE.Scene();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 40);
    camera.position.set(2.35, 1.48, 3.65);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.12, 0);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false; // Never trap hero page scroll!
    controls.enablePan = false;
    controls.minPolarAngle = 0.45;
    controls.maxPolarAngle = Math.PI * 0.48;

    // Warm Daylight Patisserie Studio Lighting
    const hemiLight = new THREE.HemisphereLight('#FFFDF9', '#F0DFD3', 1.25);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight('#FFF7EC', 2.15);
    keyLight.position.set(3.8, 5.5, 4.2);
    if (!isSoftwareGl && !isMobileViewport) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 14;
      keyLight.shadow.camera.left = -2.2;
      keyLight.shadow.camera.right = 2.2;
      keyLight.shadow.camera.top = 2.6;
      keyLight.shadow.camera.bottom = -1.8;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#FFD9E0', 1.05);
    rimLight.position.set(-3.6, 3.2, -3.4);
    scene.add(rimLight);

    // Subtle moving spotlight glaze accent (desktop)
    const glazeSpot = new THREE.SpotLight('#FFF4E6', 1.4, 9, Math.PI * 0.24, 0.75, 1.5);
    glazeSpot.position.set(1.6, 3.4, 2.5);
    glazeSpot.target.position.set(0, 0.3, 0);
    scene.add(glazeSpot);
    scene.add(glazeSpot.target);

    // Soft blurred shadow resting transparently beneath cake stand (zero circle borders!)
    const shadowTex = createSoftGroundShadowTexture();
    const shadowPlaneGeo = new THREE.PlaneGeometry(2.65, 2.65);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.825;
    scene.add(shadowPlane);

    const showcasePivot = new THREE.Group();
    scene.add(showcasePivot);

    let currentRig: HeroCakeRig | null = null;
    let entranceScale = prefersReducedMotion ? 1.0 : 0.84;
    let entranceLift = prefersReducedMotion ? 0 : -0.18;
    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    const mountCake = () => {
      if (currentRig) {
        showcasePivot.remove(currentRig.root);
        currentRig.dispose();
      }
      const style =
        CAKE_FLAVOR_STYLES.find((s) => s.id === styleIdRef.current) ?? CAKE_FLAVOR_STYLES[0];
      const next = buildHeroCakeSceneModel(style, isMobileViewport, maxAniso);
      showcasePivot.add(next.root);
      currentRig = next;
      if (!prefersReducedMotion) {
        entranceScale = 0.92;
      }
    };

    rebuildRef.current = mountCake;
    mountCake();

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Subtle Mouse Parallax on Desktop Only
    let isPointerInside = false;
    const onPointerMove = (e: PointerEvent) => {
      if (isMobileViewport || prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
      _pointerTarget.x = Math.max(-1, Math.min(1, nx));
      _pointerTarget.y = Math.max(-1, Math.min(1, ny));
      isPointerInside = true;
    };
    const onPointerLeave = () => {
      isPointerInside = false;
      _pointerTarget.x = 0;
      _pointerTarget.y = 0;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave);

    let scrollProgress = 0;
    const onScroll = () => {
      scrollProgress = Math.min(1.5, Math.max(0, window.scrollY / Math.max(window.innerHeight, 1)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 540;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObs = new ResizeObserver(handleResize);
    resizeObs.observe(container);

    let isVisible = true;
    const intersectionObs = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.02 },
    );
    intersectionObs.observe(container);

    let isDocumentHidden = document.hidden;
    const onVisibilityChange = () => {
      isDocumentHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;
    let tiltX = 0;
    let tiltZ = 0;
    let scrollRot = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || !gl.fenceSync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;

      const delta = Math.min(clock.getDelta(), 0.08);
      const elapsed = clock.elapsedTime;

      if (isVisible && !isDocumentHidden) {
        // 1. Entrance spring settle
        entranceScale = THREE.MathUtils.damp(entranceScale, 1.0, 6.5, delta);
        entranceLift = THREE.MathUtils.damp(entranceLift, 0, 6.0, delta);
        showcasePivot.scale.setScalar(entranceScale);

        // 2. Smooth mouse tilt & scroll rotation response
        const targetTiltX = isPointerInside ? _pointerTarget.y * 0.08 : 0;
        const targetTiltZ = isPointerInside ? -_pointerTarget.x * 0.08 : 0;
        tiltX = THREE.MathUtils.damp(tiltX, targetTiltX, 4.5, delta);
        tiltZ = THREE.MathUtils.damp(tiltZ, targetTiltZ, 4.5, delta);
        scrollRot = THREE.MathUtils.damp(scrollRot, scrollProgress * 0.65, 5.0, delta);

        const floatOffset = prefersReducedMotion ? 0 : Math.sin(elapsed * 1.15) * 0.032;
        showcasePivot.position.y = entranceLift + floatOffset;
        showcasePivot.rotation.x = tiltX;
        showcasePivot.rotation.z = tiltZ;

        if (!prefersReducedMotion && currentRig) {
          // Gentle, serene showcase rotation + subtle scroll response
          currentRig.cakeGroup.rotation.y = elapsed * 0.18 + scrollRot;

          // Staggered float on floating berries
          for (let i = 0; i < currentRig.floatingAccents.length; i++) {
            const acc = currentRig.floatingAccents[i];
            acc.mesh.position.y =
              acc.baseY + Math.sin(elapsed * acc.speed + acc.phase) * acc.amplitude;
            acc.mesh.rotation.y += acc.spinSpeed * delta;
          }

          // Candle flame soft pulse
          if (currentRig.candleFlame) {
            const flicker = 0.94 + Math.sin(elapsed * 12) * 0.06 + Math.cos(elapsed * 19) * 0.04;
            currentRig.candleFlame.scale.set(1, flicker, 1);
            if (currentRig.candleLight) {
              currentRig.candleLight.intensity = 0.95 + flicker * 0.25;
            }
          }

          // Subtle moving highlight spotlight
          glazeSpot.position.x = 1.6 + Math.sin(elapsed * 0.5) * 0.55 + _pointerTarget.x * 0.45;
          glazeSpot.position.z = 2.5 + Math.cos(elapsed * 0.5) * 0.35;
        }

        controls.update();
        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      resizeObs.disconnect();
      intersectionObs.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

      currentRig?.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
      shadowTex.dispose();
      envTex.dispose();
      controls.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglUnavailable) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <img
          src="/assets/aistudio/Screenshot_2026-11-21_144023_42d1ed32.png"
          alt="Diti's Cake Creation handcrafted buttercream rosette celebration cake"
          referrerPolicy="no-referrer"
          className="w-72 sm:w-88 aspect-[4/5] object-cover rounded-[2rem] shadow-lg"
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none touch-pan-y"
      aria-label="Interactive 3D celebration cake — drag gently to rotate"
    />
  );
}
