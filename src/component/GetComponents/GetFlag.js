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
export default getFlag;
