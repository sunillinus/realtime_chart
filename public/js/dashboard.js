function initDailyChart() {
  //Set up the chart  
  $('#daily-chart').highcharts({
    chart: {
      type: 'spline',
      zoomType: 'x',
      minRange: 14 * 24 * 3600000 // fourteen days
    },

    title: {
      text: 'Daily Activity'
    },

    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: 'Date'
      }
    },

    yAxis: {
      type: 'linear'
    },

    tooltip: {
      shared: true,
      crosshairs: true
    },
		
		series: [{name: 'Data'}]

  });
}

function dailyStats() {
	initDailyChart();
    $.ajax({
    url: '/data',
    type: 'POST',
    contentType: 'application/json'
  })
  .done(function(data) {
    var dataPoints = _.map(data, function(p) {
      return [p.created_at, p.value];
    });
    var dailyChart = $('#daily-chart').highcharts();
    var series = dailyChart.series[0];
    series.setData(dataPoints);
  });
}

$(document).ready(function() {
  dailyStats();
  var server = io.connect();
	var dailyChart = $('#daily-chart').highcharts();
  var series = dailyChart.series[0];
  server.on('messages', function(data) {
    series.addPoint([data.created_at, data.value], true, (series.data.length > 120));
  });
});
