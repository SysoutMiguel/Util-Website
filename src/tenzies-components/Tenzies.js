import React, { useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  // const [darkMode, setDarkMode] = React.useState();
  const [dice, setDice] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [timer, setTimer] = React.useState(0);

  const [bestTime, setBestTime] = React.useState(() => {
    const storedBestTime = JSON.parse(localStorage.getItem("bestTime"));
    return storedBestTime || 0;
  });

  useEffect(() => {
    localStorage.setItem("bestTime", JSON.stringify(bestTime));
    console.log(timer);
  }, [tenzies]);

  useEffect(() => {
    let interval;
    if (!tenzies) {
      interval = setInterval(() => {
        setTimer((prevSecond) => prevSecond + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [tenzies]);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstVal = dice[0].value;
    const allSame = dice.every((die) => die.value === firstVal);

    if (allHeld && allSame) {
      setTenzies(true);
      console.log("you win");
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(generateNewDie());
    }
    return newArr;
  }

  function rollDice() {
    if (!tenzies) {
      setRollCount((prevRoll) => prevRoll + 1);
      const updatedDice = dice.map((die) => {
        return die.isHeld ? { ...die } : generateNewDie();
      });
      setDice(updatedDice);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(0);
      setTimer(0);
      if (bestTime === 0) {
        setBestTime(timer);
      } else if (timer < bestTime) {
        setBestTime(timer);
      } else {
      }
    }
  }

  function handleClick(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      handleClick={() => handleClick(die.id)}
    />
  ));

  return (
    <main className="tenzies-container">
      <div className="record-container">
        <h1>Best Time</h1>
        <h1>{bestTime}</h1>
        <h2>Timer: </h2>
        <p>{timer}</p>
      </div>
      <div className="main-container">
        {tenzies && <Confetti />}
        <h1 className="game-title">Tenzies</h1>
        <p className="game-instructions">
          Roll untill all the dice are the same. Click each die to freeze at its
          current value between rolls.
        </p>

        <div className="die-container">{diceElements}</div>
        <div className="button-container">
          <button onClick={rollDice} className="roll-btn">
            {tenzies ? `New Game` : "Roll"}
          </button>
          <h1>Roll Count: {rollCount}</h1>
        </div>
      </div>
    </main>
  );
}
