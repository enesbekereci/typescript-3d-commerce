import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
function AddObject(
  scene: THREE.Scene,
  name: string,
  pos: THREE.Vector3Tuple,
): { mesh: THREE.Object3D<THREE.Object3DEventMap> } {
  let sceneMesh: { mesh: THREE.Object3D } = {
    mesh: new THREE.Object3D(),
  };
  const loader = new GLTFLoader();
  loader.load(
    name,
    function (gltf) {

      sceneMesh.mesh.position.set(...pos);
      gltf.scene.receiveShadow = true;
      console.log(gltf.scene.children[0].name)
      gltf.scene.children[0].userData["click"]=()=>{alert("Clicked"+gltf.scene.children[0].name)};
      sceneMesh.mesh.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error("Failed" + error);
    },
  );
  return sceneMesh;
}
export { AddObject };
