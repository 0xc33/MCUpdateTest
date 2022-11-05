// Check for TouchDevices!

var touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
var numpad = {
  // (A) CREATE NUMPAD HTML
  hwrap: null, // numpad wrapper container
  hpad: null, // numpad itself
  hdisplay: null, // number display
  hbwrap: null, // buttons wrapper
  hbuttons: {}, // individual buttons
  init: () => {
    // (A1) WRAPPER
    numpad.hwrap = document.createElement("div");
    numpad.hwrap.id = "numWrap";

    // (A2) ENTIRE NUMPAD ITSELF
    numpad.hpad = document.createElement("div");
    numpad.hpad.id = "numPad";
    numpad.hwrap.appendChild(numpad.hpad);

    // (A3) DISPLAY
    numpad.hdisplay = document.createElement("input");
    numpad.hdisplay.id = "numDisplay";
    numpad.hdisplay.type = "text";
    numpad.hdisplay.disabled = true;
    numpad.hdisplay.value = "0";
    numpad.hpad.appendChild(numpad.hdisplay);

    // (A4) NUMBER BUTTONS
    numpad.hbwrap = document.createElement("div");
    numpad.hbwrap.id = "numBWrap";
    numpad.hpad.appendChild(numpad.hbwrap);

    // (A5) BUTTONS
    let buttonator = (txt, css, fn) => {
      let button = document.createElement("div");
      button.innerHTML = txt;
      button.classList.add(css);
      button.onclick = fn;
      numpad.hbwrap.appendChild(button);
      numpad.hbuttons[txt] = button;
    };

    // 7 TO 9
    for (let i = 7; i <= 9; i++) { buttonator(i, "num", () => { numpad.digit(i); }); }
    // BACKSPACE
    buttonator("&#8612;", "del", numpad.delete);
    // 4 TO 6
    for (let i = 4; i <= 6; i++) { buttonator(i, "num", () => { numpad.digit(i); }); }
    // CLEAR
    buttonator("C", "clr", numpad.reset);
    // 1 to 3
    for (let i = 1; i <= 3; i++) { buttonator(i, "num", () => { numpad.digit(i); }); }
    // CANCEL
    buttonator("&#215;", "cx", () => { numpad.hide(1); });
    // 0
    buttonator(0, "zero", () => { numpad.digit(0); });
    // .
    buttonator(".", "dot", numpad.dot);
    // -
    buttonator("-", "dot", numpad.minus);
    // OK
    buttonator("&#10003;", "ok", numpad.select);

    // (A6) ATTACH NUMPAD TO HTML BODY
    document.body.appendChild(numpad.hwrap);
  },

  // (B) BUTTON ACTIONS
  // (B1) CURRENTLY SELECTED FIELD + MAX LIMIT
  nowTarget: null, // Current selected input field
  nowMax: 0, // Current max allowed digits

  // (B2) NUMBER (0 TO 9)
  digit: (num) => {
    let current = numpad.hdisplay.value;
    //if (current.length < numpad.nowMax) {
    if (current == "0") { numpad.hdisplay.value = num; }
    else { numpad.hdisplay.value += num; }
    // }
  },

  // (B3) ADD DECIMAL POINT
  dot: () => {
    //if (numpad.hdisplay.value.indexOf(".") == -1) {
    if (numpad.hdisplay.value == "0") { numpad.hdisplay.value = "0."; }
    else { numpad.hdisplay.value += "."; }
  }
  // }
  ,

  minus: () => {

    let current = numpad.hdisplay.value;



    if (numpad.hdisplay.value == "0") { numpad.hdisplay.value = "-"; }

    else {
      if (numpad.hdisplay.value.indexOf("-") == -1) {
        numpad.hdisplay.value = "-" + current;

      } else {
        console.log(numpad.hdisplay.value.replace("-", ""));
        numpad.hdisplay.value = numpad.hdisplay.value.replace("-", "");
      }

    }

  },

  // (B4) BACKSPACE
  delete: () => {
    var length = numpad.hdisplay.value.length;
    if (length == 1) { numpad.hdisplay.value = 0; }
    else { numpad.hdisplay.value = numpad.hdisplay.value.substring(0, length - 1); }
  },

  // (B5) CLEAR ALL
  reset: () => { numpad.hdisplay.value = "0"; },

  // (B6) OK - SET VALUE
  select: () => {
    numpad.nowTarget.value = numpad.hdisplay.value;
    numpad.hide();
    numpad.nowTarget.dispatchEvent(new Event("numpadok"));
  },

  // (C) ATTACH NUMPAD TO INPUT FIELD
  attach: (opt) => {
    // OPTIONS
    //  target: required, target field.
    //  max: optional, maximum number of characters. Default 255.
    //  decimal: optional, allow decimal? Default true.
    //  onselect: optional, function to call after selecting number.
    //  oncancel: optional, function to call after canceling.

    // (C1) DEFAULT OPTIONS
    if (opt.max === undefined) { opt.max = 255; }
    if (opt.decimal === undefined) { opt.decimal = true; }

    // (C2) GET + SET TARGET OPTIONS
    opt.target.readOnly = true; // PREVENT ONSCREEN KEYBOARD
    opt.target.dataset.max = opt.max;
    opt.target.dataset.decimal = opt.decimal;
    opt.target.addEventListener("click", () => { numpad.show(opt.target); });

    // (C3) ATTACH CUSTOM LISTENERS
    if (opt.onselect) {
      opt.target.addEventListener("numpadok", opt.onselect);
    }
    if (opt.oncancel) {
      opt.target.addEventListener("numpadcx", opt.oncancel);
    }
  },

  // (D) SHOW NUMPAD
  show: (target) => {
    // (D1) SET CURRENT DISPLAY VALUE
    let cv = target.value;
    if (cv == "") { cv = "0"; }
    numpad.hdisplay.value = cv;

    // (D2) SET MAX ALLOWED CHARACTERS
    numpad.nowMax = target.dataset.max;

    // (D3) SET DECIMAL
    if (target.dataset.decimal == "true") {
      numpad.hbwrap.classList.remove("noDec");
    } else {
      numpad.hbwrap.classList.add("noDec");
    }

    // (D4) SET CURRENT TARGET
    numpad.nowTarget = target;

    // (D5) SHOW NUMPAD
    numpad.hwrap.classList.add("open");
  },

  // (E) HIDE NUMPAD
  hide: (manual) => {
    if (manual) { numpad.nowTarget.dispatchEvent(new Event("numpadcx")); }
    numpad.hwrap.classList.remove("open");
  }
};
window.addEventListener("DOMContentLoaded", numpad.init);

if (touchDevice) {
  numpad.attach({
    target: document.getElementById('txt_position_move'),
    max: 10, // MAX 10 DIGITS
    decimal: true, // NO DECIMALS ALLOWED
    onselect: (data) => { // CALL THIS AFTER SELECTING NUMBER
      if (Number(data.target.value) > Number(data.target.max)) {

        ts_setpoint_error.options.text = "🎯 Position setpoint " + $("#select_axis option:selected").text() + " must between " + data.target.max + " " + parent.axisObj[$("#select_axis option:selected").text()].position_unit + " and " + data.currentTarget.min + " " + parent.axisObj[$("#select_axis option:selected").text()].position_unit;
        ts_setpoint_error.showToast();

        data.currentTarget.value = 0.0;
      } else {
        $("#txt_position_move").trigger("change");
      }
    },
    oncancel: () => { // CALL THIS AFTER CANCELING

    }
  });

  numpad.attach({
    target: document.getElementById('txt_velocity_move'),
    max: 10, // MAX 10 DIGITS
    decimal: true, // NO DECIMALS ALLOWED
    onselect: (data) => { // CALL THIS AFTER SELECTING NUMBER
      if (Number(data.target.value) > Number(data.target.max)) {

        ts_setpoint_error.options.text = "🎯 Velocity setpoint " + $("#select_axis option:selected").text() + " must between " + data.target.max + " " + parent.axisObj[$("#select_axis option:selected").text()].velocity_unit + " and " + data.currentTarget.min + " " + parent.axisObj[$("#select_axis option:selected").text()].velocity_unit;
        ts_setpoint_error.showToast();

        data.currentTarget.value = 20.0;
      } else {

        $("#txt_velocity_move").trigger("change");
      }
    },
    oncancel: () => { // CALL THIS AFTER CANCELING

    }
  });


  numpad.attach({
    target: document.getElementById('txt_acceleration_move'),
    max: 10, // MAX 10 DIGITS
    decimal: true, // NO DECIMALS ALLOWED
    onselect: (data) => { // CALL THIS AFTER SELECTING NUMBER

      if (Number(data.target.value) > Number(data.target.max)) {
       
        ts_setpoint_error.options.text = "🎯 Acceleration setpoint " + $("#select_axis option:selected").text() + " must between " + data.target.max + " " + parent.axisObj[$("#select_axis option:selected").text()].acceleration_unit + " and " + data.currentTarget.min + " " + parent.axisObj[$("#select_axis option:selected").text()].acceleration_unit;
        ts_setpoint_error.showToast();
        
        data.currentTarget.value = 20.0;
      } else {
        $("#txt_acceleration_move").trigger("change");
      }
    },
    oncancel: () => { // CALL THIS AFTER CANCELING

    }
  });

  numpad.attach({
    target: document.getElementById('txt_deceleration_move'),
    max: 10, // MAX 10 DIGITS
    decimal: true, // NO DECIMALS ALLOWED
    onselect: (data) => { // CALL THIS AFTER SELECTING NUMBER
      if (Number(data.target.value) > Number(data.target.max)) {
        
        ts_setpoint_error.options.text = "🎯 Deceleration setpoint " + $("#select_axis option:selected").text() + " must between " + data.target.max + " " + parent.axisObj[$("#select_axis option:selected").text()].deceleration_unit + " and " + data.currentTarget.min + " " + parent.axisObj[$("#select_axis option:selected").text()].deceleration_unit;
        ts_setpoint_error.showToast();
       
        data.currentTarget.value = 20.0;
      } else {
        $("#txt_deceleration_move").trigger("change");
      }
    },
    oncancel: () => { // CALL THIS AFTER CANCELING

    }
  });

} else {
  // No Touch Device!
  console.log("No Touch Device!");

}