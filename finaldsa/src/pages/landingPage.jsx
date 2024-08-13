import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import TreeVisualization from "../components/TreeVisualization";
import "../css/landingPage.css";

const LandingPage = () => {
  const [numbers, setNumbers] = useState("");
  const [previousTrees, setPreviousTrees] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTree, setSelectedTree] = useState(null);

  const createTree = async () => {
    try {
      const numberArray = numbers
        .split(",")
        .map((num) => parseInt(num.trim(), 10));
      await axiosInstance.post("/trees/create", numberArray);
      setNumbers("");
      fetchPreviousTrees();
    } catch (err) {
      setError("Error creating tree");
      console.error(
        "Error creating tree:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const fetchPreviousTrees = async () => {
    try {
      const response = await axiosInstance.get("/trees/previous");
      setPreviousTrees(response.data);
    } catch (err) {
      setError("Error fetching previous trees");
      console.error(
        "Error fetching previous trees:",
        err.response ? err.response.data : err.message
      );
    }
  };

  useEffect(() => {
    fetchPreviousTrees();
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Tree Making Bonanza</h1>
      </div>
      <div>
        <div className="create-a-tree">
          <h2>Create a Tree</h2>
        </div>
        <div className="inputBox">
          <input
            className="input1"
            type="text"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="Enter numbers separated by commas"
          />
          <button onClick={createTree}>Create Tree</button>
        </div>
        {error && <p>{error}</p>}
      </div>

      <div>
        <h2>Previous Trees</h2>
        {previousTrees.length === 0 ? (
          <p>No trees available</p>
        ) : (
          <ul>
            {previousTrees.map((tree, index) => (
              <li key={index}>
                <button onClick={() => setSelectedTree(tree)}>
                  View Tree {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedTree && <TreeVisualization tree={selectedTree} />}
    </div>
  );
};

export default LandingPage;
