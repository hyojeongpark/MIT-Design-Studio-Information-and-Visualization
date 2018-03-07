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

function draw(data) {
    console.log(data)
    var nowTime = new Date(data.currently.time*1000);
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

    d3.select('#time-2').text(nowTime.getHours() + ':00');
    d3.select('#time-1').text(nowTime.getHours() + 1 + ':00');
    d3.select('#timePlus1').text(nowTime.getHours() + 2 + ':00');
    d3.select('#timePlus2').text(nowTime.getHours() + 3 + ':00');

    addWeatherIcon('#weather-icon-now', data.currently);
    addWeatherIcon('#weather-icon-hrBefore2', data.hourly.data[0]);
    addWeatherIcon('#weather-icon-hrBefore', data.hourly.data[1]);
    addWeatherIcon('#weather-icon-hrAfter', data.hourly.data[2]);
    addWeatherIcon('#weather-icon-hrAfter2', data.hourly.data[3]);

    setBackground(data.currently.icon);
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

function setBackground(icon) {
    console.log(icon);
    if (icon == 'cloudy' || icon == 'snow' || icon == 'rain') {
        d3.select('#mobile1').style('background', "url('foggy.png'), #000000").style('background-blend-mode', "hard-light");

        d3.select('.dome').style('opacity', 0.88);
        d3.select('#sun').style('opacity', 0);

        d3.select('.charles').style('background', 'linear-gradient(rgba(14, 30, 75, 0.88), rgba(138, 156, 212, 0.88))').style('mix-blend-mode', 'multiply');

        if (icon == "rain") {
            // I used css rain created by raichu26. https://codepen.io/alemesre/pen/hAxGg

            // number of drops created.
            var nbDrop = 400;

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
    console.log(node);
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
    d3.select(dom).append('div').attr('class', 'temperature').text(Math.floor(node.temperature) + '°F');
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
