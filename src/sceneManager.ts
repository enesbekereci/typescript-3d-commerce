import * as THREE from "three";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
const labelRenderer = new CSS2DRenderer();
let sceneManager={
    width:0,
    height:0,
}

export{sceneManager}