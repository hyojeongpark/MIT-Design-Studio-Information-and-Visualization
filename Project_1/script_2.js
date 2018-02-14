var canvas2 = d3.select('#plot2').append('canvas').node();

//canvas2.width = document.getElementById('plot2').clientWidth;
//canvas2.height = document.getElementById('plot2').clientHeight;
//
//var ctx2 = canvas2.getContext('2d');
//
//function myCircle() {
//    var centerX = canvas2.width / 2;
//    var centerY = canvas2.height / 2;
//
//    ctx2.translate(centerX, centerY);
//    var radius = 0.35 * (canvas2.width);
//
//    ctx2.strokeStyle = "#0079e0";
//    ctx2.strokeWidth = 2;
//
//    ctx2.beginPath();
//    ctx2.arc(0, 0, radius, 0, 2 * Math.PI);
//    ctx2.closePath();
//
//    ctx2.stroke();
//}
//
//myCircle();
var str = "";

function smaller20(num) {
    if (num == 0) {
        return "";
    } else if (num == 1) {
        return "one";
    } else if (num == 2) {
        return "two";
    } else if (num == 3) {
        return "three";
    } else if (num == 4) {
        return "four";
    } else if (num == 5) {
        return "five";
    } else if (num == 6) {
        return "six";
    } else if (num == 7) {
        return "seven";
    } else if (num == 8) {
        return "eight";
    } else if (num == 9) {
        return "nine";
    } else if (num == 10) {
        return "ten";
    } else if (num == 11) {
        return "eleven";
    } else if (num == 12) {
        return "twelve";
    } else if (num == 13) {
        return "thirteen";
    } else if (num == 14) {
        return "fourteen";
    } else if (num == 15) {
        return "fifteen";
    } else if (num == 16) {
        return "sixteen";
    } else if (num == 17) {
        return "seventeen";
    } else if (num == 18) {
        return "eighteen";
    } else if (num == 19) {
        return "nineteen";
    }
}

function toHumanLang(num) {
    if (num == 0) {
        str = str + "";
        return str;
    } else if (num == 1) {
        str = str + "one";
        return str;
    } else if (num == 2) {
        str = str + "two";
        return str;
    } else if (num == 3) {
        str = str + "three";
        return str;
    } else if (num == 4) {
        str = str + "four";
        return str;
    } else if (num == 5) {
        str = str + "five";
        return str;
    } else if (num == 6) {
        str = str + "six";
        return str;
    } else if (num == 7) {
        str = str + "seven";
        return str;
    } else if (num == 8) {
        str = str + "eight";
        return str;
    } else if (num == 9) {
        str = str + "nine";
        return str;
    } else if (num == 10) {
        str = str + "ten";
        return str;
    } else if (num >= 20 && num < 30) {
        str = "twenty";
        toHumanLang(num % 10);
    } else if (num >= 30 && num < 40) {
        str = "thirty";
        toHumanLang(num % 10);
    } else if (num >= 40 && num < 50) {
        str = "forty";
        toHumanLang(num % 10);
    } else if (num >= 50 && num < 60) {
        str = "fifty";
        toHumanLang(num % 10);
    } else {
        str = "sixty";
    }
    return str;
}

function clock2() {
    var today = new Date();

    //Select #date and write the current date

    var currentDate = new Date();

    // select #time and write the current time
    var hour = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

//    console.log(seconds);

    if (seconds < 20) {
        if (minutes < 20) {
            var currentHour = "" + toHumanLang(hour) + "<br>" + smaller20(minutes) + "<br>" + smaller20(seconds);
        } else {
            var currentHour = "" + toHumanLang(hour) + "<br>" + toHumanLang(minutes) + "<br>" + smaller20(seconds);
        }

    } else {
        if (minutes < 20) {
            var currentHour = "" + toHumanLang(hour) + "<br>" + smaller20(minutes) + "<br>" + toHumanLang(seconds);

        } else {
            var currentHour = "" + toHumanLang(hour) + "<br>" + toHumanLang(minutes) + "<br>" + toHumanLang(seconds);
        }
    }

    if (toHumanLang(seconds))
        document.getElementById("plot2").innerHTML = "It's <br>" + currentHour;

    str = "";
    return str;
}

setInterval(clock2, 1000);
