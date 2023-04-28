import React from "react";
import { Line } from "react-chartjs-2";

function LineChart( { chartData }) {
    return (
        <div>
            <h2>TBD</h2>
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
                        }
                    }
                }}
            />
        </div>
    )
}

export default LineChart;