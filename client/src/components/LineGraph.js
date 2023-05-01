import React from 'react';
import CanvasJSReact from '../utils/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineGraph = ({ startDate, endDate, weight, graphData }) => {
	const weightOptions = {
		toolTip: {
			enabled: true,
			animationEnabled: true,
		},
		exportEnabled: true,
		exportFileName: "Weight Trend",
		backgroundColor: "#ffffff00",
		height: 250,
		axisY: {
			title: "Weight",
			suffix: "lb",
			gridThickness: 0,
			labelFontWeight: "bold",
			lineThickness: 3,
			includeZero: false
		},
		axisX: {
			title: "Date",
			labelFontWeight: "bold",
			lineThickness: 3,
			minimum: startDate,
			maximum: endDate,
			labelFormatter: function (e) {
				return CanvasJS.formatDate(e.value, "MMM DD YYYY");
			},
		},
		data: [{
			type: "line",
			xValueType: "dateTime",
			yValueType: "number",
			toolTipContent: "{y} lbs",
			markerColor: "#e1bcba",
			lineColor: "#e1bcba",
			lineThickness: 3,
			dataPoints: graphData[0]
		}]
	}

	const calorieOptions = {
		toolTip: {
			enabled: true,
			animationEnabled: true,
		},
		exportEnabled: true,
		exportFileName: "Weight Trend",
		backgroundColor: "#ffffff00",
		height: 250,
		axisY: {
			title: "Calorie",
			suffix: "C",
			gridThickness: 0,
			labelFontWeight: "bold",
			lineThickness: 3,
			includeZero: false
		},
		axisX: {
			title: "Date",
			labelFontWeight: "bold",
			lineThickness: 3,
			minimum: startDate,
			maximum: endDate,
			labelFormatter: function (e) {
				return CanvasJS.formatDate(e.value, "MMM DD YYYY");
			},
		},
		data: [{
			type: "line",
			xValueType: "dateTime",
			yValueType: "number",
			toolTipContent: "{y} C",
			markerColor: "#32496c",
			lineColor: "#32496c",
			lineThickness: 3,
			dataPoints: graphData[0]
		}]
	}

	if (graphData) {
		console.log(graphData[0])
	}
	return (
		<div>
			{weight ? (
				<CanvasJSChart options={weightOptions} />
			) : (
				<CanvasJSChart options={calorieOptions} />
			)}
		</div>
	);
};

export default LineGraph;