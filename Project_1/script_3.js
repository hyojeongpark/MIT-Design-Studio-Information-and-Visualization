var canvas1 = d3.select('#plot3').append('canvas').node();


function rgbDOM(currentDate) {
    var hour = currentDate.getHours();
    var minute = currentDate.getMinutes();
    var second = currentDate.getSeconds();
    return '(' + Math.floor(255 / 24 * hour) + ', ' + Math.floor(255 / 60 * minute) + ', ' + Math.floor(255 / 60 * second) + ')';
}

function circle() {
    return '<div id="circle"></div>'
}

function circleColor(currentDate) {
    d3.select('#circle').style('background-color', 'rgb' + rgbDOM(currentDate));
}

function clock3() {
    var currentDate = new Date();

    document.getElementById("plot3").innerHTML = '<div>' + '<span>' + rgbDOM(currentDate) + '</span>' + circle() + '</div>';

    circleColor(currentDate);
}

setInterval(clock3, 1000);
