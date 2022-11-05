var scriptState = {};

$("#btn_script_robot").on("click", function () {
    _showScriptRobot();
});

$("#btn_close_script").on("click", function () {
    _showScriptRobot();
});

$("#btn_script_loader_close").on("click", function () {
    $("#toast_script_loader").toast("hide");
    $("#toast-script-robot").toast("show");;
});

var showScriptRobot = false
function _showScriptRobot() {
    if (showScriptRobot) {
        $("#toast-move_robot").toast("hide");
        $("#toast_jog_robot").toast("hide");
        $("#toast-script-robot").toast("hide");
        $("#toast_script_loader").toast("hide");
        $("#toast_mc_settings").toast("hide");

        $('#btn_move_robot').css('box-shadow', '0 0 5px 3px transparent');
        $('#btn_jog_robot').css('box-shadow', '0 0 5px 3px transparent');
        //$('#btn_robot_settings').css('box-shadow', '0 0 5px 3px transparent');

        $('#btn_script_robot').css('box-shadow', '0 0 5px 3px transparent');

        showScriptRobot = false;
        showMoveRobot = false;
        showJogRobot = false;
        //showSettingsRobot = false;

    } else {
        $("#toast_jog_robot").toast("hide");
        $("#toast-move_robot").toast("hide");
        $("#toast_script_loader").toast("hide");
        $("#toast_mc_settings").toast("hide");
        $("#toast-script-robot").toast("show");

        $('#btn_jog_robot').css('box-shadow', '0 0 5px 3px transparent');
        $('#btn_move_robot').css('box-shadow', '0 0 5px 3px transparent');
        //$('#btn_robot_settings').css('box-shadow', '0 0 5px 3px transparent');

        $('#btn_script_robot').css('box-shadow', '0px 0px 14px 0px rgba(0,152,254,0.6039215686274509');

        showScriptRobot = true;
        showMoveRobot = false;
        showJogRobot = false;
        //showSettingsRobot = false;

    }
}