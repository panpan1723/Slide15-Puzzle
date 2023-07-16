import React from "react";
import Tile from "./Tile";

export default function Board({ initialConfiguration, onSolveCallback }) {
  const [configuration, setConfiguration] = React.useState(
    initialConfiguration
  );
  const [success, setSuccess] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);

  function canMove(tileNumber) {
    const currentIndex = configuration.indexOf(tileNumber);
    const emptyIndex = configuration.indexOf(0);
    const rowDifference = Math.abs(
      Math.floor(currentIndex / 4) - Math.floor(emptyIndex / 4)
    );
    const colDifference = Math.abs((currentIndex % 4) - (emptyIndex % 4));
    if (
      (rowDifference === 1 && colDifference === 0) ||
      (rowDifference === 0 && colDifference === 1)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handleClick(tileNumber) {
    console.log("Click " + tileNumber);
    if (!canMove(tileNumber)) {
      console.log("Can not move");
      return;
    }
    console.log("Can move");
    const currentIndex = configuration.indexOf(tileNumber);
    const emptyIndex = configuration.indexOf(0);
    const newConfiguration = [...configuration];
    newConfiguration[emptyIndex] = newConfiguration[currentIndex];
    newConfiguration[currentIndex] = 0;
    setConfiguration(newConfiguration);
  }

  function isSuccess(configuration) {
    for (let i = 0; i < 15; i++) {
      if (configuration[i] !== i + 1) {
        return false;
      }
    }
    return true;
  }

  React.useEffect(() => {
    if (isSuccess(configuration)) {
      setSuccess(true);
      onSolveCallback();
    }
  }, [configuration, onSolveCallback]);

  const resetGame = React.useCallback(() => {
    setSuccess(false);
    setConfiguration(initialConfiguration);
    setShowPopup(false);
  }, [initialConfiguration]);

  React.useEffect(() => {
    if (success) {
      setShowPopup(true);
    } else {
      resetGame();
    }
  }, [success, initialConfiguration, resetGame]);

  return (
    <div className="board">
      {configuration.map((number) => (
        <Tile
          key={number}
          number={number}
          handleClick={() => {
            handleClick(number);
          }}
        />
      ))}

      {showPopup && (
        <div className="popup">
          <h2>CONGRATULATIONS!</h2>
          <p>You solved the puzzle!</p>
          <button onClick={resetGame}>OK</button>
        </div>
      )}
    </div>
  );
}
