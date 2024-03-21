import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "./styles/ResizableLayout.css"; // You can define your CSS styles here
import TaskList from "./component/TaskList";
import InputAndButtons from "./component/InputAndButtons";
import CounterDisplay from "./component/CounterDisplay";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [updateCount, setUpdateCount] = useState(0);
  const [addCount, setAddCount] = useState(0);

  useEffect(() => {
    // Fetch update count and add count from the database
    // Simulating data fetching with setTimeout for demonstration purposes
    const fetchCountsFromDatabase = async () => {
      try {
        const response = await fetch(
          "https://node-task-backend-rho.vercel.app/api/count"
        );
        const data = await response.json();
        setUpdateCount(data.updateCount);
        setAddCount(data.addCount);

        // Fetch all tasks
        const responseTasks = await fetch(
          "https://node-task-backend-rho.vercel.app/api/get-all-tasks"
        );
        const tasksData = await responseTasks.json();
        setTaskList(tasksData);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCountsFromDatabase();
  }, []); // Empty dependency array to only run the effect once when the component mounts

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      fetch("https://node-task-backend-rho.vercel.app/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: inputValue,
        }),
      })
        .then((response) => {
          if (response.ok) {
            setTaskList((prevTaskList) => [...prevTaskList, inputValue]);
            setInputValue("");
          } else {
            throw new Error("Failed to add task");
          }
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    }
  };

  const handleUpdateCount = () => {
    setUpdateCount(updateCount + 1);
  };

  const [component1Width, setComponent1Width] = useState(
    window.innerWidth * 0.5
  );
  const [component1Height, setComponent1Height] = useState(
    window.innerHeight * 0.5
  );
  const [component2Width, setComponent2Width] = useState(
    window.innerWidth * 0.5
  );
  const [component2Height, setComponent2Height] = useState(
    window.innerHeight * 0.5
  );
  const [component3Width, setComponent3Width] = useState(
    window.innerWidth * 0.99
  );
  const [component3Height, setComponent3Height] = useState(
    window.innerHeight * 0.5
  );

  const onResizeComponent1 = (event, { size }) => {
    const { width, height } = size;
    setComponent1Width(width);
    setComponent1Height(height);
  };

  const onResizeComponent2 = (event, { size }) => {
    const { width, height } = size;
    setComponent2Width(width);
    setComponent2Height(height);
  };

  const onResizeComponent3 = (event, { size }) => {
    const { width, height } = size;
    console.log(size);
    setComponent2Height(window.innerHeight - height);
    setComponent1Height(window.innerHeight - height);

    setComponent3Width(width);
    setComponent3Height(height);
  };

  return (
    <div className="resizable-layout">
      <div className="row">
        <ResizableBox
          width={component1Width}
          height={component1Height}
          onResize={onResizeComponent1}
          className="component"
          resizeHandles={["s", "w", "e", "n", "sw", "nw", "se", "ne"]} // Allow resizing from bottom, right, and bottom-right corner
        >
          <TaskList taskList={taskList} />
        </ResizableBox>
        <ResizableBox
          width={component2Width}
          height={component2Height}
          onResize={onResizeComponent2}
          className="component"
          resizeHandles={["s", "w", "e", "n", "sw", "nw", "se", "ne"]} // Allow resizing from bottom, right, and bottom-right corner
        >
          <InputAndButtons
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleAddTask={handleAddTask}
            handleUpdateCount={handleUpdateCount}
          />
        </ResizableBox>
      </div>
      <ResizableBox
        width={component3Width}
        height={component3Height}
        onResize={onResizeComponent3}
        className="component" // No inline width style to occupy full width initially
        resizeHandles={["s", "w", "e", "n", "sw", "nw", "se", "ne"]} // Allow resizing from all sides
      >
        <CounterDisplay updateCount={updateCount} addCount={addCount} />
      </ResizableBox>
    </div>
  );
};

export default App;
