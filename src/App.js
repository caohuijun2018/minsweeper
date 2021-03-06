import React, { useState } from "react";
import Board from "./component/Board";
import ChangeLevel from "./component/ChangeLevel";
//Styled
import { ButtonStyle } from "./Style/ButtonStyle";
import { ButtonPosStyled } from "./Style/BoardStyle";
import { BoardStyled } from "./Style/BoardStyle";
import { BoardAllStyled } from "./Style/BoardStyle";
import { StyledHeading } from "./Style/StyledHeading";

const App = () => {
  const [boderState, setBoserState] = useState({
    height: 8,
    width: 8,
    mine: 10,
  });

  const change = (height, width, mine) => {
    const changStage = ChangeLevel(height, width, mine);
    setBoserState(changStage);
  };

  return (
    <BoardStyled>
      <BoardAllStyled>
        <StyledHeading>Minesweeper-Game</StyledHeading>
        <ButtonPosStyled>
          <ButtonStyle onClick={() => change(8, 8, 10)}>beginner</ButtonStyle>
          <ButtonStyle onClick={() => change(12, 12, 40)}>middle</ButtonStyle>
          <ButtonStyle onClick={() => change(13, 13, 60)}>expert</ButtonStyle>
        </ButtonPosStyled>
        <Board boderState={boderState} setBoserState={setBoserState} />
        <br />
      </BoardAllStyled>
    </BoardStyled>
  );
};

export default App;
