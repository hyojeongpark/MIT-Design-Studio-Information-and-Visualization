var mobile2 = d3.select('#mobile2');
var $todayTemp = mobile2.select('.todayTemp');
d3.selection.prototype.size = function () {
    var n = 0;
    this.each(function () {
        ++n;
    });
    return n;
};

function draw_mobile2(data) {
    var fahrenheit = true;
    var nowTime = new Date(data.currently.time * 1000);
    var todayTemp = data.currently.temperature;

    $todayTemp.text(Math.floor(todayTemp));
    setBigIcon('mobile2', data.currently.icon);

    mobile2.select('.c').on("click", function () {
        if (mobile2.select('.c').text() === '/C') {
            mobile2.select('.f').text('°C');
            mobile2.select('.c').text('/F');
            $todayTemp.text(Math.floor(fahrToCelc(todayTemp)));
            fahrenheit = false;
            addTemperature('mobile2', '.temp-now', data.currently, fahrenheit);
            for (i = 1; i < tempDOM.length; i++) {
                addTemperature('mobile2', tempDOM[i], data.hourly.data[i - 1], fahrenheit);
            }
        } else {
            mobile2.select('.f').text('°F');
            mobile2.select('.c').text('/C');
            $todayTemp.text(Math.floor(todayTemp));
            fahrenheit = true;
            addTemperature('mobile2', '.temp-now', data.currently, fahrenheit);
            for (i = 1; i < tempDOM.length; i++) {
                addTemperature('mobile2', tempDOM[i], data.hourly.data[i - 1], fahrenheit);
            }
        }
    });

    mobile2.select('.time-2').text(nowTime.getHours() + ':00');
    mobile2.select('.time-1').text(nowTime.getHours() + 1 + ':00');
    mobile2.select('.timePlus1').text(nowTime.getHours() + 2 + ':00');
    mobile2.select('.timePlus2').text((nowTime.getHours() + 3) + ':00');

    addWeatherIcon('mobile2', '.weather-icon-now', data.currently);
    for (i = 1; i < iconDOM.length; i++) {
        addWeatherIcon('mobile2', iconDOM[i], data.hourly.data[i - 1]);
    }

    addTemperature('mobile2', '.temp-now', data.currently, fahrenheit);
    for (i = 1; i < tempDOM.length; i++) {
        addTemperature('mobile2', tempDOM[i], data.hourly.data[i - 1], fahrenheit);
    }

    for (i = 0; i < mobile2.selectAll('.day-icon').size(); i++) {
        addWeatherIcon('mobile2', '.day-icon-' + i, data.daily.data[i]);
    }

    mobile2.selectAll('.weekday').each(function (i, e) {
        var dayObj = new Date(data.daily.data[e].time * 1000);
        d3.select(this).text(dayFormat(dayObj).slice(0, 3));
    });
}

function setBigIcon(canvas, icon) {
    if (icon == 'cloudy') {
        mobile2.select('.sun').append("img")
            .attr("src", canvas + "/big_cloudy.svg")
            .attr("width", 80);

    } else if (icon == "rain") {
        mobile2.select('.sun').append("img")
            .attr("src", canvas + "/big_rain.svg")
            .attr("height", 80);
        mobile2.select('.todayTemp').style("margin-left", '30px');

    } else if (icon == 'snow') {
        mobile2.select('.sun').append("img")
            .attr("src", canvas + "/big_snow.svg")
            .attr("width", 80)
            .attr("class", "snow-icon");
        mobile2.select('.todayTemp').style("margin-left", '-2.4em');

    } else if (icon.includes('partly-cloudy')) {
        mobile2.select('.sun').append("img")
            .attr("src", canvas + "/big_partlycloudy.svg")
            .attr("width", 80);
        mobile2.select('.todayTemp').style("margin-left", '-20px');

    } else {
        mobile2.select('.sun').append("img")
            .attr("src", canvas + "/big_sun.svg")
            .attr("width", 80);
    }
}
