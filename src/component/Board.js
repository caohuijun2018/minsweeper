import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import swal from "sweetalert";
//Components
import getNeighbour from '../component/CreatBoard'
//Styled
import { CellAllStyled } from "../Style/CellStyle";
import { GameStatusStyled } from "../Style/BoardStyle";

const Board = ({ boderState }) => {
  const [gamestatus, setGamestatus] = useState("game is processing");
  const [mineCount, setMineCount] = useState(boderState.mine);
  const [currentDataRaw, setCurrentData] = useState(null);
  const currentData = JSON.parse(JSON.stringify(currentDataRaw));

  

  useEffect(() => {
    
setCurrentData(  getNeighbour(boderState)); //完成数组的初始化

  }, [boderState]);

  useEffect(() => {
    setMineCount(boderState.mine);
  }, [boderState.mine]);

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
  const getMines = (data) => {
    //  找到所有mines所在的位置
    let mineArray = [];
    data.forEach((datarow) => {
      datarow.forEach((dataitem) => {
        if (dataitem.isMine === true) mineArray.push(dataitem);
      });
    });
    return mineArray;
  };

  const revealEmpty = (x, y, data) => {
    //递归找到周围的所有空节点，可以被显示的cell的要求为：没有被标记，没有被点击，不是炸弹，且为空 ？？
    let area = traverseBoard(x, y, data);

    area.forEach((value) => {
      if (
        value.isFlag === false &&
        value.isRevealed === false &&
        (value.isMine === false || value.isEmpty === true)
      ) {
        data[value.x][value.y].isRevealed = true;

        if (value.isEmpty === true) revealEmpty(value.x, value.y, data); //递归
      }
    });
    return data;
  };
  const handleClick = (x, y) => {
    //当cell被点击
    if (
      currentData[x][y].isRevealed === true ||
      currentData[x][y].isFlag === true
    ) {
      return null;
    }

    if (currentData[x][y].isMine === true) {
      //当点击到地雷之后，结束游戏
      setGamestatus("game over");
      //将所有的cell都设置为已被点击
      revealBoard();
      swal("game  over");
    }

    let updata = currentData;
    updata[x][y].isFlag = false;
    updata[x][y].isRevealed = true;
    if (updata[x][y].isEmpty === true) {
      updata = revealEmpty(x, y, updata);
    }

    if (getHidden(updata).length === mineCount) {
      setGamestatus("you win");
      setMineCount("0");
      revealBoard();
      swal("you win");
    }

    setCurrentData(updata);
  };

  const handleContexMenu = (e, x, y) => {
    //定义右键的点击事件
    e.preventDefault();
    let updata = currentData;
    let mine = mineCount;
    if (updata[x][y].isRevealed === true) {
      //已经被点击，则返回空
      return;
    }
    if (updata[x][y].isFlag === false) {
      //未被标记，则标记
      updata[x][y].isFlag = true;

      mine--;
    } else {
      //已经被标记则取消
      updata[x][y].isFlag = false;

      mine++;
    }

    if (mine === 0) {
      const mineArray = getMines(updata);
      const flagArray = getFlag(updata);
      if (JSON.stringify(mineArray) === JSON.stringify(flagArray)) {
        setGamestatus("you are win!");
        revealBoard();
        swal("you are win!");
      } else {
        setGamestatus("game over!");
        revealBoard();
        swal("you are lose!");
      }
    }
    setCurrentData(updata);
    setMineCount(mine);
  };

  const renderBoard = (currentData) => {
    if (!currentData) return null;
    return currentData.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <div key={dataitem.x * datarow.length + dataitem.y}>
            <Cell
              data={dataitem}
              onClick={() => handleClick(dataitem.x, dataitem.y)}
              contextMenu={(e) => handleContexMenu(e, dataitem.x, dataitem.y)}
            />
          </div>
        );
      });
    });
  };

  return (
    <div>
      <GameStatusStyled
        style={{
          width: 37 * boderState.width + 2 * (boderState.width * 2) - 40,
        }}
      >
        <span>mines： {mineCount}</span>
        <br />
        <span>{gamestatus}</span>
      </GameStatusStyled>
      <CellAllStyled
        style={{ width: 37 * boderState.width + 2 * (boderState.width * 2) }}
      >
        {renderBoard(currentData)}
      </CellAllStyled>
    </div>
  );
};
export default Board;
