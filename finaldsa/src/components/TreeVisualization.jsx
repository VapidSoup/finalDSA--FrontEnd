import React from "react";

// Function to format the JSON string into a pretty-printed JSON format
const formatJsonString = (jsonString) => {
  try {
    const json = JSON.parse(jsonString); // Parse the JSON string
    return JSON.stringify(json, null, 2); // Pretty-print with 2 spaces indentation
  } catch (e) {
    console.error("Invalid JSON string:", e);
    return "Invalid JSON data"; // Handle invalid JSON
  }
};

const TreeVisualization = ({ tree }) => {
  return (
    <div className="tree-visualization">
      <h2>Tree Visualization</h2>
      <pre>{formatJsonString(tree.treeStructure)}</pre>{" "}
      {/* Display JSON in a readable format */}
    </div>
  );
};

export default TreeVisualization;
