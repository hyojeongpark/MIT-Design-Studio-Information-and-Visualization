// array of data

var data = [{
    year: 2005,
    fruit: 309
}, {
    year: 2006,
    fruit: 238
}, {
    year: 2007,
    fruit: 950
}, {
    year: 2008,
    fruit: 289
}, {
    year: 2009,
    fruit: 309
}, {
    year: 2010,
    fruit: 238
}, {
    year: 2011,
    fruit: 950
}, {
    year: 2012,
    fruit: 289
}, {
    year: 2013,
    fruit: 250
}];

//TODO plot 1 bar chart
//margins, width and height

var margin1 = {
    t: 5,
    r: 25,
    b: 20,
    l: 25
};

var width = d3.select("#plot1").node().clientWidth - margin1.r - margin1.l,
    height = d3.select("#plot1").node().clientHeight - margin1.t - margin1.b;

//append svg

var plot1 = d3.select("#plot1")
    .append("svg")
    .attr("width", width + margin1.r + margin1.l)
    .attr("width", width + margin1.t + margin1.t);


// scales to position our bars
// and to give them height
// d3 scales are translation of values into other values
// more information at https://github.com/d3/d3-scale

// 1 map (get an array) all the years in the original array

var mapYears = data.map(function (d) {
    return d.year;
});

console.log(mapYears);

// scaleX
var scaleX = d3.scaleBand().domain(mapYears).range([0, width]);

console.log(2005, scaleX(2005));

// 2 get the minimum and maximum values

var maxFruit = d3.max(data, function (d) {
    return d.fruit;
});

console.log(maxFruit);

// scaleY
var scaleY = d3.scaleLinear().domain([0, maxFruit]).domain([height, 0]);

//create groups to put the content inside them
plot1.append("g").attr("transform", "translate(" + margin1.l + "," + margin1.t + ")").attr("class", "axis axis-y");

plot1.append("g").attr("transform", "translate(" + margin1.l + "," + margin1.t + ")").attr("class", "axis axis-x");

var plot1Barchart = plot1.append("g").attr("transform", "translate(" + margin1.l + "," + margin1.t + ")").attr("class", "barchart");


//AXIS
var axisBarChartX = d3.axisBottom().scale(scaleX).ticks();
var axisBarChartY = d3.axisLeft().scale(scaleY).ticks();

plot1.select(".axis-x").call(axisBarChartX);

//bars



///TODO plot 2

//plot bar chart
//margins, width and height


//append svg




// parse data with d3.csv



//function draw

// 1 map (get an array) all the years in the original array


// scaleX


// 2 get the minimum and maximum values


//scaleY


//functions to create the lines

//create groups to put the content inside them


//AXIS



// fruits





// veggies
