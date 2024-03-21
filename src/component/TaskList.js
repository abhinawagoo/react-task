import React, { useState } from "react";
import "../styles/ResizableLayout.css";

const TaskList = ({ taskList, setSelectedTask, selectedTask }) => {
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="task-list-container">
      <div className="task-list">
        {taskList.map((task, index) => (
          <div
            key={task._id}
            className={`task-item ${
              task._id === selectedTask?._id ? "active" : ""
            }`}
            onClick={() => handleTaskClick(task)}
          >
            {index + 1}: {task.data}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
