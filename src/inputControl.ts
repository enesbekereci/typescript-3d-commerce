import * as THREE from "three";

let isKeyUpPressed = false;
let raycaster = new THREE.Raycaster();
let objects: any[] = [];
function onPointerMove(
  event: MouseEvent,
  camera: THREE.Camera,
  pointer: THREE.Vector2,
) {
  //TODO   ::: raycaster on plane threejs
  pointer.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
  );
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(objects, false);
  if (intersects.length > 0) {
    //const intersect = intersects[ 0 ];
    //intersect.face.normal
  }
}
function onPointerDown(
  event: MouseEvent,
  camera: THREE.Camera,
  pointer: THREE.Vector2,
) {
  pointer.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
  );
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(objects, false);
  if (intersects.length > 0) {
    //         const intersect = intersects[ 0 ];
    //         // delete cube
    //
    //         render();
  }
}
function onDocumentKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowUp":
      isKeyUpPressed = true;
      break;
  }
}

function onDocumentKeyUp(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowUp":
      isKeyUpPressed = false;
      break;
  }
}

export { onDocumentKeyDown, onPointerDown, onPointerMove, onDocumentKeyUp };
