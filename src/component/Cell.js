import React from "react";

const Cell = ({ data, onClick, contextMenu }) => {
    // console.log('cell data:',data)

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
      //  if(data.isMine) return '❌'  //debug时用于标记地雷位置
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
  // console.log(className)
  return (
    <div className={className} onClick={onClick} onContextMenu={contextMenu}>
      {cellContent()}
    </div>
  );
};

export default Cell;