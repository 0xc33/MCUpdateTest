$(document).on('input', '#range_overrideSpeed', function () {
    $('#lbl_slider_val').html($(this).val() + "%");
});

var showJogRobot = false
$("#btn_jog_robot").on("click", function () {
    if (showJogRobot) {

        $("#toast-move_robot").toast("hide");
        $("#toast_jog_robot").toast("hide");
        $("#toast_script_loader").toast("hide");
        $("#toast-script-robot").toast("hide");

        $('#btn_move_robot').css('box-shadow', '0 0 5px 3px transparent');
        $('#btn_script_robot').css('box-shadow', '0 0 5px 3px transparent');

        $(this).css('box-shadow', '0 0 5px 3px transparent');

        showJogRobot = false;
        showMoveRobot = false;
        showScriptRobot = false;
        //showSettingsRobot = false;

    }
    else {

        $('#modal_safety_warning').modal('show');

    }
});


$("#btn_safety_jog_accept").bind('touchstart mousedown', function () {

    $('#modal_safety_warning').modal('hide');
    $("#toast_jog_robot").toast("show");
    $("#toast-move_robot").toast("hide");
    $("#toast_script_loader").toast("hide");
    $("#toast-script-robot").toast("hide");
    $('#btn_move_robot').css('box-shadow', '0 0 5px 3px transparent');
    $('#btn_script_robot').css('box-shadow', '0 0 5px 3px transparent');
    //$('#btn_robot_settings').css('box-shadow', '0 0 5px 3px transparent');

    $("#btn_jog_robot").css('box-shadow', '0px 0px 14px 0px rgba(0,152,254,0.6039215686274509');

    showJogRobot = true;
    showMoveRobot = false;
    showScriptRobot = false;
    //showSettingsRobot = false;

});

/*
var buttons = $("#btn_move_to_position,#txt_position_move,#txt_velocity_move, #txt_acceleration_move,txt_deceleration_move");
    buttons.click(function () {
        console.log("Disable Buttons?");
        buttons.prop("disabled", true);
})
*/
