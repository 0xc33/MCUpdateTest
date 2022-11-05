var _script_stop_robot_debounce_btn = debounce(function() {
    	disableAllServos();
}, 250);

$("#btn_disable_robot").bind('touchend mousedown',_script_stop_robot_debounce_btn);

var _script_enable_disable_move_debounce_btn = debounce(function() {
	 enableDisableServo($("#select_axis option:selected").text(), 20);
}, 250);


$("#btn_enable_move").bind('touchend mousedown',_script_enable_disable_move_debounce_btn);

var _script_enable_move_to_pos_debounce_btn = debounce(function() {
    	moveToPos();
}, 250);

$("#btn_move_to_position").bind('touchend mousedown',_script_enable_move_to_pos_debounce_btn);

