import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Board from "./component/Board";
import "./index.css";
// import Button from './component/Button'??
import ChangeLevel from "./component/ChangeLevel";
//Styled
import { ButtonStyle } from "./Style/ButtonStyle";
const App = () => {
  const [boderState, setBoserState] = useState({
    height: 8,
    width: 8,
    mine: 10,
  });

  const change = (height, width, mine) => {
    const changStage = ChangeLevel(height, width, mine);
    console.log(changStage);
    setBoserState(changStage);
  };

  return (
    <div className="game">
      <h1>Welcome to Minesweeper</h1>
      <div className="info">
        <ButtonStyle onClick={() => change(8, 8, 10)}>beginner</ButtonStyle>
        <ButtonStyle onClick={() => change(12, 12, 40)}>middle</ButtonStyle>
        <ButtonStyle onClick={() => change(15, 15, 80)}>expert</ButtonStyle>
      </div>

      <Board boderState={boderState} setBoserState={setBoserState} />
      <br />
    </div>
  );
};

export default App;
