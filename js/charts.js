let chart = null;

export function drawChart(data) {

    const ctx =
        document
            .getElementById("srChart")
            .getContext("2d");

    const labels =
        data.map(r =>
            String(r.hour).padStart(2, "0") + ":00"
        );

    const sr =
        data.map(r => r.avgSR);

    if (chart)
        chart.destroy();

    chart = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {

                    label: "Sensitivity Ratio",

                    data: sr,

                    borderWidth: 2,

                    tension: 0.3,

                    fill: false

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: true

                }

            },

            scales: {

                y: {

                    min: 0.5,

                    max: 1.5,

                    title: {

                        display: true,

                        text: "Sensitivity Ratio"

                    }

                },

                x: {

                    title: {

                        display: true,

                        text: "Час"

                    }

                }

            }

        }

    });

}
