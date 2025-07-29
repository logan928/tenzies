import { useRef, useState, useEffect } from "react";
import "./App.css";
import Die from "./assets/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateNewDieSet());
  const buttoRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttoRef.current.focus();
    }
  });

  function generateNewDieSet() {
    console.log("called");
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  function hold(id) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        //explicit return. for learning purpose. implicit returns work fine as well.
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const dieElement = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      id={dieObj.id}
      hold={hold}
    />
  ));

  function rollDice() {
    {
      gameWon
        ? setDice(generateNewDieSet())
        : setDice((oldDice) =>
            oldDice.map((die) =>
              die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
            )
          );
    }
  }

  return (
    <>
      <main>
        {gameWon && <ReactConfetti />}
        <div className="dice-container">{dieElement}</div>
        <button ref={buttoRef} className="roll-dice" onClick={rollDice}>
          {!gameWon ? "Roll Dice" : "New Game"}
        </button>
      </main>
    </>
  );
}

export default App;
