// Graph CSV data using chart.js

async function getData() {
    const response = await fetch('../data/resultsData.csv');
    const data = await response.text(); // CSV in TEXT format
    //console.log(data);

    const xConcentrations = []; // x-aix labels = year values
    const yWithEcoli = []; // y-axis values
    const yWithoutEcoli = [];

    const table = data.split('\n').slice(1);        // split by line and remove 0th row
    //console.log(table);

    table.forEach(row => {          // Operate on each row
        const columns = row.split(',');    // split each row into col.
        const concentration = columns[0];    // Assign year value
        xConcentrations.push(concentration);          // Push year value into array xYears
        const ecoli = parseFloat(columns[1]);    // Assign global temp deviation
        yWithEcoli.push(ecoli);          // push temp value into array yTemps
        const withoutecoli = parseFloat(columns[2]);  // NH temp
        yWithoutEcoli.push(withoutecoli);
    });
    return {xConcentrations, yWithEcoli, yWithoutEcoli}
}


// Configured for chart.JS 3.x and above
async function createChart() { 
    const data = await getData();       // createChart() will wait until getData() processes
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.xConcentrations,
            datasets: [
                {
                label: 'With E. coli',
                data: data.yWithEcoli,
                backgroundColor: [
                    'rgba(253, 213, 156, 0.7)',
                ],
                borderColor: [
                    'rgba(253, 213, 156, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Without E. coli',
                data: data.yWithoutEcoli,
                backgroundColor: [
                    'rgba(254 ,164, 55, 0.9)',
                ],
                borderColor: [
                    'rgba(254 ,164, 55, 1)',
                ],
                borderWidth: 1
            }
        ]
        },
        options: {
            responsive: true,                   // Re-size based on screen size
            scales: {                           // x & y axes display options
                x: {
                    title: {
                        display: true,
                        text: 'Turmeric Powder Amount in Solution (g/mL)',
                        font: {
                            size: 20
                        },
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Absorbance (420)',
                        font: {
                            size: 20
                        },
                    }
                }
            },
            plugins: {                          // title and legend display options
                title: {
                    display: true,
                    text: 'Absorbance (A420) Based on Turmeric Powder Amount in Solutions (g/mL) With and Without E. coli',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

createChart();