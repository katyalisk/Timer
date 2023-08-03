// Timer.
let tmrSec = document.getElementById("tmrSec");
let sec = Number(tmrSec.textContent, 10);
const tHandler = () => {
	tmrSec.textContent = sec;
	sec--;
	if (sec === -1) {
		location.reload();
	}
};

let timer = setInterval(tHandler, 1000);

let flag = 1;
const btnClicked = () => {
	if (flag) {
		clearInterval(timer);
		document.getElementById("btn").textContent = "Continue";
		flag = 0;
	} else {
		timer = setInterval(tHandler, 1000);
		document.getElementById("btn").textContent = "Stop";
		flag = 1;
	}
};

// Data generation.
const generateChartData = () => {
	let chartData = [];

	for (let i = 0; i < 10; i++) {
		let fNum = Math.floor(Math.random() * 100);
		let sNum = Math.floor(Math.random() * 100);
		let tNum = Math.floor(Math.random() * 100);

		chartData.push({
		fnum: fNum,
		snum: sNum,
		tnum: tNum,
		str: ""
		});
	};

	return chartData;
};

const compressChartData = (chartData) => {
	let cmpChartData = [];

	let fNum = chartData.reduce((total, curObj) => total + curObj.fnum, 0);
	let sNum = chartData.reduce((total, curObj) => total + curObj.snum, 0);
	let tNum = chartData.reduce((total, curObj) => total + curObj.tnum, 0);

	cmpChartData.push({
		num: fNum,
		str: "Sum of \n 'blue' numbers",
		color: "#183e85"}, {
		num: sNum,
		str: "Sum of \n 'light blue' numbers",
		color: "#0796e3"}, {
		num: tNum,
		str: "Sum of \n 'red' numbers",
		color: "#d61e02"
		});

	return cmpChartData;
};

let genChartData = generateChartData();
let cmpChartData = compressChartData(genChartData);

// Chart creation.
let barChart = AmCharts.makeChart( "barChart", {
  "type": "serial",
  "theme": "none",
  "dataProvider": genChartData,
  "categoryField": "str",
  "graphs": [ {
    "valueField": "fnum",
    "type": "column",
  	"fillColors": "#183e85",
    "balloonText": "Blue: [[fnum]]",
	"fillAlphas": 1,
    "lineAlpha": 0,
  },{
    "valueField": "snum",
    "type": "column",
	"fillColors": "#0796e3",
	"balloonText": "Light Blue: [[snum]]",
	"fillAlphas": 1,
    "lineAlpha": 0,
  },
  {
    "valueField": "tnum",
    "type": "column",
	"fillColors": "#d61e02",
	"balloonText": "Red: [[tnum]]",
	"fillAlphas": 1,
    "lineAlpha": 0,
  }],
  "startDuration": 1,
});

let pieChart = AmCharts.makeChart("pieChart", {
    "type": "pie",
    "outlineColor": "white",
	"theme": "none",
	"radius": "24%",
	"labelRadius": 5,
    "innerRadius": "40%",
    "dataProvider": cmpChartData,
    "balloonText": "[[value]]",
    "valueField": "num",
    "titleField": "str",
    "balloon": {
        "drop": true,
        "adjustBorderColor": false,
        "color": "#FFFFFF",
        "fontSize": 16
    },
	"colorField": "color"
});

let radarChart = AmCharts.makeChart( "radarChart", {
  "type": "radar",
  "theme": "none",
  "dataProvider": cmpChartData,
  "valueAxes": [ {
    "axisTitleOffset": 20,
    "minimum": 0,
    "axisAlpha": 0.15
  } ],
  "startDuration": 2,
  "graphs": [ {
    "balloonText": "[[value]]",
    "bullet": "round",
    "lineThickness": 2,
    "valueField": "num"
  } ],
  "categoryField": "str",
  "export": {
    "enabled": true
  }
});