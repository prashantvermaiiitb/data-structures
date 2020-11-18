var { getArray, swap } = require("./Utils");
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
    // console.log(`left : ${leftPtr}, right : ${rightPtr}, pivot : ${pivot}`);
    while (true) {
      while (this.array[++leftPtr] < pivot) {
        // console.log(
        //   `leftPtr .. ${leftPtr} and value at this : ${this.array[leftPtr]}`
        // );
      }
      // console.log(`leftPtr .. ${leftPtr}`);
      while (rightPtr > 0 && this.array[--rightPtr] > pivot) {
        // console.log(
        //   `rightPtr .. ${rightPtr} and value at this ${this.array[rightPtr]}`
        // );
      }
      if (leftPtr >= rightPtr) {
        // console.log(`before breaking the main loop indexes`, leftPtr, rightPtr);
        break;
      } else {
        // console.log(`intermediate swapping index`, leftPtr, rightPtr);
        swap(leftPtr, rightPtr, this.array);
        // console.log(`Array after the intermediate swapping...`, this.array);
      }
    }
    // console.log(`final swapping index`, leftPtr, right);
    swap(leftPtr, right, this.array);
    // console.log(`Array after the partition...`, this.array);
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
      // console.log("pivot selected..", pivot);
      let partitionIndex = this.partitionIt(left, right, pivot);
      // console.log(
      //   `partitionIndex after dividing the array .. `,
      //   partitionIndex
      // );
      this.sort(left, partitionIndex - 1);
      this.sort(partitionIndex + 1, right);
    }
  }
  static demo() {
    let size = 17,
      quickSort = new QuickSort(size);
    console.log(`Array input..`, quickSort.array);
    // quickSort.array = [132, 775, 415, 886, 71, 244, 822];
    // console.log(`Array input..`, quickSort.array);
    quickSort.sort(0, size - 1);
    console.log("Sorted array..", quickSort.array);
  }
}

QuickSort.demo();
