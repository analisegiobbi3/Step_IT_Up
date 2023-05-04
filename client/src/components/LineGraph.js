// import package
import React from 'react';

// import and define local downloaded packages
import CanvasJSReact from '../utils/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// functional component for the line graphs on the tracker page
const LineGraph = ({ startDate, endDate, weight, graphData }) => {
	// options applied if weight is true (weight graph)
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
			// weight title and units
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
			// format date x-axis
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
			// graph defined weight data
			dataPoints: graphData[0]
		}]
	}

	// options applied if weight is false (calorie graph)
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
			// calorie title and units
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
			// format date x-axis
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
			// graph defined calorie data
			dataPoints: graphData[0]
		}]
	}

	// if no data was passed
	if (!graphData) {
		return (
			<div>
				<p>No trends for this time period.</p>
			</div>
		)
	}
	return (
		<div>
			{weight ? (
				// if weight is true, return graph with weight options
				<CanvasJSChart options={weightOptions} />
			) : (
				// if weight is false, return graph with calorie options
				<CanvasJSChart options={calorieOptions} />
			)}
		</div>
	);
};

export default LineGraph;