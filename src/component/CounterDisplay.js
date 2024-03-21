import React from "react";
import "../styles/ResizableLayout.css";

const CounterDisplay = ({ updateCount, addCount }) => {
  return (
    <div className="counter-display">
      <div className="counter-item">
        <span className="label">Update Count:</span> {updateCount}
      </div>
      <div className="counter-item">
        <span className="label">Add Count:</span> {addCount}
      </div>
    </div>
  );
};

export default CounterDisplay;
