import * as THREE from "three";
import { AddLight } from "./cameraLight.ts";
import { AddPointer } from "./drawTool.ts";
import { AddObject } from "./addObject.ts";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { AddLabel } from "./addLabel.ts";
import {
  addClickable,
  onDocumentKeyDown,
  onDocumentKeyUp,
  onPointerDown,
  onPointerMove,
} from "./inputControl.ts";
import { addGUI } from "./addGUI.ts";
import { addToAnimList, animateAll } from "./animator.ts";

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
const window_size = new THREE.Vector2(width, height)
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

hammer.then((mesh) => { addToAnimList(mesh, 0.05); scene.add(mesh); addClickable(mesh); AddLabel("Hammer", mesh) })
axe.then((mesh) => { addToAnimList(mesh, 0.1); scene.add(mesh); addClickable(mesh); AddLabel("Axe", mesh); })
pickaxe.then((mesh) => { addToAnimList(mesh, 0.15); scene.add(mesh); addClickable(mesh); AddLabel("Pickaxe", mesh) })
shovel.then((mesh) => { addToAnimList(mesh, 0.2); scene.add(mesh); addClickable(mesh); AddLabel("Shovel", mesh) })
hoe.then((mesh) => { addToAnimList(mesh, 0.25); scene.add(mesh); addClickable(mesh); AddLabel("Hoe", mesh) })
handle.then((mesh) => { addToAnimList(mesh, 0.3); scene.add(mesh); addClickable(mesh); AddLabel("Handle", mesh) })

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(width, height); //window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = renderer.domElement.getBoundingClientRect().y + "px";
labelRenderer.domElement.style.left = renderer.domElement.getBoundingClientRect().x + "px";
document.body.appendChild(labelRenderer.domElement);

let pointer = new THREE.Vector2();
///input
document.addEventListener("pointermove", (event: MouseEvent) => {
  onPointerMove(renderer, event, camera, pointer, window_size);
});
document.addEventListener('pointerdown', onPointerDown);
document.addEventListener("keydown", onDocumentKeyDown);
document.addEventListener("keyup", onDocumentKeyUp);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  //camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  //renderer.setSize( window.innerWidth, window.innerHeight );
  labelRenderer.domElement.style.top = renderer.domElement.getBoundingClientRect().y + "px";
  labelRenderer.domElement.style.left = renderer.domElement.getBoundingClientRect().x + "px";

}

addGUI(guicontainer!)

function animate() {
  requestAnimationFrame(animate);
  animateAll();

  sphere.position.set(pointer.x * 2, pointer.y * 2, 0);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();
