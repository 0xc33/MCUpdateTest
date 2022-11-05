const output = document.getElementById("output");

var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
			lineNumbers: true,
			 mode: {
                name: "python",
                version: 3,
                singleLineStringErrors: false
            },
			extraKeys: { "Ctrl-Space": "autocomplete" },
			value: document.documentElement.innerHTML,
			theme: 'ayu-dark',
            autorefresh: true,
            matchBrackets: true,
            indentUnit: 4,
			keyword: {
				"moveL": "style1",
				"home": "style1",
				"moveC": "style1",
				"wait": "style1",
				"movePVT": "style1",
				"startPVT": "style1",
				"example\.com": "style2",
				"abc\\d+": "style2"
			}

		});

editor.save();
editor.refresh();
		
editor.setValue(`sum([1, 2, 3, 4, 5])`);
output.value = "Initializing...\n";


// Add Axis to AutoComplete in Editor
var orig = CodeMirror.hint.anyword;
CodeMirror.hint.anyword = function (cm) {
	var inner = orig(cm) || { from: cm.getCursor(), to: cm.getCursor(), list: [] };
	    for (var key in parent.axisObj) {
			inner.list.push(parent.axisObj[key].name);
			inner.list.push("moveL(" + parent.axisObj[key].name + ", pos, vel, acc, dec);");
			inner.list.push("movePVT(" + parent.axisObj[key].name + ", position, time);");
			inner.list.push("startPVT(" + parent.axisObj[key].name + ");");
			inner.list.push("wait(" + parent.axisObj[key].name + ", time);");
			inner.list.push("home(" + parent.axisObj[key].name + ", position);");

		}
		return inner;
	};