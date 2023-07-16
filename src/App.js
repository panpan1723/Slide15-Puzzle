import "./styles.css";
import Board from "./component/Board";
import React from "react";

export default function App() {
  const [isQuickTest, setQuickTest] = React.useState(false);

  const numberArray = [];
  for (let i = 0; i < 16; i++) {
    numberArray.push(i);
  }

  const randomArray = numberArray.sort(() => Math.random() - 0.5);
  const quickTestArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Slide15 Puzzle</h1>
        <button
          className="quick-test"
          onClick={() => setQuickTest(!isQuickTest)}
        >
          {isQuickTest ? "Back To Game" : "Switch to Quick Test Mode"}
        </button>
      </header>
      <Board
        initialConfiguration={isQuickTest ? quickTestArray : randomArray}
        onSolveCallback={() => {
          console.log("CONGRATULATIONS! You solved the puzzle!");
        }}
      />
    </div>
  );
}
