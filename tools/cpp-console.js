document.addEventListener("DOMContentLoaded", function() {
    const spinner = document.querySelector("#spinner");
    if (spinner) {
        spinner.style.display = "block";
    }
    const runButton = document.getElementById("run-button");
    const textarea = document.getElementById("code-input");
    const editor = CodeMirror.fromTextArea(textarea, {
        mode: "cpp",
        lineNumbers: true,
        theme: 'juejin',
    });
    editor.getWrapperElement().style.height = "400px";
    editor.getWrapperElement().style.marginTop = "10px";
    editor.getWrapperElement().style.marginBottom = "10px";
    editor.setValue(``);
    runButton.addEventListener("click", () => {
        document.getElementById("terminal-output").style.display = "none";
        
        const code = editor.getValue();
        try {
            fetch('https://run.glot.io/languages/cpp/latest', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    "Accept":"application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer bce2da54-ebb8-4a85-868f-f8be12d4727d'
                },
                body: JSON.stringify({
                    'files': [
                        {
                            'name': 'main.cpp',
                            'content': code
                        }
                    ]
                })
            })
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                console.log(data);
                const output = data.stdout;
                document.getElementById("terminal-output").innerText = output;
                document.getElementById("terminal-output").style.display = "block";
            })
            .catch(error => {
                console.log(error);
                document.getElementById("terminal-output").innerText = error;
                document.getElementById("terminal-output").style.display = "block";
            })
            } catch (error) {
            console.log(error);
            document.getElementById("terminal-output").innerText = error;
            document.getElementById("terminal-output").style.display = "block";
            }
    })
});
