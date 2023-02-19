function incrementValue(inputId, amount) {
    let input = document.getElementById(inputId);
    input.value = (Number(input.value) + amount).toPrecision(3);
}

function decrementValue(inputId, amount) {
    let input = document.getElementById(inputId);
    input.value = (Number(input.value) - amount).toPrecision(3);
}

function reactancePlot() {
    var L = 5;
    var C = 100;
    C = C/1000000000;

    var resonantFrequency = 1 / (2 * Math.PI * Math.sqrt(L*C));
    var frequencies = Array.from({length: 500}, (_, i) => 100 + Math.pow(20, 2 * i / 499));

    var X_L = frequencies.map(function(f) {
        return 2 * Math.PI * f * L;
    });

    var X_C = frequencies.map(function(f) {
        return 1 / (2 * Math.PI * f * C);
    });

    var capacitorTrace = {
        x: frequencies,
        y: X_C,
        type: 'scatter',
        name: '$X_C$ (Ω)',
        // yaxis: 'y'
    };
    var inductorTrace = {
        x: frequencies,
        y: X_L,
        type: 'scatter',
        name: '$X_L$ (Ω)',
        // yaxis: 'y'
    };

    var data = [capacitorTrace, inductorTrace ];
    var layout = {
        xaxis: {
            // type: "log",
            title: "Frequency (Hz)",
            mirror: true,
            ticks: 'outside',
            showline: true,
        },
        yaxis: {
            // type: "log",
            title: "Reactance (Ω)",
            mirror: true,
            ticks: 'outside',
            showline: true,
        },
        shapes: [{
            type: 'line',
            x0: resonantFrequency,
            y0: 2 * Math.PI * resonantFrequency * L,
            x1: resonantFrequency,
            y1: 0,
            xref: 'x',
            yref: 'y',
            opacity: 0.4,
            line: {
                color: 'black',
                width: 2,
                dash: 'dot'
            }
        }],
        annotations: [{
            x: resonantFrequency + 20,
            y: 1000,
            xref: 'x',
            yref: 'y',
            text: '$f_r$',
            font: {
                size: 18,
                color: 'red'
            },
            showarrow: false,
        }],
        title: "Reactance Plot",
        showlegend: true,
        autosize: false,
        width: 400,
        height: 300,
        margin: {
            l: 50,
            r: 75,
            t: 50,
            b: 50
          }
        };
    
        Plotly.newPlot("reactance-plot", data, layout);

}

function initGainPlot() {
    var frequencies = Array.from({length: 500}, (_, i) => Math.pow(10, 6 * i / 499));

    var gains = frequencies.map(function(x) {
        return 20;
    });
    var phase = frequencies.map(function(f) {
        return 0;
    });

    var gainTrace = {
        x: frequencies,
        y: gains,
        type: 'scatter',
        name: 'Gain (dB)',
        yaxis: 'y'
    };
    var phaseTrace = {
        x: frequencies,
        y: phase,
        type: 'scatter',
        name: 'Phase (°)',
        yaxis: 'y2'
    };

    var data = [gainTrace, phaseTrace ];
    var layout = {
    xaxis: {
        type: "log",
        title: "Frequency (Hz)",
        mirror: true,
        ticks: 'outside',
        showline: true,
    },
    yaxis: {
        title: "Gain (dB)",
        range: [-22, 22],
        mirror: true,
        ticks: 'outside',
        showline: true,
    },
    yaxis2: {
        title: 'Phase (°)',
        range: [-90, 0],
        overlaying: 'y',
        side: 'right',
    },
    showlegend: true,
    title: "Frequency-Gain Plot of the Low Pass Filter"
    };

    Plotly.newPlot("gain-plot_rc", data, layout);

    layout.title = "Frequency-Gain Plot of the High Pass Filter";
    Plotly.newPlot("gain-plot_rl", data, layout);

    layout.title = "Frequency-Gain Plot of the Band Pass Filter";
    Plotly.newPlot("gain-plot_rlc", data, layout);
}

function plotGain_RC() {
    var R = parseFloat(document.getElementById("R_RC").value);
    var C = parseFloat(document.getElementById("C_RC").value);
    var V = parseFloat(document.getElementById("V_RC").value);
    R = 1000*R;
    C = C/1000000000;

    var cutoffFrequency = 1 / (2 * Math.PI * R * C);
    var frequencies = Array.from({length: 500}, (_, i) => Math.pow(10, 6 * i / 499));

    var gains = frequencies.map(function(x) {
        return 20 * Math.log10(V / Math.sqrt(1 + (x / cutoffFrequency) ** 2));
    });
    var phase = frequencies.map(function(f) {
        var omega = 2 * Math.PI * f;
        return Math.atan(-omega * R * C) * 180 / Math.PI;
    });

    var gainTrace = {
        x: frequencies,
        y: gains,
        type: 'scatter',
        name: 'Gain (dB)',
        yaxis: 'y'
    };
    var phaseTrace = {
        x: frequencies,
        y: phase,
        type: 'scatter',
        name: 'Phase (°)',
        yaxis: 'y2'
    };

    var data = [gainTrace, phaseTrace ];
    var layout = {
    xaxis: {
        type: "log",
        title: "Frequency (Hz)",
        mirror: true,
        ticks: 'outside',
        showline: true,
    },
    yaxis: {
        title: "Gain (dB)",
        // range: [-20, 20],
        // range: [Math.min.apply(Math, gains)-2, Math.max.apply(Math, gains)+2],
        mirror: true,
        ticks: 'outside',
        showline: true,
    },
    yaxis2: {
        title: 'Phase (°)',
        // range: [-180, 0],
        overlaying: 'y',
        side: 'right',
    },
    showlegend: true,
    title: "Frequency-Gain Plot of the Low Pass Filter"
    };

    Plotly.newPlot("gain-plot_rc", data, layout);

    document.getElementById("fc-output_rc").value = cutoffFrequency.toPrecision(3);
}

function plotGain_RL() {
    var R = parseFloat(document.getElementById("R_RL").value);
    var L = parseFloat(document.getElementById("L_RL").value);
    var V = parseFloat(document.getElementById("V_RL").value);
    R = 1000*R;
    L = L/1000;

    var cutoffFrequency = R / (2 * Math.PI * L);
    var frequencies = Array.from({length: 500}, (_, i) => Math.pow(10, 6 * i / 499));

    var gains = frequencies.map(function(f) {
        var X_L = 2 * Math.PI * f * L;
        var Z = Math.sqrt(R*R + X_L*X_L);
        return 20 * Math.log10(V * X_L / Z);
    });
    var phase = frequencies.map(function(f) {
        var X_L = 2 * Math.PI * f * L;
        return Math.atan(-X_L / R) * 180 / Math.PI + 90;
    });

    var gainTrace = {
        x: frequencies,
        y: gains,
        type: 'scatter',
        name: 'Gain (dB)',
        yaxis: 'y'
    };
    var phaseTrace = {
        x: frequencies,
        y: phase,
        type: 'scatter',
        name: 'Phase (°)',
        yaxis: 'y2'
    };

    var data = [gainTrace, phaseTrace ];
    var layout = {
    xaxis: {
        type: "log",
        title: "Frequency (Hz)",
        mirror: true,
        ticks: 'outside',
        showline: true,
    },
    yaxis: {
        title: "Gain (dB)",
        // range: [-20, 20],
        // range: [Math.min.apply(Math, gains)-2, Math.max.apply(Math, gains)+2],
        mirror: true,
        ticks: 'outside',
        showline: true,
    },
    yaxis2: {
        title: 'Phase (°)',
        // range: [-180, 0],
        overlaying: 'y',
        side: 'right',
    },
    showlegend: true,
    title: "Frequency-Gain Plot of the High Pass Filter"
    };

    Plotly.newPlot("gain-plot_rl", data, layout);

    document.getElementById("fc-output_rl").value = cutoffFrequency.toPrecision(3);
}

function plotGain_RLC() {
    var R = parseFloat(document.getElementById("R_RLC").value);
    var L = parseFloat(document.getElementById("L_RLC").value);
    var C = parseFloat(document.getElementById("C_RLC").value);
    var V = parseFloat(document.getElementById("V_RLC").value);
    R = 1000*R;
    C = C/1000000000;

    var resonantFrequency = 1 / (2 * Math.PI * Math.sqrt(L*C));
    var frequencies = Array.from({length: 500}, (_, i) => Math.pow(10, 6 * i / 499));

    // var R_LC = 0;
    var gains = frequencies.map(function(f) {
        var X_L = 2 * Math.PI * f * L;
        var X_C = 1 / (2 * Math.PI * f * C);
        var Z = R + X_L + X_C;
        var Vo = V * (X_L - X_C) / Z;
        // var Z = Math.sqrt(R * R + (X_L - X_C - R_LC * 2 * Math.PI * f)*(X_L - X_C - R_LC * 2 * Math.PI * f));
        // var Vo = V * (X_L - X_C - 2 * Math.PI * f * R_LC) / Z;
        return 20 * Math.log10(Math.abs(Vo));
    });

    // var phase = frequencies.map(function(f) {
    //     var X_L = 2 * Math.PI * f * L;
    //     var X_C = 1 / (2 * Math.PI * f * C);
    //     return Math.atan((X_L - X_C) / R) * 180 / Math.PI;
    // });

    // var R_T = R - 5000;
    var phase = frequencies.map(function(f) {
        var X_L = 2 * Math.PI * f * L;
        var X_C = 1 / (2 * Math.PI * f * C);
        var phaseRad = Math.atan((X_L - X_C) / R);
        var phaseDeg = phaseRad * 180 / Math.PI;
        return phaseDeg - 90 * Math.sign(X_L - X_C);
    });

    var gainTrace = {
        x: frequencies,
        y: gains,
        type: 'scatter',
        name: 'Gain (dB)',
        yaxis: 'y'
    };
    var phaseTrace = {
        x: frequencies,
        y: phase,
        type: 'scatter',
        name: 'Phase (°)',
        yaxis: 'y2'
    };

    var data = [gainTrace, phaseTrace ];
    var layout = {
    xaxis: {
        type: "log",
        title: "Frequency (Hz)",
        mirror: true,
        ticks: 'outside',
        showline: true,
    },
    yaxis: {
        title: "Gain (dB)",
        // range: [-20, 20],
        // range: [Math.min.apply(Math, gains)-2, Math.max.apply(Math, gains)+2],
        mirror: true,
        ticks: 'outside',
        showline: true,
    },
    yaxis2: {
        title: 'Phase (°)',
        // range: [-180, 0],
        overlaying: 'y',
        side: 'right',
    },
    showlegend: true,
    title: "Frequency-Gain Plot of the Band Pass Filter"
    };

    Plotly.newPlot("gain-plot_rlc", data, layout);

    document.getElementById("fr-output_rlc").value = resonantFrequency.toPrecision(3);
}