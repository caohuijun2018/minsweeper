import React from "react";

//Styled
import { CellHidenStyled } from "../Style/CellStyle";
import { CellIsFlagISMineStyled } from "../Style/CellStyle";
import { CellStyle } from "../Style/CellStyle";

const Cell = ({ data, onClick, contextMenu }) => {
  const cellContent = () => {
    if (data.isRevealed === false) {
      //isRevealed为false时执行
      if (data.isFlag) {
        console.log("flag");
        return "🚩";
      }
    } else {
      //点击之后，如果为地雷，则显示地雷。如果为空则显示空，如果有neighbour则显示数字
      if (data.isMine) {
        return "💣";
      }
      if (data.neighbour !== 0) {
        return data.neighbour;
      }
      return " ";
    }
  };

  if (data.isRevealed === false) {
    return (
      <CellHidenStyled onClick={onClick} onContextMenu={contextMenu}>
        {cellContent()}
      </CellHidenStyled>
    );
  }
  if (data.isRevealed === true) {
    return (
      <CellStyle onClick={onClick} onContextMenu={contextMenu}>
        {cellContent()}
      </CellStyle>
    );
  } else if (
    data.isRevealed === true &&
    (data.isMine === true || data.isFlag === true)
  ) {
    return (
      <CellIsFlagISMineStyled onClick={onClick} onContextMenu={contextMenu}>
        {cellContent()}
      </CellIsFlagISMineStyled>
    );
  }
};

export default Cell;
