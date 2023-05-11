anychart.onDocumentReady(function() {
    // set the data
    var data = {
    	header: ["Name", "Nr. nxënësve"],
      rows: [
        ["Inxhineri software", 312],
    ]};

    // create the chart
   var chart = anychart.bar();

   // create the chart
    chart = anychart.column();

    // add data
    chart.data(data);

    // set the chart title
    chart.title("Numri i nxënësve për vitin 2022");


  // draw
  chart.container("chart-container");
  chart.draw();
});