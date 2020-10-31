/**
 * Selection Sort implementation for the Sorting Array
 * @param {*} array
 */
module.exports = (array) => {
  if (Array.isArray(array)) {
    const len = array.length;
    if (len > 0) {
      let tmp, min;
      for (var out = 0; out < len - 1; out++) {
        min = out;
        for (var inner = out + 1; inner < len; inner++) {
          if (array[min] > array[inner]) {
            min = inner;
          }
        }
        tmp = array[min];
        array[min] = array[out];
        array[out] = tmp;
      }
    } else {
      throw new Error("Array length should be greater than 0");
    }
  } else {
    throw new Error("Array should be defined and not null");
  }
};
