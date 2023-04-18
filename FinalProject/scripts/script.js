<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
// <!-- script for line chart 1  -->

    const ctx = document.getElementById('lineChart-1');

    const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');

        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
            tooltipEl.style.borderRadius = '3px';
            tooltipEl.style.color = 'white';
            tooltipEl.style.opacity = 1;
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.transform = 'translate(-50%, 0)';
            tooltipEl.style.transition = 'all .1s ease';

            const table = document.createElement('table');
            table.style.margin = '0px';

            tooltipEl.appendChild(table);
            chart.canvas.parentNode.appendChild(tooltipEl);
        }

        return tooltipEl;
    };

    const externalTooltipHandler = (context) => {
        // Tooltip Element
        const { chart, tooltip } = context;
        const tooltipEl = getOrCreateTooltip(chart);

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        // Set Text
        if (tooltip.body) {
            const titleLines = tooltip.title || [];
            const bodyLines = tooltip.body.map(b => b.lines);

            const tableHead = document.createElement('thead');

            titleLines.forEach(title => {
                const tr = document.createElement('tr');
                tr.style.borderWidth = 0;

                const th = document.createElement('th');
                th.style.borderWidth = 0;
                const text = document.createTextNode(title);

                th.appendChild(text);
                tr.appendChild(th);
                tableHead.appendChild(tr);
            });

            const tableBody = document.createElement('tbody');
            bodyLines.forEach((body, i) => {
                const colors = tooltip.labelColors[i];

                const span = document.createElement('span');
                span.style.background = colors.backgroundColor;
                span.style.borderColor = colors.borderColor;
                span.style.borderWidth = '2px';
                span.style.marginRight = '10px';
                span.style.height = '10px';
                span.style.width = '10px';
                span.style.display = 'inline-block';

                const tr = document.createElement('tr');
                tr.style.backgroundColor = 'inherit';
                tr.style.borderWidth = 0;

                const td = document.createElement('td');
                td.style.borderWidth = 0;

                const text = document.createTextNode(body);

                td.appendChild(span);
                td.appendChild(text);
                tr.appendChild(td);
                tableBody.appendChild(tr);
            });

            const tableRoot = tooltipEl.querySelector('table');

            // Remove old children
            while (tableRoot.firstChild) {
                tableRoot.firstChild.remove();
            }

            // Add new children
            tableRoot.appendChild(tableHead);
            tableRoot.appendChild(tableBody);
        }

        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
    };

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013',
                '2014', '2015', '2016', '2017', '2018'],
            datasets: [{
                label: 'East Asia & Pacific',
                data: [94.09031, 94.12122, 94.01758, 94.19893, 94.01109, 93.63552, 94.84807, 94.90434, 95.23213, 95.5121, 95.94855, 95.52392, 95.45252, 95.47628, 95.58924],
                borderWidth: 1
            },
            {
                label: 'Europe & Central Asia',
                data: [94.46448, 94.81182, 95.52639, 95.06001, 94.62559, 94.75058, 94.84232, 95.11745, 94.90468, 95.26217, 95.48155, 95.48998, 95.87507, 95.65832, 95.85017, 95.88464, 94.94759, 94.86631],
                borderWidth: 1
            },
            {
                label: 'Latin America & Caribbean',
                data: [93, 93.8301, 92.98412, 93.48408, 94.45332, 94.27547, 94.02604, 94.9612, 94.99954, 95.00301, 94.77791, 94.99862, 93.77119, 93.6423, 93.59806, 93.90233, 93.87033, 93.8643],
                borderWidth: 1
            }
                ,
            {
                label: 'Middle East & North Africa',
                data: [82.13621, 84.38244, 85.07841, 85.99539, 85.82253, 85.99398, 87.76272, 88.59492, 89.32003, 90.90097, 91.32452, 92.68248, 92.03454, 91.52865, 91.49824, 91.61148, 91.80524, 92.14038],
                borderWidth: 1
            }
                ,
            {
                label: 'North America',
                data: [96.35083, 95.36432, 96.19089, 95.57977, 95.83351, 96.59466, 96.75123, 96.8388, 95.90614, 94.05366, 93.63206, 93.23706, 93.33195, 94.10513, 94.78767, 95.2928, 95.02639, 94.86607],
                borderWidth: 1
            },
            {
                label: 'South Asia',
                data: [69.21381, 70.51603, 78.03525, 80.53169, 82.34337, 83.82396, 85.65859, 86.17493, 86.91173, 87.00896, 86.37355, 86.67464, 86.87741, 87.21258, 86.75207, 86.98376, 86.9749, 86.84744],
                borderWidth: 1
            },
            {
                label: 'Sub-Saharan Africa',
                data: [58.32808, 59.83408, 62.392, 64.41467, 66.64822, 68.665, 70.6711, 72.03732, 72.41319],
                borderWidth: 1
            }
            ]
        },


        options: {
            responsive: true,
            interaction: {
                mode: 'index',
            },
            plugins: {
                title: {
                    align: 'start',
                    display: true,
                    text: 'School enrollment, primary (%)',
                    font: {
                        size: 30,
                        family: 'Arial',
                    }
                },
                tooltip: {
                    enabled: false,
                    position: 'nearest',
                    external: externalTooltipHandler
                },
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'year',

                    },
                },
                y: {
                    position: 'left',
                    display: true,
                    title: {
                        display: true,
                        text: 'School enrollment, primary'
                    },
                    suggestedMin: 55,
                    suggestedMax: 100,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value + '%';
                        }
                    }
                },
                y1: {
                    position: 'right',
                    display: true,
                    suggestedMin: 55,
                    suggestedMax: 100,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value + '%';
                        }
                    }
                },
            }
        }
    });




// <!-- script for line chart 2  -->

    const ctx2 = document.getElementById('lineChart-2');


    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013',
                '2014', '2015', '2016', '2017', '2018'],
            datasets: [{
                label: 'East Asia & Pacific (excluding high income)',
                data: [94.09889, 94.14736, 93.99804, 94.19523, 93.97354, 93.56541, 94.82269, 94.86243, 95.18151, 95.50133, 95.92812, 95.49613, 95.44349, 95.46373, 95.51255],
                borderWidth: 1
            },
            {
                label: 'Europe & Central Asia (excluding high income)',
                data: [90.71911, 91.76248, 93.71363, 93.3452, 91.89726, 92.08733, 92.30501, 92.55366, 92.21762, 92.9478, 93.13939, 92.91753, 93.35407, 93.21996, 93.54765, 93.69839, 91.79124, 91.67335],
                borderWidth: 1
            },
            {
                label: 'Latin America & Caribbean (excluding high income)',
                data: [93.97929, 93.11855, 93.49142, 94.49856, 94.26617, 93.96783, 94.93857, 95.03911, 94.9917, 94.81959, 95.06219, 93.80947, 93.71312, 93.68508, 94.03409, 93.9758, 93.96438],
                borderWidth: 1
            }
                ,
            {
                label: 'Middle East & North Africa (excluding high income)',
                data: [82.59149, 84.95158, 85.58951, 86.47564, 86.07028, 86.04888, 87.7803, 88.46904, 89.02694, 90.24169, 90.68619, 91.0289, 91.37168, 90.71351, 90.63062, 90.77254, 91.12317, 91.52754],
                borderWidth: 1
            }
                ,
            {
                label: 'Sub-Saharan Africa (excluding high income)',
                data: [58.32576, 59.83147, 62.38962, 64.4125, 66.64634, 68.66341, 70.66965, 72.03598, 72.41189],
                borderWidth: 1
            }
            ]
        },


        options: {
            responsive: true,
            interaction: {
                mode: 'index',
            },
            plugins: {
                title: {
                    align: 'start',
                    display: true,
                    text: 'School enrollment, primary (%)',
                    font: {
                        size: 30,
                        family: 'Arial',
                    }
                },
                tooltip: {
                    enabled: false,
                    position: 'nearest',
                    external: externalTooltipHandler
                },
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'year',

                    },
                },
                y: {
                    position: 'left',
                    display: true,
                    title: {
                        display: true,
                        text: 'School enrollment, primary'
                    },
                    suggestedMin: 55,
                    suggestedMax: 100,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value + '%';
                        }
                    }
                },
                y1: {
                    position: 'right',
                    display: true,
                    suggestedMin: 55,
                    suggestedMax: 100,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value + '%';
                        }
                    }
                },
            }
        }
    });





// <!-- script for bar chart  -->


    const barChart = document.getElementById('barChart');
    const footer = (tooltipItems) => {
let diff = 0;

tooltipItems.forEach(function(tooltipItem, index) {
if (index > 0) {
  diff += tooltipItem.parsed.y - tooltipItems[index-1].parsed.y;
}
});

return 'Gender Gap: ' + Math.abs(diff).toFixed(2) + '%';
};

    new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ['Afghanistan', "Cote d'lvoire", 'Pakistan', 'Chad', 'Guinea'],
            datasets: [{
                label: 'Male',
                data: [62.90, 45.30, 40.40, 25.40, 38.70],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                ],

                borderWidth: 1
            },
            {
                label: 'Female',
                data: [36.7, 35.10, 34.20, 12.30, 25.60],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }
            ]
        },


        options: {
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                title: {
                    align: 'start',
                    display: true,
                    text: 'Gender Gap',
                    font: {
                        size: 30,
                        family: 'Arial',
                    }
                },
                tooltip: {
                    callbacks: {
                        footer: footer,
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'year',

                        },
                    },
                    y: {
                        position: 'left',
                        display: true,
                        title: {
                            display: true,
                            text: 'School enrollment, primary'
                        },
                        suggestedMin: 55,
                        suggestedMax: 100,
                        ticks: {
                            callback: function (value, index, ticks) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        }});