import React from "react";

const CounterDisplay = ({ updateCount, addCount }) => {
  return (
    <div>
      <div>Update Count: {updateCount}</div>
      <div>Add Count: {addCount}</div>
    </div>
  );
};

export default CounterDisplay;
