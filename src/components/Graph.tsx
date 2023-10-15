import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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
