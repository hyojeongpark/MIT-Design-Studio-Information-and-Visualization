d3.select('#sketches').on("click", function () {
    d3.select('#sketches').attr('class', 'active');
    d3.select('.sketches').style('display', 'block');
    d3.select('#final').classed("active", false);
    d3.select('.final').style('display', 'none');
})

d3.select('#final').on("click", function () {
    d3.select('#final').attr('class', 'active');
    d3.select('.final').style('display', 'block');
    d3.select('#sketches').classed("active", false);
    d3.select('.sketches').style('display', 'none');
})

d3.select("#sunny").on("click", function () {
    setBackground("sunny");
});

d3.select("#partly-cloudy").on("click", function () {
    setBackground("partly-cloudy");
});
d3.select("#cloudy").on("click", function () {
    setBackground("cloudy");
});
d3.select("#rainy").on("click", function () {
    setBackground("rain");
});
d3.select("#snowy").on("click", function () {
    setBackground("snow");
});
d3.select("#foggy").on("click", function () {
    setBackground("fog");
});
