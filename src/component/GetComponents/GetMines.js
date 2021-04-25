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

export default getMines;
