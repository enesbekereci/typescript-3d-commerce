import * as THREE from "three";


let isKeyUpPressed = false;
let raycaster = new THREE.Raycaster();
let objects: THREE.Object3D[] = [];
let currentObject: THREE.Object3D | undefined;
function onPointerMove(
  event: MouseEvent,
  camera: THREE.Camera,
  pointer: THREE.Vector2,
  window_size: THREE.Vector2,
) {
  //TODO   ::: raycaster on plane threejs
  pointer.set(
    (event.clientX / window_size.x) * 2 - 1,
    -(event.clientY / window_size.y) * 2 + 1,
  );
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(objects, true);

  if (intersects.length > 0) {
    const intersect = intersects[0];
    currentObject = intersect.object
    setHighlight(currentObject, new THREE.Color(0x00eaff))
  } else {
    if (currentObject != undefined)
      setHighlight(currentObject!, new THREE.Color(0x000000))
      currentObject = undefined
  }
}

function setHighlight(object: THREE.Object3D, color: THREE.Color) {
  ((object as THREE.Mesh).material as THREE.MeshStandardMaterial).emissive.set(color);
}

function onPointerDown(
  event: MouseEvent,
  // camera: THREE.Camera,
  // pointer: THREE.Vector2,
) {
  if (currentObject != undefined) {
    console.log("object is "+ currentObject?.name)
    if(currentObject.userData["click"]!=undefined){
      currentObject.userData["click"]()
    }

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


function addClickable(object: THREE.Object3D) {
  objects.push(object)
}
export { onDocumentKeyDown, onPointerDown, onPointerMove, onDocumentKeyUp, addClickable };
