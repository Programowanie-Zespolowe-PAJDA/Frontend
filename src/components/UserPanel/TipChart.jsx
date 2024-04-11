import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function TipChart({ data }) {
    return (
        <>
            <Line
                data={{
                    labels: data.map((elem) => elem.month),
                    datasets: [
                        {
                            label: "Zarobki",
                            data: data.map((elem) => elem.amount),
                            backgroundColor: "white",
                            borderColor: "orange",
                        },
                    ],
                }}
                options={{
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.yLabel;
                            },
                        },
                    },
                    elements: {
                        line: {
                            tension: 0.4,
                        },
                    },
                }}
            />
        </>
    );
}
