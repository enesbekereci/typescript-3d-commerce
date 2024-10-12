import * as THREE from "three";


let isKeyUpPressed = false;
let raycaster = new THREE.Raycaster();
let objects: THREE.Object3D[] = [];
let currentObject: THREE.Object3D | undefined;
function onPointerMove(
  renderer:THREE.WebGLRenderer,
  event: MouseEvent,
  camera: THREE.Camera,
  pointer: THREE.Vector2,
  window_size: THREE.Vector2,
) {
  //TODO   ::: raycaster on plane threejs
   const rect = renderer.domElement.getBoundingClientRect();
  // mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
  // mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
  pointer.set(
    ((event.clientX- rect.left )/ ( rect.right - rect.left )) * 2 - 1,
    -((event.clientY- rect.top) / ( rect.bottom - rect.top)) * 2 + 1,
  );
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    const intersect = intersects[0];
    if (intersect.object.parent!=null)
    currentObject = intersect.object.parent
    if(currentObject!=undefined)
      1;
    //setHighlight(currentObject, new THREE.Color(0x00eaff))
  } else {
    if (currentObject != undefined)
      //setHighlight(currentObject!, new THREE.Color(0x000000))
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
