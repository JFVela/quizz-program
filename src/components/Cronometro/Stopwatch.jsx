import React, { useEffect, useState } from "react";
import "./Stopwatch.css";
import StopwatchDisplay from "./StopwatchDisplay";

const Stopwatch = ({ running, onStop }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setValue((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
      onStop(value);
    }

    return () => clearInterval(interval);
  }, [running, onStop]);

  return <StopwatchDisplay value={value} />;
};

export default Stopwatch;
