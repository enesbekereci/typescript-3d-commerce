import * as THREE from "three";

const animlistLoop: AnimList[] = []
const animList:AnimType[]=[]

function addToAnimLoop(object: THREE.Object3D, y: number) {
    animlistLoop.push({ object: object, rot_y: y })
}

function addAnim(object: THREE.Object3D, rot: THREE.Vector3,pos: THREE.Vector3) {
    animList.push({ object: object, rot: rot,pos:pos })
}

function animateAll() {
    for (let i = 0; i < animlistLoop.length; i++) {
        if (animlistLoop[i].object != undefined) {
            animlistLoop[i].object.rotation.y += animlistLoop[i].rot_y;
        }
    }
}


type AnimType={
    object: THREE.Object3D,
    pos: THREE.Vector3,
    rot: THREE.Vector3,
}

type AnimList = {
    object: THREE.Object3D,
    rot_y: number
}

export { addToAnimLoop, animateAll, addAnim }