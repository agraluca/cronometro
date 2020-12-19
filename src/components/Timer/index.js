import { useEffect, useState } from "react";

import "./styles.css";

function Timer() {
  const [startStop, setStartStop] = useState(false);

  const [time, setTime] = useState({
    sec: "00",
    min: "00",
    hour: "00",
    counter: 0,
  });

  const [partials, setPartials] = useState([]);

  useEffect(() => {
    let interval;
    if (startStop) {
      interval = setInterval(() => {
        const secondCounter = time.counter % 60;

        const minuteCounter = Math.floor(time.counter / 60);
        const hourCounter = Math.floor(time.counter / 3600);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        const computedHour =
          String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;

        setTime((prevState) => ({
          sec: computedSecond,
          min: computedMinute,
          hour: computedHour,
          counter: prevState.counter + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startStop, time.counter]);

  return (
    <main>
      <h1>{`${time.hour}:${time.min}:${time.sec}`}</h1>
      <div id="buttons">
        <button onClick={() => setStartStop(!startStop)}>
          {startStop ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setStartStop(false);
            setTime({ sec: "00", min: "00", hour: "00", counter: 0 });
            setPartials([]);
          }}
        >
          Zerar
        </button>
        <button
          onClick={() => {
            if (startStop) {
              setPartials([
                ...partials,
                `${time.hour}:${time.min}:${time.sec}`,
              ]);
            }
          }}
        >
          Parcial
        </button>
      </div>
      <div id="partial">
        <ol>
          {partials.map((partial, index) => {
            return <li key={index}>{partial}</li>;
          })}
        </ol>
      </div>
    </main>
  );
}

export default Timer;
