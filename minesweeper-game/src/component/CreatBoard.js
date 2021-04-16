//这个部件的功能为，根据传入的参数BoderState的数据，创建一个行数为height，列数为width的二维数组，并在这个二维数组的随机位置放入相应数量的地雷
//完成board的初始化。

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

  //   //up
  //   if (x > 0) {
  //     el.push(data[x - 1][y]);
  //   }

  //   //down
  //   if (x < boderState.height - 1) {
  //     el.push(data[x + 1][y]);
  //   }

  //   //left
  //   if (y > 0) {
  //     el.push(data[x][y - 1]);
  //   }

  //   //right
  //   if (y < boderState.width - 1) {
  //     el.push(data[x][y + 1]);
  //   }

  //   // top left
  //   if (x > 0 && y > 0) {
  //     el.push(data[x - 1][y - 1]);
  //   }

  //   // top right
  //   if (x > 0 && y < boderState.width - 1) {
  //     el.push(data[x - 1][y + 1]);
  //   }

  //   // bottom right
  //   if (x < boderState.height - 1 && y < boderState.width - 1) {
  //     el.push(data[x + 1][y + 1]);
  //   }

  //   // bottom left
  //   if (x < boderState.height - 1 && y > 0) {
  //     el.push(data[x + 1][y - 1]);
  //   }

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

const dataCopy = (boderState, updata) => {
  let copyArray = [];
  for (let i = 0; i <= boderState.height + 1; i++) {
    copyArray.push([]);
    for (let j = 0; j <= boderState.width + 1; j++) {
      copyArray[i][j] = {
        x: i,
        y: j,
        isMine: false,
      };
    }
  }

  for (let x = 0; x < updata.length; x++) {
    for (let y = 0; y < updata[0].length; y++) {
      if (updata[x][y].isMine === true) {
        copyArray[x + 1][y + 1].isMine = true;
      }
    }
  }

  return copyArray;
};
//currentData为此时防放置地雷完成之后的所有的cell的数据，并且每个cell周围的地雷数量已经得到

const getNeighbour = (boderState) => {
  //遍历周围的cell
  let updata = plantMines(boderState);
    
  let copyArray = dataCopy(boderState, updata);
  
  for (let i = 1; i < copyArray.length; i++) {
    for (let j = 1; j < copyArray[1].length - 1; j++) {
       
        console.log(updata[0][0])
      if (updata[i - 1][j - 1].isMine !== true) {
        let aroundCell = 0;
        let area = traverseBoard(
          copyArray[i][j].x,
          copyArray[i][j].y,
          copyArray
        );
        console.log(area)
        // area.forEach((value) => {
        //   if (value.value.isMine === true) aroundCell++;
        // });
        if (aroundCell === 0) {
          updata[i - 1][j - 1].isEmpty = true;
        }
        updata[i - 1][j - 1].neighbour = aroundCell;
      }
    }
  }

  //   for (let i = 0; i < boderState.height; i++) {
  //     for (let j = 0; j < boderState.width; j++) {
  //       if (updata[i][j].isMine !== true) {
  //         //当访问到的cell不是地雷是，返回周围节点的地雷总数和
  //         let aroundCell = 0;
  //         let area = traverseBoard(
  //           updata[i][j].x,
  //           updata[i][j].y,
  //           updata,
  //           boderState
  //         ); //找到需要寻找的范围
  //         area.forEach((value) => {
  //           if (value.isMine === true) aroundCell++; //找到范围内所有的地雷的数量
  //         });
  //         if (aroundCell === 0) {
  //           updata[i][j].isEmpty = true;
  //         }
  //         updata[i][j].neighbour = aroundCell;
  //       }
  //     }
  //   }
  return updata;
};

export default getNeighbour;
