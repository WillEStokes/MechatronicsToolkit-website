languagePluginLoader.then(() => {
    const runButton = document.getElementById("run-button");
    const textarea = document.getElementById("code-input");
    const editor = CodeMirror.fromTextArea(textarea, {
        mode: "python",
        lineNumbers: true,
        // theme: "default",
        theme: 'juejin',
    });
    editor.getWrapperElement().style.height = "400px";
    editor.getWrapperElement().style.marginTop = "10px";
    editor.getWrapperElement().style.marginBottom = "10px";
    editor.setValue(`import random

def roll_dice():
 return random.randint(1, 6)

print("You rolled a " + str(roll_dice()))`);
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
