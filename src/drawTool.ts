import * as THREE from "three";
function AddPointer(scene: THREE.Scene): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(0.1, 32, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });

  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, 0, 0);
  sphere.receiveShadow = true;
  scene.add(sphere);
  return sphere;
}
export { AddPointer };
