import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { addClickable } from "./inputControl";

async function addCupboard(
  name: string,
  pos: THREE.Vector3Tuple,
): Promise<THREE.Object3D> {
  const loader = new GLTFLoader();
  const load = await loader.loadAsync(name).then((gltf) => {
    gltf.scene.receiveShadow = true;
    gltf.scene.position.set(...pos);
    gltf.scene.rotation.set(0, -45, 0);
    for (let i = 0; i < gltf.scene.children.length; i++) {
      let child = gltf.scene.children[i]
      console.log(child.name)
      if (child.name == "drawer_1" || child.name == "drawer_2"||child.name == "drawer_3" || child.name == "drawer_4") {
        child.userData["isOpen"] = false
        child.userData["click"] = () => {
          let self = child;
          if (self.userData["isOpen"] == false) { self.position.set(1.2, 0, 0); self.userData["isOpen"] = true }
          else {self.position.set(0, 0, 0);self.userData["isOpen"] = false}
        };
        addClickable(child)
      }
      if (child.name.substring(0,4) == "door") {
        child.userData["isOpen"] = false
        child.userData["direction"] = 1
        if(["2","4"].includes(child.name.substring(5,6))){
          child.userData["direction"]=-1
        }
        child.userData["click"] = () => { let self = child; 
          if (self.userData["isOpen"] == false) { self.rotation.set(0,child.userData["direction"]* 1.7, 0); self.userData["isOpen"] = true }
          else {self.rotation.set(0, 0, 0);self.userData["isOpen"] = false}
          
         };
        addClickable(child)
      }
    }
    //scene.add(gltf.scene)
    return gltf.scene

  })
  return load
}


export { addCupboard }