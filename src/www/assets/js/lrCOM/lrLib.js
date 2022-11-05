// Keep Background color on Refresh page!
function changeBackground() {
    if (sessionStorage.getItem('colour')) {
        document.body.style.backgroundColor = sessionStorage.getItem('colour');
    } else {
        document.body.style.backgroundColor = "#BB0A21";
        sessionStorage.setItem('colour', "#BB0A21");
    }
}

// Event before refresh Page
window.onbeforeunload = function (event) {
    clearInterval(intervalServoID);
    clearInterval(intervalScriptID);

    changeBackground();
    document.getElementById("robot_toolbar").style.display = "none";
    document.getElementById("linrob_footer").style.display = "none";
};


// Listen for orientation changes
window.addEventListener("orientationchange", function () {
    if (window.orientation == 90 || window.orientation == -90) {

        if ($('#modal_orientation_change').is(':visible')) {

            $('#modal_orientation_change').modal('hide');

            $("#toast-robot_status").animate({
                top: "0px",
                left: "10.5em"
            });

            $("#toast-script-robot").animate({
                top: "0px",
                left: "10.5em"
            });
        }
    } else {

        $('#modal_orientation_change').modal('show');
    }
}, false);


var lock = false;
var axisObj = [];
var guiModel = "";
var json_obj;
var communication_latency = 0;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearNotifyMessages() {

    const json = '{"cmd":"clear_notify_message","axis":"x"}';
    const obj = JSON.parse(json);
    console.log(obj);
    socket.emit("clear_notify_message", obj);
}


var STO_Active = false;
var intervalServoID = setInterval(stateUpdate, 30);

function stateUpdate() {

    $("#robot_log").val(robotLogData);
    
    for (var key in axisObj) {
        if (axisObj[key].safety_state == "STO FAULT!" && !$(modal_loading_screen).is(':visible')) {

            ts_STO.forEach(function (item, index) {
                if (item.name == key) {
                    if (!item.show) {
                        item.ts_emcy.showToast();
                        item.show = true;
                    }
                }

            });
        } else {

            ts_STO.forEach(function (item, index) {
                if (item.name == key) {
                    if (item.show) {
                        item.ts_emcy.hideToast();
                        item.show = false;
                    }
                }

            });
        }

        if (key == $("#select_axis option:selected").text()) {

            if (axisObj[key].actual_state == "Enabled") {

                $('#txt_btn_enable_move').text("Disable")
                $('#btn_enable_move').css({ backgroundColor: 'var(--bs-red)' });
                $("#led_move_status").attr('class', 'tada animated infinite led-green noselect');
                document.getElementById("led_move_status").setAttribute("data-bs-original-title", $("#select_axis option:selected").text() + " Ready");

                if (axisObj[key].dev_mode) {
                    $('#led_move_simulation').css('visibility', 'visible');
                    $("#led_move_simulation").attr('class', 'tada animated infinite led-orange noselect');
                    document.getElementById("led_move_simulation").setAttribute("data-bs-original-title", $("#select_axis option:selected").text() + " Simulation Mode active");

                } else {
                    $('#led_move_simulation').css('visibility', 'hidden');
                }

                if (axisObj[key].is_moving) {

                    if (scriptState['stop']) {
                        $(btn_script_robot).prop("disabled", true);
                    }

                    $(btn_move_to_position).prop("disabled", true);

                    $(btn_jog_robot).prop("disabled", true);


                } else {

                    if (scriptState['stop']) {
                        $(btn_script_robot).prop("disabled", false);
                        enableMoveControls();

                        $(btn_move_to_position).prop("disabled", false);
                        $(btn_jog_robot).prop("disabled", false);
                    }

                }


            } else {
                $('#txt_btn_enable_move').text("Enable")
                $('#btn_enable_move').css({ backgroundColor: 'var(--bs-green)' });
                $("#led_move_status").attr('class', 'tada animated infinite led-red noselect');
                document.getElementById("led_move_status").setAttribute("data-bs-original-title", $("#select_axis option:selected").text() + " Disabled");
                enableMoveControls();

                $(btn_move_to_position).prop("disabled", true);



                if (axisObj[key].dev_mode) {
                    $("#led_move_simulation").attr('class', 'tada animated infinite led-orange noselect');
                    document.getElementById("led_move_simulation").setAttribute("data-bs-original-title", $("#select_axis option:selected").text() + " Simulation Mode active");

                } else {
                    $('#led_move_simulation').css('visibility', 'hidden');
                }
            }

        }

        if ($("#select_axis option:selected").text() == "Select Axis") {
            disableMoveControls();
        }

        let JogStatusAxisName = "#led_jog_status_" + key;
        let JogEnableButton = "#btn_jog_enable_" + key;
        let JogPositiveButton = "#btn_jog_positive_" + key;
        let JogNegativeButton = "#btn_jog_negative_" + key;
        let JogOverrideSlider = "#jog_override_slider_" + key;

        if (axisObj[key].actual_state == "Enabled") {
            $(JogStatusAxisName).attr('class', 'tada animated infinite led-green noselect');
            $(JogStatusAxisName).attr('title', key + " Ready");


            $(JogEnableButton).css({
                backgroundColor: 'var(--bs-red)',
                color: 'var(--bs-white',
                fontSize: '14px'
            });
            $(JogEnableButton).html("<strong>Disable</strong>");

            $(JogPositiveButton).prop("disabled", false);
            $(JogNegativeButton).prop("disabled", false);

        }
        else {
            $(JogStatusAxisName).attr('class', 'tada animated infinite led-red noselect');
            $(JogStatusAxisName).attr('title', key + " Disabled");

            $(JogEnableButton).css({
                backgroundColor: 'var(--bs-green)',
                color: 'var(--bs-white',
                fontSize: '14px'
            });

            $(JogEnableButton).html("<strong>Enable</strong>");

            $(JogPositiveButton).prop("disabled", true);
            $(JogNegativeButton).prop("disabled", true);

        }

        let JogSimulationAxisName = "#led_jog_simulation_led_" + key;

        if (axisObj[key].dev_mode) {
            $(JogSimulationAxisName).attr('class', 'tada animated infinite led-orange noselect');
            $(JogSimulationAxisName).attr('title', key + " Simulation mode Active");

        } else {
            $(JogSimulationAxisName).attr('class', 'tada animated infinite led-red noselect');
            $(JogSimulationAxisName).attr('title', key + " Disabled");
            $(JogSimulationAxisName).css('visibility', 'hidden');
        }

    }
}

var toggle_btn = false;
var actual_script_line = 1

var intervalScriptID = setInterval(scriptStateUpdate, 30);
function scriptStateUpdate() {

    actual_script_line = scriptState['actualLine'];
    if (scriptState['play']) {
        ts_script_play.updateToast("⌛️ Script running " + scriptState['elapsed_script_time']);
        toggle_btn = false;

        $("#txt_elapsed_script_time").text(scriptState['elapsed_script_time']);
        if (!ts_script_play_showing) {

            try {
                ts_script_paused.hideToast();
            } catch { }

            try {
                ts_script_stopped.hideToast();
            } catch { }

            try {
                ts_script_paused.hideToast();
            } catch { }

            ts_script_play.showToast();

            ts_script_pause_showing = false;
            ts_script_stop_showing = false;
            ts_script_play_showing = true;
        }

        if (parent.showScriptRobot) {
            if (editor.getValue() != scriptState['activeScriptCode'] && scriptState['activeScriptCode'] != "") {

                if (ModaleditorView.getValue() != scriptState['activeScriptCode']) {
                    ModaleditorView.setValue(scriptState['activeScriptCode']);
                    ModaleditorView.save();
                    ModaleditorView.refresh();
                }

                $("#txt_code_from_another_device").text(scriptState['activeScriptCode']);
                $('#model_script_running').modal('show');
            }
        }

        $(btn_move_robot).prop("disabled", true);
        $(btn_jog_robot).prop("disabled", true);
        $(btn_dropdown_script_save).prop("disabled", true);
        $(btn_dropdown_script_load).prop("disabled", true);


        document.getElementById("led_script_status").setAttribute("data-bs-original-title", "Script running...");
        $("#led_script_status").attr('class', 'tada animated infinite led-green noselect');
        $(btn_pause_script).prop("disabled", false);
        $(btn_play_script).prop("disabled", true);
        editor.setOption("readOnly", true);
        editor.clearGutter("act_line");
        editor.clearGutter("pause_line");
        
        editor.setGutterMarker(actual_script_line - 1, "act_line", makeMarker());
    }

    if (scriptState['pause']) {
        toggle_btn = false;

        if (!ts_script_pause_showing) {
            try {
                ts_script_play.hideToast();
            } catch { }

            try {
                ts_script_stopped.hideToast();
            } catch { }

            try {
                ts_script_play.hideToast();
            } catch { }

            ts_script_paused.showToast();

            ts_script_play_showing = false;
            ts_script_stop_showing = false;
            ts_script_pause_showing = true;
        }

        $(btn_move_robot).prop("disabled", true);
        $(btn_jog_robot).prop("disabled", true);

        $(btn_play_script).prop("disabled", false);
        $(btn_pause_script).prop("disabled", true);

        editor.clearGutter("act_line");
        editor.clearGutter("pause_line");
        
        editor.setGutterMarker(actual_script_line - 1, "pause_line", makePauseMarker());
        document.getElementById("led_script_status").setAttribute("data-bs-original-title", "Script paused...");
        $("#led_script_status").attr('class', 'tada animated infinite led-yellow noselect');
    }

    if (scriptState['stop']) {
        if (!ts_script_stop_showing && ts_script_play_showing || ts_script_pause_showing) {
            try {
                ts_script_paused.hideToast();

            } catch { }
            try {
                ts_script_play.hideToast();
            } catch { }
            ts_script_pause_showing = false;
            ts_script_play_showing = false;
            ts_script_stopped.showToast();
            ts_script_stopped.updateToast("⛔️ Script stopped at " + scriptState['elapsed_script_time'] + " !");
            ts_script_stop_showing = true;
        }


        if (!toggle_btn) {
            $(btn_move_robot).prop("disabled", false);
            $(btn_jog_robot).prop("disabled", false);
            toggle_btn = true;

        }

        $(btn_dropdown_script_save).prop("disabled", false);
        $(btn_dropdown_script_load).prop("disabled", false);
        $(btn_play_script).prop("disabled", false);
        
        $(btn_pause_script).prop("disabled", true);

        editor.setOption("readOnly", false)
        editor.clearGutter("act_line");
        editor.clearGutter("pause_line");
        document.getElementById("led_script_status").setAttribute("data-bs-original-title", "Script stopped...");
        $("#led_script_status").attr('class', 'tada animated infinite led-red noselect');

    }

}


$(document).ready(function () {
    add_standard_tooltips();
});


function add_standard_tooltips() {
    $('[data-toggle="tooltip"]').tooltip();
}

$("#btn_close_settings").on("click", function () {
    
    $("#btn_robot_settings").css('box-shadow', '0 0 5px 3px transparent');
    showSettingsRobot = false;
});

var showSettingsRobot = false
$("#btn_robot_settings").on("click", function () {
    if (showSettingsRobot) {
        $("#toast-move_robot").toast("hide");
        $("#toast_jog_robot").toast("hide");
        $("#toast-script-robot").toast("hide");
        $("#toast_script_loader").toast("hide");
        $("#toast-robot-settings").toast("hide");

        $('#btn_move_robot').css('box-shadow', '0 0 5px 3px transparent');
        $('#btn_jog_robot').css('box-shadow', '0 0 5px 3px transparent');
        $('#btn_script_robot').css('box-shadow', '0 0 5px 3px transparent');

        $("#btn_robot_settings").css('box-shadow', '0 0 5px 3px transparent');

        showScriptRobot = false;
        showMoveRobot = false;
        showJogRobot = false;
        showSettingsRobot = false;

    } else {
        $("#toast_jog_robot").toast("hide");
        $("#toast-move_robot").toast("hide");
        $("#toast_script_loader").toast("hide");
        $("#toast-script-robot").toast("hide");
        $("#toast-robot-settings").toast("show");

        $('#btn_jog_robot').css('box-shadow', '0 0 5px 3px transparent');
        $('#btn_move_robot').css('box-shadow', '0 0 5px 3px transparent');
        $('#btn_script_robot').css('box-shadow', '0 0 5px 3px transparent');

        $(this).css('box-shadow', '0px 0px 14px 0px rgba(0,152,254,0.6039215686274509');

        showScriptRobot = false;
        showMoveRobot = false;
        showJogRobot = false;
        showSettingsRobot = true;
    }

});


    