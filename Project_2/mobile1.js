var data = $.ajax({
    url: 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083',
    dataType: 'JSONP',
    type: 'GET',
    crossDomain: true,
    complete: function (data) {
        if (data.readyState == '4' && data.status == '200') {
            console.log(data.responseJSON);
            draw(data.responseJSON);
        } else {
            console.log("DATA FETCH FAILED")
        }
    }
})

var mobile1 = d3.select('#mobile1');
var $todayTemp = d3.select('.todayTemp');
var iconDOM = ['#weather-icon-now', '#weather-icon-hrBefore2', '#weather-icon-hrBefore', '#weather-icon-hrAfter', '#weather-icon-hrAfter2'];
var tempDOM = ['#temp-now', '#temp-1', '#temp-plus1', '#temp-plus2', '#temp-plus3'];

function draw(data) {
    var fahrenheit = true;
    var nowTime = new Date(data.currently.time * 1000);
    var todayTemp = data.currently.temperature;
    $todayTemp.text(Math.floor(todayTemp));

    d3.select('#todayDate').text(dayFormat(new Date()));

    d3.select('.c').on("click", function () {
        if (d3.select('.c').text() === '/C') {
            d3.select('.f').text('°C');
            d3.select('.c').text('/F');
            $todayTemp.text(Math.floor(fahrToCelc(todayTemp)));
            fahrenheit = false;
            addTemperature('#temp-now', data.currently, fahrenheit);
            for (i = 1; i < tempDOM.length; i++) {
                addTemperature(tempDOM[i], data.hourly.data[i - 1], fahrenheit);
            }
        } else {
            d3.select('.f').text('°F');
            d3.select('.c').text('/C');
            $todayTemp.text(Math.floor(todayTemp));
            fahrenheit = true;
            addTemperature('#temp-now', data.currently, fahrenheit);
            for (i = 1; i < tempDOM.length; i++) {
                addTemperature(tempDOM[i], data.hourly.data[i - 1], fahrenheit);
            }
        }
    });

    d3.select('#time-2').text(nowTime.getHours() + ':00');
    d3.select('#time-1').text(nowTime.getHours() + 1 + ':00');
    d3.select('#timePlus1').text(nowTime.getHours() + 2 + ':00');
    d3.select('#timePlus2').text(nowTime.getHours() + 3 + ':00');


    addWeatherIcon('#weather-icon-now', data.currently);
    for (i = 1; i < iconDOM.length; i++) {
        addWeatherIcon(iconDOM[i], data.hourly.data[i - 1]);
    }

    addTemperature('#temp-now', data.currently, fahrenheit);
    for (i = 1; i < tempDOM.length; i++) {
        addTemperature(tempDOM[i], data.hourly.data[i - 1], fahrenheit);
    }

    setBackground(data.currently.icon);
}

function getIcon(time, data) {
    for (i = 0; i < data.hourly.data.length; i++) {
        if (data.hourly.data[i].time === time) {
            var icon = data.hourly.data[i].icon;
        }
    }
    return icon;
}

function setBackground(icon) {
    if (icon == 'cloudy' || icon == 'snow' || icon == 'rain') {
        d3.select('#mobile1').style('background', "url('foggy.png'), #000000").style('background-blend-mode', "hard-light");

        d3.select('.dome').style('opacity', 0.88);
        d3.select('#sun').style('opacity', 0);

        d3.select('.charles').style('background', 'linear-gradient(rgba(14, 30, 75, 0.88), rgba(138, 156, 212, 0.88))').style('mix-blend-mode', 'multiply');

        if (icon == "rain") {
            // I used css rain created by raichu26. https://codepen.io/alemesre/pen/hAxGg
            var nbDrop = 400; // number of drops created.

            // function to generate a random number range.
            function randRange(minNum, maxNum) {
                return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
            }

            // function to generate drops
            function createRain() {
                for (i = 1; i < nbDrop; i++) {
                    var dropLeft = randRange(0, 400);
                    var dropTop = randRange(-1800, 1800);
                    d3.select('#mobile1').append('div').attr('class', "drop").attr('id', "drop" + i);
                    d3.select('#drop' + i).style('left', dropLeft + 'px');
                    d3.select('#drop' + i).style('top', dropTop + 'px');
                }
            }
            // Make it rain
            createRain();
        }
    } else if (icon.includes('partly-cloudy')) {
        d3.select('#mobile1').style('background', "url('clouds.png'), linear-gradient(to bottom, #4D2BFF, #56CEFF)");
    }
}

function addWeatherIcon(dom, node) {
    if (node.icon === "snow") {
        d3.select(dom).append("img")
            .attr("src", "snow.svg")
            .attr("width", 21)
            .attr("height", 21);
    } else if (node.icon === "cloudy") {
        d3.select(dom).append("img")
            .attr("src", "cloudy.svg")
            .attr("width", 34)
            .attr("height", 21);
    } else if (node.icon.includes('partly-cloudy')) {
        d3.select(dom).append("img")
            .attr("src", "partlycloudy.svg")
            .attr("width", 34)
            .attr("height", 21);
    } else if (node.icon === "rain") {
        d3.select(dom).append("img")
            .attr("src", "rain.svg")
            .attr("width", 25)
    }
}

function addTemperature(dom, node, fahrenheit) {
    if (fahrenheit) {
        d3.select(dom).text(Math.floor(node.temperature) + '°F');
    } else {
        d3.select(dom).text(Math.floor(fahrToCelc(node.temperature)) + '°C');
    }
}

var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function dayFormat(day) {
    var s = weekday[day.getDay()] + ', ' + monthNames[day.getMonth()] + ' ' + day.getDate();
    return s;
}

function fahrToCelc(fahrenheit) {
    return (fahrenheit - 32) * 0.5556;
}
