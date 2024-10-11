import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
async function AddObject(
  scene: THREE.Scene,
  name: string,
  pos: THREE.Vector3Tuple,
): Promise<THREE.Object3D> {
  const loader = new GLTFLoader();
  const load = await loader.loadAsync(name).then((gltf) => {
    gltf.scene.receiveShadow = true;
    gltf.scene.position.set(...pos);
    gltf.scene.children[0].userData["click"] = () => { alert("Clicked" + gltf.scene.children[0].name) };
    //scene.add(gltf.scene)
    return gltf.scene

  })
  return load

}
export { AddObject };
