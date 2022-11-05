var showStatus = false;
$("#btn_robot_status").on("click", function () {

    if (showStatus) {
        $("#toast-robot_status").toast("hide");
        $(this).css('box-shadow', '0 0 5px 3px transparent');
        showStatus = false;
    } else {
        $("#toast-robot_status").toast("show");
        $(this).css('box-shadow', '0px 0px 14px 0px rgba(0,152,254,0.6039215686274509');
        showStatus = true;
    }


});