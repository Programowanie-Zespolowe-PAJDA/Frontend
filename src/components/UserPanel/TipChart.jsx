import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function TipChart({ tipData }) {
    const data = {
        labels: tipData?.map(
            (tipMonth) => `${tipMonth.month} ${tipMonth.year}`
        ),
        datasets: [
            {
                label: "Zarobki",
                data: tipData?.map((tipMonth) => tipMonth.amount / 100),
            },
        ],
    };
    const options = {};
    return (
        <>
            {/* <Line
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
            /> */}
            <Bar options={options} data={data} />
        </>
    );
}
