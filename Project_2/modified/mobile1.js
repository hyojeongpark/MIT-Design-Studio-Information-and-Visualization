var mobile1 = d3.select('#mobile1');

var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var iconDOM = ['.weather-icon-now', '.weather-icon-hrBefore2', '.weather-icon-hrBefore', '.weather-icon-hrAfter', '.weather-icon-hrAfter2'];
var tempDOM = ['.temp-now', '.temp-1', '.temp-plus1', '.temp-plus2', '.temp-plus3'];

//fetch the data
var data = $.ajax({
    url: 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.373616,-71.109733',
    dataType: 'JSONP',
    type: 'GET',
    crossDomain: true,
    complete: function (data) {
        if (data.readyState == '4' && data.status == '200') {
            console.log(data.responseJSON);
            draw(data.responseJSON);
            draw_mobile2(data.responseJSON);
        } else {
            console.log("DATA FETCH FAILED");
            d3.json("./data/boston_weather.json", draw);
            d3.json("./data/boston_weather.json", draw_mobile2);
        }
    }
});

d3.selectAll('.todayDate').text(dayFormat(new Date()));

function draw(data) {
    var fahrenheit = true;
    var nowTime = new Date(data.currently.time * 1000);
    var todayTemp = data.currently.temperature;
    mobile1.select('.todayTemp').text(Math.round(todayTemp));

    mobile1.select('.c').on("click", function () {
        if (mobile1.select('.c').text() === '/C') {
            mobile1.select('.f').text('°C');
            mobile1.select('.c').text('/F');
            mobile1.select('.todayTemp')
                .text(Math.round(fahrToCelc(todayTemp)));

            fahrenheit = false;
            addTemperature('mobile1', '.temp-now', data.currently, fahrenheit);

            for (i = 1; i < tempDOM.length; i++) {
                addTemperature('mobile1', tempDOM[i], data.hourly.data[i - 1], fahrenheit);
            }
        } else {
            mobile1.select('.f').text('°F');
            mobile1.select('.c').text('/C');
            mobile1.select('.todayTemp')
                .text(Math.round(todayTemp));
            fahrenheit = true;
            addTemperature('mobile1', '.temp-now', data.currently, fahrenheit);
            for (i = 1; i < tempDOM.length; i++) {
                addTemperature('mobile1', tempDOM[i], data.hourly.data[i - 1], fahrenheit);
            }
        }
    });

    mobile1.select('.time-2').text(nowTime.getHours() + ':00');
    mobile1.select('.time-1').text(nowTime.getHours() + 1 + ':00');
    mobile1.select('.timePlus1').text(nowTime.getHours() + 2 + ':00');
    mobile1.select('.timePlus2').text(nowTime.getHours() + 3 + ':00');

    addWeatherIcon('mobile1', '.weather-icon-now', data.currently);
    for (i = 1; i < iconDOM.length; i++) {
        addWeatherIcon('mobile1', iconDOM[i], data.hourly.data[i - 1]);
    }

    addTemperature('mobile1', '.temp-now', data.currently, fahrenheit);
    for (i = 1; i < tempDOM.length; i++) {
        addTemperature('mobile1', tempDOM[i], data.hourly.data[i - 1], fahrenheit);
    }

    setBackground(data.currently.icon);

    // set background to default
    d3.select('#default').on("click", function () {
        setBackground(data.currently.icon);
    });
}

function backgroundReset() {
    mobile1.selectAll('.drop').remove();
    mobile1.selectAll('.snow').remove();
    mobile1.select('.background').classed("fog", false);
    mobile1.select('.dome').classed("svgFog", false);
    mobile1.select('.charles').classed("svgFog", false);
    mobile1.select('.dome').style('opacity', 1);
    mobile1.select('.sun').style('opacity', 1);
}

function setBackground(icon) {
    backgroundReset();

    if (icon == 'cloudy' || icon == 'snow' || icon == 'rain' || icon == "fog") {
        mobile1.select('.background').style('background', "url('./mobile1/foggy.png'), #000000").style('background-blend-mode', "hard-light");

        mobile1.select('.dome').style('opacity', 0.88);
        mobile1.select('.sun').style('opacity', 0);

        mobile1.select('.charles').select('.background')
            .style('background', 'linear-gradient(rgba(14, 30, 75, 0.88), rgba(138, 156, 212, 0.88))')
            .style('mix-blend-mode', 'multiply');

        if (icon == "rain") {
            // Implemented from css rain created by raichu26. https://codepen.io/alemesre/pen/hAxGg
            var nbDrop = 400; // number of drops created.

            // function to generate drops
            function createRain() {
                for (i = 1; i < nbDrop; i++) {
                    var dropLeft = randRange(0, 400);
                    var dropTop = randRange(-1800, 1800);
                    mobile1.append('div')
                        .attr('class', "drop")
                        .attr('id', "drop" + i);
                    mobile1.select('#drop' + i)
                        .style('left', dropLeft + 'px')
                        .style('top', dropTop + 'px');
                }
            }
            createRain(); // Make it rain

        } else if (icon == 'snow') {
            // Implemented from css rain created by raichu26. https://codepen.io/alemesre/pen/hAxGg
            var nbDrop = 500; // number of drops created.

            // function to generate drops
            function createSnow() {
                for (i = 1; i < nbDrop; i++) {
                    var dropLeft = randRange(0, 400);
                    var dropTop = randRange(-1800, 1800);
                    mobile1.append('div')
                        .attr('class', "snow")
                        .attr('id', "snow" + i);
                    mobile1.select('#snow' + i)
                        .style('left', dropLeft + 'px')
                        .style('top', dropTop + 'px');;
                }
            }
            createSnow();

        } else if (icon == "fog") {
            mobile1.select('.background').classed("fog", true);
            mobile1.select('.dome').classed("svgFog", true);
//            mobile1.select('.charles').classed("svgFog", true);
        }

    } else if (icon.includes('partly-cloudy')) {
        mobile1.select('.background').style('background', "url('./mobile1/clouds.png'), linear-gradient(to bottom, #4D2BFF, #56CEFF)");
    } else {
        mobile1.select('.background').style('background', "linear-gradient(to bottom, #4D2BFF, #56CEFF)");
    }
}

function addWeatherIcon(canvas, dom, node) {
    if (node.icon === "snow") {
        d3.select('#' + canvas).select(dom).append("img")
            .attr("src", canvas + "/snow.svg")
            .attr("width", 21)
            .attr("height", 21);
    } else if (node.icon === "cloudy") {
        d3.select('#' + canvas).select(dom).append("img")
            .attr("src", canvas + "/cloudy.svg")
            .attr("width", 34)
            .attr("height", 21);
    } else if (node.icon.includes('partly-cloudy')) {
        d3.select('#' + canvas).select(dom).append("img")
            .attr("src", canvas + "/partlycloudy.svg")
            .attr("width", 34)
            .attr("height", 21);
    } else if (node.icon === "rain") {
        d3.select('#' + canvas).select(dom).append("img")
            .attr("src", canvas + "/rain.svg")
            .attr("width", 25);
    } else if (node.icon == "fog") {
        d3.select('#' + canvas).select(dom).append("img")
            .attr("src", canvas + "/fog.svg")
            .attr("height", 21);
    } else {
        d3.select('#' + canvas).select(dom).append("img")
            .attr("src", canvas + "/sunny.svg")
            .attr("width", 21);
    }
}

function addTemperature(canvas, dom, node, fahrenheit) {
    if (fahrenheit) {
        d3.select('#' + canvas).select(dom).text(Math.round(node.temperature) + '°F');
    } else {
        d3.select('#' + canvas).select(dom).text(Math.round(fahrToCelc(node.temperature)) + '°C');
    }
}

function dayFormat(day) {
    var s = weekday[day.getDay()] + ', ' + monthNames[day.getMonth()] + ' ' + day.getDate();
    return s;
}

function fahrToCelc(fahrenheit) {
    return (fahrenheit - 32) * 0.5556;
}

// helper function to generate a random number range.
function randRange(minNum, maxNum) {
    return (Math.round(Math.random() * (maxNum - minNum + 1)) + minNum);
}
