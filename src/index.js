import React from "react";
import ReactDOM from "react-dom";
import Board from "./component/Board";
import "./index.css";

const Game = () => {
  let boderState = {
    height: 8,
    width: 8,
    mines: 10,
  };

  return (
    <div className="game">
      <Board boderState={boderState} />
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
