import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          (gltf) => {
            character = gltf.scene;
            
            // To ensure color override catches meshes that might be inside groups:
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.frustumCulled = true;

                if (mesh.material) {
                  const isArray = Array.isArray(mesh.material);
                  const mats = isArray ? (mesh.material as THREE.Material[]) : [mesh.material as THREE.Material];
                  
                  const clonedMats = mats.map(m => m.clone() as THREE.MeshStandardMaterial);
                  mesh.material = isArray ? clonedMats : clonedMats[0];

                  clonedMats.forEach(mat => {
                    if (!mat.color) return;
                    
                    const name = mesh.name;
                    const parentName = mesh.parent?.name || "";
                    
                    const isName = (target: string) => name.includes(target) || parentName.includes(target);

                    const nameStr = (name + "|" + parentName).toLowerCase();

                    const match = (...targets: string[]) => targets.some(t => nameStr.includes(t.toLowerCase()));

                    // Cap. Note: Node is "Cube.002", but Mesh is "Cube.007". 
                    // Do this BEFORE shirt since shirt might check for 'cube.002'
                    if (match("cube.007", "cap", "hat")) { 
                      mat.color.set("#e4d4d8"); // Light silver/pink
                      mat.metalness = 0.3;
                      mat.roughness = 0.4;
                    } 
                    // Shirt
                    else if (match("body", "shirt", "cube.002")) {
                      mat.color.set("#4a4a4a"); // Dark Grey
                      mat.roughness = 0.8;
                    } 
                    // Pants
                    else if (match("pant", "cube.004")) {
                      mat.color.set("#1a1a1a"); // Black
                      mat.roughness = 0.8;
                    } 
                    // Skin
                    else if (match("hand", "neck", "ear", "face", "head", "plane.003", "plane.005", "plane.007", "mesh.002")) {
                      mat.color.set("#ffdbac"); 
                      mat.roughness = 0.5;
                    } 
                    // Shoes
                    else if (match("shoe", "sole", "cylinder.005", "cylinder.008")) {
                      mat.color.set("#e0e0e0");
                    } 
                    // Hair & Eyebrows
                    else if (match("hair", "eyebrow", "cube3.004", "plane.004")) {
                      mat.color.set("#111111");
                      mat.roughness = 0.9;
                    } 
                    // Fallback skin for any other generic unnamed default material
                    else if (mat.name === "default") {
                      mat.color.set("#ffdbac"); 
                      mat.roughness = 0.5;
                    }
                  });
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
