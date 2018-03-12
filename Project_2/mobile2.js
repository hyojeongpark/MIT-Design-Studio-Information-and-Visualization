var mobile2 = d3.select('#mobile2');

function draw_mobile2(data) {
    var fahrenheit = true;
    var nowTime = new Date(data.currently.time * 1000);
    var todayTemp = data.currently.temperature;

    mobile2.select('.todayTemp').text(Math.round(todayTemp));
    setBigIcon('mobile2', data.currently.icon);

    mobile2.select('.c').on("click", function () {
        if (mobile2.select('.c').text() === '/C') {
            mobile2.select('.f').text('°C');
            mobile2.select('.c').text('/F');
            mobile2.select('.todayTemp')
                .text(Math.round(fahrToCelc(todayTemp)));
            fahrenheit = false;
            addTemperature('mobile2', '.temp-now', data.currently, fahrenheit);
            for (i = 1; i < tempDOM.length; i++) {
                addTemperature('mobile2', tempDOM[i], data.hourly.data[i - 1], fahrenheit);
            }

            mobile2.selectAll('.day').each(function (i, e) {
                drawTempBars(this, fahrToCelc(data.daily.data[e].temperatureMax), fahrToCelc(data.daily.data[e].temperatureMin), getMaxTempSevenDays(true));
            });
            rangeCheck();

        } else {
            mobile2.select('.f').text('°F');
            mobile2.select('.c').text('/C');
            mobile2.select('.todayTemp')
                .text(Math.round(todayTemp));
            fahrenheit = true;
            addTemperature('mobile2', '.temp-now', data.currently, fahrenheit);

            for (i = 1; i < tempDOM.length; i++) {
                addTemperature('mobile2', tempDOM[i], data.hourly.data[i - 1], fahrenheit);
            }

            mobile2.selectAll('.day').each(function (i, e) {
                drawTempBars(this, data.daily.data[e].temperatureMax, data.daily.data[e].temperatureMin, getMaxTempSevenDays(false));
            });

            rangeCheck();
        }
    });

    addTimes(mobile2, nowTime);

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

    // adds weekdays
    mobile2.selectAll('.weekday').each(function (i, e) {
        var dayObj = new Date(data.daily.data[e].time * 1000);
        d3.select(this).text(dayFormat(dayObj).slice(0, 3));
    });

    var maxSevenDays = data.daily.data[0].temperatureMax;
    for (i = 1; i < 7; i++) {
        if (data.daily.data[i].temperatureMax > maxSevenDays) {
            maxSevenDays = data.daily.data[i].temperatureMax;
        }
    }
    // draws bar graph
    mobile2.selectAll('.day').each(function (i, e) {
        drawTempBars(this, data.daily.data[e].temperatureMax, data.daily.data[e].temperatureMin, maxSevenDays);
    });

    rangeCheck();

    function getMaxTempSevenDays(celcius) {
        var maxSevenDays = data.daily.data[0].temperatureMax;

        for (i = 1; i < 7; i++) {
            if (data.daily.data[i].temperatureMax > maxSevenDays) {
                maxSevenDays = data.daily.data[i].temperatureMax;
            }
        }

        if (!celcius) {
            return maxSevenDays;
        } else {
            return fahrToCelc(maxSevenDays);
        }
    }
}

function drawTempBars(dom, maxTemp, minTemp, maxSevenDays) {
    var padding = (maxSevenDays - maxTemp) * 5;

    d3.select(dom).select('.barGraphContainer').remove();
    var height = (maxTemp - minTemp) * 5;
    d3.select(dom).append('div')
        .attr('class', 'barGraphContainer')
        .style('padding-top', padding + 'px')
        .append('span')
        .attr('class', 'barChartTemp')
        .attr('class', 'maxTemp')
        .text(Math.round(maxTemp));
    d3.select(dom).select('.barGraphContainer').append('svg')
        .attr('class', 'barGraph')
        .attr('width', '10')
        .attr('height', height)
        .style('background', 'linear-gradient(to bottom, #1B0083, rgba(27, 0, 131, 0))');

    d3.select(dom).select('.barGraphContainer').append('span')
        .attr('class', 'barChartTemp')
        .attr('class', 'minTemp')
        .text(Math.round(minTemp));
}

function rangeCheck() {
    var tooHigh = false;
    var tooLow = false;
    mobile2.selectAll('.barGraphContainer').each(function (i, e) {
        var padding = parseFloat(d3.select(this).style("padding-top"));
        if (padding < 40) {
            tooHigh = true;
        } else if (padding > 340) {
            tooLow = true;
        }
    });

    if (tooHigh) {
        mobile2.selectAll('.barGraphContainer').each(function (i, e) {
            var padding = parseFloat(d3.select(this).style("padding-top"));
            d3.select(this).style("padding-top", (padding + 40) + 'px');
        });
    } else if (tooLow) {
        mobile2.selectAll('.barGraphContainer').each(function (i, e) {
            var padding = parseFloat(d3.select(this).style("padding-top"));
            d3.select(this).style("padding-top", (padding - 150) + 'px');
        });
    }
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

// helper function size() that returns the number of dom elements
d3.selection.prototype.size = function () {
    var n = 0;
    this.each(function () {
        ++n;
    });
    return n;
};
