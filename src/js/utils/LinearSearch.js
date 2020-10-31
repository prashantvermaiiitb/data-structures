/**
 * Linear Search function for the Array
 * @param {*} array
 * @param {*} searchKey
 */
module.exports = (array, searchKey) => {
  if (Array.isArray(array)) {
    let len = array.length,
      i;
    if (len > 0) {
      for (i = 0; i < len; i++) {
        if (searchKey === array[i]) {
          return i;
        }
      }
    }
    return -1;
  }
};
