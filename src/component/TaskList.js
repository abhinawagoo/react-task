import React from "react";

const TaskList = ({ taskList }) => {
  return (
    <div>
      {taskList.map((task, index) => (
        <div key={index}>
          {" "}
          {index + 1}:{task}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
