import React from "react";
import ReactDOM from "react-dom";
import Board from "./component/Board";
const Game = () => {
  let state = {
    height: 8,
    width: 8,
    mines: 10,
  };
  return (
    <div>
      <Board state={state} />
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
