import React from "react";

const InputAndButtons = ({
  inputValue,
  setInputValue,
  handleAddTask,
  handleUpdateCount,
}) => {
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>
      <button onClick={handleUpdateCount}>Update </button>
    </div>
  );
};

export default InputAndButtons;
