function fourierLawPlot(){
    
    var x = [];
    var T = [];
    
    for(let i=0;i<=100;i++){
        x.push(i);
        // example exponential-like decay
        T.push(300 - 120*(1-Math.exp(-i/40)));
    }
    
    var trace = {
        x: x,
        y: T,
        mode: 'lines',
        name: 'Temperature',
        line:{
            width:4
        }
    };
    
    var layout = {
        // title: "Temperature Gradient Along a Rod",
        margin: {t: 20, b: 40, l: 50, r: 20},
        xaxis:{
            title:"Position along rod (x)"
        },
        yaxis:{
            title:"Temperature (K)"
        },
        annotations: [
            {
                x:20,
                y:T[20],
                text:"Steep gradient → large heat flow",
                showarrow:true,
                arrowhead:2
            },
            {
                x:80,
                y:T[80],
                text:"Small gradient → smaller heat flow",
                showarrow:true,
                arrowhead:2
            }
        ]
    };
    Plotly.newPlot("fourier-plot",[trace],layout);
}

function governingEquationPlot(){

    var rodLength = 100;
    var x = [];
    var theta1 = [];
    var theta2 = [];

    for(let i=0;i<=rodLength;i++){
        x.push(i);
        // Example curves for illustration
        theta1.push(Math.exp(-i/20)); // small m → slow decay
        theta2.push(Math.exp(-i/10)); // large m → fast decay
    }

    var trace1 = {
        x: x,
        y: theta1,
        mode: 'lines',
        name: 'Small m (axial conduction dominates)',
        line: {width:3, color:'blue'}
    };

    var trace2 = {
        x: x,
        y: theta2,
        mode: 'lines',
        name: 'Large m (radial loss dominates)',
        line: {width:3, color:'red'}
    };

    var layout = {
        title:"Governing Differential Equation: Effect of m on Temperature Decay",
        xaxis:{title:"Position along rod (x)"},
        yaxis:{title:"Temperature difference θ(x)"},
        annotations:[
            {x:60, y:theta1[60], text:"Slow decay", showarrow:true, arrowhead:2, ax:40, ay:-30},
            {x:60, y:theta2[60], text:"Fast decay", showarrow:true, arrowhead:2, ax:40, ay:30}
        ]
    };

    Plotly.newPlot("governing-plot",[trace1,trace2],layout);
}

function exponentialSolutionPlot(){

    var x = [];
    var expPos = [];
    var expNeg = [];
    var rodLength = 100;
    var m = 0.05;

    for(let i=0;i<=rodLength;i++){
        x.push(i);
        expPos.push(Math.exp(m*i));
        expNeg.push(Math.exp(-m*i));
    }

    var tracePos = {
        x: x,
        y: expPos,
        mode: 'lines',
        name: 'e^{mx} (growing)',
        line: {width:3, color:'red'},
        yaxis: 'y2'
    };

    var traceNeg = {
        x: x,
        y: expNeg,
        mode: 'lines',
        name: 'e^{-mx} (decaying)',
        line: {width:3, color:'blue'}
    };

    var layout = {
        title: "Exponential Components of θ(x)",
        xaxis: {title:"Position along rod (x)"},
        yaxis: {
            title:"e^{-mx} (decay)",
            side: 'left'
        },
        yaxis2: {
            title:"e^{mx} (growth)",
            overlaying: 'y',
            side: 'right'
        },
        annotations:[
            {
                x:20,
                y:expNeg[20],
                text:"Decaying component",
                showarrow:true,
                arrowhead:2,
                ax:40,
                ay:-30
            },
            {
                x:80,
                y:expPos[80],
                xref:'x',
                yref:'y2',
                text:"Growing component",
                showarrow:true,
                arrowhead:2,
                ax:40,
                ay:30
            }
        ]
    };

    Plotly.newPlot("exponential-plot",[tracePos, traceNeg],layout);
}

function boundaryConditionsPlot() {
    var rodLength = 100; // rod length in mm
    var m = 0.05;        // fin parameter
    var theta_b = 1;     // normalised base temperature
    
    var x = [];
    var thetaConv = [];
    var thetaAdiab = [];

    // convective/conductive tip parameter h/k (choose representative value)
    var hOverK = 0.05;  

    for (let i = 0; i <= rodLength; i++) {
        x.push(i);

        // Convective/conductive tip: theta(x)/theta_b = (cosh(m(L-x)) + (h/(m*k)) * sinh(m(L-x))) / (cosh(m*L) + (h/(m*k)) * sinh(m*L))
        var numeratorConv = Math.cosh(m*(rodLength - i)) + (hOverK/m) * Math.sinh(m*(rodLength - i));
        var denominatorConv = Math.cosh(m*rodLength) + (hOverK/m) * Math.sinh(m*rodLength);
        thetaConv.push(numeratorConv / denominatorConv);

        // Adiabatic tip: theta(x)/theta_b = cosh(m(L-x)) / cosh(m*L)
        thetaAdiab.push(Math.cosh(m*(rodLength - i)) / Math.cosh(m*rodLength));
    }

    var traceConv = {
        x: x,
        y: thetaConv,
        mode: 'lines',
        name: 'Convective/Conductive Tip',
        line: { width: 3, color: 'blue' }
    };

    var traceAdiab = {
        x: x,
        y: thetaAdiab,
        mode: 'lines',
        name: 'Adiabatic Tip',
        line: { width: 3, color: 'red', dash: 'dash' }
    };

    var layout = {
        title: 'Normalised Temperature Along Rod',
        xaxis: { title: 'Position along rod (x)' },
        yaxis: { title: 'Normalised Temperature θ/θ_b', range: [0,1.05] },
        legend: { x: 0.7, y: 0.95 }
    };

    Plotly.newPlot("boundary-conditions-plot", [traceConv, traceAdiab], layout);
}

function ladderTemperaturePlot(){

  var N = 200;
  var L = 100;
  var dx = L/N;

  var k = 15;
  var A = 1;
  var h = 0.05;
  var P = 1;

  var T_base = 300;
  var T_pipe = 100;

  var R_R = dx/(k*A);
  var R_H = 1/(h*P*dx);

  var T = new Array(N+1).fill(T_pipe);
  T[0] = T_base;

  var iterations = 2000;

  // -----------------------
  // THERMAL LADDER SOLVER
  // -----------------------

  for(var it=0; it<iterations; it++){

    for(var i=1;i<N;i++){

      var numerator =
        (T[i-1]/R_R) +
        (T[i+1]/R_R) +
        (T_pipe/R_H);

      var denominator =
        (2/R_R) +
        (1/R_H);

      T[i] = numerator/denominator;

    }

    var numeratorTip =
      (T[N-1]/R_R) +
      (T_pipe/R_H);

    var denominatorTip =
      (1/R_R) +
      (1/R_H);

    T[N] = numeratorTip/denominatorTip;

  }

  // -----------------------
  // POSITION ARRAY
  // -----------------------

  var x=[];
  for(var i=0;i<=N;i++){
    x.push(i*dx);
  }

  // -----------------------
  // WAVE
  // -----------------------

  var m = Math.sqrt((h*P)/(k*A));

  var alpha = m;
  beta = 2*Math.PI/L * 8

  var wave=[];

  for(var i=0;i<=N;i++){

    var env = Math.exp(-alpha*x[i]);

    wave.push(
        T_pipe + (T_base - T_pipe)*env*Math.cos(beta*x[i])
    );

    }

  // -----------------------
  // PLOT TRACES
  // -----------------------

  var traceThermal = {
    x:x,
    y:T,
    mode:'lines',
    name:'Temperature (Thermal Fin)',
    line:{width:4}
  };

  var traceWave = {
    x:x,
    y:wave,
    mode:'lines',
    name:'AC Voltage Wave',
    line:{dash:'dot', width:2}
  };

  var layout={
    title:'Thermal Fin vs Attenuating Electrical Wave',
    xaxis:{title:'Position along rod / transmission line'},
    yaxis:{title:'Temperature / Voltage'},
    legend:{x:0.02,y:0.98}
  };

  Plotly.newPlot('ladder-plot',
    [traceThermal,traceWave],
    layout
  );

}

function plotFinSuperposition(divId, m = 1) {

    const x = [];
    for (let i = -5; i <= 5; i += 0.05) {
        x.push(i);
    }

    const cases = [
        {C1:1.1, C2:1},
        {C1:1, C2:0},
        {C1:0, C2:100},
        {C1:0.9, C2:-1},
        {C1:0.5, C2:0}
    ];

    const traces = cases.map(c => {

        const theta = x.map(v =>
            c.C1*Math.exp(m*v) + c.C2*Math.exp(-m*v)
        );

        return {
            x: x,
            y: theta,
            mode: "lines",
            name: `C₁=${c.C1}, C₂=${c.C2}`
        };
    });

    const layout = {
        xaxis: { title: "x" },
        yaxis: { title: "θ(x)" },
        margin: { t: 20 },
        yaxis: { range: [-150, 150] }
    };

    Plotly.newPlot(divId, traces, layout);
}

function exponentialsSectionPlots() {
    exponentialSolutionPlot();
    plotFinSuperposition("finPlot");
}

function hyperbolicFunctionsPlot(){

    var x = [];
    var cooling = [];
    var heating = [];

    var rodLength = 100;
    var m = 0.05;

    for (let i = 0; i <= rodLength; i++) {  // only positive side for physical rod

        var mx = m * i;
        x.push(i);

        // Cooling from hot base (θ = exp(-mx))
        cooling.push(Math.exp(-mx));

        // Heating toward hot boundary (normalised: θ = exp(mx)/exp(m*L))
        heating.push(Math.exp(mx) / Math.exp(m * rodLength));
    }

    var traceCooling = {
        x: x,
        y: cooling,
        mode: 'lines',
        name: 'Cooling: θ(x)=e^{-m x}',
        line: { width: 4, color: 'red' }
    };

    var traceHeating = {
        x: x,
        y: heating,
        mode: 'lines',
        name: 'Heating: θ(x)=e^{m x}/e^{m L}',
        line: { width: 4, color: 'green' }
    };

    var layout = {
        title: "Temperature Profiles Along a Rod",
        xaxis: { title: "Position along rod (x)" },
        yaxis: { title: "Normalised temperature θ/θ₀", range: [0, 1.2] },
        annotations: [
            {
                x: 20,
                y: cooling[20],
                text: "Cooling from hot base",
                showarrow: true,
                arrowhead: 2,
                ax: 40,
                ay: -40
            },
            {
                x: 80,
                y: heating[80],
                text: "Heating toward hot boundary",
                showarrow: true,
                arrowhead: 2,
                ax: -60,
                ay: -40
            }
        ]
    };

    Plotly.newPlot("hyperbolic-plot", [traceCooling, traceHeating], layout);
}

function plotFinCoshSinh(divId, m = 1) {

    const x = [];
    for (let i = -5; i <= 5; i += 0.05) x.push(i);

    const cases = [
        {A:1, B:1},
        {A:1, B:0},
        {A:0, B:1},
        {A:100, B:-100},
        {A:0.5, B:0}
    ];

    const traces = cases.map(c => {
        const theta = x.map(v =>
            c.A * Math.cosh(m*v) + c.B * Math.sinh(m*v)
        );
        return {
            x: x,
            y: theta,
            mode: "lines",
            name: `A=${c.A}, B=${c.B}`
        };
    });

    const layout = {
        xaxis: { title: "x" },
        yaxis: { title: "θ(x)" },
        margin: { t: 20 },
        yaxis: { range: [-150, 150] }
    };

    Plotly.newPlot(divId, traces, layout);
}

function hyperbolicFunctionsPlots() {
    // hyperbolicFunctionsPlot();
    plotFinCoshSinh("hyperbolicPlot");
}