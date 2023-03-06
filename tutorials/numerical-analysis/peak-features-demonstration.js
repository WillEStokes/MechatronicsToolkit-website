function incrementValue(inputId, amount) {
    let input = document.getElementById(inputId);
    input.value = (Number(input.value) + amount).toPrecision(3);
}
  
function decrementValue(inputId, amount) {
    let input = document.getElementById(inputId);
    input.value = (Number(input.value) - amount).toPrecision(3);
}

function initFindPeaksPlot(){   
    // Create the noisy-looking data
    var myrng = new Math.seedrandom();
    const numPoints = 300;
    const voltage = new Array(numPoints);
    const current = new Array(numPoints);
    const noiseScale = 0.06;
    for (let i = 0; i < numPoints; i++) {
        const v = (i / numPoints) * 10;
        voltage[i] = v;
        current[i] = 0.5 * Math.exp(-((v - 3) ** 2 / (2 * 0.5 ** 2))) +
            0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
            noiseScale * (myrng() - 0.5) + 0.05;
    }

    // Create the plot
    const data = [
        { x: voltage, y: current, type: 'scatter', mode: 'markers', name: 'Current', yaxis: 'y1', },
        { x: [0], y: [0], type: 'scatter', mode: 'line', marker: {size: 0}, name: 'Smoothed Current', yaxis: 'y1', },
        { x: [0],
            y: [0],
            type: 'scatter',
            mode: 'markers',
            name: 'Peak',
            yaxis: 'y1',
            marker: {
                size: 10,
                color: 'green',
                symbol: 'circle',
                line: {
                width: 1,
                color: 'black',
                },
            },
            },
    ];
    const layout = {
        xaxis: {title: 'Voltage', range: [1.2, 6], mirror: true, ticks: 'outside', showline: true},
        yaxis: {title: 'Current', range: [0, 0.6], side: 'left', mirror: true, ticks: 'outside', showline: true},
    };

    Plotly.newPlot('find-peaks-plot', data, layout);
}

const fastSmooth = (arr, windowSize) => arr.map((val, index, array) => {
    const halfWindowSize = Math.floor(windowSize / 2);
    const windowStart = Math.max(0, index - halfWindowSize);
    const windowEnd = Math.min(array.length - 1, index + halfWindowSize);
    const window = array.slice(windowStart, windowEnd + 1);
    const paddingStart = Array(halfWindowSize - index + windowStart).fill(window[0]);
    const paddingEnd = Array(index + halfWindowSize - windowEnd).fill(window[window.length - 1]);
    const paddedWindow = [...paddingStart, ...window, ...paddingEnd];
    const avg = paddedWindow.reduce((a, b) => a + b) / paddedWindow.length;
    return avg;
});

function findPeaksPlot(){
    var locationThreshold = parseFloat(document.getElementById("location-threshold").value);
    var heightThreshold = parseFloat(document.getElementById("height-threshold").value);
    var smoothWidth = parseFloat(document.getElementById("smooth-width").value);
    var peakGroup = parseFloat(document.getElementById("peak-group").value);
    
    // Create the noisy-looking data
    var myrng = new Math.seedrandom();
    const numPoints = 300;
    const voltage = new Array(numPoints);
    const current = new Array(numPoints);
    const noiseScale = 0.06;
    for (let i = 0; i < numPoints; i++) {
        const v = (i / numPoints) * 10;
        voltage[i] = v;
        current[i] = 0.5 * Math.exp(-((v - 3) ** 2 / (2 * 0.5 ** 2))) +
            0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
            noiseScale * (myrng() - 0.5) + 0.05;
    }

    const smoothedCurrent = fastSmooth(current, smoothWidth);

    // Compute the derivative
    const derivative = new Array(numPoints);
    const h = voltage[1] - voltage[0];
    derivative[0] = (smoothedCurrent[1] - smoothedCurrent[0]) / h;
    for (let i = 1; i < numPoints - 1; i++) {
        derivative[i] = (smoothedCurrent[i+1] - smoothedCurrent[i-1]) / (2 * h);
    }
    derivative[numPoints-1] = (smoothedCurrent[numPoints-1] - smoothedCurrent[numPoints-2]) / h;

    const peakGroups = [];
    let currentPeakGroup = [];
    let lastDerivative = 0;
    for (let i = 0; i < numPoints; i++) {
        // if (derivative[i] < 0 && lastDerivative >= 0) {
        if (Math.sign(derivative[i]) != Math.sign(lastDerivative)) {
            for (let n = 0; n < peakGroup; n++) {
                currentPeakGroup.push(i+n); }
        peakGroups.push(currentPeakGroup);
        currentPeakGroup = [];
        }
        lastDerivative = derivative[i];
    }

    // Create the plot
    const data = [
        { x: voltage, y: current, type: 'scatter', mode: 'markers', name: 'Current', yaxis: 'y1', },
        { x: voltage, y: smoothedCurrent, type: 'scatter', mode: 'line', name: 'Smoothed Current', yaxis: 'y1', },
        { x: [],
        y: [],
        type: 'scatter',
        mode: 'markers',
        name: 'Peak',
        yaxis: 'y1',
        marker: {
            size: 10,
            color: 'green',
            symbol: 'circle',
            line: {
            width: 1,
            color: 'black',
            },
        },
        },
    ];
    const layout = {
        xaxis: {title: 'Voltage', range: [1.2, 6], mirror: true, ticks: 'outside', showline: true},
        yaxis: {title: 'Current', range: [0, 0.6], side: 'left', mirror: true, ticks: 'outside', showline: true},
    };

    let prevMeanY = 0; // initialize previous mean y value to 0
    var xFiltered = [];
    var yFiltered = [];

    peakGroups.forEach((group) => {
        const x = group.map((index) => voltage[index]);
        const y = group.map((index) => current[index]);
        const meanX = x.reduce((a, b) => a + b) / x.length;
        const meanY = y.reduce((a, b) => a + b) / y.length;
        
        // compare current mean y value to previous mean y value plus threshold
        if (meanY > prevMeanY + heightThreshold) {
            xFiltered.push(x[0]);
            yFiltered.push(meanY);
        }

        prevMeanY = meanY; // update previous mean y value
    });

    let prevXFiltered = 0;

    for (let i = 0; i < xFiltered.length; i++) {
        if (xFiltered[i] > prevXFiltered + locationThreshold) {
            data[2].x.push(xFiltered[i]);
            data[2].y.push(yFiltered[i]);
        }

        prevXFiltered = xFiltered[i];
    };

    Plotly.newPlot('find-peaks-plot', data, layout);

}