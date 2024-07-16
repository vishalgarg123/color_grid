/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import "./Colorgrid.css";

// Constants for grid size and total boxes
const GRID_SIZE = 3;
const TOTAL_BOXES = GRID_SIZE * GRID_SIZE;

export const Colorgrid = () => {
  // State to manage the color of each box in the grid
  const [grid, setGrid] = useState(Array(TOTAL_BOXES).fill(null));
  // State to keep track of the order in which boxes were clicked
  const [clickOrder, setClickOrder] = useState([]);

  // Handler for box click events
  const handleBoxClick = (index) => {
    // Check if the box has not been clicked before
    if (grid[index] !== "green" && grid[index] !== "orange") {
      const newGrid = [...grid];
      // Change the clicked box color to green
      newGrid[index] = "green";
      setGrid(newGrid);
      const newClickOrder = [...clickOrder, index];
      setClickOrder(newClickOrder);

      // If all boxes have been clicked, change all to orange in order
      if (newClickOrder.length === TOTAL_BOXES) {
        setTimeout(() => changeAllToOrange(newClickOrder), 100);
      }
    }
  };

  // Function to change all boxes to orange in the order they were clicked
  const changeAllToOrange = (order) => {
    order.forEach((idx, i) => {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[idx] = "orange";
          return newGrid;
        });
      }, i * 100); // Delay each color change to create a sequence effect
    });
  };

  return (
    <>
      <div className="grid">
        {grid.map((color, index) => (
          <div
            key={index}
            className="box"
            style={{ backgroundColor: color || "white" }}
            onClick={() => handleBoxClick(index)}
          />
        ))}
      </div>
    </>
  );
};
