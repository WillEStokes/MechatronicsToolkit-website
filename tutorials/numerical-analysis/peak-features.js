let clickCount_1 = 0;

function rightArrowClick_1() {
  clickCount_1++;
  if (clickCount_1 === 1) {groupingPlot(); }
  else if (clickCount_1 === 2) {groupingMeanPlot(); }
  else if (clickCount_1 > 2) {clickCount_1 = 2; }
}

function leftArrowClick_1() {
  clickCount_1--;
  if (clickCount_1 === 0) {basePlot(); }
  else if (clickCount_1 === 1) {groupingPlot(); }
  else if (clickCount_1 < 0) {clickCount_1 = 0; }
}

let clickCount_2 = 0;

function rightArrowClick_2() {
  clickCount_2++;
  if (clickCount_2 === 1) {locationFilterPlot(); }
  else if (clickCount_2 === 2) {peakGroupsPlot(); }
  else if (clickCount_2 > 2) {clickCount_2 = 2; }
}

function leftArrowClick_2() {
  clickCount_2--;
  if (clickCount_2 === 0) {heightFilterPlot(); }
  else if (clickCount_2 === 1) {locationFilterPlot(); }
  else if (clickCount_2 < 0) {clickCount_2 = 0; }
}

function derivativePlot() {
    // Create the noisy-looking data
    var myrng = new Math.seedrandom(2);
    const numPoints = 400;
    const voltage = new Array(numPoints);
    const current = new Array(numPoints);
    const noiseScale = 0.01;
    for (let i = 0; i < numPoints; i++) {
      const v = (i / numPoints) * 10;
      voltage[i] = v;
      current[i] = 0.5 * Math.exp(-((v - 2.5) ** 2 / (2 * 0.5 ** 2))) +
        0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
        noiseScale * (myrng() - 0.5);
        // noiseScale * (Math.random() - 0.5);
    }
  
    // Compute the derivative
    const derivative = new Array(numPoints);
    const h = voltage[1] - voltage[0];
    derivative[0] = (current[1] - current[0]) / h;
    for (let i = 1; i < numPoints - 1; i++) {
      derivative[i] = (current[i+1] - current[i-1]) / (2 * h);
    }
    derivative[numPoints-1] = (current[numPoints-1] - current[numPoints-2]) / h;
  
    // Create the plot
    const data = [
      {
        x: voltage,
        y: current,
        type: 'scatter',
        mode: 'markers',
        name: 'Current',
        yaxis: 'y1',
      },
      {
        x: voltage,
        y: derivative,
        type: 'scatter',
        mode: 'lines',
        name: 'Derivative',
        yaxis: 'y2',
      }
    ];
    const layout = {
      xaxis: {title: 'Voltage', mirror: true, ticks: 'outside', showline: true},
      yaxis: {title: 'Current', side: 'left', mirror: true, ticks: 'outside', showline: true},
      yaxis2: {title: 'Derivative', side: 'right', overlaying: 'y', mirror: true, ticks: 'outside', showline: true},
    };
    Plotly.newPlot('derivative-plot', data, layout);
}

function basePlot() {
  // Create the noisy-looking data
  var myrng = new Math.seedrandom(1);
  const numPoints = 400;
  const voltage = new Array(numPoints);
  const current = new Array(numPoints);
  const noiseScale = 0.01;
  for (let i = 0; i < numPoints; i++) {
    const v = (i / numPoints) * 10;
    voltage[i] = v;
    current[i] = 0.5 * Math.exp(-((v - 2.5) ** 2 / (2 * 0.5 ** 2))) +
      0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
      noiseScale * (myrng() - 0.5);
  }

  // Compute the derivative
  const derivative = new Array(numPoints);
  const h = voltage[1] - voltage[0];
  derivative[0] = (current[1] - current[0]) / h;
  for (let i = 1; i < numPoints - 1; i++) {
    derivative[i] = (current[i+1] - current[i-1]) / (2 * h);
  }
  derivative[numPoints-1] = (current[numPoints-1] - current[numPoints-2]) / h;

  // Create the plot
  const data = [
    { x: voltage, y: current, type: 'scatter', mode: 'markers', name: 'Current', yaxis: 'y1', },
    { x: voltage, y: derivative, type: 'scatter', mode: 'lines', name: 'Derivative', yaxis: 'y2', },
    { x: [],
      y: [],
      type: 'scatter',
      mode: 'markers',
      name: '',
      yaxis: 'y1',
      marker: {
        size: 10,
        color: 'red',
        symbol: 'circle',
        line: {
          width: 1,
          color: 'black',
        },
      },
    },
  ];
  const layout = {
    xaxis: {title: 'Voltage', range: [2, 3], mirror: true, ticks: 'outside', showline: true},
    yaxis: {title: 'Current', range: [0.45, 0.52], side: 'left', mirror: true, ticks: 'outside', showline: true},
    yaxis2: {title: 'Derivative', side: 'right', overlaying: 'y', mirror: true, ticks: 'outside', showline: true},
  };
  data[2].x.push(0);
  data[2].y.push(0);

  Plotly.newPlot('grouping-plot', data, layout);

}

function groupingPlot() {
  // Create the noisy-looking data
  var myrng = new Math.seedrandom(1);
  const numPoints = 400;
  const voltage = new Array(numPoints);
  const current = new Array(numPoints);
  const noiseScale = 0.01;
  for (let i = 0; i < numPoints; i++) {
    const v = (i / numPoints) * 10;
    voltage[i] = v;
    current[i] = 0.5 * Math.exp(-((v - 2.5) ** 2 / (2 * 0.5 ** 2))) +
      0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
      noiseScale * (myrng() - 0.5);
  }

  // Compute the derivative
  const derivative = new Array(numPoints);
  const h = voltage[1] - voltage[0];
  derivative[0] = (current[1] - current[0]) / h;
  for (let i = 1; i < numPoints - 1; i++) {
    derivative[i] = (current[i+1] - current[i-1]) / (2 * h);
  }
  derivative[numPoints-1] = (current[numPoints-1] - current[numPoints-2]) / h;

  // Find the peak groups
  const groupSize = 5;
  const peakGroups = [];
  let currentPeakGroup = [];
  let lastDerivative = 0;
  // for (let i = 0; i < numPoints; i++) {
  let i = 99;
    // if (derivative[i] > threshold && lastDerivative <= threshold) {
    //   currentPeakGroup.push(i);
    // }
    if (derivative[i] < 0 && lastDerivative >= 0) {
        for (let n = 0; n < groupSize; n++) {
          currentPeakGroup.push(i+n); }
      peakGroups.push(currentPeakGroup);
      currentPeakGroup = [];
    }
    lastDerivative = derivative[i];
  // }
  // if (currentPeakGroup.length > 0) {
  //   peakGroups.push(currentPeakGroup);
  // }

  // Create the plot
  const data = [
    { x: voltage, y: current, type: 'scatter', mode: 'markers', name: 'Current', yaxis: 'y1', },
    { x: voltage, y: derivative, type: 'scatter', mode: 'lines', name: 'Derivative', yaxis: 'y2', },
    { x: [],
      y: [],
      type: 'scatter',
      mode: 'markers',
      name: 'Group',
      yaxis: 'y1',
      marker: {
        size: 10,
        color: 'red',
        symbol: 'circle',
        line: {
          width: 1,
          color: 'black',
        },
      },
    },
  ];
  const layout = {
    xaxis: {title: 'Voltage', range: [2, 3], mirror: true, ticks: 'outside', showline: true},
    yaxis: {title: 'Current', range: [0.45, 0.52], side: 'left', mirror: true, ticks: 'outside', showline: true},
    yaxis2: {title: 'Derivative', side: 'right', overlaying: 'y', mirror: true, ticks: 'outside', showline: true},
  };
  peakGroups.forEach((group) => {
    const x = group.map((index) => voltage[index]);
    const y = group.map((index) => current[index]);
    data[2].x.push(...x);
    data[2].y.push(...y);
  });

  Plotly.newPlot('grouping-plot', data, layout);

}

function groupingMeanPlot() {
  // Create the noisy-looking data
  var myrng = new Math.seedrandom(1);
  const numPoints = 400;
  const voltage = new Array(numPoints);
  const current = new Array(numPoints);
  const noiseScale = 0.01;
  for (let i = 0; i < numPoints; i++) {
    const v = (i / numPoints) * 10;
    voltage[i] = v;
    current[i] = 0.5 * Math.exp(-((v - 2.5) ** 2 / (2 * 0.5 ** 2))) +
      0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
      noiseScale * (myrng() - 0.5);
  }

  // Compute the derivative
  const derivative = new Array(numPoints);
  const h = voltage[1] - voltage[0];
  derivative[0] = (current[1] - current[0]) / h;
  for (let i = 1; i < numPoints - 1; i++) {
    derivative[i] = (current[i+1] - current[i-1]) / (2 * h);
  }
  derivative[numPoints-1] = (current[numPoints-1] - current[numPoints-2]) / h;

  // Find the peak groups
  // const threshold = 0;
  // const peakGroups = [];
  // let currentPeakGroup = [];
  // let lastDerivative = 0;
  // for (let i = 0; i < numPoints; i++) {
  //   if (derivative[i] > threshold && lastDerivative <= threshold) {
  //     currentPeakGroup.push(i);
  //   } else if (derivative[i] < threshold && lastDerivative >= threshold) {
  //     currentPeakGroup.push(i);
  //     peakGroups.push(currentPeakGroup);
  //     currentPeakGroup = [];
  //   }
  //   lastDerivative = derivative[i];
  // }
  // if (currentPeakGroup.length > 0) {
  //   peakGroups.push(currentPeakGroup);
  // }

  const groupSize = 5;
  const peakGroups = [];
  let currentPeakGroup = [];
  let lastDerivative = 0;
  let i = 99;
    if (derivative[i] < 0 && lastDerivative >= 0) {
        for (let n = 0; n < groupSize; n++) {
          currentPeakGroup.push(i+n); }
      peakGroups.push(currentPeakGroup);
      currentPeakGroup = [];
    }
  lastDerivative = derivative[i];

  // Create the plot
  const data = [
    { x: voltage, y: current, type: 'scatter', mode: 'markers', name: 'Current', yaxis: 'y1', },
    { x: voltage, y: derivative, type: 'scatter', mode: 'lines', name: 'Derivative', yaxis: 'y2', },
    { x: [],
      y: [],
      type: 'scatter',
      mode: 'markers',
      name: 'Mean',
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
    xaxis: {title: 'Voltage', range: [2, 3], mirror: true, ticks: 'outside', showline: true},
    yaxis: {title: 'Current', range: [0.45, 0.52], side: 'left', mirror: true, ticks: 'outside', showline: true},
    yaxis2: {title: 'Derivative', side: 'right', overlaying: 'y', mirror: true, ticks: 'outside', showline: true},
  };
  peakGroups.forEach((group) => {
    const x = group.map((index) => voltage[index]);
    const y = group.map((index) => current[index]);
    // data[2].x.push(...x);
    // data[2].y.push(...y);
    mean = x.reduce((a, b) => a + b) / x.length;
    data[2].x.push(mean);
    mean = y.reduce((a, b) => a + b) / y.length;
    data[2].y.push(mean);
  });

  Plotly.newPlot('grouping-plot', data, layout);

}

function heightFilterPlot() {
  // Create the noisy-looking data
  var myrng = new Math.seedrandom(1);
  const numPoints = 400;
  const voltage = new Array(numPoints);
  const current = new Array(numPoints);
  const noiseScale = 0.01;
  for (let i = 0; i < numPoints; i++) {
    const v = (i / numPoints) * 10;
    voltage[i] = v;
    current[i] = 0.5 * Math.exp(-((v - 2.5) ** 2 / (2 * 0.5 ** 2))) +
      0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
      noiseScale * (myrng() - 0.5);
  }

  // Compute the derivative
  const derivative = new Array(numPoints);
  const h = voltage[1] - voltage[0];
  derivative[0] = (current[1] - current[0]) / h;
  for (let i = 1; i < numPoints - 1; i++) {
    derivative[i] = (current[i+1] - current[i-1]) / (2 * h);
  }
  derivative[numPoints-1] = (current[numPoints-1] - current[numPoints-2]) / h;

  const groupSize = 5;
  const peakGroups = [];
  let currentPeakGroup = [];
  let lastDerivative = 0;
  for (let i = 0; i < numPoints; i++) {
    if (derivative[i] < 0 && lastDerivative >= 0) {
        for (let n = 0; n < groupSize; n++) {
          currentPeakGroup.push(i+n); }
      peakGroups.push(currentPeakGroup);
      currentPeakGroup = [];
    }
    lastDerivative = derivative[i];
  }

  // Create the plot
  const data = [
    { x: voltage, y: current, type: 'scatter', mode: 'markers', name: 'Current', yaxis: 'y1', },
    { x: voltage, y: derivative, type: 'scatter', mode: 'lines', name: 'Derivative', yaxis: 'y2', },
    { x: [],
      y: [],
      type: 'scatter',
      mode: 'markers',
      name: 'Mean',
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
    yaxis: {title: 'Current', range: [0, 0.52], side: 'left', mirror: true, ticks: 'outside', showline: true},
    yaxis2: {title: 'Derivative', side: 'right', overlaying: 'y', mirror: true, ticks: 'outside', showline: true},
    shapes: [{
      type: 'line',
      x0: 1.3,
      y0: 0.027,
      x1: 2.525,
      y1: 0.027,
      xref: 'x',
      yref: 'y',
      opacity: 0.6,
      line: {
          color: 'red',
          width: 2,
      },
    },
    {
      type: 'line',
      x0: 1.3,
      y0: 0.5,
      x1: 2.525,
      y1: 0.5,
      xref: 'x',
      yref: 'y',
      opacity: 0.6,
      line: {
          color: 'red',
          width: 2,
      },
    }],
    annotations: [{
      ax: 2,
      ay: 0.05,
      x: 2,
      y: 0.5,
      xref: 'x',
      yref: 'y',
      axref: "x",
      ayref: 'y', 
      text: '<b>Height</b>',
      font: {
          size: 14,
          color: 'red'
      },
      showarrow: true,
      arrowhead: 2,
      arrowcolor: 'red',
      arrowsize: 1,
      arrowwidth: 2,
      opacity: 0.8,
    }],
    title: "Filter by height"
  };

  peakGroups.forEach((group) => {
    const x = group.map((index) => voltage[index]);
    const y = group.map((index) => current[index]);
    // data[2].x.push(...x);
    // data[2].y.push(...y);
    mean = x.reduce((a, b) => a + b) / x.length;
    data[2].x.push(mean);
    mean = y.reduce((a, b) => a + b) / y.length;
    data[2].y.push(mean);
  });

  Plotly.newPlot('peak-groups-plot', data, layout);

}

function locationFilterPlot() {
  // Create the noisy-looking data
  var myrng = new Math.seedrandom(1);
  const numPoints = 400;
  const voltage = new Array(numPoints);
  const current = new Array(numPoints);
  const noiseScale = 0.01;
  for (let i = 0; i < numPoints; i++) {
    const v = (i / numPoints) * 10;
    voltage[i] = v;
    current[i] = 0.5 * Math.exp(-((v - 2.5) ** 2 / (2 * 0.5 ** 2))) +
      0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
      noiseScale * (myrng() - 0.5);
  }

  // Compute the derivative
  const derivative = new Array(numPoints);
  const h = voltage[1] - voltage[0];
  derivative[0] = (current[1] - current[0]) / h;
  for (let i = 1; i < numPoints - 1; i++) {
    derivative[i] = (current[i+1] - current[i-1]) / (2 * h);
  }
  derivative[numPoints-1] = (current[numPoints-1] - current[numPoints-2]) / h;

  const groupSize = 5;
  const peakGroups = [];
  let currentPeakGroup = [];
  let lastDerivative = 0;
  for (let i = 0; i < numPoints; i++) {
    if (derivative[i] < 0 && lastDerivative >= 0) {
        for (let n = 0; n < groupSize; n++) {
          currentPeakGroup.push(i+n); }
      peakGroups.push(currentPeakGroup);
      currentPeakGroup = [];
    }
    lastDerivative = derivative[i];
  }

  // Create the plot
  const data = [
    { x: voltage, y: current, type: 'scatter', mode: 'markers', name: 'Current', yaxis: 'y1', },
    { x: voltage, y: derivative, type: 'scatter', mode: 'lines', name: 'Derivative', yaxis: 'y2', },
    { x: [],
      y: [],
      type: 'scatter',
      mode: 'markers',
      name: 'Mean',
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
    yaxis: {title: 'Current', range: [0, 0.52], side: 'left', mirror: true, ticks: 'outside', showline: true},
    yaxis2: {title: 'Derivative', side: 'right', overlaying: 'y', mirror: true, ticks: 'outside', showline: true},
    shapes: [{
      type: 'line',
      x0: 2.525,
      y0: 0.248,
      x1: 2.525,
      y1: 0.5,
      xref: 'x',
      yref: 'y',
      opacity: 0.6,
      line: {
          color: 'red',
          width: 2,
      },
    },
    {
      type: 'line',
      x0: 4.975,
      y0: 0.248,
      x1: 4.975,
      y1: 0.5,
      xref: 'x',
      yref: 'y',
      opacity: 0.6,
      line: {
          color: 'red',
          width: 2,
      },
    }],
    annotations: [{
      ax: 2.95,
      ay: 0.4,
      x: 4.975,
      y: 0.4,
      xref: 'x',
      yref: 'y',
      axref: "x",
      ayref: 'y', 
      text: '<b>Location</b>',
      font: {
          size: 14,
          color: 'red'
      },
      showarrow: true,
      arrowhead: 2,
      arrowcolor: 'red',
      arrowsize: 1,
      arrowwidth: 2,
      opacity: 0.8,
    }],
    title: "Filter by location"
  };

  let prevMeanY = 0; // initialize previous mean y value to 0
  const threshold = 0.1; // set the threshold value

  peakGroups.forEach((group) => {
    const x = group.map((index) => voltage[index]);
    const y = group.map((index) => current[index]);
    const meanX = x.reduce((a, b) => a + b) / x.length;
    const meanY = y.reduce((a, b) => a + b) / y.length;
    
    // compare current mean y value to previous mean y value plus threshold
    if (meanY > prevMeanY + threshold) {
      data[2].x.push(meanX);
      data[2].y.push(meanY);
    }

    prevMeanY = meanY; // update previous mean y value
  });

  Plotly.newPlot('peak-groups-plot', data, layout);

}

function peakGroupsPlot() {
  // Create the noisy-looking data
  var myrng = new Math.seedrandom(1);
  const numPoints = 400;
  const voltage = new Array(numPoints);
  const current = new Array(numPoints);
  const noiseScale = 0.01;
  for (let i = 0; i < numPoints; i++) {
    const v = (i / numPoints) * 10;
    voltage[i] = v;
    current[i] = 0.5 * Math.exp(-((v - 2.5) ** 2 / (2 * 0.5 ** 2))) +
      0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
      noiseScale * (myrng() - 0.5);
  }

  // Compute the derivative
  const derivative = new Array(numPoints);
  const h = voltage[1] - voltage[0];
  derivative[0] = (current[1] - current[0]) / h;
  for (let i = 1; i < numPoints - 1; i++) {
    derivative[i] = (current[i+1] - current[i-1]) / (2 * h);
  }
  derivative[numPoints-1] = (current[numPoints-1] - current[numPoints-2]) / h;

  const groupSize = 5;
  const peakGroups = [];
  let currentPeakGroup = [];
  let lastDerivative = 0;
  // for (let i = 0; i < numPoints; i++) {
    let i = 99;
    if (derivative[i] < 0 && lastDerivative >= 0) {
        for (let n = 0; n < groupSize; n++) {
          currentPeakGroup.push(i+n); }
      peakGroups.push(currentPeakGroup);
      currentPeakGroup = [];
    }
    lastDerivative = derivative[i];
  // }

  // Create the plot
  const data = [
    { x: voltage, y: current, type: 'scatter', mode: 'markers', name: 'Current', yaxis: 'y1' },
    { x: voltage, y: derivative, type: 'scatter', mode: 'lines', name: 'Derivative', yaxis: 'y2' },
    { x: [],
      y: [],
      type: 'scatter',
      mode: 'markers',
      name: 'Mean',
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
    yaxis: {title: 'Current', range: [0, 0.52], side: 'left', mirror: true, ticks: 'outside', showline: true},
    yaxis2: {title: 'Derivative', side: 'right', overlaying: 'y', mirror: true, ticks: 'outside', showline: true},
    title: "Filtered peaks"
  };

  peakGroups.forEach((group) => {
    const x = group.map((index) => voltage[index]);
    const y = group.map((index) => current[index]);
    const meanX = x.reduce((a, b) => a + b) / x.length;
    const meanY = y.reduce((a, b) => a + b) / y.length;
    data[2].x.push(meanX);
    data[2].y.push(meanY);
  });

  Plotly.newPlot('peak-groups-plot', data, layout);

}

function featuresPlot() {
  // Create the noisy-looking data
  var myrng = new Math.seedrandom(1);
  const numPoints = 120;
  const voltage = new Array(numPoints);
  const current = new Array(numPoints);
  const noiseScale = 0.01;
  for (let i = 0; i < numPoints; i++) {
    const v = (i / numPoints) * 4;
    voltage[i] = v;
    current[i] = 0.4 * Math.exp(-((v - 2) ** 2 / (2 * 0.5 ** 2))) +
      // 0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
      noiseScale * (myrng() - 0.5) + 0.1;
  }

  // Compute the derivative
  const derivative = new Array(numPoints);
  const h = voltage[1] - voltage[0];
  derivative[0] = (current[1] - current[0]) / h;
  for (let i = 1; i < numPoints - 1; i++) {
    derivative[i] = (current[i+1] - current[i-1]) / (2 * h);
  }
  derivative[numPoints-1] = (current[numPoints-1] - current[numPoints-2]) / h;

  const groupSize = 1;
  const peakGroups = [];
  let currentPeakGroup = [];
  let lastDerivative = 0;
  // for (let i = 0; i < numPoints; i++) {
    let i = 60;
    if (Math.sign(derivative[i]) != Math.sign(lastDerivative)) {
        for (let n = 0; n < groupSize; n++) {
          currentPeakGroup.push(i+n); }
      peakGroups.push(currentPeakGroup);
      currentPeakGroup = [];
    }
    lastDerivative = derivative[i];
  // }

  // Create the plot
  const data = [
    { x: voltage, y: current, type: 'scatter', mode: 'markers', name: 'Current', yaxis: 'y1' },
    { x: voltage, y: derivative, type: 'scatter', mode: 'lines', name: 'Derivative', yaxis: 'y2' },
    { x: [],
      y: [],
      type: 'scatter',
      mode: 'markers',
      name: 'Mean',
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
    xaxis: {title: 'Voltage', range: [0, 4], mirror: true, ticks: 'outside', showline: true},
    yaxis: {title: 'Current', range: [0, 0.52], side: 'left', mirror: true, ticks: 'outside', showline: true},
    yaxis2: {title: 'Derivative', side: 'right', overlaying: 'y', mirror: true, ticks: 'outside', showline: true},
    shapes: [{
      type: 'line',
      x0: 0.667,
      y0: 0.107,
      x1: 0.667,
      y1: 0.35,
      xref: 'x',
      yref: 'y',
      opacity: 0.6,
      line: {
          color: 'red',
          width: 2,
      },
    },
    {
      type: 'line',
      x0: 3.2,
      y0: 0.107,
      x1: 3.2,
      y1: 0.35,
      xref: 'x',
      yref: 'y',
      opacity: 0.6,
      line: {
          color: 'red',
          width: 2,
      },
    },
    {
      type: 'line',
      x0: 0.667,
      y0: 0.107,
      x1: 1.7,
      y1: 0.107,
      xref: 'x',
      yref: 'y',
      opacity: 0.6,
      line: {
          color: 'red',
          width: 2,
      },
    },
    {
      type: 'line',
      x0: 1.3,
      y0: 0.5,
      x1: 2,
      y1: 0.5,
      xref: 'x',
      yref: 'y',
      opacity: 0.6,
      line: {
          color: 'red',
          width: 2,
      }
    },],
    annotations: [{
      ax: 0.9,
      ay: 0.3,
      x: 3.2,
      y: 0.3,
      xref: 'x',
      yref: 'y',
      axref: "x",
      ayref: 'y', 
      text: '<b>Width</b>',
      font: {
          size: 14,
          color: 'red'
      },
      showarrow: true,
      arrowhead: 2,
      arrowcolor: 'red',
      arrowsize: 1,
      arrowwidth: 2,
      opacity: 0.8,
    },
    {
      ax: 1.5,
      ay: 0.13,
      x: 1.5,
      y: 0.5,
      xref: 'x',
      yref: 'y',
      axref: "x",
      ayref: 'y', 
      text: '<b>Height</b>',
      font: {
          size: 14,
          color: 'red'
      },
      showarrow: true,
      arrowhead: 2,
      arrowcolor: 'red',
      arrowsize: 1,
      arrowwidth: 2,
      opacity: 0.8,
    },],
  };

  peakGroups.forEach((group) => {
    const x = group.map((index) => voltage[index]);
    const y = group.map((index) => current[index]);
    const meanX = x.reduce((a, b) => a + b) / x.length;
    const meanY = y.reduce((a, b) => a + b) / y.length;
    data[2].x.push(meanX);
    data[2].y.push(meanY);
  });

  Plotly.newPlot('feature-plot', data, layout);

}

function trapeziumRulePlot() {
  // Create the noisy-looking data
  var myrng = new Math.seedrandom(2);
  const numPoints = 6;
  const voltage = new Array(numPoints);
  const current = new Array(numPoints);
  const noiseScale = 0.3;
  for (let i = 0; i < numPoints; i++) {
    const v = (i / numPoints) * 4;
    voltage[i] = v;
    current[i] = 0.4 * Math.exp(((v - 2))) +
      noiseScale * (myrng() - 0.5) + 0.1;
  }

  // Create the plot
  const data = [
    { x: voltage, y: current, type: 'scatter', mode: 'line', name: 'Data', yaxis: 'y1' },
    { x: [2, 2.667], y: [0.444, 0.824], type: 'scatter', mode: 'lines', name: 'Trapezoid', fill: 'tozeroy', fillcolor: 'rgba(255, 0, 0, 0.2)', line: { width: 0 }, yaxis: 'y1' },
  ];
  const layout = {
    xaxis: {title: 'Voltage', range: [1, 3.2], mirror: true, ticks: 'outside', showline: true},
    yaxis: {title: 'Current', range: [0, 1.2], side: 'left', mirror: true, ticks: 'outside', showline: true},
  }

  Plotly.newPlot('trapezium-rule-plot', data, layout);
  
}

function peakArea() {
  // Create the noisy-looking data
  var myrng = new Math.seedrandom(1);
  const numPoints = 120;
  const voltage = new Array(numPoints);
  const current = new Array(numPoints);
  const noiseScale = 0.01;
  for (let i = 0; i < numPoints; i++) {
    const v = (i / numPoints) * 4;
    voltage[i] = v;
    current[i] = 0.4 * Math.exp(-((v - 2) ** 2 / (2 * 0.5 ** 2))) +
      // 0.25 * Math.exp(-((v - 5.0) ** 2 / (2 * 0.5 ** 2))) +
      noiseScale * (myrng() - 0.5) + 0.1;
  }

  // Compute the derivative
  const derivative = new Array(numPoints);
  const h = voltage[1] - voltage[0];
  derivative[0] = (current[1] - current[0]) / h;
  for (let i = 1; i < numPoints - 1; i++) {
    derivative[i] = (current[i+1] - current[i-1]) / (2 * h);
  }
  derivative[numPoints-1] = (current[numPoints-1] - current[numPoints-2]) / h;

  // Create the plot
  const data = [
    { x: voltage, y: current, type: 'scatter', mode: 'markers', name: 'Current', yaxis: 'y1' },
    { x: voltage, y: derivative, type: 'scatter', mode: 'lines', name: 'Derivative', yaxis: 'y2' },
    { x: voltage.slice(20, 97), y: current.slice(20, 97), type: 'scatter', mode: 'lines', name: 'Peak Area', fill: 'tozeroy', fillcolor: 'rgba(255, 0, 0, 0.2)', line: { width: 0 }, yaxis: 'y1' },
  ];
  const layout = {
    xaxis: {title: 'Voltage', range: [0, 4], mirror: true, ticks: 'outside', showline: true},
    yaxis: {title: 'Current', range: [0, 0.52], side: 'left', mirror: true, ticks: 'outside', showline: true},
    yaxis2: {title: 'Derivative', side: 'right', overlaying: 'y', mirror: true, ticks: 'outside', showline: true},
  }

  Plotly.newPlot('peak-area-plot', data, layout);

}