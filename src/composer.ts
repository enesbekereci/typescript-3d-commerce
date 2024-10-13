import * as THREE from "three";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';


import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';


function addComposer(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, width: number, height: number) {
    const composer = new EffectComposer(renderer);
    composer.setSize(width, height)
    //render scene
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // const outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera);
    // outlinePass.edgeThickness = Number(1);
    // outlinePass.edgeStrength = Number(5);
    // outlinePass.edgeGlow = Number(1);
    // outlinePass.visibleEdgeColor = new THREE.Color(0xeeff00)
    // outlinePass.hiddenEdgeColor = new THREE.Color(0x00fbff)
    // composer.addPass(outlinePass)
    // outlinePass.selectedObjects = [scene]


    //  const effectFXAA = new ShaderPass( FXAAShader );
    //  effectFXAA.uniforms[ 'resolution' ].value.set( 1/width, 1/height );
    //  composer.addPass( effectFXAA );
//todo try1
   // fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( container.offsetWidth * pixelRatio );
    //fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( container.offsetHeight * pixelRatio );
//todo try 2
// https://discourse.threejs.org/t/awful-aliasing-when-using-post-processing/8596/6
//rendertarget  

    //  const outputPass = new OutputPass();
    //  composer.addPass( outputPass );
     
    return composer
}
export { addComposer }