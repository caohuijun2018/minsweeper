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

  export default traverseBoard;