import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

function AddLabel(
  name: string,
  mesh: { mesh: THREE.Object3D<THREE.Object3DEventMap> },
) {
  const moonDiv = document.createElement("div");
  moonDiv.className = "label";
  moonDiv.textContent = name;
  //moonDiv.style.backgroundColor = 'transparent';
  moonDiv.addEventListener("click", function () {
    alert(`You clicked on ${moonDiv.textContent}`);
  });
  const moonLabel = new CSS2DObject(moonDiv);
  moonLabel.position.set(0, 0, 0);
  moonLabel.center.set(0.5, 0);
  moonLabel.layers.set(0);
  mesh.mesh.add(moonLabel);
}

export { AddLabel };
