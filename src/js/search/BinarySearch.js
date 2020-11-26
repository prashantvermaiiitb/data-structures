/**
 * Binary Search implementation
 * This will have the while(true) loop and array as the input
 */
module.exports = function (array, searchKey) {
  if (Array.isArray(array) && searchKey) {
    const len = array.length;
    if (len > 0) {
      let lb = 0,
        ub = len,
        mid;
      while (true) {
        mid = Math.floor((lb + ub) / 2);
        if (array[mid] == searchKey) {
          return mid; // return the index of the element
        } else {
          if (lb > ub) {
            return -1; //len; // return the number of elements back
          } else if (array[mid] < searchKey) {
            lb = mid + 1;
          } else {
            ub = mid - 1;
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
