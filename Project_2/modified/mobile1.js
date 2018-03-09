var data = $.ajax({
    url: 'https://api.darksky.net/forecast/bb320076025b465b4a5b2d7b924808fd/37.8267,-122.4233',
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
})

var mobile1 = d3.select('#mobile1');

var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var iconDOM = ['.weather-icon-now', '.weather-icon-hrBefore2', '.weather-icon-hrBefore', '.weather-icon-hrAfter', '.weather-icon-hrAfter2'];
var tempDOM = ['.temp-now', '.temp-1', '.temp-plus1', '.temp-plus2', '.temp-plus3'];

d3.selectAll('.todayDate').text(dayFormat(new Date()));

function draw(data) {
    var fahrenheit = true;
    var nowTime = new Date(data.currently.time * 1000);
    var todayTemp = data.currently.temperature;
    mobile1.select('.todayTemp').text(Math.floor(todayTemp));

    mobile1.select('.c').on("click", function () {
        if (mobile1.select('.c').text() === '/C') {
            mobile1.select('.f').text('°C');
            mobile1.select('.c').text('/F');
            mobile1.select('.todayTemp').text(Math.floor(fahrToCelc(todayTemp)));
            fahrenheit = false;
            addTemperature('mobile1', '.temp-now', data.currently, fahrenheit);
            for (i = 1; i < tempDOM.length; i++) {
                addTemperature('mobile1', tempDOM[i], data.hourly.data[i - 1], fahrenheit);
            }
        } else {
            mobile1.select('.f').text('°F');
            mobile1.select('.c').text('/C');
            mobile1.select('.todayTemp').text(Math.floor(todayTemp));
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

    //background variations

    d3.select('#sunny').on("click", function () {
        d3.select(dom).selectAll('#drop').remove();
        d3.select(dom).selectAll('#snow').remove();
        setBackground('sunny');
    })
    d3.select('#partly-cloudy').on("click", function () {
        d3.select(dom).selectAll('#drop').remove();
        d3.select(dom).selectAll('#snow').remove();
        setBackground('partly-cloudy');
    })
    d3.select('#cloudy').on("click", function () {
        d3.select(dom).selectAll('#drop').remove();
        d3.select(dom).selectAll('#snow').remove();
        setBackground('cloudy');
    })
    d3.select('#rainy').on("click", function () {
        d3.select(dom).selectAll('#drop').remove();
        d3.select(dom).selectAll('#snow').remove();
        setBackground('rain');
    })
    d3.select('#snowy').on("click", function () {
        d3.select(dom).selectAll('#drop').remove();
        d3.select(dom).selectAll('#snow').remove();
        setBackground('snow');
    })

    d3.select('#foggy').on("click", function () {
        d3.select(dom).selectAll('#drop').remove();
        d3.select(dom).selectAll('#snow').remove();
        setBackground('fog');
    })

    d3.select('#default').on("click", function () {
        d3.select(dom).selectAll('#drop').remove();
        d3.select(dom).selectAll('#snow').remove();
        setBackground(data.currently.icon);
    })
}

function setBackground(icon) {
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
            mobile1.select('.background')
                .style('-webkit-backdrop-filter', 'blur(10px)')
                .style('-moz-filter', 'blur(10px)')
                .style('-o-filter', 'blur(10px)')
                .style('-ms-filter', 'blur(10px)')
                .style('filter', 'blur(10px)');
            mobile1.select('.dome')
                .style('-webkit-backdrop-filter', 'blur(2px)')
                .style('-moz-filter', 'blur(2px)')
                .style('-o-filter', 'blur(2px)')
                .style('-ms-filter', 'blur(2px)')
                .style('filter', 'blur(2px)');
            mobile1.select('.charles').select('.background')
                .style('-webkit-backdrop-filter', 'blur(2px)')
                .style('-moz-filter', 'blur(2px)')
                .style('-o-filter', 'blur(2px)')
                .style('-ms-filter', 'blur(2px)')
                .style('filter', 'blur(2px)');
        }

    } else if (icon.includes('partly-cloudy')) {
        mobile1.select('.background').style('background', "url('./mobile1/clouds.png'), linear-gradient(to bottom, #4D2BFF, #56CEFF)");
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
        d3.select('#' + canvas).select(dom).text(Math.floor(node.temperature) + '°F');
    } else {
        d3.select('#' + canvas).select(dom).text(Math.floor(fahrToCelc(node.temperature)) + '°C');
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
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}
