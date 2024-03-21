import React, { useEffect } from "react";

import "../styles/ResizableLayout.css";

const InputAndButtons = ({
  inputValue,
  setInputValue,
  handleAddTask,
  handleUpdateTask,
  selectedTask,
}) => {
  useEffect(() => {
    if (selectedTask) {
      setInputValue(selectedTask.data);
    } else {
      setInputValue(""); // Clear input field when no task is selected
    }
  }, [selectedTask, setInputValue]);
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
        <button className="custom-button" onClick={handleUpdateTask}>
          Update
        </button>
      </div>
    </div>
  );
};

export default InputAndButtons;
