import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
const params = {
    scale_1: 10,
    scale_2: 20,
    toggle_1: true,
    toggle_2: true,
    dropdown:"Hello",
    text:"input",
    button_1: function () {

    },
    button_2: function () {

    }
};
function addGUI(container:HTMLElement){
    const gui = new GUI({container:container,title:"New GUI"});

    gui.add( params, 'toggle_1' );
    gui.add( params, 'toggle_2' ).onChange( function () {        alert("toggle_2")    } );
    gui.add( params, 'button_1' );
    gui.add( params, 'button_2' );
    gui.add( params, 'text' );
    gui.add( params, 'dropdown', [ 'Hello', 'option_1', 'option_2', 'option_3' ] ).onChange( function () {
        alert("Dropdown")
    } );
    const folder = gui.addFolder( 'New Folder' );
    folder.add( params, 'scale_1', 1, 30 );
    folder.add( params, 'scale_2', 1, 30 );
	gui.close();
    gui.domElement.id = 'lilgui';

}

export {addGUI,params}