var canvas1 = d3.select('#plot3').append('canvas').node();


function rgbDOM(currentDate) {
    var hour = currentDate.getHours();
    var minute = currentDate.getMinutes();
    var second = currentDate.getSeconds();
    return '(' + hour + ', ' + minute + ', ' + second + ')';
}

function circle() {
    return '<div id="circle"></div>'
}

function circleColor(currentDate) {
    document.getElementById("circle").style.backgroundColor = 'rgb' + rgbDOM(currentDate);
}

function clock3() {
    var currentDate = new Date();

    document.getElementById("plot3").innerHTML = '<div>' + '<span>' + rgbDOM(currentDate) + '</span>' + circle() + '</div>';

    circleColor(currentDate);
}

setInterval(clock3, 1000);
