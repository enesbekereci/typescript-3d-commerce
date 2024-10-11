import * as THREE from "three";

const animlist: AnimList[] = []


function addToAnimList(object: THREE.Object3D, y: number) {
    animlist.push({ object: object, rot_y: y })
}

function animateAll() {
    for (let i = 0; i < animlist.length; i++) {
        if (animlist[i].object != undefined) {
            animlist[i].object.rotation.y += animlist[i].rot_y;
        }
    }
}


type AnimList = {
    object: THREE.Object3D,
    rot_y: number
}

export { addToAnimList, animateAll }