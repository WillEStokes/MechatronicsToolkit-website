document.addEventListener("DOMContentLoaded", function() {
    const spinner = document.querySelector("#spinner");

    if (spinner) {
        spinner.style.display = "none";
    }

    const runButton = document.getElementById("run-button");
    const exampleCodeSelect = document.getElementById("example-code-select");
    const textarea = document.getElementById("code-input");
    const editor = CodeMirror.fromTextArea(textarea, {
        mode: "text/x-c++src",
        lineNumbers: true,
        theme: 'mdn-like',
    });

    editor.getWrapperElement().style.height = "400px";
    editor.getWrapperElement().style.marginTop = "10px";
    editor.getWrapperElement().style.marginBottom = "10px";
    
    // Initialise the editor with an example script
    fetch(`./cpp-examples/pointers-and-references.txt`)
        .then(response => response.text())
        .then(data => {
            editor.setValue(data);
        })
        .catch(error => {
            console.log(error);
        });

    exampleCodeSelect.addEventListener("change", () => {
        const exampleCode = exampleCodeSelect.value;
        fetch(`./cpp-examples/${exampleCode}.txt`)
            .then(response => response.text())
            .then(data => {
                editor.setValue(data);
            })
            .catch(error => {
                console.log(error);
            });
    });

    runButton.addEventListener("click", () => {
        document.getElementById("spinner").style.display = "block";
        const code = editor.getValue();

        try {
            axios.post('http://localhost:3000/run-code', {    
            code: code
            })
            .then(res => {
                console.log(res.data);
                const output = res.data.stdout;
                if (output === '') {
                    document.getElementById("terminal-output").innerText = res.data.error + '\n' + res.data.stderr;
                } else {
                    document.getElementById("terminal-output").innerText = output;
                }
                document.getElementById("spinner").style.display = "none";
            })            
            .catch(error => {
                console.log(error);
                document.getElementById("terminal-output").innerText = error || error;
                document.getElementById("spinner").style.display = "none";
            });
        } catch (error) {
            console.log(error);
            document.getElementById("terminal-output").innerText = error || error;
            document.getElementById("spinner").style.display = "none";
        }
    });
});
  