var selectedAxis = "";
$('#select_axis').on('change', function () {
    selectedAxis = $("#select_axis option:selected").text();

    if (localStorage.getItem(selectedAxis + '_position') !== null) {

        $("#txt_position_move").val(localStorage.getItem(selectedAxis + '_position'));
        $("#txt_velocity_move").val(localStorage.getItem(selectedAxis + '_velocity'));
        $("#txt_acceleration_move").val(localStorage.getItem(selectedAxis + '_acceleration'));
        $("#txt_deceleration_move").val(localStorage.getItem(selectedAxis + '_deceleration'));

        $("#lbl_move_position_unit").text(axisObj[selectedAxis].position_unit);
        $("#lbl_move_velocity_unit").text(axisObj[selectedAxis].velocity_unit);
        $("#lbl_move_acceleration_unit").text(axisObj[selectedAxis].acceleration_unit);
        $("#lbl_move_deceleration_unit").text(axisObj[selectedAxis].deceleration_unit);

        $("#txt_position_move").attr({
            "max": axisObj[selectedAxis].position_max_limit,
            "min": axisObj[selectedAxis].position_min_limit
        });

        $("#txt_velocity_move").attr({
            "max": axisObj[selectedAxis].velocity_max_limit,
            "min": axisObj[selectedAxis].velocity_min_limit
        });

        $("#txt_acceleration_move").attr({
            "max": axisObj[selectedAxis].acceleration_max_limit,
            "min": axisObj[selectedAxis].acceleration_min_limit
        });

        $("#txt_deceleration_move").attr({
            "max": axisObj[selectedAxis].deceleration_max_limit,
            "min": axisObj[selectedAxis].deceleration_min_limit
        });

    } else {

        localStorage.setItem(selectedAxis + '_position', Number(axisObj[selectedAxis].actual_position).toFixed(4));
        localStorage.setItem(selectedAxis + '_velocity', "20.0");
        localStorage.setItem(selectedAxis + '_acceleration', "20.0");
        localStorage.setItem(selectedAxis + '_deceleration', "20.0");

        $("#txt_position_move").val(localStorage.getItem(selectedAxis + '_position'));
        $("#txt_velocity_move").val(localStorage.getItem(selectedAxis + '_velocity'));
        $("#txt_acceleration_move").val(localStorage.getItem(selectedAxis + '_acceleration'));
        $("#txt_deceleration_move").val(localStorage.getItem(selectedAxis + '_deceleration'));

        $("#lbl_move_position_unit").text(axisObj[selectedAxis].position_unit);
        $("#lbl_move_velocity_unit").text(axisObj[selectedAxis].velocity_unit);
        $("#lbl_move_acceleration_unit").text(axisObj[selectedAxis].acceleration_unit);
        $("#lbl_move_deceleration_unit").text(axisObj[selectedAxis].deceleration_unit);

        $("#txt_position_move").attr({
            "max": axisObj[selectedAxis].position_max_limit,
            "min": axisObj[selectedAxis].position_min_limit
        });

        $("#txt_velocity_move").attr({
            "max": axisObj[selectedAxis].velocity_max_limit,
            "min": axisObj[selectedAxis].velocity_min_limit
        });

        $("#txt_acceleration_move").attr({
            "max": axisObj[selectedAxis].acceleration_max_limit,
            "min": axisObj[selectedAxis].acceleration_min_limit
        });

        $("#txt_deceleration_move").attr({
            "max": axisObj[selectedAxis].deceleration_max_limit,
            "min": axisObj[selectedAxis].deceleration_min_limit
        });
    }
});

$('#txt_position_move').on('input propertychange paste', function () {
    let txt_val = $(this).val().trim();

    if (parseFloat(txt_val) < parseFloat(txt_position_move.min) || parseFloat(txt_val) > parseFloat(txt_position_move.max)) {

        ts_setpoint_error.options.text = "🎯 Position setpoint " + $("#select_axis option:selected").text() + " must between " + this.max + " " + axisObj[$("#select_axis option:selected").text()].position_unit + " and " + this.min + " " + axisObj[$("#select_axis option:selected").text()].position_unit;
        ts_setpoint_error.showToast();

        $(this).val("");
    }
});

$('#txt_velocity_move').on('input propertychange paste', function () {
    let txt_val = $(this).val().trim();

    if (parseFloat(txt_val) < parseFloat(txt_position_move.min) || parseFloat(txt_val) > parseFloat(txt_position_move.max)) {

        ts_setpoint_error.options.text = "🎯 Velocity setpoint " + $("#select_axis option:selected").text() + " must between " + this.max + " " + parent.axisObj[$("#select_axis option:selected").text()].position_unit + " and " + this.min + " " + parent.axisObj[$("#select_axis option:selected").text()].position_unit;
        ts_setpoint_error.showToast();

        $(this).val("");
    }

});

$('#txt_acceleration_move').on('input propertychange paste', function () {
    let txt_val = $(this).val().trim();

    if (parseFloat(txt_val) < parseFloat(txt_position_move.min) || parseFloat(txt_val) > parseFloat(txt_position_move.max)) {

        ts_setpoint_error.options.text = "🎯 Acceleration setpoint " + $("#select_axis option:selected").text() + " must between " + this.max + " " + parent.axisObj[$("#select_axis option:selected").text()].position_unit + " and " + this.min + " " + parent.axisObj[$("#select_axis option:selected").text()].position_unit;
        ts_setpoint_error.showToast();

        $(this).val("");
    }

});

$('#txt_deceleration_move').on('input propertychange paste', function () {
    let txt_val = $(this).val().trim();

    if (parseFloat(txt_val) < parseFloat(txt_position_move.min) || parseFloat(txt_val) > parseFloat(txt_position_move.max)) {

        ts_setpoint_error.options.text = "🎯 Deceleration setpoint " + $("#select_axis option:selected").text() + " must between " + this.max + " " + parent.axisObj[$("#select_axis option:selected").text()].position_unit + " and " + this.min + " " + parent.axisObj[$("#select_axis option:selected").text()].position_unit;
        ts_setpoint_error.showToast();

        $(this).val("");
    }

});

var showMoveRobot = false
$("#btn_move_robot").on("click", function () {
    if (showMoveRobot) {
        $("#toast-move_robot").toast("hide");
        $("#toast_jog_robot").toast("hide");
        $("#toast_script_loader").toast("hide");
        $("#toast-script-robot").toast("hide");

        $('#btn_jog_robot').css('box-shadow', '0 0 5px 3px transparent');
        $('#btn_script_robot').css('box-shadow', '0 0 5px 3px transparent');
        //$('#btn_robot_settings').css('box-shadow', '0 0 5px 3px transparent');

        $(this).css('box-shadow', '0 0 5px 3px transparent');

        showMoveRobot = false;
        showJogRobot = false;
        showScriptRobot = false;
        //showSettingsRobot = false;
    } else {
        $("#toast_jog_robot").toast("hide");
        $("#toast_script_loader").toast("hide");
        $("#toast-script-robot").toast("hide");
        $("#toast-move_robot").toast("show");

        $('#btn_jog_robot').css('box-shadow', '0 0 5px 3px transparent');
        $('#btn_script_robot').css('box-shadow', '0 0 5px 3px transparent');
        //$('#btn_robot_settings').css('box-shadow', '0 0 5px 3px transparent');

        $(this).css('box-shadow', '0px 0px 14px 0px rgba(0,152,254,0.6039215686274509');

        showMoveRobot = true;
        showJogRobot = false;
        showScriptRobot = false;
        //showSettingsRobot = false;
    }
});

$("#txt_position_move").change(function () {

    localStorage.setItem($("#select_axis option:selected").text() + '_position', $(this).val());

});

$("#txt_velocity_move").change(function () {

    localStorage.setItem($("#select_axis option:selected").text() + '_velocity', $(this).val());

});

$("#txt_acceleration_move").change(function () {

    localStorage.setItem($("#select_axis option:selected").text() + '_acceleration', $(this).val());

});

$("#txt_deceleration_move").change(function () {

    localStorage.setItem($("#select_axis option:selected").text() + '_deceleration', $(this).val());

});