languagePluginLoader.then(() => {
    // JavaScript to handle user input and run code
    const input = document.getElementById("code-input");
    const runButton = document.getElementById("run-button");

    let callback = function(output) {
        document.getElementById("terminal-output").innerText = output;
    }
    pyodide.globals.callback = callback;

    runButton.addEventListener("click", () => {
        const code = input.value;
        try {
            pyodide.runPython(`
                import io
                import sys
                sys.stdout = io.StringIO()
                ${code}
                callback(sys.stdout.getvalue())
            `);
        } catch (error) {
            document.getElementById("terminal-output").innerText = error;
        }
    });
    
});
