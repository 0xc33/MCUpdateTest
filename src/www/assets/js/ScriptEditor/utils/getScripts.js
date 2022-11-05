$('#toast_script_loader').on('show.bs.toast', function () {
    get_script_locations();
    get_script_files();
    console.log("Scripteditor called");
    setTimeout(TableWaitCallback, 1000);

})

function TableWaitCallback() {
    $("#tbody").empty();
    for (file in script_files) {
        var table_item = '<tr class="noselect" style="background: #1f1f1f;border-style: none;border-color: transparent; color: var(--bs-white);font-size: 14px;"><td class="noselect" style="color: rgb(255,255,255);">' + script_files[file].filename + '</td><td class="noselect" style="color: rgb(255,255,255);">' + script_files[file].dateTime + '</td><td class="noselect" style="color: rgb(255,255,255);">' + script_files[file].location + '</td><td class="text-center align-middle noselect" style="max-height: 60px;height: 60px;"><a data-bs-toggle="tooltip" style="color: #00bdff;" title="Preview Scriptfile" class="btn btnMaterial btn-flat primary semicircle" role="button" id="btn_view_script" style="color: #00bdff;" onclick=view_file("' + script_files[file].filename + '","' + script_files[file].location + '");><i class="far fa-eye"></i></a><a data-bs-toggle="tooltip" style="color: #00bdff;" title="Load Scriptfile" class="btn btnMaterial btn-flat success semicircle noselect" onclick=open_file("' + script_files[file].filename + '","' + script_files[file].location + '"); role="button" style="color: rgb(0,197,179);"><i class="fas fa-cloud-download-alt noselect"></i></a><a data-bs-toggle="tooltip" style="color: #00bdff;" title="Delete Scriptfile" class="btn btnMaterial btn-flat accent btnNoBorders checkboxHover noselect" onclick=delete_file("' + script_files[file].filename + '","' + script_files[file].location + '"); role="button" style="margin-left: 5px;"><i class="fas fa-trash btnNoBorders noselect" style="color: #DC3545;"></i></a></td></tr>'

        $("#tbody").append(table_item);
    }

}

function view_file(filename, filepath) {

    const json = '{"cmd":"load_script_file", "filename":""}';
    const obj = JSON.parse(json);
    obj['filename'] = filename;

    if (filepath == 'Robot') {
        obj['filepath'] = "";
    } else {
        obj['filepath'] = filepath;
    }

    socket.emit("load_script_preview", obj);

    $('#model_script_preview').modal('show');

}

$('#model_script_preview').on('shown.bs.modal', function (e) {
    editor_preview.refresh();
})

function open_file(filename, filepath) {

    const json = '{"cmd":"load_script_file", "filename":""}';
    const obj = JSON.parse(json);

    if (filepath == 'Robot') {
        obj['filepath'] = "";
    } else {
        obj['filepath'] = filepath;
    }
    obj['filename'] = filename;

    socket.emit("load_script_file", obj);

    $("#txt_script_header").text("linrob Script Editor - [" + filename + "]");
    $("#toast-script-robot").toast("show");
    $("#toast_script_loader").toast("hide");
}

var file_to_delete = "";
var filepath_delete = "";
function delete_file(filename, filepath) {
    $("#lbl_modal_delete_script_title").text('Delete Scriptfile');

    $("#modal_script_delete_text").text('Do you really want to delete ' + filename + " from " + filepath + " ?");
    $("#modal_script_delete_text").data('filename', filename);
    $("#modal_script_delete_text").data('filepath', filepath);
    if (filename != "") {
        $('#model_script_delete').modal('show');
    }

}

function get_script_files(from_location = "") {

    const json = '{"cmd":"get_script_files", "location":""}';
    const obj = JSON.parse(json);
    obj['location'] = from_location;
    socket.emit("get_script_files", obj);
}

$("#btn_get_script_from_other_device").bind('touchend mousedown', function () {
    editor.setValue(scriptState['activeScriptCode']);
    $('#model_script_running').modal('hide');

});

$("#btn_script_from_other_device_abort").bind('touchend mousedown', function () {
    $('#model_script_running').modal('hide');
    _showScriptRobot();
});

$("#btn_modal_script_delete").bind('touchend mousedown', function () {
    $('#model_script_delete').modal('hide');
    const json = '{"cmd":"delete_script_file", "filename":"", "filepath":""}';
    const obj = JSON.parse(json);
    obj['filename'] = $("#modal_script_delete_text").data('filename');

    if ($("#modal_script_delete_text").data('filepath') != "Robot") {
        obj['filepath'] = $("#modal_script_delete_text").data('filepath');
    } else {
        obj['filepath'] = "";
    }

    socket.emit("delete_script_file", obj);
    get_script_files();
    setTimeout(TableWaitCallback, 100);
});

$("#btn_dropdown_script_save").bind('touchend mousedown', function () {
    $(btn_modal_script_save).prop("disabled", true);
    $('#modal_script_save').modal('show');
});

$("#btn_script_upload_local").bind('touchend mousedown', function () {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {

        // getting a hold of the file reference
        var file = e.target.files[0];

        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            editor.setValue(content);
            
            $("#toast-script-robot").toast("show");
            $("#toast_script_loader").toast("hide");
            editor.save();
            editor.refresh();
        }

    }

    input.click();

});

$("#btn_modal_script_save").bind('touchend mousedown', function () {
    if ($("#select_save_location option:selected").text() == "Local") {

        var blob = new Blob([editor.getValue()], { type: "text/plain;charset=utf-8" });
        saveAs(blob, $(txt_script_save_filename).val().trim() + '.lrp');


    } else {

        const json = '{"cmd":"save_script_file", "filename":"", "filepath":"", "fileContent":""}';
        const obj = JSON.parse(json);
        obj['filename'] = $(txt_script_save_filename).val().trim() + '.lrp';
        obj['fileContent'] = editor.getValue();
        socket.emit("save_script_file", obj);

    }
    $('#modal_script_save').modal('hide');

    ts_script_saved.options.text = '📄 Scriptfile "' + $(txt_script_save_filename).val().trim() + '.lrp" saved!'
    ts_script_saved.showToast();
});

$('#txt_script_save_filename').on('input propertychange paste', function () {
    let txt_val = $(this).val().trim();
    if (txt_val.length > 0) {
        $(btn_modal_script_save).prop("disabled", false);
    } else {
        $(btn_modal_script_save).prop("disabled", true);
    }
});

$("#btn_script_preview_close").bind('touchend mousedown', function () {
    //$(btn_script_preview_close).click(function() {
    $('#model_script_preview').modal('hide');
});

$("#btn_dropdown_script_load").bind('touchend mousedown', function () {
    //$(btn_dropdown_script_load).click(function() {
    $("#toast-script-robot").toast("hide");
    $("#toast_script_loader").toast("show");
});

$(editor).on('input propertychange paste', function () {
console.log("Tippy Toppy in Editty");

});

function get_script_locations() {
    const json = '{"cmd":"get_script_location"}';
    const obj = JSON.parse(json);
    socket.emit("get_script_location", obj);
}        
