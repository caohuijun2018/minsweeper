import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import swal from "sweetalert";
//Components
import getNeighbour from "../component/CreatBoard";
import getHidden from "../component/GetComponents/GetHidden";
import getFlag from "../component/GetComponents/GetFlag";
import getMines from "../component/GetComponents/GetMines";
import revealEmpty from "../component/GetComponents/RevealEmpty";
//Styled
import { CellAllStyled } from "../Style/CellStyle";
import { GameStatusStyled } from "../Style/BoardStyle";

const Board = ({ boderState }) => {
  const [gamestatus, setGamestatus] = useState("game is processing");
  const [mineCount, setMineCount] = useState(boderState.mine);
  const [currentDataRaw, setCurrentData] = useState(null);
  const currentData = JSON.parse(JSON.stringify(currentDataRaw));
  const widthGet = 37 * boderState.width + 2 * (boderState.width * 2);
  useEffect(() => {
    setCurrentData(getNeighbour(boderState)); //完成数组的初始化
  }, [boderState]);

  useEffect(() => {
    setMineCount(boderState.mine);
  }, [boderState.mine]);

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
      updata = revealEmpty(x, y, updata, boderState);
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
    //已经被点击，则返回空
    if (updata[x][y].isRevealed === true) {
      return;
    }
    //未被标记，则标记
    if (updata[x][y].isFlag === false) {
      updata[x][y].isFlag = true;
      mine--;
    } else {
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
          width: widthGet - 40,
        }}
      >
        <span>mines： {mineCount}</span>
        <br />
        <span>{gamestatus}</span>
      </GameStatusStyled>
      <CellAllStyled style={{ width: widthGet }}>
        {renderBoard(currentData)}
      </CellAllStyled>
    </div>
  );
};
export default Board;
