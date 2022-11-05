var ts_disconnected_show = false;
var ts_disconnect = Toastify({
    text: "📛 Connection lost to linrob Robot, try to Reconnect!",
    duration: -1,
    close: false,
    gravity: "bottom",
    position: "right",
    style: {
        background: "#ff6e6e",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
    },
});

var ts_setpoint_hint = Toastify({
    text: "🎯 Please enter all Set-Points!",
    duration: 5000,
    close: false,
    gravity: "bottom",
    position: "right",
    stopOnFocus: false,
    style: {
        background: "#ff6e6e",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
        
    }
});

var ts_disable_servo = Toastify({
    text: "", // Overriden externally!
    duration: 3000,
    close: false,
    gravity: "bottom",
    position: "right",
    stopOnFocus: false,
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
    }
});

var ts_enable_servo = Toastify({
    text: "", // Overriden externally!
    duration: 3000,
    close: false,
    gravity: "bottom",
    position: "right",
    stopOnFocus: false,
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
    }
});

var ts_script_play_showing = false;
var ts_script_play = Toastify({
    text: "⌛️ Script running!",
    id: "ts_script_play",
    duration: -1,
    close: false,
    gravity: "bottom",
    position: "right",
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em"
    },
    onClick: function () { _showScriptRobot(); } // Callback after click
});

var ts_script_pause_showing = false;
var ts_script_paused = Toastify({
    text: "♨️ Script paused!",
    id: "ts_script_paused",
    duration: -1,
    close: false,
    gravity: "bottom",
    position: "right",
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
    },
    onClick: function () { _showScriptRobot(); } // Callback after click
});

var ts_script_stop_showing = false;
var ts_script_stopped = Toastify({
    text: "⛔️ Script stopped!",
    id: "ts_script_stopped",
    duration: 5000,
    close: false,
    gravity: "bottom",
    position: "right",
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em"
    },
    onClick: function () { _showScriptRobot(); } // Callback after click
});

var ts_script_saved = Toastify({
    text: "", // Overriden externally!
    duration: 3000,
    newWindow: true,
    close: false,
    gravity: "bottom",
    position: "right",
    stopOnFocus: false,
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
    },
    onClick: function () { _showScriptRobot(); } // Callback after click
});

var ts_script_camera_default = Toastify({
    text: "👀 Camera View is set to default!",
    duration: 3000,
    newWindow: true,
    close: false,
    gravity: "bottom",
    position: "right",
    stopOnFocus: false,
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
    }
});

var ts_script_home_axis = Toastify({
    text: "", // Overriden externally!
    duration: 3000,
    newWindow: true,
    close: false,
    gravity: "bottom",
    position: "right",
    stopOnFocus: false,
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
    }
});

var ts_gamepad_disconnected = Toastify({
    text: "🕹️ Gamepad disconnected!",
    duration: 5000,
    newWindow: true,
    close: false,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#3A3B45",
      display: "inline-grid",
      alignItems: "center",
      textAlign: "center",
      width: "20em",
      height: "5em",
      opacity: "0.8"
    },
    //onClick: function(){} // Callback after click
  });

  var ts_gamepad_connected = Toastify({
    text: "🕹️ Gamepad connected!",
    duration: -1,
    destination:'#tab-2',
    newWindow: false,
    close: false,
    gravity: "bottom", 
    position: "right",
    style: {
      background: "#3A3B45",
      display: "inline-grid",
      alignItems: "center",
      textAlign: "center",
      width: "20em",
      height: "5em",
      opacity: "0.8"
    },
    //onClick: function(){} // Callback after click
  });


  var ts_disable_robot = Toastify({
    text: "⚠️ Robot disabled!",
    duration: 2000,
    close: false,
    gravity: "bottom",
    position: "right",
    stopOnFocus: false,
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
    }
  });

  var ts_enable_robot = Toastify({
    text: "🕹️ Robot enabled!",
    duration: 2000,
    close: false,
    gravity: "bottom",
    position: "right",
    stopOnFocus: false,
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
    }
  });

  class ToastEMCY extends Toastify {
    constructor() {
        super({duration: -1,
            close: false,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#ff6e6e",
                display: "inline-grid",
                alignItems: "center",
                textAlign: "center",
                width: "20em",
                height: "5em",
                opacity: "0.8"}});
    }
  }

  var ts_setpoint_error = Toastify({
    text: "",// Overriden externally!
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: false,
    style: {
        background: "#3A3B45",
        display: "inline-grid",
        alignItems: "center",
        textAlign: "center",
        width: "20em",
        height: "5em",
        opacity: "0.8"
    }});