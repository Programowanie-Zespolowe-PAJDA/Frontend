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

export default function RatingChart({ chartData }) {
    const options = {
        indexAxis: "y",
        plugins: {
            legend: {
                display: false,
                reverse: true,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                suggestedMax: 10,
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
    };

    const indexes = chartData?.map((_, index) => index);
    const chartDataArray = chartData?.map((value) => value);
    chartDataArray.reverse();
    indexes.reverse();

    const data = {
        labels: indexes,
        datasets: [
            {
                label: "Zarobki",
                data: chartDataArray,
                backgroundColor: "orange",
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
