import React, { useEffect, useState } from "react";
import Cell from "./Cell";

const Board = ({ boderState }) => {
  const [gamestatus, setGamestatus] = useState("game is processing");
  const [mineCount, setMineCount] = useState(boderState.mine);
  const [currentDataRaw,setCurrentData] = useState(null);
  const currentData = JSON.parse(JSON.stringify(currentDataRaw))
  // const [currentData, setCurrentData] = useState(null);

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
          // isRecursion: false,
        };
      }
    }
    //console.log(data)
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
    //console.log(data)
    //返回值为随机添加了mines之后的二维数组

    return data;
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

          area.forEach((value) => {
            //console.log("value:",value.isMine)
            if (value.isMine === true) aroundCell++; //找到范围内所有的地雷的数量
          });
          if (aroundCell === 0) {
            updata[i][j].isEmpty = true;
          }
          updata[i][j].neighbour = aroundCell;
        }
      }
    }

    setCurrentData(updata);
    // console.log(currentData)
  };
  useEffect(() => {
    getNeighbour(); //完成数组的初始化
  }, []);
  const traverseBoard = (x, y, data) => {
    //寻在八个位置的地雷的数量，并返回
    let el = [];

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

  //currentData为此时防放置地雷完成之后的所有的cell的数据，并且每个cell周围的地雷数量已经得到

  const revealBoard = () => {
    //将所有的cell都设置为已被点击
    console.log("reverlAll");
    const updata = currentData;
    updata.forEach((datarow) => {
      datarow.forEach((dataitem) => {
        dataitem.isRevealed = true;
      });
    });
    setCurrentData(updata);
  };

  const getHidden = (data) => {
    //找到所有被没有被点击的cell，放入数组mineArray中
    let mineArray = [];
    data.forEach((datarow) => {
      datarow.forEach((dataitem) => {
        if (dataitem.isRevealed === false) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  };
  const getFlag = (data) => {
    //找到所有被标记的cell
    let mineArray = [];
    data.forEach((datarow) => {
      datarow.forEach((dataitem) => {
        if (dataitem.isFlag === true) mineArray.push(dataitem);
      });
    });
    return mineArray;
  };
  // const getMines = (data) => {
  //   let mineArray = [];
  //   data.foreach((datarow) => {
  //     datarow.foreach((dataitem) => {
  //       if (dataitem.isMine === true) mineArray.push(dataitem);
  //     });
  //   });
  //   return mineArray;
  // };

  const revealEmpty = (x, y, data) => {
    console.log("找到周围所有的空节点");
    // console.log("revealEmpty", x, y, data, deep);
    // if (depth > 10) {
    //   return;
    // }
    //递归找到周围的所有空节点，可以被显示的cell的要求为：没有被标记，没有被点击，不是炸弹，且为空 ？？
    let area = traverseBoard(x, y, data);
    // console.log("area",area)

    area.map((value) => {
      // value.isRecursion = true;
      if (
        value.isFlag === false &&
        value.isRevealed === false &&
        (value.isMine === false || value.isEmpty === true)
        
      ) {
        data[value.x][value.y].isRevealed = true;
        //   if (value.isEmpty === true && value.isRecursion === false)
        //     revealEmpty(value.x, value.y, data, deep + 1); //递归
        // }
        if (value.isEmpty === true) revealEmpty(value.x, value.y, data); //递归
      }
    });
    return data;
  };
  const handleClick = (x, y) => {
    //当cell被点击时
    console.log("click");

    // console.log(updata);
    if (
      currentData[x][y].isRevealed === true ||
      currentData[x][y].isFlag === true
    ) {
      return null;
    }

    if (currentData[x][y].isMine === true) {
      //当点击到地雷之后，结束游戏
      setGamestatus("game over");
      revealBoard(); //将所有的cell都设置为已被点击
      alert("game  over");
    }
    let updata = currentData;
    updata[x][y].isFlag = false;
    updata[x][y].isRevealed = true;
    if (updata[x][y].isEmpty === true) {
      console.log("this is empty");
      updata = revealEmpty(x, y, updata);
      console.log('updata:',updata)
      // setCurrentData(updata);
    }

    if (getHidden(updata).length === mineCount) {
      setGamestatus("you win");
      setMineCount("0");
      revealBoard();
      alert("you win");
    }
    // updata[x][y].isRevealed = true;

    setCurrentData(updata);
    setMineCount(mineCount - getFlag(updata).length);
  };

  // const handleContexMenu = (e, x, y) => {
  //   //定义右键的点击事件
  //   e.preventDefault();

  //   let updata = currentData;

  //   let mine = mineCount;
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
  //       let status = "you are win"
  //      setGamestatus(status)
  //       alert("you are win!");
  //     }
  //   }

  //   currentData = updata;
  //   return currentData;
  // };
  const renderBoard = (currentData) => {
    // console.log('render cell')
    if (!currentData) return null;
    return currentData.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <div key={dataitem.x * datarow.length + dataitem.y}>
            <Cell
              data={dataitem}
              onClick={() => handleClick(dataitem.x, dataitem.y)}
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
  // console.log(currentData);
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
