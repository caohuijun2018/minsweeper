//这个部件的功能为，根据传入的参数BoderState的数据，创建一个行数为height，列数为width的二维数组，并在这个二维数组的随机位置放入相应数量的地雷
//完成board的初始化。
import dataCopy from '../component/DataCopy'
const createEmptyArray = (boderState) => {
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
let plantMines = (boderState) => {
  //随机的放入地雷
  const data = createEmptyArray(boderState);
  let randomX,
    randomY,
    minePlanted = 0;
  while (minePlanted < boderState.mine) {
    randomX = (Math.floor(Math.random() * 1000) + 1) % boderState.height;
    randomY = (Math.floor(Math.random() * 1000) + 1) % boderState.width;

    if (data[randomX][randomY].isMine === false) {
      data[randomX][randomY].isMine = true;
      minePlanted++;
    }
  }
  //返回值为随机添加了mines之后的二维数组
  return data;
};
const traverseBoard = (x, y, data) => {
  //寻在八个位置的地雷的数量，并返回
  let el = [];
  //创建一个新的二维数组，该数组相当于在原data数组中包裹一圈黑名单，在进行位置寻找时省去了边界位置的判断
  el.push(
    data[x][y - 1],
    data[x - 1][y],
    data[x + 1][y],
    data[x][y + 1],
    data[x - 1][y - 1],
    data[x - 1][y + 1],
    data[x + 1][y + 1],
    data[x + 1][y - 1]
  );
  return el;
};
//currentData为此时防放置地雷完成之后的所有的cell的数据，并且每个cell周围的地雷数量已经得到
const getNeighbour = (boderState) => {
  //遍历周围的cell
  let updata = plantMines(boderState);
  let copyArray = dataCopy(boderState, updata);
  for (let i = 0; i < updata.length; i++) {
    for (let j = 0; j < updata[0].length; j++) {
      if (updata[i][j].isMine === false) {
        let aroundCell = 0;
        let area = traverseBoard(
          updata[i][j].x + 1,
          updata[i][j].y + 1,
          copyArray
        );
        area.forEach((value) => {
          if (value.isMine === true) aroundCell++;
        });
        aroundCell === 0
          ? (updata[i][j].isEmpty = true)
          : (updata[i][j].neighbour = aroundCell);
      }
    }
  }

  return updata;
};

export default getNeighbour;
