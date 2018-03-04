d3.select('#sketches').on("click", function () {
    d3.select('#sketches').attr('class', 'active');
    d3.select('.sketches').style('display', 'block');
    d3.select('#final').classed("active", false);
    d3.select('.final').style('display', 'none');
})

d3.select('#final').on("click", function () {
    d3.select('#final').attr('class', 'active');
    d3.select('.final').style('display', 'block');
    d3.select('#sketches').classed("active", false);
    d3.select('.sketches').style('display', 'none');
})

//plots


var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083'
var mobile1 = d3.select('#mobile1')
//d3.json("data/boston_weather.json", draw);
d3.json("https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083", draw);

var $todayTemp = d3.select('.todayTemp');

function draw(error, data) {
    console.log(data);
    d3.select('#todayDate').text(dayFormat(new Date()));

    var todayTemp = data.currently.temperature;
    console.log(todayTemp);

    $todayTemp.text(Math.floor(todayTemp));

    d3.select('.c').on("click", function () {
        if (d3.select('.c').text() == '/C') {
            d3.select('.f').text('°C');
            d3.select('.c').text('/F');
            $todayTemp.text(Math.floor(farToCelc(todayTemp)));
        } else {
            d3.select('.f').text('°F');
            d3.select('.c').text('/C');
            $todayTemp.text(Math.floor(todayTemp));
        }
    })

    function farToCelc(fahrenheit) {
        return (parseFloat(fahrenheit) - 32) * 0.5556;
    }
}

var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function dayFormat(day) {
    s = weekday[day.getDay()] +', ' + monthNames[day.getMonth()] + ' ' + day.getDate();
    return s;
}
