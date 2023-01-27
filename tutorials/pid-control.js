class PID {
  constructor(Kp, Ki, Kf) {
    this._Kp = Kp;
    this._Ki = Ki;
    // this._Kd = Kd;
    this._Kf = Kf;
    this._integral = 0;
    this._pre_error = 0;
  }

  PidCalculate(setpoint, pv) {
    let error = setpoint - pv;
    let Pout = this._Kp * error;
    this._integral += error;
    let Iout = this._Ki * this._integral;
    // let derivative = (error - this._pre_error);
    // let Dout = this._Kd * derivative;
    let Fout = this._Kf * setpoint;
    let output = Pout + Iout + Fout;
    this._pre_error = error;
    return output;
  }
}

function initResponsePlot() {
  // Define blank data for the plot
  let data = [{ y: [] }];

  // Define the layout for the plot
  let layout = {
    xaxis: {
        range: [0, 1000],
        title: 'Time (s)'
    },
    yaxis: {
        range: [0, 35],
        title: 'Response'
    }
  };

  // Initialize the plot
  Plotly.newPlot('response-plot', data, layout);
}

function plotResponse() {
  // Get the user input values for P, I, D, and F
  var P = parseFloat(document.getElementById("P-input").value);
  var I = parseFloat(document.getElementById("I-input").value);
  // var D = parseFloat(document.getElementById("D-input").value);
  var F = parseFloat(document.getElementById("F-input").value);

  let pid = new PID(P,I,F);

  // Plant function
  let plantFunction = (u,t) => {
    let y;
    let tau = 100;
    let K = 0.01;
    // let theta = 1;

    // Implement the transfer function of the plant
    y = K * (1 - Math.exp(-t/tau)) * u; //+ Math.exp(-t/theta);
    return y;
  }
  
  // Define the time array
  let timeArray = [];
  for (let i=0; i < 1001; i++) {
    timeArray.push(i);
  }
  
  // Define the setpoint
  let setpoint = 30;

  let processVariable = 0;
  
  // Initialize the process variable and control output arrays
  let processVariableArray = [];
  let controlOutputArray = [];
  let setpointArray = [];

  processVariableArray.push(0);
  controlOutputArray.push(0);

  // Run the simulation for each time step
  for (let i = 0; i < timeArray.length - 1; i++) {
    // Update the PID controller with the current process variable and setpoint
    let controlOutput = pid.PidCalculate(setpoint, processVariable)

    // Get the current process variable
    processVariable = plantFunction(controlOutput, i);
  
    // Append the current process variable and control output to their respective arrays
    processVariableArray.push(processVariable);
    controlOutputArray.push(controlOutput);
    setpointArray.push(setpoint);
  }
  
  // Plot the process variable and control output arrays using Plotly.js
  var trace1 = {
    x: timeArray,
    y: processVariableArray,
    type: 'scatter',
    name: 'Process Variable'
  };

  var trace2 = {
    x: timeArray,
    y: setpointArray,
    type: 'scatter',
    name: 'Setpoint'
  };
  
  // var trace2 = {
  //   x: timeArray,
  //   y: controlOutputArray,
  //   type: 'scatter',
  //   name: 'Control Output'
  // };
  
  var data = [trace1, trace2];
  
  var layout = {
    title: 'PIDF Control Simulation',
    xaxis: {
      title: 'Time (s)'
    },
    yaxis: {
      title: 'Value'
    }
  };
  
  Plotly.newPlot('response-plot', data, layout);
}

function calculatePID() {
  var gamma = parseFloat(document.getElementById("gamma-input").value);
  var tau = parseFloat(document.getElementById("tau-input").value);
  var dpv = parseFloat(document.getElementById("dpv-input").value);
  var ddc = parseFloat(document.getElementById("ddc-input").value);
  var Td = parseFloat(document.getElementById("td-input").value);

  gamma = gamma * Td;
  var Kp = dpv / ddc;
  var P = tau / (Kp * (gamma + Td));
  var I = 1 / (Kp * (gamma + Td));

  document.getElementById("p-output").value = P.toPrecision(3);
  document.getElementById("i-output").value = I.toPrecision(3);
}
