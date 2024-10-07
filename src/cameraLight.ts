import * as THREE from "three";

function AddLight(scene: THREE.Scene) {
  const ambLight = new THREE.AmbientLight(0xffffff, 0.8);
  //ambLight.castShadow = true; // default false

  const light = new THREE.DirectionalLight(0xffffff, 10);
  light.shadow.mapSize.width = 1024; // default
  light.shadow.mapSize.height = 512; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 100; // default

  light.position.set(10, 20, 10); //default; light shining from top

  scene.add(ambLight);
  scene.add(light);
  //scene.add( new THREE.CameraHelper( light.shadow.camera ) );
}
export { AddLight };
