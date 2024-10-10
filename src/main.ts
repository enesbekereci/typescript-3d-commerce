import * as THREE from "three";
import { AddLight } from "./cameraLight.ts";
import { AddPointer } from "./drawTool.ts";
import { AddObject } from "./addObject.ts";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { AddLabel } from "./addLabel.ts";
import {
  onDocumentKeyDown,
  onDocumentKeyUp,
  onPointerMove,
} from "./inputControl.ts";
import { addGUI } from "./addGUI.ts";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(55, 640 / 480, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xadd8e6, 1);
const canvasName = new URL(import.meta.url).searchParams.get("sceneName");
console.log(canvasName);
var container = document.getElementById(canvasName || "canvas-name");
var guicontainer = document.getElementById("lilgui");

const width = parseInt(container?.getAttribute("width") || "100");
const height = parseInt(container?.getAttribute("height") || "100");

renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

container?.appendChild(renderer.domElement);

camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

AddLight(scene);
let sphere = AddPointer(scene);

let hammer = AddObject(scene, "tools/hammer.glb", [-2, 0, 0]);
let axe = AddObject(scene, "tools/axe.glb", [-1, 0, 0]);
let pickaxe = AddObject(scene, "tools/pickaxe.glb", [1, 0, 0]);
let shovel = AddObject(scene, "tools/shovel.glb", [2, 0, 0]);
let hoe = AddObject(scene, "tools/hoe.glb", [0, 0, 0]);
let handle = AddObject(scene, "tools/handle.glb", [0, -2, 0]);
scene.add(axe.mesh);
AddLabel("Axe", axe);
scene.add(hammer.mesh);
AddLabel("Hammer", hammer);
scene.add(pickaxe.mesh);
AddLabel("Pickaxe", pickaxe);
scene.add(shovel.mesh);
AddLabel("Shovel", shovel);
scene.add(hoe.mesh);
AddLabel("Hoe", hoe);
scene.add(handle.mesh);
AddLabel("Handle", handle);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(width, height); //window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
document.body.appendChild(labelRenderer.domElement);

let pointer = new THREE.Vector2();
///input
document.addEventListener("pointermove", (event: MouseEvent) => {
  onPointerMove(event, camera, pointer);
});
//document.addEventListener( 'pointerdown', onPointerDown );
document.addEventListener("keydown", onDocumentKeyDown);
document.addEventListener("keyup", onDocumentKeyUp);

addGUI(guicontainer!)

function animate() {
  requestAnimationFrame(animate);
  if (hammer != undefined && hammer.mesh != undefined) {
    hammer.mesh.rotation.y += 0.01;
  }
  if (axe != undefined && axe.mesh != undefined) {
    axe.mesh.rotation.y += 0.01;
  }
  if (handle != undefined && handle.mesh != undefined) {
    handle.mesh.rotation.x += 0.01;
	handle.mesh.rotation.y += 0.01;
	handle.mesh.rotation.z += 0.01;
  }
  sphere.position.set(pointer.x * 2, pointer.y * 2, 0);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();
