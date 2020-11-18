/**
 * Forming the array
 * @param {*} array
 * @param {*} size
 */
function formArray(array, size = 10) {
  //when we are passing only the reference
  if (!Array.isArray(array) || size == 10) {
    array = new Array(size);
  }
  for (let i = 0; i < size; i++) {
    array[i] = parseInt((Math.random() * 1000).toFixed(0)); //toFixed returns the string
  }
  return array;
}

/**
 * Swapping the element in the arrayß
 * @param {*} indexA
 * @param {*} indexB
 * @param {*} array
 */
function swap(indexA, indexB, array) {
  let tmp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = tmp;
}

module.exports = {
  getArray: formArray,
  swap,
};
