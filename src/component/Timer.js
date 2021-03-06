import { useState, useEffect } from "react";

import { ReactComponent as SettingsSvg } from "../assets/gear.svg";
import classes from "./Timer.module.css";
import "../index.css";

const Timer = () => {
  const [started, setStarted] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const toggleHandler = () => {
    setStarted(() => !started);
  };

  useEffect(() => {
    let interval = null;
    if (started) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        if (seconds === 59) {
          setSeconds(0);
          setMinutes((minutes) => minutes + 1);
        }
      }, 1000);
    } else if (!started && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [started, seconds]);

  const resetHandler = () => {
    setSeconds(0);
    setMinutes(0);
    setStarted(false);
  };

  return (
    <div
      className={`${classes.outerBox} ${
        !started ? classes.started : classes.stopped
      }`}
    >
      <div className={classes.innerBox}>
        <div className={classes.actions}>
          <div>
            <p className={`${classes.time} ${classes.minutes}`}>
              {minutes.toString().padStart(2, 0)}
            </p>
            <span className={classes.separator}> :</span>
            <p className={`${classes.time} ${classes.seconds}`}>
              {seconds.toString().padStart(2, 0)}
            </p>
          </div>
          <button className={classes.button} onClick={toggleHandler}>
            {started ? "stop" : "start"}
          </button>
          <button className={classes.settings} onClick={resetHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={classes.resetIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
