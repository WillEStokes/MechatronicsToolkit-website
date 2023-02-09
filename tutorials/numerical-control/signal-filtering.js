function incrementValue(inputId, amount) {
    let input = document.getElementById(inputId);
    input.value = (Number(input.value) + amount).toPrecision(3);
}

function decrementValue(inputId, amount) {
    let input = document.getElementById(inputId);
    input.value = (Number(input.value) - amount).toPrecision(3);
}

function initGainPlot() {
    var frequencies = [];
    var gains = [];

    for (var i = 1; i < 100000; i = i * 1.2) {
        frequencies.push(i);
        gains.push(20);
    }
    var data = [
    {
        x: frequencies,
        y: gains,
        type: "line"
    }
    ];
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
        range: [-20, 20],
        mirror: true,
        ticks: 'outside',
        showline: true,
    },
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
    var frequencies = [];
    var gains = [];

    for (var i = 1; i < 100000; i = i * 1.2) {
        frequencies.push(i);
        gains.push(20 * Math.log10(V / Math.sqrt(1 + (i / cutoffFrequency) ** 2)));
    }
    var data = [
    {
        x: frequencies,
        y: gains,
        type: "line"
    }
    ];
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
        range: [Math.min.apply(Math, gains), 20],
        mirror: true,
        ticks: 'outside',
        showline: true,
    },
    title: "Frequency-Gain Plot of the Low Pass Filter"
    };

    Plotly.newPlot("gain-plot", data, layout);
}