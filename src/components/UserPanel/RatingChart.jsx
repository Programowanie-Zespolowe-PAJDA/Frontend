import { Bar } from "react-chartjs-2";

export default function RatingChart({ chartData }) {
    return (
        <Bar
            data={{
                labels: chartData.map((_, index) => index),
                datasets: [
                    {
                        label: "Opinie",
                        data: chartData,
                        backgroundColor: "orange",
                        borderColor: "orange",
                    },
                ],
            }}
            options={{
                indexAxis: "y",
            }}
        />
    );
}
