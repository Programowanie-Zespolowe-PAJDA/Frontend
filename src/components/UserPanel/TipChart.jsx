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
                            data: data.map((elem) => elem.amount / 100),
                            backgroundColor: "white",
                            borderColor: "orange",
                        },
                    ],
                }}
                options={{
                    legend: {
                        display: false,
                        reverse: true,
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
