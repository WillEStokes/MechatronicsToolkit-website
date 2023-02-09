function incrementValue(inputId, amount) {
    let input = document.getElementById(inputId);
    input.value = (Number(input.value) + amount).toPrecision(3);
}

function decrementValue(inputId, amount) {
    let input = document.getElementById(inputId);
    input.value = (Number(input.value) - amount).toPrecision(3);
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

    Plotly.newPlot("gain-plot", data, layout);
}

function plotGain() {
    var R = parseFloat(document.getElementById("R").value);
    var C = parseFloat(document.getElementById("C").value);
    var V = parseFloat(document.getElementById("V").value);
    R = 1000*R;
    C = C/1000000000;

    var cutoffFrequency = 1 / (2 * Math.PI * R * C);
    var frequencies = Array.from({length: 500}, (_, i) => Math.pow(10, 6 * i / 499));

    var gains = frequencies.map(function(x) {
        return 20 * Math.log10(V / Math.sqrt(1 + (x / cutoffFrequency) ** 2));
    });
    var phase = frequencies.map(function(f) {
        var omega = 2 * Math.PI * f;
        return -Math.atan(omega * R * C) * 180 / Math.PI;
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

    Plotly.newPlot("gain-plot", data, layout);
}