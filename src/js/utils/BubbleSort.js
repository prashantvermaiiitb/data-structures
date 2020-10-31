/**
 * Bubble Sort implementation for the Sorting Array
 * @param {*} array
 */
module.exports = (array) => {
  if (Array.isArray(array)) {
    const len = array.length;
    if (len > 0) {
      let tmp;
      for (var i = 0; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
          if (array[i] > array[j]) {
            tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
          }
        }
      }
    } else {
      throw new Error("Array length should be greater than 0");
    }
  } else {
    throw new Error("Array should be defined and not null");
  }
};
