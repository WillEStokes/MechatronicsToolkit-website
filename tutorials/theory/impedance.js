function incrementValue(inputId, amount) {
    let input = document.getElementById(inputId);
    input.value = (Number(input.value) + amount).toPrecision(3);
}

function decrementValue(inputId, amount) {
    let input = document.getElementById(inputId);
    input.value = (Number(input.value) - amount).toPrecision(3);
}

function initCosPlot() {
    frequency = 50000;
    const periods = 3;
    const numPoints = 200;

    const t = Array.from({ length: numPoints }, (_, i) => ((periods / frequency) * i) / numPoints);
    const omega = 2 * Math.PI * frequency;
    const wt = t.map((x) => omega * x);
    const Vin = wt.map((x) => Math.cos(x));

    const data = [{
        x: t,
        y: Vin,
        mode: 'lines',
        line: {
            width: 2,
            color: 'black'
        },
        name: '$V_{in}$ (Ω)',
    },
    {
        x: [0, 0],
        y: [0, 0],
        mode: 'lines',
        line: {
            width: 2,
            color: 'black',
            dash: 'dash'
        },
        name: '$V_{out}$ (Ω)',
    }];

    const layout = {
    xaxis: {
        title: {
        text: 'Time',
        font: {
            size: 26,
            family: 'Times New Roman'
        }
        },
        linecolor: 'grey',
        gridcolor: 'lightGrey',
        mirror: true,
        ticks: 'outside',
        showline: true,
        zerolinecolor: 'lightGrey'
    },
    yaxis: {
        range: [-2, 2],
        title: {
        text: 'Voltage',
        font: {
            size: 26,
            family: 'Times New Roman'
        }
        },
        linecolor: 'grey',
        gridcolor: 'lightGrey',
        mirror: true,
        ticks: 'outside',
        showline: true,
        zerolinecolor: 'lightGrey'
    },
    autosize: false,
    width: 600,
    height: 250,
    margin: {
        l: 50,
        r: 100,
        t: 20,
        b: 50
      }
    };

    Plotly.newPlot('inductor-wave-plot', data, layout);
    Plotly.newPlot('capacitor-wave-plot', data, layout);
}

function cosPlot_L() {
    var frequency = parseFloat(document.getElementById("F_RL").value);
    frequency = frequency*1000;
    L = 0.001;
    const R = 330;
    const periods = 3;
    const numPoints = 200;

    const t = Array.from({ length: numPoints }, (_, i) => ((periods / frequency) * i) / numPoints);
    const omega = 2 * Math.PI * frequency;
    const wt = t.map((x) => omega * x);
    const Vin = wt.map((x) => Math.cos(x));

    const z1Ind = math.complex(0, omega * L);
    const v1Ind = math.divide(math.multiply(1, z1Ind), math.add(R, z1Ind));

    const P = 2 * Vin.map(v => v * v).reduce((sum, v) => sum + v, 0) / Vin.length;
    const Q = -2 * wt.map(w => Math.sin(w)).map((s, i) => s * Vin[i]).reduce((sum, q) => sum + q, 0) / wt.length;

    const v0f = math.complex(P, Q);
    const v1f = math.multiply(v0f, v1Ind);
    const epjwt = wt.map(w => math.exp(math.complex(0, w)));
    const reconstructed = epjwt.map(epjw => math.multiply(v1f, epjw));

    var inputTrace = {
        x: t,
        y: Vin,
        mode: 'lines',
        line: {
            width: 2,
            color: 'black'
        },
        name: '$V_{in}$ (Ω)',
    };
    var outputTrace = {
        x: t,
        y: reconstructed.map(c => c.im),
        mode: 'lines',
        line: {
            width: 2,
            color: 'black',
            dash: 'dash'
        },
        name: '$V_{out}$ (Ω)',
    };

    var data = [inputTrace, outputTrace ];

    const layout = {
    xaxis: {
        title: {
        text: 'Time',
        font: {
            size: 26,
            family: 'Times New Roman'
        }
        },
        linecolor: 'grey',
        gridcolor: 'lightGrey',
        mirror: true,
        ticks: 'outside',
        showline: true,
        zerolinecolor: 'lightGrey'
    },
    yaxis: {
        range: [-2, 2],
        title: {
        text: 'Voltage',
        font: {
            size: 26,
            family: 'Times New Roman'
        }
        },
        linecolor: 'grey',
        gridcolor: 'lightGrey',
        mirror: true,
        ticks: 'outside',
        showline: true,
        zerolinecolor: 'lightGrey'
    },
    autosize: false,
    width: 600,
    height: 250,
    margin: {
        l: 50,
        r: 100,
        t: 20,
        b: 50
      }
    };

    Plotly.newPlot('inductor-wave-plot', data, layout);
}

function cosPlot_C() {
    var frequency = parseFloat(document.getElementById("F_RC").value);
    frequency = frequency*1000;
    const C = 1e-8;
    const R = 330;
    const periods = 3;
    const numPoints = 200;

    const t = Array.from({ length: numPoints }, (_, i) => ((periods / frequency) * i) / numPoints);
    const omega = 2 * Math.PI * frequency;
    const wt = t.map((x) => omega * x);
    const Vin = wt.map((x) => Math.cos(x));

    const z1Cap = math.complex(0, 1 / (omega * C));
    const v1Cap = math.divide(z1Cap, math.add(R, z1Cap));

    const P = 2 * Vin.map(v => v * v).reduce((sum, v) => sum + v, 0) / Vin.length;
    const Q = -2 * wt.map(w => Math.sin(w)).map((s, i) => s * Vin[i]).reduce((sum, q) => sum + q, 0) / wt.length;

    const v0f = math.complex(P, Q);
    const v1f = math.multiply(v0f, v1Cap);
    const epjwt = wt.map(w => math.exp(math.complex(0, w)));
    const reconstructed = epjwt.map(epjw => math.multiply(v1f, epjw));

    var inputTrace = {
        x: t,
        y: Vin,
        mode: 'lines',
        line: {
            width: 2,
            color: 'black'
        },
        name: '$V_{in}$ (Ω)',
    };
    var outputTrace = {
        x: t,
        y: reconstructed.map(c => c.re),
        mode: 'lines',
        line: {
            width: 2,
            color: 'black',
            dash: 'dash'
        },
        name: '$V_{out}$ (Ω)',
    };

    var data = [inputTrace, outputTrace ];

    const layout = {
    xaxis: {
        title: {
        text: 'Time',
        font: {
            size: 26,
            family: 'Times New Roman'
        }
        },
        linecolor: 'grey',
        gridcolor: 'lightGrey',
        mirror: true,
        ticks: 'outside',
        showline: true,
        zerolinecolor: 'lightGrey'
    },
    yaxis: {
        range: [-2, 2],
        title: {
        text: 'Voltage',
        font: {
            size: 26,
            family: 'Times New Roman'
        }
        },
        linecolor: 'grey',
        gridcolor: 'lightGrey',
        mirror: true,
        ticks: 'outside',
        showline: true,
        zerolinecolor: 'lightGrey'
    },
    autosize: false,
    width: 600,
    height: 250,
    margin: {
        l: 50,
        r: 100,
        t: 20,
        b: 50
      }
    };

    Plotly.newPlot('capacitor-wave-plot', data, layout);
}