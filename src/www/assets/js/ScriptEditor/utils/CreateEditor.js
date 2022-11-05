var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    mode: {
        name: "python",
        version: 3,
        singleLineStringErrors: false
    },
    extraKeys: { "Ctrl-Space": "autocomplete" },
    theme: 'ayu-dark',
    autorefresh: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 4,
    gutters: ["act_line", "breakpoint",  "pause_line", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    foldGutter: false,
    readOnly: false
});
editor.setValue("# Enter linrob Scripts here!");
editor.save();
editor.refresh();

var ModaleditorView = CodeMirror.fromTextArea(document.getElementById('txt_code_from_another_device'), {
    lineNumbers: true,
    mode: {
        name: "python",
        version: 3,
        singleLineStringErrors: false
    },
    theme: 'ayu-dark',
    scrollbarStyle: 'null',
    indentUnit: 4,
    readOnly: true
});

ModaleditorView.save();
ModaleditorView.refresh();

var editor_preview = CodeMirror.fromTextArea(document.getElementById('txt_code_preview'), {
    lineNumbers: true,
    mode: {
        name: "python",
        version: 3,
        singleLineStringErrors: false
    },
    theme: 'ayu-dark',
    scrollbarStyle: 'null',
    indentUnit: 4,
    readOnly: true
});

editor_preview.save();
editor_preview.refresh();


// Add Axis to AutoComplete in Editor
CodeMirror.hint.python = function (cm) {
    var inner = { from: cm.getCursor(), to: cm.getCursor(), list: [] };
    inner.list.push('lr_wait(seconds)');
    inner.list.push('lr_stop_script()');
    for (var key in parent.axisObj) {
        //inner.list.push(parent.axisObj[key].name);
    
        inner.list.push('lr_move_l(\n    axis="' + parent.axisObj[key].name + '",\n    position=0,\n    velocity=0,\n    acceleration=0,\n    deceleration=0,\n    blocking=True)');
        //inner.list.push('lr_move_l_sync(\n     axis="' + parent.axisObj[key].name + '",\n     position=, velocity=,\n     acceleration=,\n     deceleration=)');
        inner.list.push('lr_wait_for_position(axis="' + parent.axisObj[key].name + '")');
        inner.list.push('lr_home("' + parent.axisObj[key].name + '", position=0.0)');
        
        //inner.list.push("movePVT(" + parent.axisObj[key].name + ", position, time);");
        //inner.list.push("startPVT(" + parent.axisObj[key].name + ");");
        //inner.list.push("wait(" + parent.axisObj[key].name + ", time);");
       
    }
    return inner;
};

var _script_play_debounce_btn = debounce(function () {
    const json = '{"cmd":"_set_play_script", "value": "True", "code":"none", "breakpoints":0}';
    const obj = JSON.parse(json);
    obj['code'] = editor.getValue();
    obj['breakpoints'] = checkForBreakpoints();
    socket.emit("sc_state", obj);
}, 250);

$("#btn_play_script").bind('touchend mousedown', _script_play_debounce_btn);

var _script_pause_debounce_btn = debounce(function () {
    const json = '{"cmd":"_set_pause_script", "value": "True"}';
    const obj = JSON.parse(json);
    socket.emit("sc_state", obj);
}, 250);

$("#btn_pause_script").bind('touchend mousedown', _script_pause_debounce_btn);

var _script_stop_debounce_btn = debounce(function () {
    const json = '{"cmd":"_set_stop_script", "value": "True"}';
    const obj = JSON.parse(json);
    socket.emit("sc_state", obj);
}, 250);

$("#btn_stop_script").bind('touchend mousedown', _script_stop_debounce_btn);

function set_script_play() {
    const json = '{"cmd":"_set_play_script", "value": "True", "code":"none", "breakpoints":0}';
    const obj = JSON.parse(json);
    obj['code'] = editor.getValue();
    obj['breakpoints'] = checkForBreakpoints();
    socket.emit("sc_state", obj);
}

function set_script_stop() {
    const json = '{"cmd":"_set_stop_script", "value": "True"}';
    const obj = JSON.parse(json);
    socket.emit("sc_state", obj);
}

function set_script_pause() {
    const json = '{"cmd":"_set_pause_script", "value": "True"}';
    const obj = JSON.parse(json);
    socket.emit("sc_state", obj);
}

function set_thread_stop() {
    const json = '{"cmd":"_stop_workers"}';
    const obj = JSON.parse(json);
    socket.emit("stop_threads", obj);
}

function set_thread_start() {
    const json = '{"cmd":"_restart_workers"}';
    const obj = JSON.parse(json);
    socket.emit("start_threads", obj);
}

editor.on("gutterClick", function (cm, n) {
    if (scriptState['stop']) {
        var info = cm.lineInfo(n);
        console.log(info);
        cm.setGutterMarker(n, "breakpoint", info.gutterMarkers ? null : makeBreakpointMarker());
    }

});

function makeMarker() {
    var marker = document.createElement("div");

    marker.style.marginLeft = "11px"
    marker.innerHTML = "→";
    marker.style.color = "#01ff01";
    marker.style.zIndex = 10;
    return marker;
}

function makePauseMarker() {
    var marker = document.createElement("div");

    marker.style.marginLeft = "11px"
    marker.innerHTML = '●';
    marker.style.color = "#c2d94c";
    marker.style.zIndex = 2;

    return marker;
}

function makeBreakpointMarker() {
    var marker = document.createElement("div");

    marker.style.marginLeft = "11px"
    marker.innerHTML = "●";
    marker.style.color = "#822";
    marker.style.zIndex = 1;
    return marker;
}

function checkForBreakpoints() {
    var bp_arr = [];
    var info = "";
    for (let step = 0; step < editor.lineCount(); step++) {
        info = editor.lineInfo(step);
        try {
            if (info.gutterMarkers['breakpoint']) {
                console.log("Breakpoint found on line: " + step)
                bp_arr.push(step + 1);
            }
        }
        catch (e) {
            //console.log("No Brekpoint found!");
            bp_arr.push(-1);
        }

    }
    return bp_arr;
}

function set_script_code_to_robot() {
    try {
        const json = '{"cmd":"set_script_code", "code": ""}';
        const obj = JSON.parse(json);
        obj['code'] = editor.getValue();
        socket.emit("sc_state", obj);

    } catch (e) {
        console.log("error occured while try to emit actual script to robot!");
    }
}
// Save Code to Localstorage
function onChange(editor) {
    localStorage[window.location.href.split("#")[0]] = editor.getValue()
}

function setup(editor, value) {
    /**
    Takes editor and enables persists changes to the buffer across the sessions.
    **/
    if (value) {
        var address = window.location.href.split("#")[0]
        var persisted = localStorage[address] || editor.getValue()
        editor.setValue(persisted)
        editor.on("change", onChange)
    } else {
        editor.off("change", onChange)
    }
}

function plugin(CodeMirror) {
    CodeMirror.defineOption("persist", false, setup)
}
setup(editor, true);



