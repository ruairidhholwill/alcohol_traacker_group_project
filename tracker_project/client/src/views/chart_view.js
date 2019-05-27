//here we will display all the details in graphics.



window.onload = function() {

    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Alcohol Tracker"
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: 51.08, label: "Current alcohol consumed by unit" },
                { y: 27.34, label: "Total spent" },
                { y: 10.62, label: "Alcohol target" },
                { y: 5.02, label: "Money target" },
                // { y: 4.07, label: "Safari" },
                // { y: 1.22, label: "Opera" },
                // { y: 0.44, label: "Others" }
            ]
        }]
    });
    chart.render();
    }