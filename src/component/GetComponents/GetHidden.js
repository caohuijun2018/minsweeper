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

export default getHidden;
