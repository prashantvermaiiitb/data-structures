var { getArray, swap } = require("../utils/Utils");

/**
 * Partition the array
 * @param {*} left
 * @param {*} right
 * @param {*} pivot
 */
class Partition {
  /**
   * constructor
   * @param {*} size
   */
  constructor(size) {
    this.array = getArray(null, size);
  }
  /**
   * Logic for doing the partitioning
   */
  partitionIt(left, right, pivot) {
    let leftPtr = left - 1,
      rightPtr = right + 1;
    while (true) {
      while (leftPtr < right && this.array[++leftPtr] < pivot);
      while (rightPtr > left && this.array[--rightPtr] > pivot);
      if (leftPtr >= rightPtr) {
        break;
      } else {
        swap(leftPtr, rightPtr, this.array);
      }
    }
    return leftPtr;
  }
  /**
   * Demo method for the class
   */
  static demo() {
    let partitionSample = new Partition(10);
    console.log(partitionSample.array);
    let len = partitionSample.array.length;
    let pivot = 500;
    partitionSample.partitionIt(0, len - 1, pivot);
    console.log(`partition done once ..`, partitionSample.array);
  }
}

Partition.demo();

module.exports = Partition;
