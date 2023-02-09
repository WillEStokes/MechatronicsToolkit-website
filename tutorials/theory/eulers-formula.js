function iPlot() {
    const t = Array.from({length: 100}, (_, i) => (2 * Math.PI * i) / 100);
    const x = t.map(angle => Math.cos(angle));
    const y = t.map(angle => Math.sin(angle));

    const data = [{
    x,
    y,
    mode: 'lines',
    line: {
        width: 2,
        color: 'black'
    }
    }];

    const layout = {
    xaxis: {
        range: [-2, 2],
        title: {
        text: 'Re',
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
        text: 'Im',
        font: {
            size: 26,
            family: 'Times New Roman'
        }
        },
        ticksuffix: 'i',
        linecolor: 'grey',
        gridcolor: 'lightGrey',
        mirror: true,
        ticks: 'outside',
        showline: true,
        zerolinecolor: 'lightGrey'
    },
    annotations: [{
        text: '<i>i',
        showarrow: false,
        x: 0.1,
        y: 1.3,
        xref: 'x',
        yref: 'y',
        font: {
        color: 'red',
        family: 'DejaVu Sans Mono',
        size: 30
        }
    }],
    autosize: false,
    width: 300,
    height: 300,
    paper_bgcolor: '#FFF8DC',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: {
        l: 50,
        r: 20,
        t: 20,
        b: 50
      }
    };

    Plotly.newPlot('i-plot', data, layout);
}

function wavePlot() {
    const t = Array.from({length: 200}, (_, i) => (20 * i) / 200);
    const x = t;
    const y = t.map(x => Math.sin(x));
    const z = t.map(x => Math.cos(x));

    const trace = {
    x: x,
    y: y,
    z: z,
    mode: 'lines',
    line: {
        width: 4,
        color: 'black'
    },
    type: 'scatter3d'
    };

    const layout = {
    scene: {
        aspectmode: 'manual',
        aspectratio: {
        x: 2,
        y: 1,
        z: 1
        },
        camera: {
            center: {x: 0, y: 0.5, z: -0.5},
            eye: {x: -3, y: -2, z: 1.5}
        },
        xaxis: {
            title: {
                text: 'X',
                font: {
                size: 26,
                family: 'Times New Roman'
                }
            },
            backgroundcolor: '#FFF8DC',
            gridcolor: 'grey',
            zerolinecolor: 'lightGrey'
        },
        yaxis: {
            title: {
                text: 'Re',
                font: {
                size: 26,
                family: 'Times New Roman'
                }
            },
            backgroundcolor: '#FFF8DC',
            gridcolor: 'grey',
            zerolinecolor: 'lightGrey'
        },
        zaxis: {
            ticksuffix: 'i',
            title: {
                text: 'Im',
                font: {
                size: 26,
                family: 'Times New Roman'
                }
            },
            backgroundcolor: '#FFF8DC',
            gridcolor: 'grey',
            zerolinecolor: 'lightGrey'
        }
    },
    paper_bgcolor: '#FFF8DC',
    annotations: [{
        text: '<i>e<sup>ix</sup>',
        showarrow: false,
        x: 0.6,
        y: 0.4,
        font: {
        color: 'red',
        family: 'DejaVu Sans Mono',
        size: 30
        }
    }],
    width: 400,
    height: 300,
    margin: {
        l: 0,
        r: 0,
        t: 0,
        b: 0
      }
    };

    Plotly.newPlot('wave-plot', [trace], layout);
}

function cosPlot() {
    const x = Array.from({length: 200}, (_, i) => (20 * i) / 200);
    const y = x.map(angle => Math.cos(angle));

    const data = [{
    x,
    y,
    mode: 'lines',
    line: {
        width: 2,
        color: 'black'
    }
    }];

    const layout = {
    xaxis: {
        range: [0, 20],
        title: {
        text: 'X',
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
        text: 'Re',
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
    annotations: [{
        text: '<i>e<sup>ix</sup>',
        showarrow: false,
        x: 1.6,
        y: 0.8,
        xref: 'x',
        yref: 'y',
        font: {
        color: 'red',
        family: 'DejaVu Sans Mono',
        size: 30
        }
    }],
    autosize: false,
    width: 600,
    height: 250,
    paper_bgcolor: '#FFF8DC',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: {
        l: 50,
        r: 20,
        t: 20,
        b: 50
      }
    };

    Plotly.newPlot('cos-plot', data, layout);
}

function sinPlot() {
    const x = Array.from({length: 200}, (_, i) => (20 * i) / 200);
    const y = x.map(angle => Math.sin(angle));

    const data = [{
    x,
    y,
    mode: 'lines',
    line: {
        width: 2,
        color: 'black'
    }
    }];

    const layout = {
    xaxis: {
        range: [0, 20],
        title: {
        text: 'X',
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
        text: 'Im',
        font: {
            size: 26,
            family: 'Times New Roman'
        }
        },
        ticksuffix: 'i',
        linecolor: 'grey',
        gridcolor: 'lightGrey',
        mirror: true,
        ticks: 'outside',
        showline: true,
        zerolinecolor: 'lightGrey'
    },
    annotations: [{
        text: '<i>e<sup>ix</sup>',
        showarrow: false,
        x: 3.2,
        y: 0.8,
        xref: 'x',
        yref: 'y',
        font: {
        color: 'red',
        family: 'DejaVu Sans Mono',
        size: 30
        }
    }],
    autosize: false,
    width: 600,
    height: 250,
    paper_bgcolor: '#FFF8DC',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: {
        l: 50,
        r: 20,
        t: 20,
        b: 50
      }
    };

    Plotly.newPlot('sin-plot', data, layout);
}

function expPlot() {
    const x = Array.from({length: 100}, (_, i) => (2 * i) / 100);
    const y = x.map(x => Math.exp(x));

    const data = [{x, y, mode: 'lines', line: {width: 2, color: 'black'}}];

    const layout = {
        xaxis: {
            range: [0, 2],
            title: {
                text: 'X',
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
            range: [0, 7],
            title: {
                text: 'y',
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
        annotations: [{
            text: '<i>y=e<sup>x</sup>',
            showarrow: false,
            x: 1.4,
            y: 6,
            xref: 'x',
            yref: 'y',
            font: {
            color: 'red',
            family: 'DejaVu Sans Mono',
            size: 30
            }
        }],
        autosize: false,
        width: 300,
        height: 300,
        paper_bgcolor: '#FFF8DC',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: {
            l: 50,
            r: 20,
            t: 20,
            b: 50
        }
    };

    Plotly.newPlot('exp-plot', data, layout);
}

function magPhasePlot() {
    const t = Array.from({length: 100}, (_, i) => (2 * Math.PI * i) / 100);
    const x = t.map(angle => Math.cos(angle));
    const y = t.map(angle => Math.sin(angle));

    const data = [{
            x,
            y,
            mode: 'lines',
            line: {
                width: 2,
                color: 'black'
            },
        }
    ];

    const layout = {
        xaxis: {
            range: [-2, 2],
            title: {
            text: 'Re',
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
            text: 'Im',
            font: {
                size: 26,
                family: 'Times New Roman'
            }
            },
            ticksuffix: 'i',
            linecolor: 'grey',
            gridcolor: 'lightGrey',
            mirror: true,
            ticks: 'outside',
            showline: true,
            zerolinecolor: 'lightGrey'
        },
        annotations: [{
            text: '',
            showarrow: true,
            ax: 0,
            ay: 0,
            x: Math.cos(1),
            y: Math.sin(1),
            xref: 'x',
            yref: 'y',
            axref: "x",
            ayref: 'y',
            arrowcolor: "red",
            arrowsize: 2,
            arrowwidth: 1,
            arrowhead: 2
        },
        {
            text: '<i>r',
            showarrow: false,
            x: 0.7,
            y: 1,
            xref: 'x',
            yref: 'y',
            font: {
                color: 'red',
                family: 'DejaVu Sans Mono',
                size: 20
            }
        },
        {
            text: 'θ',
            showarrow: false,
            x: 0.35,
            y: 0.2,
            xref: 'x',
            yref: 'y',
            font: {
                color: 'red',
                family: 'DejaVu Sans Mono',
                size: 20
            }
        }        
    ],
    autosize: false,
    width: 300,
    height: 300,
    paper_bgcolor: '#FFF8DC',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: {
        l: 50,
        r: 20,
        t: 20,
        b: 50
      }
    };

    Plotly.newPlot('mag-phase-plot', data, layout);
}