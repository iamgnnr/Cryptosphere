import { useEffect, useRef } from 'react';
import * as d3 from 'd3';


function responsivefy(svg) {
  // container will be the DOM element
  // that the svg is appended to
  // we then measure the container
  // and find its aspect ratio
  const container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style('width'), 10),
    height = parseInt(svg.style('height'), 10),
    aspect = width / height;

  // set viewBox attribute to the initial size
  // control scaling with preserveAspectRatio
  // resize svg on inital page load
  svg.attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMinYMid')
    .call(resize);

  // add a listener so the chart will be resized
  // when the window resizes
  // multiple listeners for the same event type
  // requires a namespace, i.e., 'click.foo'
  // api docs: https://goo.gl/F3ZCFr
  d3.select(window).on(
    'resize.' + container.attr('id'),
    resize
  );

  // this is the code that resizes the chart
  // it will be called on load
  // and in response to window resizes
  // gets the width of the container
  // and resizes the svg to fill it
  // while maintaining a consistent aspect ratio
  function resize() {
    const w = parseInt(container.style('width'));
    svg.attr('width', w);
    svg.attr('height', Math.round(w / aspect));
  }
}


const Graph = ({ data }) => {
  const graphRef = useRef();

  useEffect(() => {
    // Define the dimensions of the graph
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    // Create an SVG container
    const svg = d3
      .select(graphRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .call(responsivefy) // tada!
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .style("stroke", "#ffffff");

    // Parse timestamps and prices
    const parsedData = data.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp),
      price: price,
    }));

    // Adjust x-axis scale for the entire data range
    const xScale = d3.scaleTime().domain(d3.extent(parsedData, (d) => d.date)).range([0, width]);

    // Adjust y-axis scale for the entire data range with a nice scale
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(parsedData, (d) => d.price), d3.max(parsedData, (d) => d.price)])
      .nice()
      .range([height, 0]);

    // Create x and y axes
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));



  svg
    .append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale).ticks(5)); // Adjust the number of ticks for y-axis

  // Create a line generator
  const line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.price));

  // Draw the line chart
  svg
    .append('path')
    .datum(parsedData)
    .attr('class', 'line')
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2);
}, [data]);

return <div ref={graphRef}></div>;
};

export default Graph;
