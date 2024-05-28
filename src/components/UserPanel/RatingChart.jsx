import { Bar } from "react-chartjs-2";
import classes from "./UserPanel.module.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    layouts,
} from "chart.js";
import { useEffect } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function RatingChart({ chartData }) {
    if (chartData.length == 11) {
        console.log(chartData);
        chartData.shift();
        console.log(chartData);
    }

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
        layout: {
            padding: {
                left: 120,
                top: 10,
            },
        },

        scales: {
            x: {
                offset: true,
                grid: {
                    display: false,
                },

                suggestedMax: 10,
            },
            y: {
                grid: {
                    display: false,
                    // tickMarkLength: 40
                },
                ticks: {
                    // autoSkipPadding: 200,
                    crossAlign: "start",
                    callback: (value, index, values) => {
                        return "";
                    },
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
                barThickness: 20,

                barPercentage: 0.5, // width of the bars
                categoryPercentage: 1, // width of the category

                label: "Zarobki",
                data: chartDataArray,
                backgroundColor: "orange",
                Images: [
                    "/gwiazdki2/gwiazdka5.png",
                    "/gwiazdki2/gwiazdka4p.png",
                    "/gwiazdki2/gwiazdka4.png",
                    "/gwiazdki2/gwiazdka3p.png",
                    "/gwiazdki2/gwiazdka3.png",
                    "/gwiazdki2/gwiazdka2p.png",
                    "/gwiazdki2/gwiazdka2.png",
                    "/gwiazdki2/gwiazdka1p.png",
                    "/gwiazdki2/gwiazdka1.png",
                    "/gwiazdki2/gwiazdka0p.png",
                ],
            },
        ],
    };

    const xScaleImage = {
        id: "xScaleImage",
        afterDatasetsDraw(chart, args, plugins) {
            const {
                ctx,
                data,
                chartArea: { bottom },
                scales: { y },
            } = chart;

            ctx.save();
            //let ts=0;
            data.datasets[0].Images.forEach((image, index) => {
                const label = new Image();
                label.src = image;
                label.style.padding = "50px 10px 20px 30px";
                //ctx.strokeRect(0,ts,100,20);
                ctx.drawImage(
                    label,
                    0,
                    y.getPixelForValue(index) - 14,
                    120,
                    22
                );
                //ts+=80;
            });
        },
    };

    return <Bar options={options} data={data} plugins={[xScaleImage]} />;
}
