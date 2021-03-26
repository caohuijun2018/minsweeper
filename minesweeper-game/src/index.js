import React, { useState } from "react";
import ReactDOM from "react-dom";
import Board from "./component/Board";
import "./index.css";

const Game = () => {
  const [boderState, setBorderState] = useState({
    height: 8,
    width: 8,
    mines: 10,
  });
  // console.log(currentData)
  return (
    <div className="game">
      <Board boderState={boderState} setBorderState={setBorderState} />
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
