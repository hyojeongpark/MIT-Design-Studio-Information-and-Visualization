//plot
var margin = {
    t: 5,
    r: 25,
    b: 20,
    l: 25
}; //this is an object

var width = d3.select('#plot1').node().clientWidth - margin.r - margin.l,
    height = d3.select('#plot1').node().clientHeight - margin.t - margin.b;

// Append svg to div
var plot1 = d3.select('#plot1')
    .append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height + margin.t + margin.b);

// function to draw the map

// queue data files, parse them and use them
var queue = d3.queue()
    .defer(d3.csv, "data/data.csv", parseData)
    .defer(d3.json, "data/us_map.json")
    .defer(d3.csv, "data/population.csv", parsePopulation)
    .await(dataloaded);

function dataloaded(err, data, map) {
    console.log(data);
    console.log(map);

    var extentData = d3.extent(data, function (d) {
        return d.total
    });
    var extentPerCapitaData = d3.extent(data, function(d){
        var stateID = d.id;
        var statePopulation = populationPerState.get(stateID).estimate2017;
    })

    // get max and min values of data
    var enrolledExtent = d3.extent(data, function (d) {
        return d.total
    });

    // scale Color for the map
    var colorScale = d3.scaleLinear().domain(extentPerCapitaData).range(["#ffc5c0", "#ab0405"]);

    var path = d3.geoPath();

    // Bind the data to the SVG and create one path per GeoJSON feature
    plot1.selectAll(".state")
        .data(topojson.feature(map, map.objects.states).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "state")
        .style("fill", function (d) {
            var mapID = +d.id;
            var color = "#000";
        var totalPopulation = populationPerState.get(mapID).estimate2017

            data.forEach(function (e) {
                if (e.id == mapID) {
                    color = scaleColor(e.total)
                }
            });
            return color
        })
}

function parseData(d) {
    console.log("parsedata" + d);
    var id = d.Id.split("US")[1];
    console.log("parsedata" + id);

    return { //gives specific object of the dataset
        id: +id,
        state: +d.state,
        total: +d["Total; Estimate; Population 3 years and over enrolled in school"]
    }
}

// ,
//     percentage: +d["Percent; Estimate; Population 3 years and over enrolled in school"]

function parsePopulation(d) {
    console.log(d);
    var id;

    if (d.id !== '') {
        id = +d.id.split("US")[1];
    } else {
        id = d["Geographic Area"]
    }

    console.log("parsePopulation" + id)

    populationPerState.set(id, {
        state: d["Geographic Area"],
        april2010: +d["April 1, 2010, Census"],
        estimate2017: +d["Estimate 2017"]

    })
}
