import React from "react";
import { Line } from "react-chartjs-2";

function LineChart( { chartData }) {
    return (
        <div>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title:{
                        display: true,
                        text: "Your Progress"
                        },
                        legend: {
                             display: false,
                        },
                    },
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day",
                                displayFormats: {
                                    day: "MMM D",
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                        }

                    }
                }}
            />
        </div>
    )
}

export default LineChart;