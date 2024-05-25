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
    console.log("chart");
    console.log(chartData);

    const options = {};
    const data = {
        labels: chartData?.map((_, index) => index),
        datasets: [
            {
                label: "Zarobki",
                data: chartData,
            },
        ],
    };

    return (
        // <Bar
        //     data={{
        //         labels: chartData?.map((_, index) => index),
        //         datasets: [
        //             {
        //                 label: "Opinie",
        //                 data: chartData,
        //                 backgroundColor: "orange",
        //                 borderColor: "orange",
        //             },
        //         ],
        //     }}
        //     options={{
        //         indexAxis: "y",
        //         scales: {
        //             y: {
        //                 suggestedMin: 20,
        //             },
        //         },
        //     }}
        // />
        <Bar options={options} data={data} />
    );
}
