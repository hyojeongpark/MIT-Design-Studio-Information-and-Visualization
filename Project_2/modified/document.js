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
