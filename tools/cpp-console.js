document.addEventListener("DOMContentLoaded", function() {
    const spinner = document.querySelector("#spinner");

    if (spinner) {
        spinner.style.display = "none";
    }

    const runButton = document.getElementById("run-button");
    const textarea = document.getElementById("code-input");
    const editor = CodeMirror.fromTextArea(textarea, {
        mode: "text/x-c++src",
        lineNumbers: true,
        theme: 'mdn-like',
    });

    editor.getWrapperElement().style.height = "400px";
    editor.getWrapperElement().style.marginTop = "10px";
    editor.getWrapperElement().style.marginBottom = "10px";
    editor.setValue(`#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int *ptr = &x; // pointer to x
    int &ref = x; // reference to x

    cout << "x = " << x << endl;
    cout << "ptr = " << ptr << ", *ptr = " << *ptr << endl;
    cout << "ref = " << ref << endl;

    *ptr = 20; // modify x through ptr
    cout << "x = " << x << endl;

    ref = 30; // modify x through ref
    cout << "x = " << x << endl;

    return 0;
}`);
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
  