var insertionSort = require("./InsertionSort");
var { getArray } = require("./Utils");
/**
 * Merge sort Algorithm
 * Best Case : O(n log n)
 * Worst Case : O(n log n)
 * Concept :
 *  - merge sorted arrays
 *  - taking extra workspace almost double of what's being told as input
 */
function mergeTwoSortedArrays(arrayA, arrayB) {
  /**
   *@todo check if array are sorted or not
   */
  if (Array.isArray(arrayA) && Array.isArray(arrayB)) {
    workspace = new Array(arrayA.length + arrayB.length);
    let aDex = 0,
      bDex = 0,
      cDex = 0;
    while (aDex < arrayA.length && bDex < arrayB.length) {
      if (arrayA[aDex] < arrayB[bDex]) {
        workspace[cDex++] = arrayA[aDex++];
      } else {
        workspace[cDex++] = arrayB[bDex++];
      }
    }
    while (aDex < arrayA.length) {
      workspace[cDex++] = arrayA[aDex++];
    }
    while (bDex < arrayB.length) {
      workspace[cDex++] = arrayB[bDex++];
    }
    return workspace;
  } else {
    throw new Error(
      "Input should be Arrays & length should be greater than 0 for each of them"
    );
  }
}

/**
 * Recursive Merge Sort method for breaking the array in 2 arrays.
 * @param {*} workspace
 * @param {*} lowerbound
 * @param {*} upperbound
 */
function recursiveMergeSort(workspace, lowerbound, upperbound, array) {
  console.log(array, lowerbound, upperbound);
  if (lowerbound == upperbound) {
    return;
  } else {
    let mid = Math.floor((lowerbound + upperbound) / 2); // (0+5)/2 = 2.5 => 2
    recursiveMergeSort(workspace, lowerbound, mid, array);
    recursiveMergeSort(workspace, mid + 1, upperbound, array);
    merge(workspace, lowerbound, mid + 1, upperbound, array);
  }
}

/**
 * Merging the array and sorting the 2 halves for it.
 * @param {*} workspace
 * @param {*} lowPtr
 * @param {*} highPtr
 * @param {*} upperbound
 * @param {*} array
 */
function merge(workspace, lowPtr, highPtr, upperbound, array) {
  let lowerbound = lowPtr;
  let mid = highPtr - 1;
  let n = upperbound - lowerbound + 1;
  let j = 0;
  console.log("-----WORK SPACE START-----");
  console.log(workspace, lowerbound, mid, upperbound);
  console.log("-----WORK SPACE START-----");

  while (lowPtr <= mid && highPtr <= upperbound) {
    console.log(lowPtr, ",", highPtr);
    if (array[lowPtr] < array[highPtr]) {
      workspace[j++] = array[lowPtr++];
    } else {
      workspace[j++] = array[highPtr++];
    }
  }
  console.log("-----WORK SPACE In MID-1-----");
  console.log(workspace, lowerbound, mid, upperbound);
  console.log("-----WORK SPACE In Mid-1-----");
  while (lowPtr <= mid) {
    workspace[j++] = array[lowPtr++];
  }
  while (highPtr <= upperbound) {
    workspace[j++] = array[highPtr++];
  }
  console.log("-----WORK SPACE-----");
  console.log(workspace, lowerbound, mid, upperbound);
  console.log("-----WORK SPACE-----");
  for (j = 0; j < n; j++) {
    array[lowerbound + j] = workspace[j];
  }
}

/**
 * Demo function to show how the 2 sorted arrays can be merged together to form the
 * single sorted array.
 */
function demo() {
  let array1 = new Array(5),
    array2 = getArray(null, 7);
  getArray(array1, array1.length);

  console.log(`Raw Input function...`);

  console.log(array1);
  console.log(array2);

  console.log("---------------------");

  console.log(`After insertion sorting the arrays`);
  insertionSort(array1);
  insertionSort(array2);

  console.log("---------------------");

  console.log(array1);
  console.log(array2);

  console.log("---------------------");

  console.log(mergeTwoSortedArrays(array1, array2));

  let array3 = [43, 5, 11, 3, 15];
  recursiveMergeSort([0, 0, 0, 0, 0], 0, 4, array3);
  console.log("---------------------");
  console.log(array3);
}

demo();

module.exports = {
  mergeTwoSortedArrays: mergeTwoSortedArrays,
  recursiveMergeSort: recursiveMergeSort,
};