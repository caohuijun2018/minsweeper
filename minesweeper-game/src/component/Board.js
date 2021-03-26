import React, { useEffect, useState } from "react";
import Cell from "./Cell";

const Board = ({ boderState }) => {
  const [gamestatus, setGameStatus] = useState("game is processing");
  const [mineCount, setMineCount] = useState(boderState.mines);
  const [currentData, setCurrentData] = useState(null);

  const createEmptyArray = () => {
    //创建一个二维数组，记录每一个cell的状态
    const data = [];
    for (let i = 0; i < boderState.height; i++) {
      data.push([]);
      for (let j = 0; j < boderState.width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          isFlag: false,
          isRevealed: false,
          isEmpty: false,
          neighbour: 0,
          className: "",
        };
      }
    }
    return data;
  };
  //记录下不同操作后的data
  let plantMines = () => {
    //随机的放入地雷
    const data = createEmptyArray();

    let randomX,
      randomY,
      minePlanted = 0;
    while (minePlanted < mineCount) {
      randomX = (Math.floor(Math.random() * 1000) + 1) % boderState.height;
      randomY = (Math.floor(Math.random() * 1000) + 1) % boderState.width;

      if (data[randomX][randomY].isMine === false) {
        data[randomX][randomY].isMine = true;
        minePlanted++;
      }
    }
    return data; //返回值为随机添加了mines之后的二维数组
  };

  const getNeighbour = () => {
    //遍历周围的cell
    let updata = plantMines();

    for (let i = 0; i < boderState.height; i++) {
      for (let j = 0; j < boderState.width; j++) {
        if (updata[i][j].isMine !== true) {
          //当访问到的cell不是地雷是，返回周围节点的地雷总数和
          let aroundCell = 0;

          let area = traverseBoard(updata[i][j].x, updata[i][j].y, updata); //找到需要寻找的范围

          area.map((value) => {
            //console.log("value:",value.isMine)
            if (value.isMine === true) aroundCell++; //找到范围内所有的地雷的数量
            return null;
          });
          if (aroundCell === 0) {
            updata[i][j].isEmpty = true;
          }
          updata[i][j].neighbour = aroundCell;
        }
      }
    }
    setCurrentData(updata);
  };

  const traverseBoard = (x, y, data) => {
    //寻在八个位置的地雷的数量，并返回
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    //down
    if (x < boderState.height - 1) {
      el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    //right
    if (y < boderState.width - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < boderState.width - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < boderState.height - 1 && y < boderState.width - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < boderState.height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  };

  useEffect(() => {
    getNeighbour(); //currentData为此时防放置地雷完成之后的所有的cell的数据，并且每个cell周围的地雷数量已经得到
  }, {});

  // console.log(currentData);
  // const renderBoard = (currentData) => {
  //   //在每次点击之后，渲染<cell>组件，进行cell状态的判断
  //   currentData.map((datarow) => {
  //     datarow.map((dataitem) => {
  //       return (
  //         <div>
  //           <Cell
  //             data={dataitem} //传入cell组件的data应该为最小单元的数据
  //             onClickCell={() => handleClick(dataitem.x, dataitem.y)}
  //             onContextMenu={() => handleContexMenu(dataitem.x, dataitem.y)}
  //           />
  //         </div>
  //       );
  //     });
  //     return null;
  //   });
  // };
  const revealBoard = () => {
    //将所有的cell都设置为已被点击
    let updateBoard = currentData;
    updateBoard.forEach((datarow) => {
      datarow.forEach((dataitem) => {
        dataitem.isRevealed = true;
      });
    });
    setCurrentData(updateBoard);
    // updateBoard.forEachoow((datarow) => {
    //   datarow.foreach((dataitem) => {
    //     dataitem.isRevealed = true;
    //   });
    // });
    // currentData = updateBoard;
    // return currentData;
  };

  const getHidden = (data) => {
    //找到所有被标记的cell，放入数组mineArray中
    let mineArray = [];
    data.foreach((datarow) => {
      datarow.foreach((dataitem) => {
        if (dataitem.isRevealed === true) {
          mineArray.push(dataitem);
        }
      });
    });
    setCurrentData(mineArray);
  };
  // const getFlag = (data) => {
  //   let mineArray = [];
  //   data.foreach((datarow) => {
  //     datarow.foreach((dataitem) => {
  //       if (dataitem.isFlag === true) mineArray.push(dataitem);
  //     });
  //   });
  //   return mineArray;
  // };
  // const getMines = (data) => {
  //   let mineArray = [];
  //   data.foreach((datarow) => {
  //     datarow.foreach((dataitem) => {
  //       if (dataitem.isMine === true) mineArray.push(dataitem);
  //     });
  //   });
  //   return mineArray;
  // };
  const handleClick = (x, y, cur) => {
    //当cell被点击时
    console.log("click");
    let updata = cur;
    if (updata[x][y].isMine === true) {
      //当点击到地雷之后，结束游戏
      setGameStatus("You are lose");
      revealBoard(); //将所有的cell都设置为已被点击
      alert("game  over");
    }
    if (updata[x][y].isRevealed || !updata[x][y].isFlag) return null; //当点击到已经被标志过的cell，返回空
    if (getHidden(updata).length === mineCount) {
      setGameStatus("You are win !");
      revealBoard();
      alert("you win");
    }
    if (!updata[x][y].isEmpty) {
      updata = revealEmpty(x, y, updata); //当点击到空的cell时，递归找出所有的空节点
    }
    // currentData = updata;
    // console.log(currentData)
    // return currentData;
  };

  const revealEmpty = (x, y, data) => {
    //递归找到周围的所有空节点，可以被显示的cell的要求为：没有被标记，没有被点击，不是炸弹，且为空 ？？
    let area = traverseBoard(x, y, data);
    area.map((value) => {
      if (
        value.isFlag === false &&
        value.isRevealed === false &&
        (value.isEmpty === true || value.isMine === false)
      ) {
        data[value.x][value.y] = true;
      }
      if (value.isEmpty === false) revealBoard(value.x, value.y, data);
      return null;
    });
    setCurrentData(area);
  };

  // const handleContexMenu = (e, x, y) => {
  //   //定义右键的点击事件
  //   e.preventDefault();

  //   let updata = currentData;

  //   let mine = state.mineCount;
  //   //let win = false;

  //   if (updata[x][y].isFlag === false) {
  //     //未被标记，则标记
  //     updata[x][y].isFlag = true;
  //     mine--;
  //   }
  //   if (updata[x][y].isRevealed === true) {
  //     //已经被点击，则返回空
  //     return null;
  //   }
  //   if (updata[x][y].isFlag === true) {
  //     //已经被标记则取消
  //     updata[x][y].isFlag = false;
  //     mine++;
  //   }
  //   if (mine === 0) {
  //     const mineArray = getMines(updata);
  //     const flagArray = getFlag(updata);
  //     if (JSON.stringify(mineArray) === JSON.stringify(flagArray)) {
  //       revealBoard();
  //       state.gamestatus = "you are win";
  //       alert("you are win!");
  //     }
  //   }

  //   currentData = updata;
  //   return currentData;
  // };
  const renderBoard = (currentData) => {
    console.log("render cell");
    if (!currentData) {
      return null;
    }
    return currentData.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <div key={dataitem.x * datarow.length + dataitem.y}>
            <Cell
              data={dataitem}
              onClick={() => {
                handleClick(dataitem.x, dataitem.y, currentData);
              }}
              // cMenu={(e) => {
              //   handleContexMenu(e, dataitem.x, dataitem.y);
              // }}
            />
            {datarow[datarow.length - 1] === dataitem ? (
              <div className="clear" />
            ) : (
              ""
            )}
          </div>
        );
      });
    });
  };

  return (
    <div className="board">
      <div className="game-info">
        <span className="info">mines： {mineCount}</span>
        <br />
        <span className="info">{gamestatus}</span>
      </div>
      <div>{renderBoard(currentData)}</div>
    </div>
  );
};
export default Board;
