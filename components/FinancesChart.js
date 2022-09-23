import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

export default function FinancesChart(props) {
    let labels = [];
    let chartData = [];
    props.spendingByDay.forEach((day) => {
        labels.push(new Date(day.day));
        chartData.push(day.spending);
    });
    const data = {
        labels,
        datasets: [
            {
                label: "Monthly Expenditure",
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: chartData,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "month",
                    unitStepSize: 1,
                },
                title: {
                    display: true,
                    text: "Month",
                },
            },
            y: {
                title: { display: true, text: "Dollars Spent" },
            },
        },
    };

    return (
        <>
            <Line data={data} options={options} width={400} height={400} />
        </>
    );
}
