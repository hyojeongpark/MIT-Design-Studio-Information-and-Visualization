var canvas1 = d3.select('#plot1').append('canvas').node();

var str = "";

function addHour(currentDate) {
    var hour = currentDate.getHours();
    if (hour > 12) {
        hour = hour - 12;
    }
    return hour;
}

function setFontSize(hour) {
    if (hour < 10) {
        document.getElementById("stroke").style.fontSize = '550px';
    }
}

function addFill(currentDate, hour) {
    fillShape = '<div id="fill"><span class="minute">' + minute(currentDate) + '</span></div>';
    return fillShape;
}

function setHeight(currentDate) {
    var minutes = currentDate.getMinutes();
    console.log(minutes);
    d3.select("#fill").style("top", (minutes / 60 * 100) + "%");
}

function minute(currentDate) {
    var minutes = currentDate.getMinutes();
    return minutes;
}

function clock1() {
    var currentDate = new Date();

    hour = addHour(currentDate);

    document.getElementById("plot1").innerHTML = '<div id="stroke">' + hour + '</div>' + addFill(currentDate, hour);

    setFontSize(hour);
    setHeight(currentDate);
}

setInterval(clock1, 1000);
