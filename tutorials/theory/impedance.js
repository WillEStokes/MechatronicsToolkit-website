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