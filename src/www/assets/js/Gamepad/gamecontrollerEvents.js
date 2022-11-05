var gamepad_enable_axis = false;

gameControl.on('connect', function (gamepad) {
    ts_gamepad_connected.showToast();





    gamepad.before('button0', function () {
        var fnstring = $('#select_gamepad_a option:selected').val();
        var axisID = $('#select_gamepad_a option:selected').attr("id")
        var fn = window[fnstring];
        if (typeof fn === "function") fn.apply(null, ["before", axisID]);
    });

    gamepad.on('button0', function () {
        var fnstring = $('#select_gamepad_a option:selected').val();
        var axisID = $('#select_gamepad_a option:selected').attr("id")
        var fn = window[fnstring];
        if (typeof fn === "function") fn.apply(null, ["on", axisID]);
    });

    gamepad.after('button0', function () {
        var fnstring = $('#select_gamepad_a option:selected').val();
        var axisID = $('#select_gamepad_a option:selected').attr("id")
        var fn = window[fnstring];
        if (typeof fn === "function") fn.apply(null, ["after", axisID]);
    });






    gamepad.before('button1', function () {

        var fnstring = $('#select_gamepad_b option:selected').val();
        var axisID = $('#select_gamepad_b option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);
    });

    gamepad.on('button1', function () {

        var fnstring = $('#select_gamepad_b option:selected').val();
        var axisID = $('#select_gamepad_b option:selected').attr("id")
        var fn = window[fnstring];
        
        if (typeof fn === "function") fn.apply(null, ["on", axisID]);
    });

    gamepad.after('button1', function () {

        var fnstring = $('#select_gamepad_b option:selected').val();
        var axisID = $('#select_gamepad_b option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);
    });





    gamepad.before('button2', function () {

        var fnstring = $('#select_gamepad_x option:selected').val();
        var axisID = $('#select_gamepad_x option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('button2', function () {

        var fnstring = $('#select_gamepad_x option:selected').val();
        var axisID = $('#select_gamepad_x option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);
    });

    gamepad.after('button2', function () {

        var fnstring = $('#select_gamepad_x option:selected').val();
        var axisID = $('#select_gamepad_x option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });




    gamepad.before('button3', function () {

        var fnstring = $('#select_gamepad_y option:selected').val();
        var axisID = $('#select_gamepad_y option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('button3', function () {

        var fnstring = $('#select_gamepad_y option:selected').val();
        var axisID = $('#select_gamepad_y option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);

    });

    gamepad.after('button3', function () {

        var fnstring = $('#select_gamepad_y option:selected').val();
        var axisID = $('#select_gamepad_y option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });




    gamepad.before('button4', function (gamepad) {
        var fnstring = $('#select_gamepad_lt option:selected').val();
        var axisID = $('#select_gamepad_lt option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('button4', function (gamepad) {
        var fnstring = $('#select_gamepad_lt option:selected').val();
        var axisID = $('#select_gamepad_lt option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);

    });

    gamepad.after('button4', function (gamepad) {
        var fnstring = $('#select_gamepad_lt option:selected').val();
        var axisID = $('#select_gamepad_lt option:selected').attr("id")
        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });



    gamepad.before('l2', function (gamepad) {
        var fnstring = $('#select_gamepad_ls option:selected').val();
        var axisID = $('#select_gamepad_ls option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);
    });

    gamepad.on('l2', function (gamepad) {
        var fnstring = $('#select_gamepad_ls option:selected').val();
        var axisID = $('#select_gamepad_ls option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);
    });

    gamepad.after('l2', function (gamepad) {
        var fnstring = $('#select_gamepad_ls option:selected').val();
        var axisID = $('#select_gamepad_ls option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);
    });





    gamepad.before('button5', function (gamepad) {

        var fnstring = $('#select_gamepad_rt option:selected').val();
        var axisID = $('#select_gamepad_rt option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);
    });

    gamepad.on('button5', function (gamepad) {

        var fnstring = $('#select_gamepad_rt option:selected').val();
        var axisID = $('#select_gamepad_rt option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);

    });

    gamepad.after('button5', function (gamepad) {

        var fnstring = $('#select_gamepad_rt option:selected').val();
        var axisID = $('#select_gamepad_rt option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });





    gamepad.before('r2', function (gamepad) {

        var fnstring = $('#select_gamepad_rs option:selected').val();
        var axisID = $('#select_gamepad_rs option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);
    });

    gamepad.on('r2', function (gamepad) {

        var fnstring = $('#select_gamepad_rs option:selected').val();
        var axisID = $('#select_gamepad_rs option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);
    });

    gamepad.after('r2', function (gamepad) {

        var fnstring = $('#select_gamepad_rs option:selected').val();
        var axisID = $('#select_gamepad_rs option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });




    gamepad.before('left0', function (gamepad) {

        var fnstring = $('#select_gamepad_left0 option:selected').val();
        var axisID = $('#select_gamepad_left0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('left0', function (gamepad) {

        var fnstring = $('#select_gamepad_left0 option:selected').val();
        var axisID = $('#select_gamepad_left0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);

    });

    gamepad.after('left0', function (gamepad) {

        var fnstring = $('#select_gamepad_left0 option:selected').val();
        var axisID = $('#select_gamepad_left0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });





    gamepad.before('right0', function (gamepad) {

        var fnstring = $('#select_gamepad_right0 option:selected').val();
        var axisID = $('#select_gamepad_right0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('right0', function (gamepad) {

        var fnstring = $('#select_gamepad_right0 option:selected').val();
        var axisID = $('#select_gamepad_right0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);


    });

    gamepad.after('right0', function (gamepad) {

        var fnstring = $('#select_gamepad_right0 option:selected').val();
        var axisID = $('#select_gamepad_right0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);


    });




    gamepad.before('up0', function (gamepad) {

        var fnstring = $('#select_gamepad_up0 option:selected').val();
        var axisID = $('#select_gamepad_up0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('up0', function (gamepad) {

        var fnstring = $('#select_gamepad_up0 option:selected').val();
        var axisID = $('#select_gamepad_up0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);


    });

    gamepad.after('up0', function (gamepad) {

        var fnstring = $('#select_gamepad_up0 option:selected').val();
        var axisID = $('#select_gamepad_up0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });




    gamepad.before('down0', function (gamepad) {

        var fnstring = $('#select_gamepad_down0 option:selected').val();
        var axisID = $('#select_gamepad_down0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('down0', function (gamepad) {

        var fnstring = $('#select_gamepad_down0 option:selected').val();
        var axisID = $('#select_gamepad_down0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);


    });

    gamepad.after('down0', function (gamepad) {

        var fnstring = $('#select_gamepad_down0 option:selected').val();
        var axisID = $('#select_gamepad_down0 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });


    gamepad.before('left1', function (gamepad) {

        var fnstring = $('#select_gamepad_left1 option:selected').val();
        var axisID = $('#select_gamepad_left1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('left1', function (gamepad) {

        var fnstring = $('#select_gamepad_left1 option:selected').val();
        var axisID = $('#select_gamepad_left1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);

    });

    gamepad.after('left1', function (gamepad) {

        var fnstring = $('#select_gamepad_left1 option:selected').val();
        var axisID = $('#select_gamepad_left1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });





    gamepad.before('right1', function (gamepad) {

        var fnstring = $('#select_gamepad_right1 option:selected').val();
        var axisID = $('#select_gamepad_right1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('right1', function (gamepad) {

        var fnstring = $('#select_gamepad_right1 option:selected').val();
        var axisID = $('#select_gamepad_right1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);


    });

    gamepad.after('right1', function (gamepad) {

        var fnstring = $('#select_gamepad_right1 option:selected').val();
        var axisID = $('#select_gamepad_right1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);


    });




    gamepad.before('up1', function (gamepad) {

        var fnstring = $('#select_gamepad_up1 option:selected').val();
        var axisID = $('#select_gamepad_up1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('up1', function (gamepad) {

        var fnstring = $('#select_gamepad_up1 option:selected').val();
        var axisID = $('#select_gamepad_up1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);


    });

    gamepad.after('up1', function (gamepad) {

        var fnstring = $('#select_gamepad_up1 option:selected').val();
        var axisID = $('#select_gamepad_up1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });




    gamepad.before('down1', function (gamepad) {

        var fnstring = $('#select_gamepad_down1 option:selected').val();
        var axisID = $('#select_gamepad_down1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["before", axisID]);

    });

    gamepad.on('down1', function (gamepad) {

        var fnstring = $('#select_gamepad_down1 option:selected').val();
        var axisID = $('#select_gamepad_down1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["on", axisID]);


    });

    gamepad.after('down1', function (gamepad) {

        var fnstring = $('#select_gamepad_down1 option:selected').val();
        var axisID = $('#select_gamepad_down1 option:selected').attr("id")
        var fn = window[fnstring.replace(":" + axisID, "")];

        if (typeof fn === "function") fn.apply(null, ["after", axisID]);

    });




});

gameControl.on('disconnect', gamepad => {
    console.warn('Gamepad was disconnected!');

    ts_gamepad_connected.hideToast();
    ts_gamepad_disconnected.showToast();

});

function enable_axis(event_type, axis){
    switch(event_type) {
        case "before":
            if (scriptState['stop']) {
                enableServo(axis);
            }
          break;
        case "on":
            gamepad_enable_axis = true;
          break;
        case "after":
            if (scriptState['stop']) {
                gamepad_enable_axis = false;
                disableServo(axis);
            }
          break;

        default:
          break;
      }
};

function jog_axis_positive(event_type, axis){
    switch(event_type) {
        case "before":
            if (gamepad_enable_axis && scriptState['stop']) {
                
                //gamepad_enable_axis = false;
                jogPositive(axis, 20);
            }
        
          break;
        case "on":
          break;
        case "after":
            gamepad_enable_axis = false;
            jogPositive(axis, 0);
          break;

        default:
          break;
      }
};

function jog_axis_negative(event_type, axis){
    switch(event_type) {
        case "before":
            if (gamepad_enable_axis && scriptState['stop']) {
                //gamepad_enable_axis = false;
                jogNegative(axis, 20);
            }
        
          break;
        case "on":
          break;
        case "after":
            gamepad_enable_axis = false;
            jogNegative(axis, 0);
          break;

        default:
          break;
      }
};

function enable_all_axis(event_type, axis){
    switch(event_type) {
        case "before":
            if (scriptState['stop']) {
                enableAllServos(19);
            }
          break;

        case "on":
            gamepad_enable_axis = true;
          break;

        case "after":
            if (scriptState['stop']) {
                gamepad_enable_axis = false;
            disableAllServos();
            }
            
          break;

        default:
          break;
      }
};

/*

$('#select_gamepad_ls').change(function() {
    localStorage.setItem('data_controllerBtn_ls', $('#select_gamepad_ls option:selected').outerHTML());
   // localStorage.setItem('data_controllerBtn_ls_text', $('#select_gamepad_ls option:selected').text());
    //localStorage.setItem('data_controllerBtn_ls_id', $('#select_gamepad_ls option:selected').attr('id'));
    //console.log($('#select_gamepad_ls option:selected').val());
    //console.log($('#select_gamepad_ls option:selected').text());
   // console.log($('#select_gamepad_ls option:selected').attr('id'));
});

$('#select_gamepad_rs').change(function() {
    localStorage.setItem('data_controllerBtn_rs_val', $('#select_gamepad_rs option:selected').val());
    localStorage.setItem('data_controllerBtn_rs_text', $('#select_gamepad_rs option:selected').text());
});

$('#select_gamepad_lt').change(function() {
    localStorage.setItem('data_controllerBtn_lt_val', $('#select_gamepad_lt option:selected').val());
    localStorage.setItem('data_controllerBtn_lt_text', $('#select_gamepad_lt option:selected').text());
});

$('#select_gamepad_rt').change(function() {
    localStorage.setItem('data_controllerBtn_rt_val', $('#select_gamepad_rt option:selected').val());
    localStorage.setItem('data_controllerBtn_rt_text', $('#select_gamepad_rt option:selected').text());
});





$('#select_gamepad_a').change(function() {
    localStorage.setItem('data_controllerBtn_a_val', $('#select_gamepad_a option:selected').val());
    localStorage.setItem('data_controllerBtn_a_text', $('#select_gamepad_a option:selected').text());
});

$('#select_gamepad_b').change(function() {
    localStorage.setItem('data_controllerBtn_b_val', $('#select_gamepad_b option:selected').val());
    localStorage.setItem('data_controllerBtn_b_text', $('#select_gamepad_b option:selected').text());
});

$('#select_gamepad_x').change(function() {
    localStorage.setItem('data_controllerBtn_x_val', $('#select_gamepad_x option:selected').val());
    localStorage.setItem('data_controllerBtn_x_text', $('#select_gamepad_x option:selected').text());
});

$('#select_gamepad_y').change(function() {
    localStorage.setItem('data_controllerBtn_y_val', $('#select_gamepad_y option:selected').val());
    localStorage.setItem('data_controllerBtn_y_text', $('#select_gamepad_y option:selected').text());
});





$('#select_gamepad_left0').change(function() {
    localStorage.setItem('data_controllerBtn_left0_val', $('#select_gamepad_left0 option:selected').val());
    localStorage.setItem('data_controllerBtn_left0_text', $('#select_gamepad_left0 option:selected').text());
});

$('#select_gamepad_right0').change(function() {
    localStorage.setItem('data_controllerBtn_right0_val', $('#select_gamepad_right0 option:selected').val());
    localStorage.setItem('data_controllerBtn_right0_text', $('#select_gamepad_right0 option:selected').text());
});

$('#select_gamepad_up0').change(function() {
    localStorage.setItem('data_controllerBtn_up0_val', $('#select_gamepad_up0 option:selected').val());
    localStorage.setItem('data_controllerBtn_up0_text', $('#select_gamepad_up0 option:selected').text());
});

$('#select_gamepad_down0').change(function() {
    localStorage.setItem('data_controllerBtn_down0_val', $('#select_gamepad_down0 option:selected').val());
    localStorage.setItem('data_controllerBtn_down0_text', $('#select_gamepad_down0 option:selected').text());
});





$('#select_gamepad_left1').change(function() {
    localStorage.setItem('data_controllerBtn_left1_val', $('#select_gamepad_left1 option:selected').val());
    localStorage.setItem('data_controllerBtn_left1_text', $('#select_gamepad_left1 option:selected').text());
});

$('#select_gamepad_right1').change(function() {
    localStorage.setItem('data_controllerBtn_right1_val', $('#select_gamepad_right1 option:selected').val());
    localStorage.setItem('data_controllerBtn_right1_text', $('#select_gamepad_right1 option:selected').text());
});

$('#select_gamepad_up1').change(function() {
    localStorage.setItem('data_controllerBtn_up1_val', $('#select_gamepad_up1 option:selected').val());
    localStorage.setItem('data_controllerBtn_up1_text', $('#select_gamepad_up1 option:selected').text());
});

$('#select_gamepad_down1').change(function() {
    localStorage.setItem('data_controllerBtn_down1_val', $('#select_gamepad_down1 option:selected').val());
    localStorage.setItem('data_controllerBtn_down1_text', $('#select_gamepad_down1 option:selected').text());
});

*/

