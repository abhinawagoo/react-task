import React from "react";

import "../styles/ResizableLayout.css";

const InputAndButtons = ({
  inputValue,
  setInputValue,
  handleAddTask,
  handleUpdateCount,
}) => {
  return (
    <div className="input-container">
      <input
        className="custom-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your task..."
      />
      <div className="button-container">
        <button className="custom-button" onClick={handleAddTask}>
          Add
        </button>
        <button className="custom-button" onClick={handleUpdateCount}>
          Update
        </button>
      </div>
    </div>
  );
};

export default InputAndButtons;
