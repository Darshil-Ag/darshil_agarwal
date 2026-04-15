import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene, renderer: THREE.WebGLRenderer) => {
  // Purple/violet rim directional light from behind
  const rimLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  rimLight.position.set(-0.47, -0.32, -1);
  scene.add(rimLight);

  // Warm key light from upper-front — brings out skin/hair colors
  const keyLight = new THREE.DirectionalLight(0xffe0c0, 0);
  keyLight.position.set(0.5, 1.5, 2);
  scene.add(keyLight);

  // Cool fill from the left
  const fillLight = new THREE.DirectionalLight(0xaab4ff, 0);
  fillLight.position.set(-2, 0.5, 1);
  scene.add(fillLight);

  // Pink point light — simulates screen glow
  const screenGlow = new THREE.PointLight(0xff8fcf, 0, 100, 2);
  screenGlow.position.set(3, 12, 4);
  scene.add(screenGlow);

  // Dark ambient to prevent pure black shadows
  const ambient = new THREE.AmbientLight(0x1a0a2e, 0);
  scene.add(ambient);

  // Load HDRI environment — critical for PBR materials to show their base colors
  // antialias: false must be set on renderer before this to avoid glBlitFramebuffer
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      pmremGenerator.dispose();
      texture.dispose();
      scene.environment = envMap;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      screenGlow.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      screenGlow.intensity = 0;
    }
  }

  const duration = 2;
  const ease = "power2.inOut";

  function turnOnLights() {
    // Animate environment intensity via proxy (GSAP can't tween Scene directly)
    const proxy = { envIntensity: 0 };
    gsap.to(proxy, {
      envIntensity: 0.7,
      duration,
      ease,
      onUpdate: () => {
        scene.environmentIntensity = proxy.envIntensity;
      },
    });
    gsap.to(rimLight, { intensity: 1.5, duration, ease });
    gsap.to(keyLight, { intensity: 1.8, duration, ease });
    gsap.to(fillLight, { intensity: 0.8, duration, ease });
    gsap.to(ambient, { intensity: 0.5, duration, ease });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
