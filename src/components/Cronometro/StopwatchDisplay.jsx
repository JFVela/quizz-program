import React from "react";
import "./Stopwatch.css";

const StopwatchDisplay = ({ value }) => {
  const minuto = ("0" + Math.floor((value / 60_000) % 60)).slice(-2);
  const segundo = ("0" + Math.floor((value / 1_000) % 60)).slice(-2);

  return (
    <div className="time-display">
      <div>{minuto}</div>:<div>{segundo}</div>
    </div>
  );
};

export default StopwatchDisplay;
