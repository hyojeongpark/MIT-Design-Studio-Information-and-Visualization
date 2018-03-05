//plots


var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083';

var mobile1 = d3.select('#mobile1');

d3.json("data/boston_weather.json", draw);
//d3.json("https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083", draw);



var $todayTemp = d3.select('.todayTemp');

function draw(error, data) {
    var nowTime = new Date(data.currently.time);
    console.log(nowTime);

    for (i = 0; i < data.hourly.data.length; i++) {
        console.log(new Date(data.hourly.data[i].time));
    }

    console.log(data);
    d3.select('#todayDate').text(dayFormat(new Date()));

    var todayTemp = data.currently.temperature;
    console.log(todayTemp);

    $todayTemp.text(Math.floor(todayTemp));

    d3.select('.c').on("click", function () {
        if (d3.select('.c').text() === '/C') {
            d3.select('.f').text('°C');
            d3.select('.c').text('/F');
            $todayTemp.text(Math.floor(farToCelc(todayTemp)));
        } else {
            d3.select('.f').text('°F');
            d3.select('.c').text('/C');
            $todayTemp.text(Math.floor(todayTemp));
        }
    });

    d3.select('#time-2').text(nowTime.getHours() - 2 + ':00');
    d3.select('#time-1').text(nowTime.getHours() - 1 + ':00');
    d3.select('#timePlus1').text(nowTime.getHours() + 1 + ':00');
    d3.select('#timePlus2').text(nowTime.getHours() + 2 + ':00');

    addWeatherIcon('#weather-icon-now', data.hourly.icon);
    addWeatherIcon('#weather-icon-hrBefore2', data.hourly.data[0].icon);
    addWeatherIcon('#weather-icon-hrBefore', data.hourly.data[1].icon);
//    addWeatherIcon('#weather-icon-hrBefore', getIcon(nowTime.setHours(nowTime.getHours() - 1), data));
    addWeatherIcon('#weather-icon-hrAfter', data.hourly.data[9].icon);
    addWeatherIcon('#weather-icon-hrAfter2', data.hourly.data[12].icon);
}

function getIcon(time, data) {
    console.log(time);
    for (i = 0; i < data.hourly.data.length; i++) {
        if (data.hourly.data[i].time === time) {
            var icon = data.hourly.data[i].icon;
        }
    }
    return icon;
}

function addWeatherIcon(dom, icon) {
    console.log(icon);
    if (icon === "snow") {
        d3.select(dom).append("img")
            .attr("src", "snow.svg")
            .attr("width", 21)
            .attr("height", 21);
    } else if (icon === "cloudy") {
        d3.select(dom).append("img")
            .attr("src", "cloudy.svg")
            .attr("width", 34)
            .attr("height", 21);
    } else if (icon.includes('partly-cloudy')) {
        d3.select(dom).append("img")
            .attr("src", "partlycloudy.svg")
            .attr("width", 34)
            .attr("height", 21);
    }
}

var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function dayFormat(day) {
    var s = weekday[day.getDay()] + ', ' + monthNames[day.getMonth()] + ' ' + day.getDate();
    return s;
}

function farToCelc(fahrenheit) {
    return (fahrenheit - 32) * 0.5556;
}
