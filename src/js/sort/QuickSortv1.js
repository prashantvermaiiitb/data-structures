var { getArray, swap } = require("../utils/Utils");
/**
 * Quick sort is fastest sorting algorithm
 * Best-case : O(nlogn)
 * Worst-case : O(n*2)
 */
class QuickSort {
  /**
   * constructor
   * @param {*} size
   */
  constructor(size) {
    this.array = getArray(null, size);
  }
  /**
   * partition the array
   * @param {*} left
   * @param {*} right
   * @param {*} pivot
   */
  partitionIt(left, right, pivot) {
    let leftPtr = left - 1;
    let rightPtr = right;
    while (true) {
      while (this.array[++leftPtr] < pivot) {}
      while (rightPtr > 0 && this.array[--rightPtr] > pivot) {}
      if (leftPtr >= rightPtr) {
        break;
      } else {
        swap(leftPtr, rightPtr, this.array);
      }
    }
    swap(leftPtr, right, this.array);
    return leftPtr;
  }

  /**
   * sorting the array recursively
   * @param {*} left
   * @param {*} right
   */
  sort(left, right) {
    // console.log(`Starting values of the left ${left} and right ${right}`);
    if (right - left <= 0) {
      // (left >= right)
      return;
    } else {
      let pivot = this.array[right];
      let partitionIndex = this.partitionIt(left, right, pivot);
      this.sort(left, partitionIndex - 1);
      this.sort(partitionIndex + 1, right);
    }
  }
  static demo() {
    let size = 17,
      quickSort = new QuickSort(size);
    console.log(`Array input..`, quickSort.array);
    quickSort.sort(0, size - 1);
    console.log("Sorted array..", quickSort.array);
  }
}

QuickSort.demo();
