<!DOCTYPE html>
<meta charset="utf-8">
<style>

    body {
        font: 10px sans-serif;
    }

    .axis path,
    .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }

    .x.axis path {
        display: none;
    }

    .line {
        fill: none;
        stroke: red;
        stroke-width: 1.5px;
    }

    .area {
        fill: steelblue;
    }
</style>
<body>
<script src="http://d3js.org/d3.v3.js"></script>
<script>

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 600 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
    // 10-Jun-2013 18:51:36.054
    var parseDate = d3.time.format("%d-%b-%Y %H:%M:%S.%L").parse;

    var x = d3.time.scale()
            .range([0, width]);

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

    var line = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.rpm);
            });

    var area = d3.svg.area()
            .x(function (d) {
                return x(d.date);
            })
            .y0(height)
            .y1(function (d) {
                return y(d.rpm);
            });


    var x2 = d3.time.scale()
            .range([0, width]);

    var y2 = d3.scale.linear()
            .range([height, 0]);

    var xAxis2 = d3.svg.axis()
            .scale(x2)
            .orient("bottom");

    var yAxis2 = d3.svg.axis()
            .scale(y2)
            .orient("left");

    var line2 = d3.svg.line()
            .x(function (d) {
                return x2(d.date);
            })
            .y(function (d) {
                return y2(d.calspeed);
            });

    var x3 = d3.time.scale()
            .range([0, width]);

    var y3 = d3.scale.linear()
            .range([height, 0]);

    var xAxis3 = d3.svg.axis()
            .scale(x3)
            .orient("bottom");

    var yAxis3 = d3.svg.axis()
            .scale(y3)
            .orient("left");

    var line3 = d3.svg.line()
            .x(function (d) {
                return x2(d.date);
            })
            .y(function (d) {
                return y3(d.COgkm);
            });


    var x4 = d3.time.scale()
            .range([0, width]);

    var y4 = d3.scale.linear()
            .range([height, 0]);

    var xAxis4 = d3.svg.axis()
            .scale(x4)
            .orient("bottom");

    var yAxis4 = d3.svg.axis()
            .scale(y4)
            .orient("left");

    var line4 = d3.svg.line()
            .x(function (d) {
                return x4(d.date);
            })
            .y(function (d) {
                return y4(d.MilesPerGallon);
            });


    var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svg2 = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svg3 = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svg4 = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("trackLog.csv", function (error, data) {
        data.forEach(function (d) {

            d.date = parseDate(d.DeviceTime);
            if (d.EngineRPM == '-') {
                d.rpm = 0;
            } else {
                d.rpm = d.EngineRPM;
            }

            var speed = (d.GPSSpeed * 2.236936292054402);

            if (isNaN(speed)) {
                d.calspeed = 0;
            } else {
                d.calspeed = speed;
            }

            if (isNaN(d.COgkm)) {
                d.COgkm = 0;
            }

            if (isNaN(d.MilesPerGallon)) {
                d.MilesPerGallon = 0;
            }
        });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));

        y.domain([0, 6200]);

        x2.domain(d3.extent(data, function (d) {
            return d.date;
        }));

        y2.domain([0, 75]);

        x3.domain(d3.extent(data, function (d) {
            return d.date;
        }));

        y3.domain(d3.extent(data, function(d) {
            return d.COgkm;
        }));

        x4.domain(d3.extent(data, function (d) {
            return d.date;
        }));

        y4.domain(d3.extent(data, function(d) {
            return d.MilesPerGallon;
        }));

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Engine RPM");


        svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        svg.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);


        svg2.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis2);

        svg2.append("g")
                .attr("class", "y axis")
                .call(yAxis2)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Speed (MPH)");


        svg2.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line2);

        svg3.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis3);

        svg3.append("g")
                .attr("class", "y axis")
                .call(yAxis3)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Co2 (g/km)");


        svg3.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line3);

        svg4.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis4);

        svg4.append("g")
                .attr("class", "y axis")
                .call(yAxis4)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("MPG (Average)");


        svg4.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line4);
    });

</script>