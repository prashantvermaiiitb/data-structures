/**
 * Recursive binary Search for the Arrays
 * @param {*} array : array to be searched for
 * @param {*} searchKey : search key
 * @param {*} lb : lower bound
 * @param {*} ub : upperbound
 */
function recursiveBinarySearch(array, searchKey, lb = 0, ub) {
  if (Array.isArray(array) && searchKey) {
    const len = array.length;
    if (len > 0) {
      if (lb > ub) {
        return -1; ///array.length;
      }
      let mid = Math.floor((lb + ub) / 2);
      if (array[mid] == searchKey) {
        return mid;
      }
      if (searchKey > array[mid]) {
        return recursiveBinarySearch(array, searchKey, mid + 1, ub);
      } else {
        return recursiveBinarySearch(array, searchKey, lb, mid - 1);
      }
    } else {
      throw new Error("Array length should be greater than 0");
    }
  } else {
    throw new Error("Array should be defined and not null");
  }
}

module.exports.RecursiveBinarySearch = recursiveBinarySearch;
