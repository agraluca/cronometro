import { useEffect, useState } from "react";

import "./styles.css";

function Timer() {
  const [startStop, setStartStop] = useState(false);
  const [totalTime, setTotalTime] = useState("00:00:00");
  const [time, setTime] = useState({
    sec: "00",
    min: "00",
    hour: "00",
  });
  function getTimer() {
    const timeArray = totalTime.split(":");
    const seconds = timeArray.length === 2 ? "00" : timeArray[2];
    const minutes = timeArray[1];
    const hour = timeArray[0];
    setTime({ sec: seconds, min: minutes, hour: hour });
  }

  useEffect(() => {
    let interval;
    if (startStop) {
      interval = setInterval(() => {
        let hour = time.hour;
        let minutes = time.min;
        let seconds = time.sec;

        if (seconds > 0) {
          seconds = seconds - 1;
        }
        if (seconds === "00" && minutes > 0) {
          minutes = minutes - 1;
          seconds = 59;
        }
        if (seconds === "00" && minutes === "00" && hour > 0) {
          hour = hour - 1;
          minutes = 59;
          seconds = 59;
        }
        if (hour === "00" && minutes === "00" && seconds === "00") {
          hour = 0;
          seconds = 0;
          minutes = 0;
          setStartStop(false);
        }

        const formatedSec =
          String(seconds).length === 1 ? `0${seconds}` : seconds;
        const formatedMin =
          String(minutes).length === 1 ? `0${minutes}` : minutes;
        const formatedHour = String(hour).length === 1 ? `0${hour}` : hour;

        setTime({
          sec: formatedSec,
          min: formatedMin,
          hour: formatedHour,
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startStop, time.sec, time.min, time.hour]);

  return (
    <main>
      <h1>{`${time.hour}:${time.min}:${time.sec}`}</h1>
      <div id="timerInverted">
        <input
          type="time"
          step="1"
          onChange={(e) => {
            setTotalTime(e.target.value);
          }}
        />
      </div>
      <div id="buttons">
        <button
          onClick={() => {
            getTimer();
            setStartStop(!startStop);
          }}
        >
          {startStop ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setStartStop(false);
            setTime({ sec: "00", min: "00", hour: "00", count: 0 });
          }}
        >
          Zerar
        </button>
      </div>
    </main>
  );
}

export default Timer;
