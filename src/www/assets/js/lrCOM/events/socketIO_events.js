/*
// ** SocketIO Settings for SSL Function

const socket = io.connect("https://" + self.location.host, {
    secure: true,
    reconnect: true,
    rejectUnauthorized: false});
*/
var connected = false;
var reload_on_reconnect = true;
var firstCall = true;
const socket = io("http://" + self.location.host);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var last;
function send() {
    last = new Date;
    socket.emit('ping_from_client');
    $('#transport').text(socket.io.engine.transport.name);
}

socket.on("*", (data) => {
    console.log(data);
});

socket.on("connect", () => {
    console.log("Connected with SocketID: " + socket.id);
    connected = true;

    if (!reload_on_reconnect) {

        ts_disconnect.hideToast();
        ts_disconnected_show = false;

        window.location.reload();
        reload_on_reconnect = true;

    }
    send();

});

socket.on("servo_enable", (data) => {
    console.log("Received: " + data);
});

socket.on("refresh_page", () => {

    document.getElementById("robot_toolbar").style.display = "none";
    document.getElementById("linrob_footer").style.display = "none";

    var iframe = document.getElementById('content');
    document.getElementById('content').src = iframe.src;
});

socket.on("disconnect", () => {

    console.log("Disconnected from linrob Robot!");

    connected = false;
    reload_on_reconnect = false;

});

socket.on("connect_error", () => {

    console.log("Lost connection to linrob Robot, try to reconnect!");
    connected = false;

    if (!ts_disconnected_show) {
        ts_disconnect.showToast();
        ts_disconnected_show = true;
    }


});

socket.on('pong_from_server', function () {
    var latency = new Date - last;
    setTimeout(send, 100);
    communication_latency = latency + ' ms';
});

var ts_STO = [];
var robotLogData = "";
socket.on("get_servo_state_all", (data) => {

    const obj = JSON.parse(data);

    guiModel = obj.gui_model;
    var msg = "";
    
    window.document.title = 'LR - Motion Center' + ' [ ' + obj.name + ' ]';
    axisObj = obj.axis;
    robotLogData = obj.log_data;
    
    if (firstCall) {
        $('#lbl_move_position').css('visibility', 'visible');
        $('#lbl_move_velocity').css('visibility', 'visible');
        $('#lbl_move_acceleration').css('visibility', 'visible');
        $('#lbl_move_deceleration').css('visibility', 'visible');

        $('#txt_position_move').css('visibility', 'visible');
        $('#txt_velocity_move').css('visibility', 'visible');
        $('#txt_acceleration_move').css('visibility', 'visible');
        $('#txt_deceleration_move').css('visibility', 'visible');

        $('#btn_move_to_position').css('visibility', 'visible');
        $('#btn_enable_move').css('visibility', 'visible');
        $('#led_move_status').css('visibility', 'visible');
        $('#led_move_simulation').css('visibility', 'hidden');
        console.log("Add Controller Select Options...");
        $('#select_gamepad_ls').append(
            $('<optgroup>', {
            label: "Common",
            id: "Common"}),

            $('<option>', {
                value: " ",
                id:" ",
                text: "not assigned"}),
                
            $('<option>', {
                value: "enable_all_axis",
                id:"enable_all_axis",
                text: "Enable [all Axes]"}),
            );

        $('#select_gamepad_rs').append(
            $('<optgroup>', {
            label: "Common",
            id: "Common"}),

            $('<option>', {
                value: " ",
                id:" ",
                text: "not assigned"}),
                
            $('<option>', {
                value: "enable_all_axis",
                id:"enable_all_axis",
                text: "Enable [all Axes]"}),
            );

        $('#select_gamepad_lt').append(
            $('<optgroup>', {
            label: "Common",
            id: "Common"}),

            $('<option>', {
                value: " ",
                id:" ",
                text: "not assigned"}),
                
            $('<option>', {
                value: "enable_all_axis",
                id:"enable_all_axis",
                text: "Enable [all Axes]"}),
            );

        $('#select_gamepad_rt').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );
        
        $('#select_gamepad_a').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_b').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_x').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_y').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_left0').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_right0').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_up0').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_down0').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_left1').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_right1').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_up1').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        $('#select_gamepad_down1').append(
                $('<optgroup>', {
                label: "Common",
                id: "Common"}),
    
                $('<option>', {
                    value: " ",
                    id:" ",
                    text: "not assigned"}),
                    
                $('<option>', {
                    value: "enable_all_axis",
                    id:"enable_all_axis",
                    text: "Enable [all Axes]"}),
                );

        
        

        for (var key in axisObj) {
            
            $('#select_gamepad_ls').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );
                
            $('#select_gamepad_rs').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );

            $('#select_gamepad_lt').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );

            $('#select_gamepad_rt').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );

            $('#select_gamepad_a').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );
            
            $('#select_gamepad_b').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );

            $('#select_gamepad_x').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );

            $('#select_gamepad_y').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );
            
            $('#select_gamepad_left0').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );

            $('#select_gamepad_right0').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );

            $('#select_gamepad_up0').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );

            $('#select_gamepad_down0').append(
                $('<optgroup>', {
                label: axisObj[key].name,
                id: "optgroup_" + axisObj[key].name}),
                    
                $('<option>', {
                    value: 'enable_axis:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Enable [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_positive:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Positive [" + axisObj[key].name + "]"}),

                $('<option>', {
                    value: 'jog_axis_negative:' + axisObj[key].name,
                    id:axisObj[key].name,
                    text: "Jog Negative [" + axisObj[key].name + "]"}),    
                
                );

            $('#select_gamepad_left1').append(
                    $('<optgroup>', {
                    label: axisObj[key].name,
                    id: "optgroup_" + axisObj[key].name}),
                        
                    $('<option>', {
                        value: 'enable_axis:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Enable [" + axisObj[key].name + "]"}),
    
                    $('<option>', {
                        value: 'jog_axis_positive:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Jog Positive [" + axisObj[key].name + "]"}),
    
                    $('<option>', {
                        value: 'jog_axis_negative:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Jog Negative [" + axisObj[key].name + "]"}),    
                    
                );
    
            $('#select_gamepad_right1').append(
                    $('<optgroup>', {
                    label: axisObj[key].name,
                    id: "optgroup_" + axisObj[key].name}),
                        
                    $('<option>', {
                        value: 'enable_axis:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Enable [" + axisObj[key].name + "]"}),
    
                    $('<option>', {
                        value: 'jog_axis_positive:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Jog Positive [" + axisObj[key].name + "]"}),
    
                    $('<option>', {
                        value: 'jog_axis_negative:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Jog Negative [" + axisObj[key].name + "]"}),    
                    
                );
    
            $('#select_gamepad_up1').append(
                    $('<optgroup>', {
                    label: axisObj[key].name,
                    id: "optgroup_" + axisObj[key].name}),
                        
                    $('<option>', {
                        value: 'enable_axis:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Enable [" + axisObj[key].name + "]"}),
    
                    $('<option>', {
                        value: 'jog_axis_positive:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Jog Positive [" + axisObj[key].name + "]"}),
    
                    $('<option>', {
                        value: 'jog_axis_negative:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Jog Negative [" + axisObj[key].name + "]"}),    
                    
                );
    
            $('#select_gamepad_down1').append(
                    $('<optgroup>', {
                    label: axisObj[key].name,
                    id: "optgroup_" + axisObj[key].name}),
                        
                    $('<option>', {
                        value: 'enable_axis:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Enable [" + axisObj[key].name + "]"}),
    
                    $('<option>', {
                        value: 'jog_axis_positive:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Jog Positive [" + axisObj[key].name + "]"}),
    
                    $('<option>', {
                        value: 'jog_axis_negative:' + axisObj[key].name,
                        id:axisObj[key].name,
                        text: "Jog Negative [" + axisObj[key].name + "]"}),    
                    
                );
                
            let ts_emcy = new ToastEMCY;
            ts_emcy.options.text = "✋ " + key + " Emergency Stop Active!";

            let sto_ts_obj = { name: key, ts_emcy: ts_emcy, show: false };

            ts_STO.push(sto_ts_obj);

            $('#select_axis').append($('<option>', {
                value: key,
                text: key
            }));

            // Create Jog Toast Elements for every Axis
            var jogAxisLabelName = document.createElement("label");
            jogAxisLabelName.innerHTML = '[ ' + key + ' ]';
            jogAxisLabelName.className = "form-label noselect";
            jogAxisLabelName.style = 'padding-left: 0px;color: var(--bs-white);padding-bottom: 5px;margin-top: 5px;padding-top: 10px;margin-bottom: 10px;margin-left: 132px;margin-right: 15px;'

            var jogStatusLed = '<div id="led_jog_status_' + key + '" class="tada animated infinite led-grey noselect" data="' + key + '" style="position: static;display: inline-block;" data-toggle="tooltip" data-placement="top" title=""></div>'

            var jogSimulationLed = '<div id="led_jog_simulation_led_' + key + '" class="led-red noselect" data-bs-toggle="tooltip" data-bs-placement="right" data="' + key + '" style="position: static;display: inline-block;margin-left: 15px;" title="Status"></div>'

            var jogPositiveButton = '<button id="btn_jog_positive_' + key + '" class="jogBtn noselect" type="button" data="' + key + '" style="color: var(--bs-white);font-size: 14px; background: #000000;border-style: none;border-radius: 11px;height: 4em;width: 7em;font-size: 14px;--bs-primary: transparent;--bs-primary-rgb: 0,0,0;color: rgb(31,31,31);margin-left: 10px;margin-right: 5px;" onclick><strong style="color: var(--bs-white);"><svg id="jogPositiveButton_icon" class="noselect" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="width: 3vw;margin-right: 1%;font-size: 25px;color: #d1d1d1;height: 3vh;"><path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor"></path></svg></strong></button>'

            var jogEnableButton = '<button id="btn_jog_enable_' + key + '" class="jogBtn noselect" type="button" state="Enabled" data="' + key + '" class="noselect"; style="color:white; background: #000000;border-style: none;border-radius: 11px;height: 4em;width: 7em;font-size: 14px;--bs-primary: transparent;--bs-primary-rgb: 0,0,0;color: #d1d1d1;margin-right: 10px;margin-left: 10px;" onclick><strong style="color: var(--bs-white);"></strong>Enable</button>'

            var jogNegativeButton = '<button id="btn_jog_negative_' + key + '" class="jogBtn noselect" type="button" data="' + key + '" style="background: #000000;border-style: none;border-radius: 11px;height: 4em;width: 7em;font-size: 14px;--bs-primary: transparent;--bs-primary-rgb: 0,0,0;color: rgb(31,31,31);margin-right: 10px;margin-left: 5px;" onclick><strong style="color: var(--bs-white);"><svg id="jogNegativeButton_icon" class="noselect" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="width: 3vw;margin-right: 1%;font-size: 25px;color: #d1d1d1;height: 3vh;"><path d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="currentColor"></path></svg></strong></button>'

            var jogOverrideSlider = '<input id="jog_override_slider_' + key + '" class="form-range" type="range" style="margin-top: 10px;" max="100" min="1" step="1" value="50" data="' + key + ' "/>'

            var jogOverrideLabel = '<label id="jog_override_label_' + key + '" class="form-label noselect" style="margin-bottom: 20px;color: var(--bs-white);margin-right: 0px;margin-left: 145px;">50%</label>'

            // Add Event Handler
            $("#toast_jog_body").append(jogAxisLabelName, jogStatusLed, jogSimulationLed, jogPositiveButton, jogEnableButton, jogNegativeButton, jogOverrideSlider, jogOverrideLabel);      // Append the new elements

            $(document).on('input', '#jog_override_slider_' + key, function () {
                var labelName = "#jog_override_label_" + $(this).attr("data");
                $(labelName).html($(this).val() + "%");
            });

            var jogEnableFlag = false;

            var _script_enable_jog_debounce_btn = debounce(function () {
                if (!jogEnableFlag) {
                    jogEnableFlag = true;
                    setTimeout(function () { jogEnableFlag = false; }, 100);
                    enableDisableServo($(this).attr("data"), 19);
                }

                return false
            }, 250);

            $("#btn_jog_enable_" + key).bind('touchend mousedown', _script_enable_jog_debounce_btn);

            var negativeDownFlag = false;
            $("#btn_jog_negative_" + key).bind('touchstart mousedown', function () {
                if (!negativeDownFlag) {
                    negativeDownFlag = true;
                    setTimeout(function () { negativeDownFlag = false; }, 100);
                    let axisName = $(this).attr("data");
                    jogNegative(axisName, $('#jog_override_slider_' + axisName).val());
                }

                return false
            });

            var negativeUpFlag = false;
            $("#btn_jog_negative_" + key).bind('touchend mouseup mouseleave', function () {
                if (!negativeUpFlag) {
                    negativeUpFlag = true;
                    setTimeout(function () { negativeUpFlag = false; }, 100);
                    let axisName = $(this).attr("data");
                    stopJog(axisName);

                }

                return false
            });

            var positiveDownFlag = false;
            $("#btn_jog_positive_" + key).bind('touchstart mousedown', function () {
                if (!positiveDownFlag) {
                    positiveDownFlag = true;
                    setTimeout(function () { positiveDownFlag = false; }, 100);
                    let axisName = $(this).attr("data");
                    jogPositive(axisName, $('#jog_override_slider_' + axisName).val());
                }

                return false
            });

            var positiveUpFlag = false;
            $("#btn_jog_positive_" + key).bind('touchend mouseup mouseleave', function () {
                if (!positiveUpFlag) {
                    positiveUpFlag = true;
                    setTimeout(function () { positiveUpFlag = false; }, 100);
                    let axisName = $(this).attr("data");
                    stopJog(axisName);

                }

                return false
            });
            $('#select_axis').trigger("change");

        }
        console.log("Adding Class for AutoStore!");
        $('#select_gamepad_ls').loadState();
        $('#select_gamepad_rs').loadState();
        $('#select_gamepad_lt').loadState();
        $('#select_gamepad_rt').loadState();

        $('#select_gamepad_a').loadState();
        $('#select_gamepad_b').loadState();
        $('#select_gamepad_x').loadState();
        $('#select_gamepad_y').loadState();

        $('#select_gamepad_left0').loadState();
        $('#select_gamepad_right0').loadState();
        $('#select_gamepad_up0').loadState();
        $('#select_gamepad_down0').loadState();

        $('#select_gamepad_left1').loadState();
        $('#select_gamepad_right1').loadState();
        $('#select_gamepad_up1').loadState();
        $('#select_gamepad_down1').loadState();

        firstCall = false;
    }

});

socket.on("notify_user", (data) => {
    if (data.includes("info")) {
        notifyInfo(data);

    }
    else if (data.includes("error")) {
        notifyError(data);
    }
    else if (data.includes("successfull")) {
        notifySuccess(data);
    }

});

socket.on("actual_script_line", (data) => {
    actual_script_line = data;
    var info = editor.lineInfo(data);
    editor.clearGutter("breakpoints");
    editor.setGutterMarker(data, "breakpoints", makeMarker());
});

socket.on("actual_script_state", (data) => {

    scriptState = JSON.parse(data);
});

var script_files = [];
socket.on('get_script_files', function (data) {

    script_files = data;
    //create_list_items();
});

socket.on('load_script_file', function (data) {
    editor.setValue(data.toString());
    //$("#txt_script_header").text(scriptState['activeScriptFile']);
});

socket.on('load_script_preview', function (data) {

    editor_preview.setValue(data.toString());
    editor_preview.save();
    editor_preview.refresh();

});

//********************** Emit Events **********************

function upload_script(json_prog) {
    socket.emit("upload_script", json_prog);
}

function jogPositive(axisName, vel) {
    
    const json = '{"cmd":"jog_servo","axis":"not defined" , "velocity":0.0}';
    const obj = JSON.parse(json);
    obj['axis'] = axisName;
    obj['velocity'] = vel;
    console.log(obj);
    socket.emit("jog_servo", obj);

}

function jogNegative(axisName, vel) {

    const json = '{"cmd":"jog_servo","axis":"not defined" , "velocity":0.0}';
    const obj = JSON.parse(json);
    obj['axis'] = axisName;
    obj['velocity'] = vel  * -1;
    console.log(obj);
    socket.emit("jog_servo", obj);

}

function shutDownRobot() {
    socket.emit("ShutDown", "null");
}

function moveToPos() {

    if (localStorage.getItem($("#select_axis option:selected").text() + '_position') &&
        localStorage.getItem($("#select_axis option:selected").text() + '_velocity') &&
        localStorage.getItem($("#select_axis option:selected").text() + '_acceleration') &&
        localStorage.getItem($("#select_axis option:selected").text() + '_deceleration') != ""
    ) {

        $(this).css('box-shadow', '0px 0px 14px 0px rgba(0,152,254,0.6039215686274509');

        const json = '{"cmd":"move_l","axis":"none", "position":0 ,"velocity":0,"acceleration":0,"deceleration":0}';
        const obj = JSON.parse(json);
        obj['axis'] = $("#select_axis option:selected").text();
        obj['position'] = localStorage.getItem($("#select_axis option:selected").text() + '_position');
        obj['velocity'] = localStorage.getItem($("#select_axis option:selected").text() + '_velocity');
        obj['acceleration'] = localStorage.getItem($("#select_axis option:selected").text() + '_acceleration');
        obj['deceleration'] = localStorage.getItem($("#select_axis option:selected").text() + '_deceleration');
        socket.emit("move_l", obj);

    } else {

        ts_setpoint_hint.showToast();
    }

}

function removeShadow() {
    $(this).css('box-shadow', '0 0 5px 3px transparent');
}

function stopJog(axisName) {
    const json = '{"cmd":"jog_servo","axis":"not defined", "velocity":0}';
    const obj = JSON.parse(json);
    obj['axis'] = axisName;
    socket.emit("jog_servo", obj);
}

function homeAxis(axisName) {
    const json = '{"cmd":"home_servo","axis":"not defined", "position":0.0}';

    const obj = JSON.parse(json);
    obj['axis'] = axisName;
    console.log(obj);
    socket.emit("home_servo", obj);

    ts_script_home_axis.options.text = "🚀 Home " + axisName;
    ts_script_home_axis.showToast();

}

function enableServo(axisName) {
    const json = '{"cmd":"enable_servo","axis":"axis"}';
    const obj = JSON.parse(json);
    obj['axis'] = axisName;
    console.log(obj);
    socket.emit("enable_servo", obj);

    ts_enable_servo.options.text = "🟢 Enable " + axisName;

    try{    
        ts_enable_servo.hideToast();
    } catch {}

    try{    
        ts_disable_servo.hideToast();
    } catch {}

    ts_enable_servo.showToast();

}

function disableServo(axisName) {
    const json = '{"cmd":"disable_servo","axis":"axis"}';
    const obj = JSON.parse(json);
    obj['axis'] = axisName;
    console.log(obj);
    socket.emit("disable_servo", obj);
    try{    
        ts_enable_servo.hideToast();
    } catch {}

    try{    
        ts_disable_servo.hideToast();
    } catch {}
    
    ts_disable_servo.options.text = "🔴 Disable " + axisName;
    ts_disable_servo.showToast();

}

function enableDisableServo(axisName, mode) {
    const json = '{"cmd":"enable_servo","axis":"axis", "opMode":0}';
    const obj = JSON.parse(json);
    obj['opMode'] = mode;
    obj['axis'] = axisName;

    for (var key in axisObj) {
        if (axisObj[axisName].actual_state == "Enabled") {
            obj['cmd'] = "disable_servo";

            socket.emit("disable_servo", obj);

            ts_disable_servo.options.text = "🔴 Disable " + axisName;
            ts_disable_servo.showToast();
            break
        } else {

            socket.emit("enable_servo", obj);

            ts_enable_servo.options.text = "🟢 Enable " + axisName;
            ts_enable_servo.showToast();
            break
        }
    }
}

function enableDisableMove() {
    console.log("Disable Servo: " + $("#select_axis option:selected").text())
    enableDisableServo($("#select_axis option:selected").text(), 20);
}

function disableMoveControls() {
    
    $(btn_enable_move).prop("disabled", true);
    $(btn_move_to_position).prop("disabled", true);
    $(txt_position_move).prop("disabled", true);
    $(txt_velocity_move).prop("disabled", true);
    $(txt_acceleration_move).prop("disabled", true);
    $(txt_deceleration_move).prop("disabled", true);
    
}

function enableMoveControls() {
    $(btn_enable_move).prop("disabled", false);
    $(btn_move_to_position).prop("disabled", false);
    $(txt_position_move).prop("disabled", false);
    $(txt_velocity_move).prop("disabled", false);
    $(txt_acceleration_move).prop("disabled", false);
    $(txt_deceleration_move).prop("disabled", false);


}

function enableAllServos(mode) {
    const json = '{"cmd":"enable_all_servos", "opMode" : 0}';
    const obj = JSON.parse(json);
    obj['opMode'] = mode;
    console.log(obj);
    socket.emit("enable_all_servos", obj);

    try{ts_disable_robot.hideToast(); 
    }
    catch{}

    ts_enable_robot.showToast();
}

function disableAllServos() {
    const jsonStop = '{"cmd":"_set_stop_script", "value": "True"}';
    const objStop = JSON.parse(jsonStop);
    socket.emit("sc_state", objStop);

    const json = '{"cmd":"disable_all_servos"}';
    const obj = JSON.parse(json);
    console.log(obj);
    socket.emit("disable_all_servos", obj);

    ts_disable_robot.showToast();

    try{ts_enable_robot.hideToast(); 
    }
    catch{}

    try {
        ts_script_play.hideToast();
    } catch { }
}




