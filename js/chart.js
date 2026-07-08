/*
============================================================
Chart Manager
------------------------------------------------------------
Chart.js 전담
그래프 생성 및 갱신
============================================================
*/

let factoryChart = null;

/*
------------------------------------------------------------
그래프 생성
------------------------------------------------------------
*/

function initializeChart() {

    const ctx =
        document
            .getElementById("factoryChart")
            .getContext("2d");

    factoryChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: [

                "설립 초기",

                ...Array.from(
                    { length: YEARS },
                    (_, i) => `${i + 1}년차`
                )

            ],

            datasets: [

                {

                    label: "센터 누적 순이익 흐름",

                    data: [],

                    borderColor: "#2563eb",

                    backgroundColor:
                        "rgba(37,99,235,0.05)",

                    fill: true,

                    tension: 0.1

                }

            ]

        },

        options: {

            responsive: true,

            animation: true,

            plugins: {

                legend: {

                    display: true

                }

            },

            scales: {

                y: {

                    title: {

                        display: true,

                        text: "누적 금액 (만원)"

                    }

                }

            }

        }

    });

}

/*
------------------------------------------------------------
그래프 업데이트
------------------------------------------------------------
*/

function updateGraph(history) {

    factoryChart.data.datasets[0].data =
        history;

    factoryChart.update();

}