var local_obj;

var gridhelper = new THREE.GridHelper(30, 30, 0x444444, 0x888888);
//gridhelper.rotateX(Math.PI / 4)

//THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);

var container = document.getElementById("robot");

const manager = new THREE.LoadingManager();

const asyncFunction = (t) => new Promise(resolve => setTimeout(resolve, t));

const getData = async (resolve, reject, count) => {

    await asyncFunction(5);

    console.log('waiting for GUI Model data from Config file!');

    count++;

    if (guiModel.length == 0) {

        getData(resolve, reject, count);
    } else {
        return resolve();

    }

}
console.groupEnd();

const runScript = async () => {

    console.group("[ Load linrob 3D Model ]");
    await new Promise((r, j) => getData(r, j, 0));

    console.log('GUI Model: ' + guiModel + " found!");
    const loader = new THREE.GLTFLoader(manager);
    loader.load('/assets/models/' + guiModel, function (object) {
        scene.add(object.scene);
        object.animations; // Array<THREE.AnimationClip>
        object.scene; // THREE.Group
        object.scenes; // Array<THREE.Group>
        object.cameras; // Array<THREE.Camera>
        object.asset; // Object
        local_obj = object.scene;
        try {

            const xLED1 = object.scene.getObjectByProperty('name', 'xLED1');
            const xLED2 = object.scene.getObjectByProperty('name', 'xLED2');


            const yLED1 = object.scene.getObjectByProperty('name', 'yLED1');
            const yLED2 = object.scene.getObjectByProperty('name', 'yLED2');

            const zLED1 = object.scene.getObjectByProperty('name', 'zLED1');
            const zLED2 = object.scene.getObjectByProperty('name', 'zLED2');

            xLED1.material = linrobBlue;
            xLED1.layers.enable(1);

            xLED2.material = linrobBlue;
            xLED2.layers.enable(1);

            yLED1.material = linrobBlue;
            yLED1.layers.enable(1);

            yLED2.material = linrobBlue;
            yLED2.layers.enable(1);

            zLED1.material = linrobBlue;
            zLED1.layers.enable(1);

            zLED2.material = linrobBlue;
            zLED2.layers.enable(1);

        } catch (e) {

            console.log("No LEDs defined!");
        }


    });

};

runScript();

manager.onLoad = function () {

    console.log('Loading complete!');
    console.groupEnd();
    animate();
    setTimeout(waitCallback, 2000);

};

function waitCallback() {

    if (window.innerHeight > window.innerWidth) {
        //portrait
        $('#modal_orientation_change').modal('show');
    }
    if (window.innerWidth > window.innerHeight) {
        //landscape
        $('#modal_orientation_change').modal('hide');
    }

    $(modal_loading_screen).modal('hide');
    document.getElementById("robot_toolbar").style.display = "flex";


}


manager.onProgress = function (url, itemsLoaded, itemsTotal) {

    //console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};

manager.onError = function (url) {

    console.log('There was an error loading ' + url);

};

// Create 3D Scene
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById( 'robot_view' ), antialias: true });
renderer.autoClear = true;
//renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0x231F20, 0.1); // second param is opacity, 0 => transparent

var clock = new THREE.Clock();

const red = new THREE.MeshBasicMaterial({ color: "red", wireframe: false });
const linrobBlue = new THREE.MeshBasicMaterial({ color: new THREE.Color("rgb(2, 161, 219)"), wireframe: false });

const green = new THREE.MeshLambertMaterial({
    color: new THREE.Color("rgb(27, 177, 27)"),
    emissive: new THREE.Color("rgb(27, 177, 27)"),
    emissiveIntensity: 5,
});

const yellow = new THREE.MeshLambertMaterial({
    color: new THREE.Color("rgb(225, 197, 14)"),
    emissive: new THREE.Color("rgb(225, 197, 14)"),
    emissiveIntensity: 5,
});

const scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0x404040));


const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.lookAt(0, 0, 0);
camera.layers.enable(1);

scene.add(camera);

const pointLight = new THREE.PointLight(0xffffff, 10);
camera.add(pointLight);

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    let windowAspect = innerWidth / innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}


scene.add(new THREE.AmbientLight(0x404040));

// DIRECTIONAL LIGHT
const dl1 = new THREE.DirectionalLight(0xffffff, 2);
dl1.position.set(5, 10, 7.5);
scene.add(dl1);

const dl2 = new THREE.DirectionalLight(0xffffff, 2);
dl2.position.set(4.813, 0.147, -8.765);
scene.add(dl2);

const dl3 = new THREE.DirectionalLight(0xffffff, 2);
dl3.position.set(5.000, -5.302, 4.302);
scene.add(dl3);

const dl4 = new THREE.DirectionalLight(0xffffff, 2);
dl4.position.set(-7.777, 5.233, 0.358);
scene.add(dl4);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = -1000;
controls.maxDistance = 1000;

controls.enablePan = true;
controls.enableZoom = true;
controls.enableDamping = true;
//controls.autoRotate = true;


// LED Effect Start

var light = new THREE.DirectionalLight(0xffffff, 0.75);
light.position.setScalar(100);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.25));

/** COMPOSER */
var renderScene = new THREE.RenderPass(scene, camera)

var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader)
effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)

var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
bloomPass.threshold = 0.21
bloomPass.strength = 1.2
bloomPass.radius = 0.55
bloomPass.renderToScreen = true

var composer = new THREE.EffectComposer(renderer)
composer.setSize(window.innerWidth, window.innerHeight)

composer.addPass(renderScene)
composer.addPass(effectFXAA)
composer.addPass(bloomPass)

renderer.toneMappingExposure = Math.pow(0.9, 4.0)

// Add the Obit Controls Gizmo
const controlsGizmo = new OrbitControlsGizmo(controls, { size: 100, padding: 5 });

// Add the Gizmo domElement to the dom 
document.getElementById("linrob_footer_container").appendChild(controlsGizmo.domElement);

//document.body.appendChild(controlsGizmo.domElement);
// LED Effect End

// Init Camera / Controls / Target Position 
if (localStorage.getItem('camera_position_x') == null) {
    console.log("Set Default Position");
    camera.position.set(5.813950513938153, 1.6636272328849555, -2.934688704991431);
    camera.rotation.set(-2.8614324333626384, 0.8092657900680962, 2.9362753668726955);
    controls.target.set(1.3407825419190809, 0.4844300690941867, 1.1636193309067535);
} else {

    camera.position.set(parseFloat(localStorage.getItem('camera_position_x')), parseFloat(localStorage.getItem('camera_position_y')), parseFloat(localStorage.getItem('camera_position_z')));
    camera.rotation.set(parseFloat(localStorage.getItem('camera_rotation_x')), parseFloat(localStorage.getItem('camera_rotation_y')), parseFloat(localStorage.getItem('camera_rotation_z')));
    controls.target.set(parseFloat(localStorage.getItem('camera_target_x')), parseFloat(localStorage.getItem('camera_target_y')), parseFloat(localStorage.getItem('camera_target_z')));
}

controls.update();

//camera.up.set(0,0,1);

var gui = new dat.GUI({ autoPlace: false, useLocalStorage: true });
gui.domElement.id = 'gui';

//gui_container
document.getElementById("robot_status").appendChild(gui.domElement);

// Setup the animation loop.
var firstCall = false;
var firstError = false;
var delta;
var obj = null;
function animate(delta) {

    delta = clock.getDelta();

    if (axisObj.length != 0 && firstCall == false) {

        var text =
        {
            guiPos: 'mm',
            guiVel: 'mm/s',
            guiAcc: 'mm/s',
            guiState: 'State',
            guiJob: 'Job',
            guiOP: 'OP Mode',
            guiError: 'Error State',
            guiSafety: 'Safety State',
            guiScript: 'Script State',
            guiLatency: 'Latency',
            guiPosCnts: 'Position cnts',
            guiPosCntsSSI: 'Position cnts SSI',
            guiPosLimMin: '',
            guiPosLimMax: '',
            guiPosLimMax: '',
            guiVelLimMin: '',
            guiVelLimMax: '',
            guiAccLimMin: '',
            guiAccLimMax: '',
            guiDecLimMin: '',
            guiDecLimMax: '',
            guiHomeBtn: '',

        }



        for (var key in axisObj) {
            var guiAxis = gui.addFolder(key);
            guiAxis.add(text, 'guiPos', "").name('Position').listen();
            guiAxis.add(text, 'guiVel', "").name('Velocity').listen();
            guiAxis.add(text, 'guiAcc', "").name('Acceleration').listen();
            guiAxis.add(text, 'guiAcc', "").name('Deceleration').listen();

            var state_folder = guiAxis.addFolder("State");
            state_folder.add(text, 'guiState', "").name('State').listen();
            state_folder.add(text, 'guiJob', "").name('Job').listen();
            state_folder.add(text, 'guiOP', "").name('OP Mode').listen();
            state_folder.add(text, 'guiError', "").name('Error State').listen();
            state_folder.add(text, 'guiSafety', "").name('Safety State').listen();
            state_folder.add(text, 'guiScript', "").name('Script State').listen();
            state_folder.add(text, 'guiLatency', "").name('Latency').listen();
            state_folder.add(text, 'guiPosCnts', "").name('Position cnts').listen();
            state_folder.add(text, 'guiPosCntsSSI', "").name('Position cnts SSI').listen();

            $('#modal_home_axis_select').append($('<option>', {
                value: key,
                text: key
            }));

            text.guiHomeBtn = function () {

                $("#lbl_modal_home_title").text('Home Axis ');
                $("#modal_home_text").text('Select Axis that you want to Home to 0.0 ');
                $('#modal_home_axis').modal('show');

            };

            state_folder.add(text, 'guiHomeBtn', "").name('Home Axis').listen();


            var limits_folder = guiAxis.addFolder("Limits");
            limits_folder.add(text, 'guiPosLimMin', "").name('Position min').listen();
            limits_folder.add(text, 'guiPosLimMax', "").name('Position max').listen();

            limits_folder.add(text, 'guiVelLimMin', "").name('Velocity min').listen();
            limits_folder.add(text, 'guiVelLimMax', "").name('Velocity max').listen();

            limits_folder.add(text, 'guiAccLimMin', "").name('Acceleration min').listen();
            limits_folder.add(text, 'guiAccLimMax', "").name('Acceleration max').listen();

            limits_folder.add(text, 'guiDecLimMin', "").name('Deceleration min').listen();
            limits_folder.add(text, 'guiDecLimMax', "").name('Deceleration max').listen();


        } firstCall = true;
    } else {

        for (key in axisObj) {
            try {
                if (axisObj["X-Axis"].axis_direction == "X") {
                    if (axisObj["X-Axis"].invert_gui_model) {
                        scene.getObjectByProperty('name', axisObj["X-Axis"].gui_uuid).position.x = Number(axisObj["X-Axis"].actual_position_relative * -1);
                    }
                    else {
                        scene.getObjectByProperty('name', axisObj["X-Axis"].gui_uuid).position.x = Number(axisObj["X-Axis"].actual_position_relative);
                    }

                }
                else if (axisObj["X-Axis"].axis_direction == "Y") {
                    if (axisObj["X-Axis"].invert_gui_model) {
                        scene.getObjectByProperty('name', axisObj["X-Axis"].gui_uuid).position.y = Number(axisObj["X-Axis"].actual_position_relative * -1);
                    }
                    else {
                        scene.getObjectByProperty('name', axisObj["X-Axis"].gui_uuid).position.y = Number(axisObj["X-Axis"].actual_position_relative);
                    }

                }

                else if (axisObj["X-Axis"].axis_direction == "Z") {
                    if (axisObj["X-Axis"].invert_gui_model) {
                        scene.getObjectByProperty('name', axisObj["X-Axis"].gui_uuid).position.z = Number(axisObj["X-Axis"].actual_position_relative * -1);
                    }
                    else {
                        scene.getObjectByProperty('name', axisObj["X-Axis"].gui_uuid).position.z = Number(axisObj["X-Axis"].actual_position_relative);
                    }

                }

            } catch (e) {
                //console.log("Error while set X-Position to model");
            }
      
            try {
                if (axisObj["Y-Axis"].invert_gui_model) {

                    scene.getObjectByProperty('name', axisObj["Y-Axis"].gui_uuid).position.x = Number(axisObj["X-Axis"].actual_position_relative * -1);
                    scene.getObjectByProperty('name', axisObj["Y-Axis"].gui_uuid).position.y = Number(axisObj["Y-Axis"].actual_position_relative * -1);
                    scene.getObjectByProperty('name', axisObj["Y-Axis"].gui_uuid).position.z = Number(axisObj["Z-Axis"].actual_position_relative * -1);
                }
                else {

                    scene.getObjectByProperty('name', axisObj["Y-Axis"].gui_uuid).position.x = Number(axisObj["X-Axis"].actual_position_relative) * -1;
                    scene.getObjectByProperty('name', axisObj["Y-Axis"].gui_uuid).position.y = Number(axisObj["Y-Axis"].actual_position_relative);
                    scene.getObjectByProperty('name', axisObj["Y-Axis"].gui_uuid).position.z = Number(axisObj["Z-Axis"].actual_position_relative);
                }
            } catch (e) {
                // console.log("Error while set X-Position to model");
            }

            try {
                if (axisObj["Z-Axis"].invert_gui_model) {

                    scene.getObjectByProperty('name', axisObj["Z-Axis"].gui_uuid).position.y = Number(axisObj["X-Axis"].actual_position_relative * -1);
                    scene.getObjectByProperty('name', axisObj["Z-Axis"].gui_uuid).position.z = Number(axisObj["Z-Axis"].actual_position_relative * -1);
                }
                else {
                    scene.getObjectByProperty('name', axisObj["Z-Axis"].gui_uuid).position.y = Number(axisObj["X-Axis"].actual_position_relative);
                    scene.getObjectByProperty('name', axisObj["Z-Axis"].gui_uuid).position.z = Number(axisObj["Z-Axis"].actual_position_relative);
                }
            } catch (e) {
                //console.log("Error while set X-Position to model");
            }

            //scene.getObjectByProperty('name', axisObj["Z-Axis"].gui_uuid).position.z = Number(axisObj["X-Axis"].actual_position);


            // const color3 = ;

            gui.__folders[key].__controllers[0].setValue(axisObj[key].actual_position_relative.toFixed(4) + " " + axisObj[key].position_unit);

            gui.__folders[key].__controllers[1].setValue(axisObj[key].actual_velocity.toFixed(4) + " " + axisObj[key].velocity_unit);

            gui.__folders[key].__controllers[2].setValue(axisObj[key].actual_acceleration_setpoint + " " + axisObj[key].acceleration_unit);

            gui.__folders[key].__controllers[3].setValue(axisObj[key].actual_deceleration_setpoint + " " + axisObj[key].deceleration_unit);

            gui.__folders[key].__folders['State'].__controllers[0].setValue(axisObj[key].actual_state);

            gui.__folders[key].__folders['State'].__controllers[1].setValue(axisObj[key].actual_job);

            gui.__folders[key].__folders['State'].__controllers[2].setValue(axisObj[key].actual_op_mode);

            gui.__folders[key].__folders['State'].__controllers[3].setValue(axisObj[key].actual_state_info);

            gui.__folders[key].__folders['State'].__controllers[4].setValue(axisObj[key].safety_state);

            gui.__folders[key].__folders['State'].__controllers[5].setValue(axisObj[key].program_state);

            gui.__folders[key].__folders['State'].__controllers[6].setValue(communication_latency);

            gui.__folders[key].__folders['State'].__controllers[7].setValue(axisObj[key].actual_position_cnts);

            gui.__folders[key].__folders['State'].__controllers[8].setValue(axisObj[key].actual_position_cnts_ssi);


            gui.__folders[key].__folders['Limits'].__controllers[0].setValue(axisObj[key].position_min_limit + " " + axisObj[key].position_unit);

            gui.__folders[key].__folders['Limits'].__controllers[1].setValue(axisObj[key].position_max_limit + " " + axisObj[key].position_unit);




            gui.__folders[key].__folders['Limits'].__controllers[2].setValue(axisObj[key].velocity_min_limit + " " + axisObj[key].velocity_unit);

            gui.__folders[key].__folders['Limits'].__controllers[3].setValue(axisObj[key].velocity_max_limit + " " + axisObj[key].velocity_unit);




            gui.__folders[key].__folders['Limits'].__controllers[4].setValue(axisObj[key].acceleration_min_limit + " " + axisObj[key].acceleration_unit);

            gui.__folders[key].__folders['Limits'].__controllers[5].setValue(axisObj[key].acceleration_max_limit + " " + axisObj[key].acceleration_unit);




            gui.__folders[key].__folders['Limits'].__controllers[6].setValue(axisObj[key].deceleration_min_limit + " " + axisObj[key].deceleration_unit);

            gui.__folders[key].__folders['Limits'].__controllers[7].setValue(axisObj[key].deceleration_max_limit + " " + axisObj[key].deceleration_unit);
            
        }

    }

    // update the camera's frustum
    requestAnimationFrame(animate);

    renderer.autoClear = false;
    renderer.clear();

    camera.layers.set(1);
    composer.render();

    renderer.clearDepth();
    camera.layers.set(0);
    renderer.render(scene, camera);

    resizeCanvasToDisplaySize();
    controls.update();

    localStorage.setItem('camera_position_x', camera.position.x.toString());
    localStorage.setItem('camera_position_y', camera.position.y.toString());
    localStorage.setItem('camera_position_z', camera.position.z.toString());

    localStorage.setItem('camera_rotation_x', camera.rotation.x.toString());
    localStorage.setItem('camera_rotation_y', camera.rotation.y.toString());
    localStorage.setItem('camera_rotation_z', camera.rotation.z.toString());

    localStorage.setItem('camera_target_x', controls.target.x.toString());
    localStorage.setItem('camera_target_y', controls.target.y.toString());
    localStorage.setItem('camera_target_z', controls.target.z.toString());

}

function saveTarget() {
    console.group(" Controls Position")
    console.log(controls.target);
    console.groupEnd();

    console.group(" Camera Position")
    console.log(camera.position);
    console.groupEnd();

    console.group(" Camera Rotation Position")
    console.log(camera.rotation);
    console.groupEnd();
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//$('#toast-script-robot').draggable({ cancel: '#script_editor_toast_body'});
$('#toast_script_loader').draggable();
$('#toast-robot_status').draggable();
$('#toast-position-scope').draggable();
//$('#toast-robot-settings').draggable();

$("#btn_reset_camera").bind('touchend mousedown', function () {
    camera.position.set(5.813950513938153, 1.6636272328849555, -2.934688704991431);
    camera.rotation.set(-2.8614324333626384, 0.8092657900680962, 2.9362753668726955);
    controls.target.set(1.3407825419190809, 0.4844300690941867, 1.1636193309067535);

    ts_script_camera_default.showToast();
});


var gridhelper_active = false

if (localStorage.getItem("gridhelper_active")) {

    gridhelper_active = true;
    scene.add(gridhelper);
    $(toolbar_activate_grid).css('box-shadow', '0px 0px 14px 0px rgba(0,152,254,0.6039215686274509');
    console.log("Gridhelper was active!");

}

$("#toolbar_activate_grid").on("click", function () {

    if (gridhelper_active) {
        scene.remove(gridhelper);
        gridhelper_active = false;
        localStorage.setItem('gridhelper_active', false);
        $(this).css('box-shadow', '0 0 5px 3px transparent');

    } else {
        scene.add(gridhelper);
        localStorage.setItem('gridhelper_active', true);
        gridhelper_active = true;
        $(this).css('box-shadow', '0px 0px 14px 0px rgba(0,152,254,0.6039215686274509');
    }

});

$(btn_modal_home_axis).click(function () {
    console.log("Home " + $("#modal_home_axis_select option:selected").text());
    $('#modal_home_axis').modal('hide');
    parent.homeAxis($("#modal_home_axis_select option:selected").text());
});