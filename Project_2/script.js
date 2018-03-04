//plots


<<<<<<< HEAD
// var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083'

d3.json("data/boston_weather.json",draw);

function draw(error,data){


=======
//var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083'
var mobile1 = d3.select('#mobile1')
d3.json("data/boston_weather.json", draw);
//d3.json("https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083", draw);

var $todayTemp = d3.select('.todayTemp')

function draw(error, data) {
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
>>>>>>> project-2
}
