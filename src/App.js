import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "./styles/ResizableLayout.css"; // You can define your CSS styles here
import TaskList from "./component/TaskList";
import InputAndButtons from "./component/InputAndButtons";
import CounterDisplay from "./component/CounterDisplay";

const App = () => {
  const [component1Width, setComponent1Width] = useState(200);
  const [component2Width, setComponent2Width] = useState(200);
  const [component3Height, setComponent3Height] = useState(300);
  const [taskList, setTaskList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [updateCount, setUpdateCount] = useState(0);
  const [addCount, setAddCount] = useState(0);

  useEffect(() => {
    // Fetch update count and add count from the database
    // Simulating data fetching with setTimeout for demonstration purposes
    const fetchCountsFromDatabase = async () => {
      try {
        // https://node-task-backend-rho.vercel.app/api/get-all-tasks
        // Example API endpoint to fetch counts
        const response = await fetch(
          "https://node-task-backend-rho.vercel.app/api/count"
        );
        const data = await response.json();
        console.log(data, response);
        setUpdateCount(data.updateCount);
        setAddCount(data.addCount);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCountsFromDatabase();
  }, []); // Empty dependency array to only run the effect once when the component mounts

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      // Make a POST request to the backend API
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
            // If the request was successful, update the task list and clear the input value
            setTaskList([...taskList, inputValue]);
            setInputValue("");
            // Here you would typically handle any response from the server
          } else {
            // If the request failed, handle the error
            throw new Error("Failed to add task");
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error("Error adding task:", error);
        });
    }
  };

  const handleUpdateCount = () => {
    setUpdateCount(updateCount + 1);
    // Here you would typically update the update count in the database as well
  };

  const onResizeComponent1 = (event, { size }) => {
    console.log(size, "size");
    setComponent1Width(size.width);
  };

  const onResizeComponent2 = (event, { size }) => {
    console.log(size, "size");

    setComponent2Width(size.width);
  };

  const onResizeComponent3 = (event, { size }) => {
    console.log(size, "size");

    setComponent3Height(size.height);
  };

  return (
    <div className="resizable-layout">
      <div className="row">
        <ResizableBox
          width={component1Width}
          height={component3Height}
          onResize={onResizeComponent1}
          className="component"
        >
          <TaskList taskList={taskList} />
        </ResizableBox>
        <ResizableBox
          width={component2Width}
          height={component3Height}
          onResize={onResizeComponent2}
          className="component"
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
        height={component3Height}
        onResize={onResizeComponent3}
        className="component"
      >
        <CounterDisplay updateCount={updateCount} addCount={addCount} />
      </ResizableBox>
    </div>
  );
};

export default App;
