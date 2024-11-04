import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { useLayoutEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

export default function FinancesChart(props) {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    })
    let labels = []
    let chartData = []
    props.spendingByDay?.forEach((day) => {
        labels.push(new Date(day.day))
        chartData.push(day.spending)
    })
    const data = {
        labels,
        datasets: [
            {
                label: 'Monthly Expenditure',
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: chartData,
            },
        ],
    }

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month',
                    unitStepSize: 1,
                },
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                title: { display: true, text: 'Dollars Spent' },
            },
        },
    }

    ChartJS.register(
        TimeScale,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    useLayoutEffect(() => {
        setDimensions({
            width: window.innerWidth > 640 ? 640 : window.innerWidth - 30,
            height: window.innerWidth > 640 ? 640 : window.innerWidth - 30,
        })
    }, [])

    return (
        <>
            {dimensions.width && (
                <Line
                    data={data}
                    options={options}
                    width={dimensions.width}
                    height={dimensions.height}
                />
            )}
        </>
    )
}
