var { getArray } = require("../utils/Utils");
/**
 * shell sort is the super set of Insertion sort
 * It works on knuth method h = (3*h+1)
 */
function shellSort(array) {
  /**
   * length of the array
   * knuth sequence greatest value of h
   * while h > 0
   *  run the insertion sort with increment sequence of h
   *  h = h-1 /3
   */
  let len = array.length,
    h = 1;
  while (h <= Math.floor(len / 3)) {
    h = 3 * h + 1;
  }
  console.log(`Optimum value of the h is ${h}`);
  while (h > 0) {
    for (let outer = h; outer < len; outer++) {
      let tmp = array[outer];
      let inner = outer;
      while (inner > h - 1 && array[inner - h] >= tmp) {
        array[inner] = array[inner - h];
        inner = inner - h;
      }
      array[inner] = tmp;
    }
    h = Math.floor((h - 1) / 3);
  }
}

/**
 * Demo function for the shellsort
 */
function demo() {
  let array1 = getArray(null, 70);
  console.log(`Un-sorted Array..`, array1);
  shellSort(array1);
  console.log(`Sorted Array `, array1);
}

demo();

module.exports = shellSort;
