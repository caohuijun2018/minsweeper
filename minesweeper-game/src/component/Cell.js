import React from "react";


const Cell = (props) => {
  const { data } = props;

  let currentData = data;
  //console.log(currentData)
  //console.log('data:',data);
  let className =
    "cell" +
    (currentData.isRevealed ? " " : " hidden") +
    (currentData.isMine ? " is-mine" : " ") +
    (currentData.isFlaged ? " is-flag" : " ");
  console.log(className)
  const cellContent = () => {

    if (!currentData.isRevealed) {
      return currentData.isFlaged ? "🚩" : "";
    }
    if (currentData.isMine) {
      return "💣";
    }
    if (currentData.neightbour === 0) {
      return null;
    } else {
      return currentData.neightbour;
    }
  };

  return (
    <div className={className} onClick={props.onC}>
      {cellContent()}
    </div>
  );
};

export default Cell;
