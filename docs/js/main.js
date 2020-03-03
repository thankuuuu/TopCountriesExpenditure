google.charts.load('current', {'packages':['corechart','bar','controls']});
google.charts.setOnLoadCallback(DrawAllGraphs);

function DrawAllGraphs() {
    DrawGraph('MeanSpend', 'SELECT A,D,B',
                  MSOverallResponseHandler)
    DrawGraph('MeanSpend', 'SELECT A,G,E',
                  HSOverallResponseHandler)  
    DrawGraph('MeanSpend', 'SELECT A,J,H',
                  ESOverallResponseHandler)
    DrawGraph('MeanSpend', 'SELECT A,L,K',
                  GDPOverallResponseHandler)                         
    DrawGraph('MilitarySpend(M$)', 'SELECT A,B,C,D,E,F,G',
                  MSColumnResponseHandler);
    DrawGraph('HealthSpend(M$)', 'SELECT A,B,C,D,E,F,G',
                  HSColumnResponseHandler);
    DrawGraph('EducationSpend(M$)', 'SELECT A,B,C,D,E,F,G',
                  ESColumnResponseHandler);
    DrawGraph('MilitarySpend(M$)', 'SELECT A,B,C,D,E,F,G',
                  MSLineResponseHandler);
    DrawGraph('HealthSpend(M$)', 'SELECT A,B,C,D,E,F,G',
                  HSLineResponseHandler);
    DrawGraph('EducationSpend(M$)', 'SELECT A,B,C,D,E,F,G',
                  ESLineResponseHandler);
    DrawGraph('MSPerCapita($)', 'SELECT A,B,C,D,E,F,G',
                  MSLineCapResponseHandler);
    DrawGraph('HSPerCapita($)', 'SELECT A,B,C,D,E,F,G',
                  HSLineCapResponseHandler);
    DrawGraph('ESPerCapita($)', 'SELECT A,B,C,D,E,F,G',
                  ESLineCapResponseHandler);
    DrawGraph('MSPercentGDP', 'SELECT A,B,C,D,E,F,G',
                  MSLineGDPResponseHandler);
    DrawGraph('HSGDP', 'SELECT A,B,C,D,E,F,G',
                  HSLineGDPResponseHandler);
    DrawGraph('ESGDP', 'SELECT A,B,C,D,E,F,G',
                  ESLineGDPResponseHandler);
    DrawGraph('MeanSpend', 'SELECT A,G,J,L',
                  BubbleResponseHandler); 
    DrawGraph('MeanSpend', 'SELECT A,E,H,B',
                  StackedBarResponseHandler); 
    DrawGraph('MeanSpend', 'SELECT A,E,H,B',
                  StackedBarPercentResponseHandler);  
    DrawGraph('Growing', 'SELECT A,E,G',
                  PercentGrowthResponseHandler);
    DrawGraph('Growing', 'SELECT A,D,F',
                  FixedGrowthResponseHandler);                        
} //function to draw all graph

function DrawGraph(sheetName, query, responseHandler) {
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        "https://docs.google.com/spreadsheets/d/1N121wBZCrnXZOJMH917LTtAceKt1dkBOsHOf0-EIo3o/gviz/tq?sheet=" + sheetName + "&headers=1&tq=" + queryString
    );
    query.send(responseHandler);
} //function to retrive data from google sheet

function MSOverallResponseHandler(response) {
    var data = response.getDataTable();

    var formatter = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$',suffix: 'M',
    });
    var formatter2 = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$'
    });

    formatter.format(data, 2);
    formatter2.format(data, 1);

    var options = {
        height: 400,
        colorAxis : {colors: ['red','blue']}, 
        title: 'Overall Military Spending Top Countries Spending (Average 2010-2015)'
    };

    var chart = new google.visualization.GeoChart(
        document.getElementById("MSOverall_div"));
    chart.draw(data, options);
} //MSOverallResponseHandler

function HSOverallResponseHandler(response) {
    var data = response.getDataTable();

    var formatter = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$',suffix: 'M',
    });
    var formatter2 = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$'
    });

    formatter.format(data, 2);
    formatter2.format(data, 1);

    var options = {
        height: 400,
        colorAxis : {colors: ['red','blue']}, 
        title: 'Overall Health Spending of Top Countries Spending (Average 2010-2015)'
    };

    var chart = new google.visualization.GeoChart(
        document.getElementById("HSOverall_div"));
    chart.draw(data, options);
} //HSOverallResponseHandler

function ESOverallResponseHandler(response) {
    var data = response.getDataTable();

    var formatter = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$',suffix: 'M',
    });
    var formatter2 = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$'
    });

    formatter.format(data, 2);
    formatter2.format(data, 1);

    var options = {
        height: 400,
        colorAxis : {colors: ['red','blue']}, 
        title: 'Overall Education Spending Top Countries Spending (Average 2010-2015)'
    };

    var chart = new google.visualization.GeoChart(
        document.getElementById("ESOverall_div"));
    chart.draw(data, options);
} //ESOverallResponseHandler

function GDPOverallResponseHandler(response) {
    var data = response.getDataTable();

    var formatter = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$',suffix: 'M',
    });
    var formatter2 = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$'
    });

    formatter.format(data, 2);
    formatter2.format(data, 1);

    var options = {
        height: 400,
        colorAxis : {colors: ['red','blue']}, 
        title: 'Overall GDP of Top Countries (Average 2010-2015)'
    };

    var chart = new google.visualization.GeoChart(
        document.getElementById("GDPOverall_div"));
    chart.draw(data, options);
} //GDPOverallResponseHandler

// Draw Column chart

function MSColumnResponseHandler(response) {
    var data = response.getDataTable();
    
    var RangeSlider = new google.visualization.ControlWrapper({
      'controlType': 'CategoryFilter',
      'containerId': 'MSColumnFilter_div',
      'options': {
        'filterColumnIndex' : 0,
        ui: {
            caption : 'Select Country',
            allowNone : false,
            allowMultiple : false,
        },
      }
    });

    var dashboard = new google.visualization.Dashboard(
    document.getElementById('MSColumnControl_div'));

    var chart = new google.visualization.ChartWrapper({
        'chartType': 'ColumnChart',
        'options' : {
            'hAxis' : { title : 'Country' },
            'title' : 'Absolute Military Spending in M$',
            'vAxis' : {format: 'decimal',
                    title: 'Military Spending in Millions (M$)'},
        'legend' : { position: 'bottom'},
        },
        'containerId': 'MSColumn_div',
});
dashboard.bind(RangeSlider,chart);
dashboard.draw(data);
} //MSColumnResponseHandler

function HSColumnResponseHandler(response) {
    var data = response.getDataTable();
        
    var RangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': 'HSColumnFilter_div',
          'options': {
            'filterColumnIndex' : 0,
            ui: {
                caption : 'Select Country',
                allowNone : false,
                allowMultiple : false,
            },
          }
        });
    
    var dashboard = new google.visualization.Dashboard(
            document.getElementById('HSColumnControl_div'));
    
    var chart = new google.visualization.ChartWrapper({
                'chartType': 'ColumnChart',
                'options' : {
                    'hAxis' : { title : 'Country' },
                    'title' : 'Absolute Health Spending in M$',
                    'vAxis' : {format: 'decimal',
                            title: 'Health Spending in Millions (M$)'},
                'legend' : { position: 'bottom'},
                },
                'containerId': 'HSColumn_div',
        });
    dashboard.bind(RangeSlider,chart);
    dashboard.draw(data);
} //HSColumnResponseHandler


function ESColumnResponseHandler(response) {
    var data = response.getDataTable();
    
    var RangeSlider = new google.visualization.ControlWrapper({
      'controlType': 'CategoryFilter',
      'containerId': 'ESColumnFilter_div',
      'options': {
        'filterColumnIndex' : 0,
        ui: {
            caption : 'Select Country',
            allowNone : false,
            allowMultiple : false,
        },
      }
    });

        var dashboard = new google.visualization.Dashboard(
        document.getElementById('ESColumnControl_div'));

        var chart = new google.visualization.ChartWrapper({
            'chartType': 'ColumnChart',
            'options' : {
                'hAxis' : { title : 'Country' },
                'title' : 'Absolute Education Spending in M$',
                'vAxis' : {format: 'decimal',
                        title: 'Education Spending in Millions (M$)'},
            'legend' : { position: 'bottom'},
            },
            'containerId': 'ESColumn_div',
    });
    dashboard.bind(RangeSlider,chart);
    dashboard.draw(data);
} //ESColumnResponseHandler

// Draw line chart

function MSLineResponseHandler(response) {
    var rawdata = response.getDataTable();
    
    // Transpose the data to plot the line chart
    var newData = new google.visualization.DataTable();
        newData.addColumn('string', 'Years');
        for (var i = 0; i < rawdata.getNumberOfRows(); i++) {
            newData.addColumn('number', rawdata.getValue(i, 0));
        }
        for (var i = 1; i < rawdata.getNumberOfColumns(); i++) {
            var row = [rawdata.getColumnLabel(i)];
            for (var j = 0; j < rawdata.getNumberOfRows(); j++) {
                row.push(rawdata.getValue(j, i));
            }
            newData.addRow(row);}

    //Data for Plot the graph
    var data = new google.visualization.DataTable();
        data = newData;

    var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2, suffix: 'M',prefix: '$'
    });

    for (var i = 0; i < data.getNumberOfColumns(); i++) {
        formatter.format(data, i);
        }  

    var options = {title: 'Absolute Military Spending',
                   vAxis :{title: 'Military Spending in Millions (M$)'},
                   hAxis: {title: 'Country'},
                   curveType: 'function',
                   pointsVisible: true,
                   pointShape: 'circle', 
                   dataOpacity: 0.7,
                   legend: { position: 'bottom'}};
    
    var chart = new google.visualization.LineChart(
        document.getElementById("MSLine_div"));
    
    chart.draw(newData, options);
} //MSLineResponseHandler

function HSLineResponseHandler(response) {
    var rawdata = response.getDataTable();
    
    // Transpose the data to plot the line chart
    var newData = new google.visualization.DataTable();
        newData.addColumn('string', 'Years');
        for (var i = 0; i < rawdata.getNumberOfRows(); i++) {
            newData.addColumn('number', rawdata.getValue(i, 0));
        }
        for (var i = 1; i < rawdata.getNumberOfColumns(); i++) {
            var row = [rawdata.getColumnLabel(i)];
            for (var j = 0; j < rawdata.getNumberOfRows(); j++) {
                row.push(rawdata.getValue(j, i));
            }
            newData.addRow(row);}

    //Data for Plot the graph
    var data = new google.visualization.DataTable();
        data = newData;

    var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2, suffix: 'M',prefix:'$'
    });

    for (var i = 0; i < data.getNumberOfColumns(); i++) {
        formatter.format(data, i);
        }  

    var options = {title: 'Absolute Health Spending',
                   vAxis :{title: 'Health Spending in Millions (M$)'},      
                   hAxis: {title: 'Country'},
                   curveType: 'function',
                   pointsVisible: true,
                   pointShape: 'triangle',
                   dataOpacity: 0.7,
                   legend: { position: 'bottom'}};
    
    var chart = new google.visualization.LineChart(
        document.getElementById("HSLine_div"));
    
    chart.draw(newData, options);
} //HSLineResponseHandler

function ESLineResponseHandler(response) {
    var rawdata = response.getDataTable();
    
    // Transpose the data to plot the line chart
    var newData = new google.visualization.DataTable();
        newData.addColumn('string', 'Years');
        for (var i = 0; i < rawdata.getNumberOfRows(); i++) {
            newData.addColumn('number', rawdata.getValue(i, 0));
        }
        for (var i = 1; i < rawdata.getNumberOfColumns(); i++) {
            var row = [rawdata.getColumnLabel(i)];
            for (var j = 0; j < rawdata.getNumberOfRows(); j++) {
                row.push(rawdata.getValue(j, i));
            }
            newData.addRow(row);}

    //Data for Plot the graph
    var data = new google.visualization.DataTable();
        data = newData;

    var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2, suffix: 'M', prefix:'$'
    });

    for (var i = 0; i < data.getNumberOfColumns(); i++) {
        formatter.format(data, i);
        }  

    var options = {title: 'Absolute Education Spending',
                   vAxis :{title: 'Education Spending in Millions (M$)'},
                   hAxis: {title: 'Country'},
                   curveType: 'function',
                   pointsVisible: true,
                   pointShape: 'square', 
                   dataOpacity: 0.7,
                   legend: { position: 'bottom'}};
    
    var chart = new google.visualization.LineChart(
        document.getElementById("ESLine_div"));
    
    chart.draw(newData, options);
} //ESLineResponseHandler

function MSLineCapResponseHandler(response) {
    var rawdata = response.getDataTable();
    
    // Transpose the data to plot the line chart
    var newData = new google.visualization.DataTable();
        newData.addColumn('string', 'Years');
        for (var i = 0; i < rawdata.getNumberOfRows(); i++) {
            newData.addColumn('number', rawdata.getValue(i, 0));
        }
        for (var i = 1; i < rawdata.getNumberOfColumns(); i++) {
            var row = [rawdata.getColumnLabel(i)];
            for (var j = 0; j < rawdata.getNumberOfRows(); j++) {
                row.push(rawdata.getValue(j, i));
            }
            newData.addRow(row);}

    //Data for Plot the graph
    var data = new google.visualization.DataTable();
        data = newData;

    var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2, prefix: '$'
    });

    for (var i = 0; i < data.getNumberOfColumns(); i++) {
        formatter.format(data, i);
        }  

    var options = {title: 'Military Spending Per Capita',
                   vAxis :{title: 'Military  Spending Per Capita ($)'},        
                   hAxis: {title: 'Country'},
                   curveType: 'function',
                   pointsVisible: true,
                   pointShape: 'circle', 
                   dataOpacity: 0.7,
                   legend: { position: 'bottom'}};
    
    var chart = new google.visualization.LineChart(
        document.getElementById("MSLineCap_div"));
    
    chart.draw(newData, options);
} //MSLineCapResponseHandler

function HSLineCapResponseHandler(response) {
    var rawdata = response.getDataTable();
    
    // Transpose the data to plot the line chart
    var newData = new google.visualization.DataTable();
        newData.addColumn('string', 'Years');
        for (var i = 0; i < rawdata.getNumberOfRows(); i++) {
            newData.addColumn('number', rawdata.getValue(i, 0));
        }
        for (var i = 1; i < rawdata.getNumberOfColumns(); i++) {
            var row = [rawdata.getColumnLabel(i)];
            for (var j = 0; j < rawdata.getNumberOfRows(); j++) {
                row.push(rawdata.getValue(j, i));
            }
            newData.addRow(row);}

    //Data for Plot the graph
    var data = new google.visualization.DataTable();
        data = newData;

    var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2, prefix:'$'
    });

    for (var i = 0; i < data.getNumberOfColumns(); i++) {
        formatter.format(data, i);
        }  

    var options = {title: 'Health Spending Per Capita',
                   vAxis :{title: 'Health Spending Per Capita ($)'},
                   hAxis: {title: 'Country'},
                   curveType: 'function',
                   pointsVisible: true,
                   pointShape: 'triangle',
                   dataOpacity: 0.7,
                   legend: { position: 'bottom'}};
    
    var chart = new google.visualization.LineChart(
        document.getElementById("HSLineCap_div"));
    
    chart.draw(newData, options);
} //HSLineCapResponseHandler

function ESLineCapResponseHandler(response) {
    var rawdata = response.getDataTable();
    
    // Transpose the data to plot the line chart
    var newData = new google.visualization.DataTable();
        newData.addColumn('string', 'Years');
        for (var i = 0; i < rawdata.getNumberOfRows(); i++) {
            newData.addColumn('number', rawdata.getValue(i, 0));
        }
        for (var i = 1; i < rawdata.getNumberOfColumns(); i++) {
            var row = [rawdata.getColumnLabel(i)];
            for (var j = 0; j < rawdata.getNumberOfRows(); j++) {
                row.push(rawdata.getValue(j, i));
            }
            newData.addRow(row);}

    //Data for Plot the graph
    var data = new google.visualization.DataTable();
        data = newData;

    var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2, prefix:'$'
    });

    for (var i = 0; i < data.getNumberOfColumns(); i++) {
        formatter.format(data, i);
        }  

    var options = {title: 'Education Spending Per Capita',
                   vAxis :{title: 'Education Spending Per Capita ($)'},
                   hAxis: {title: 'Country'},
                   curveType: 'function',
                   pointsVisible: true,
                   pointShape: 'square', 
                   dataOpacity: 0.7,
                   legend: { position: 'bottom'}};
    
    var chart = new google.visualization.LineChart(
        document.getElementById("ESLineCap_div"));
    
    chart.draw(newData, options);
} //ESCapResponseHandler

function MSLineGDPResponseHandler(response) {
    var rawdata = response.getDataTable();
    
    // Transpose the data to plot the line chart
    var newData = new google.visualization.DataTable();
        newData.addColumn('string', 'Years');
        for (var i = 0; i < rawdata.getNumberOfRows(); i++) {
            newData.addColumn('number', rawdata.getValue(i, 0));
        }
        for (var i = 1; i < rawdata.getNumberOfColumns(); i++) {
            var row = [rawdata.getColumnLabel(i)];
            for (var j = 0; j < rawdata.getNumberOfRows(); j++) {
                row.push(rawdata.getValue(j, i));
            }
            newData.addRow(row);}

    //Data for Plot the graph
    var data = new google.visualization.DataTable();
        data = newData;

    var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2, suffix: '%'
    });

    for (var i = 0; i < data.getNumberOfColumns(); i++) {
        formatter.format(data, i);
        }  

    var options = {title: 'Military Spending shared % GDP',
                   vAxis : {title: 'Military Spending shared % GDP (%)'},
                   hAxis: {title: 'Country'},
                   curveType: 'function',
                   pointsVisible: true,
                   pointShape: 'circle', 
                   dataOpacity: 0.7,
                   legend: { position: 'bottom'}};
    
    var chart = new google.visualization.LineChart(
        document.getElementById("MSLineGDP_div"));
    
    chart.draw(newData, options);
} //MSLineGDPResponseHandler 

function HSLineGDPResponseHandler(response) {
    var rawdata = response.getDataTable();
    // Transpose the data to plot the line chart
    var newData = new google.visualization.DataTable();
        newData.addColumn('string', 'Years');
        for (var i = 0; i < rawdata.getNumberOfRows(); i++) {
            newData.addColumn('number', rawdata.getValue(i, 0));
        }
        for (var i = 1; i < rawdata.getNumberOfColumns(); i++) {
            var row = [rawdata.getColumnLabel(i)];
            for (var j = 0; j < rawdata.getNumberOfRows(); j++) {
                row.push(rawdata.getValue(j, i));
            }
            newData.addRow(row);}

    //Data for Plot the graph
    var data = new google.visualization.DataTable();
        data = newData;

    var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2, suffix: '%'
    });

    for (var i = 0; i < data.getNumberOfColumns(); i++) {
        formatter.format(data, i);
        }

    var options = {title: 'Health Spending shared % GDP',
                   vAxis : {title: 'Health Spending shared % GDP (%)'},
                   hAxis: {title: 'Country'},
                   curveType: 'function',
                   pointsVisible: true,
                   pointShape: 'triangle', 
                   dataOpacity: 0.7,
                   legend: { position: 'bottom'}};
    
    var chart = new google.visualization.LineChart(
        document.getElementById("HSLineGDP_div"));
    
    chart.draw(newData, options);
} //HSLineGDPResponseHandler               

function ESLineGDPResponseHandler(response) {
    var rawdata = response.getDataTable();
    // Transpose the data to plot the line chart
    var newData = new google.visualization.DataTable();
        newData.addColumn('string', 'Years');
        for (var i = 0; i < rawdata.getNumberOfRows(); i++) {
            newData.addColumn('number', rawdata.getValue(i, 0));
        }
        for (var i = 1; i < rawdata.getNumberOfColumns(); i++) {
            var row = [rawdata.getColumnLabel(i)];
            for (var j = 0; j < rawdata.getNumberOfRows(); j++) {
                row.push(rawdata.getValue(j, i));
            }
            newData.addRow(row);}

    //Data for Plot the graph
    var data = new google.visualization.DataTable();
        data = newData;
    
        var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2, suffix: '%'
    });

    for (var i = 0; i < data.getNumberOfColumns(); i++) {
        formatter.format(data, i);
        }

    var options = {title: 'Education Spending shared % GDP',
                   vAxis : {title: 'Education Spending shared % GDP (%)'},
                   hAxis: {title: 'Country'},
                   curveType: 'function',
                   pointsVisible: true,
                   pointShape: 'square', 
                   dataOpacity: 0.7,
                   legend: { position: 'bottom'}};
                    
    var chart = new google.visualization.LineChart(
        document.getElementById("ESLineGDP_div"));
    
    chart.draw(newData, options);
} //ESLineResponseHandler

function BubbleResponseHandler(response){
    var data = response.getDataTable();

    var options = {title: 'Correlation between Health Spending, Education Spending and GDP Per Capita of top countries (Average 2010-2015)',
                    hAxis: {title: 'Health Spending Per Capita ($)'},
                    vAxis: {title: 'Education Spending Per Capita ($)'},
                    width: 900,
                    bubble: {textStyle: {fontSize: 12}}      
                };
    var formatter = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$'
    });

    formatter.format(data, 1);
    formatter.format(data, 2);
    formatter.format(data, 3);
var chart = new google.visualization.BubbleChart(document.getElementById('Bubble_div'));
chart.draw(data, options);    
} //BubbleResponseHandler     

function StackedBarResponseHandler(response) {
    var data = response.getDataTable();
    data.sort({column: 2, desc:true});

    var options = {
        legend: {position: 'right'},
        bar: {groupWidth: '80%'},
        isStacked: true
    };

    var formatter = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$'
    });

    formatter.format(data, 1);
    formatter.format(data, 2);

    var chart = new google.visualization.BarChart(
            document.getElementById("StackedBar_div")
    );
    chart.draw(data, options);
} //StackedBarResponseHandler

function StackedBarPercentResponseHandler(response) {
    var data = response.getDataTable();
    data.sort({column: 2, desc:true});

    var options = {
        isStacked: 'percent',
        legend: {position: 'top'},
        hAxis: {
            minValue: 0,
            ticks: [0, .3, .6, .9, 1]
        }
        };

    var formatter = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$'
    });

    formatter.format(data, 1);
    formatter.format(data, 2);

    var chart = new google.visualization.BarChart(
            document.getElementById("StackedBarPercent_div")
    );
    chart.draw(data, options);
} //StackedBarPercentResponseHandler

function FixedGrowthResponseHandler(response){
    var data = response.getDataTable();
    data.sort({column: 1, desc:true});

    var options = {
        chart: {
            title: 'Top Countries Growth',
            subtitle: 'Heatlth and Education Spending Absolute Growth: 2010-2015',
        },
        bars: 'horizontal',
        vAxis: {title: 'Country'},
        hAxis: {title: 'M$'}
        };

    var formatter = new google.visualization.NumberFormat({
        fractionDigits: 2, prefix: '$'
    });

    formatter.format(data, 1);
    formatter.format(data, 2);

var chart = new google.charts.Bar(document.getElementById('FixedGrowth_div'));
chart.draw(data, google.charts.Bar.convertOptions(options));
} //FixedGrowthResponseHandler

function PercentGrowthResponseHandler(response){
    var data = response.getDataTable();
    data.sort({column: 1, desc:true});

    var options = {
        chart: {
            title: 'Top Countries Growth',
            subtitle: 'Heatlth and Education Spending Percent Growth: 2010-2015',
        },
        bars: 'horizontal',
        vAxis: {title: 'Country'},
        hAxis: {title: '%'}
        };

    var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2, suffix: '%'
    });

    formatter.format(data, 1);
    formatter.format(data, 2);

var chart = new google.charts.Bar(document.getElementById('PercentGrowth_div'));
chart.draw(data, google.charts.Bar.convertOptions(options));
} //PercentGrowthResponseHandler
