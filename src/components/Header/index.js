import { useEffect, useState } from "react";
import dayjs from "dayjs";

import "./styles.css";

function Header() {
  const [date, setDate] = useState();
  useEffect(() => {
    const interval = setInterval(() => {
      const fullDate = dayjs().format("HH:mm:ss");
      setDate(fullDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <nav>
        <h1>Hora e Cronômetro</h1>
        <h2>{date}</h2>
      </nav>
    </header>
  );
}

export default Header;
