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
                backgroundColor: "rgba(255,165,0, 0.5)",
            },
        ],
    };
    const options = {
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
                suggestedMax: 100,
            },
            y: {
                suggestedMax: 10,
            },
        },
    };
    return <Bar options={options} data={data} />;
}
