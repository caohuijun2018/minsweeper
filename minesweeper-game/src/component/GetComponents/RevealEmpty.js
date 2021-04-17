import dataCopy from "../DataCopy";
import traverseBoard from "../TraverseBoard";
const revealEmpty = (x, y, data, boderState) => {
  //递归找到周围的所有空节点，可以被显示的cell的要求为：没有被标记，没有被点击，不是炸弹，且为空 ？？
  let copyArray = dataCopy(boderState, data);
  let area = traverseBoard(x + 1, y + 1, copyArray);
  area.forEach((value) => {
    if (
      value.isFlag === false &&
      value.isRevealed === false &&
      (value.isMine === false || value.isEmpty === true)
    ) {
      data[value.x][value.y].isRevealed = true;

      if (value.isEmpty === true)
        revealEmpty(value.x, value.y, data, boderState); //递归
    }
  });
  return data;
};

export default revealEmpty;
