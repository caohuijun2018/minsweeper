import React from "react";

const Cell = ({data,onClick}) => {
  
 
  let className =
    "cell" +
    (data.isRevealed  === true ? " " : " hidden") +
    (data.isMine === true ? " is-mine" : " ") +
    (data.isFlaged === true ? " is-flag" : " ");


  console.log(className)
  const cellContent = () => {
    
    if (!data.isRevealed) {
      return data.isFlaged ? "🚩" : "";
    }
    if (data.isMine) {
      return "💣";
    }
    if (data.neightbour === 0) {
      return null;
    } else {
      return data.neightbour;
    }
  };
  // console.log(className)
  return (
    <div className={className} onClick={onClick}>
      {cellContent()}
    </div>
  );
};

export default Cell;
