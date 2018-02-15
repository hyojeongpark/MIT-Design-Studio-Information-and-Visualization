var canvas1 = d3.select('#plot1').append('canvas').node();

var str = "";

function addHour(currentDate) {
    // select #time and write the current time
    var hour = currentDate.getHours();
    if (hour > 12) {
        hour = hour - 12;
    }
    return hour;
}

function addFill(currentDate, hour) {
    //    fillShape = '<div id="fill">' + hour + '</div>'
    fillShape = '<div id="fill"><span class="minute">' + minute(currentDate) + '</span></div>';
    return fillShape;
}

function setHeight(currentDate) {
    var minutes = currentDate.getMinutes();
console.log(minutes);
    var strokeHeight = document.getElementById('stroke').clientHeight;

    //    console.log(strokeHeight);

    //    var top = (minutes / 60 * strokeHeight);
    //
    document.getElementById("fill").style.height = (minutes/60*100) + '%';
    //
    //    document.getElementById("fill").style.bottom = top + "px";
    //    console.log(top);
}

function minute(currentDate) {
    var minutes = currentDate.getMinutes();
    return minutes;
}

function clock1() {
    var currentDate = new Date();

    hour = addHour(currentDate);

    document.getElementById("plot1").innerHTML = '<div id="stroke">' + hour + '</div>' + addFill(currentDate, hour);

    setHeight(currentDate);
}

clock1();
//setInterval(clock1, 1000);
