/**
 * Insertion Sort implementation for the Sorting Array
 * @param {*} array
 */
module.exports = (array) => {
  if (Array.isArray(array)) {
    const len = array.length;
    if (len > 0) {
      for (var outer = 1; outer < len; outer++) {
        let inner = outer,
          temp = array[outer];
        while (inner > 0 && array[inner - 1] > temp) {
          array[inner] = array[inner - 1];
          inner--;
        }
        array[inner] = temp;
      }
    } else {
      throw new Error("Array length should be greater than 0");
    }
  } else {
    throw new Error("Array should be defined and not null");
  }
};
