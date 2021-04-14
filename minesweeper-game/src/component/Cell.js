import React from "react";

//Styled
import {CellStyledHiden} from '../Style/CellStyle'
import {CellISMIne} from '../Style/CellStyle'
import {CellIsFlag} from '../Style/CellStyle'

const Cell = ({ data, onClick, contextMenu }) => {

  let className =
    "cell" +
    (data.isRevealed === true ? " " : " hidden") +
    (data.isMine === true ? " is-mine" : " ") +
    (data.isFlag=== true ? " is-flag" : " ");

  const cellContent = () => {
    // console.log("cellcontent");
    if (data.isRevealed === false) {
      //isRevealed为false时执行
      if (data.isFlag) {
        console.log('flag')
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
  
    return (
      <CellStyledHiden  onClick={onClick} onContextMenu={contextMenu}>
        {cellContent()}
      </CellStyledHiden>
    );
  
};

export default Cell;
