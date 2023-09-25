import React from "react";

export default function Counter(props) {
  const darkName = props.darkName;
  const [counterState, setCounterState] = React.useState(0);

  function incrementCounter() {
    setCounterState((prev) => prev + 1);
  }

  function decreaseCounter() {
    setCounterState((prev) => prev - 1);
  }

  function resetCounter(){
    setCounterState(0)
  }

  return (
    <div className={"counter-container" + darkName}>
      <h1>Counter</h1>
      <div className={"counter-buttons" + darkName}>
        <button onClick={decreaseCounter} className={"down-btn"+darkName}>
          -
        </button>
        <div className={"counter-display" + darkName}>{counterState}</div>
        <button onClick={incrementCounter} className={"up-btn" + darkName}>
          +
        </button>
      </div>
      <button onClick={resetCounter}>Reset</button>
      <button onClick={props.handleCounterClick}>Exit</button>
    </div>
  );
}
