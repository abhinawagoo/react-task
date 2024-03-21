import React, { useState } from "react";
import "../styles/ResizableLayout.css";

const TaskList = ({ taskList }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (index) => {
    setSelectedTask(index);
  };

  return (
    <div className="task-list-container">
      <div className="task-list">
        {taskList.map((task, index) => (
          <div
            key={task.id}
            className={`task-item ${index === selectedTask ? "active" : ""}`}
            onClick={() => handleTaskClick(index)}
          >
            {index + 1}: {task.data}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
