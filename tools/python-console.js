languagePluginLoader.then(() => {
    const runButton = document.getElementById("run-button");
    const exampleCodeSelect = document.getElementById("example-code-select");
    const textarea = document.getElementById("code-input");
    const editor = CodeMirror.fromTextArea(textarea, {
        mode: "python",
        lineNumbers: true,
        // theme: "default",
        theme: 'mdn-like',
    });
    editor.getWrapperElement().style.height = "400px";
    editor.getWrapperElement().style.marginTop = "10px";
    editor.getWrapperElement().style.marginBottom = "10px";
//     editor.setValue(`import random

// def roll_dice():
//  return random.randint(1, 6)

// print("You rolled a " + str(roll_dice()))`);

    // Initialise the editor with an example script
    fetch(`./python-examples/rc-circuit.txt`)
        .then(response => response.text())
        .then(data => {
            editor.setValue(data);
        })
        .catch(error => {
            console.log(error);
        });

    exampleCodeSelect.addEventListener("change", () => {
        const exampleCode = exampleCodeSelect.value;
        fetch(`./python-examples/${exampleCode}.txt`)
            .then(response => response.text())
            .then(data => {
                editor.setValue(data);
            })
            .catch(error => {
                console.log(error);
            });
    });

    let callback = function(output) {
        document.getElementById("terminal-output").innerText = output;
    }
    pyodide.globals.callback = callback;
    
    runButton.addEventListener("click", () => {
        // const code = input.value;
        const code = editor.getValue();
        try {
            pyodide.runPython(`
import io
import sys
sys.stdout = io.StringIO()
${code}
callback(sys.stdout.getvalue())`);
        } catch (error) {
            document.getElementById("terminal-output").innerText = error;
        }
    });
});
