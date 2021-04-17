const dataCopy = (boderState, updata) => {
  let copyArray = [];
  for (let i = 0; i < boderState.height + 2; i++) {
    copyArray.push([]);
    for (let j = 0; j < boderState.width + 2; j++) {
      copyArray[i][j] = {
    };
    }
  }

  for (let x = 0; x < updata.length; x++) {
    for (let y = 0; y < updata[0].length; y++) {
        copyArray[x + 1][y + 1] = updata[x][y]
    }
  }

  return copyArray;
};

export default dataCopy;
