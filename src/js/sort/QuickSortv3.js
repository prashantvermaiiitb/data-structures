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
    let leftPtr = left;
    let rightPtr = right - 1;
    while (true) {
      while (this.array[++leftPtr] < pivot) {}
      while (this.array[--rightPtr] > pivot) {}
      if (leftPtr >= rightPtr) {
        break;
      } else {
        swap(leftPtr, rightPtr, this.array);
      }
    }
    swap(leftPtr, right - 1, this.array); //restore the pivot
    return leftPtr;
  }

  /**
   * sorting the array recursively
   * @param {*} left
   * @param {*} right
   */
  sort(left, right) {
    // console.log(`Starting values of the left ${left} and right ${right}`);
    let size = right - left + 1;
    if (size <= 10) {
      this.doInsertionSort(left, right);
    } else {
      let pivot = this.getMedianOfThree(left, right);
      let partitionIndex = this.partitionIt(left, right, pivot);
      this.sort(left, partitionIndex - 1);
      this.sort(partitionIndex + 1, right);
    }
  }

  /**
   * Getting the median of the left right and the center
   * order should be in left < center < right
   * pivot will be placed just before the right element @ right-1 index
   * @param {*} left
   * @param {*} right
   */
  getMedianOfThree(left, right) {
    let center = Math.floor((left + right) / 2);
    //compare left and center -> then swap
    if (this.array[left] > this.array[center]) {
      swap(left, center, this.array);
    }
    //compare left and right -> then swap
    if (this.array[left] > this.array[right]) {
      swap(left, right, this.array);
    }
    //compare center and right -> then swap
    if (this.array[center] > this.array[right]) {
      swap(center, right, this.array);
    }
    //place the median just before the last element
    swap(center, right - 1, this.array);
    return this.array[right - 1]; //return this as the Pivot element
  }

  /**
   * Do the manual sorting for the 3 or less than 3 elements
   * @param {*} left
   * @param {*} right
   */
  doInsertionSort(left, right) {
    for (let outer = left + 1; outer <= right; outer++) {
      let temp = this.array[outer];
      let inner = outer;
      while (inner > left && this.array[inner - 1] >= temp) {
        this.array[inner] = this.array[inner - 1];
        --inner;
      }
      this.array[inner] = temp;
    }
  }

  /**
   * Static demo function
   */
  static demo() {
    let size = 19,
      quickSort = new QuickSort(size);
    console.log(`Array input..`, quickSort.array);
    quickSort.sort(0, size - 1);
    console.log("Sorted array..", quickSort.array);
  }
}

QuickSort.demo();
