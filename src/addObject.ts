import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
function AddObject(
  scene: THREE.Scene,
  name: string,
  pos: THREE.Vector3Tuple,
): { mesh: THREE.Object3D<THREE.Object3DEventMap> } {
  //let h :
  let mesh: { mesh: THREE.Object3D<THREE.Object3DEventMap> } = {
    mesh: new THREE.Object3D<THREE.Object3DEventMap>(),
  };
  const loader = new GLTFLoader();
  loader.load(
    name,
    function (gltf) {
      scene.add(gltf.scene);
      mesh.mesh.position.set(...pos);
      gltf.scene.receiveShadow = true;
      //gltf.scene.children[0].name="Hammer"
      mesh.mesh.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error("Failed" + error);
    },
  );
  return mesh;
}
export { AddObject };
