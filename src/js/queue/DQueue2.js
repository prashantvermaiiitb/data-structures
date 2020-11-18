class DQueue {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.array = new Array(this.maxSize).fill(0);
    this.frontLeft = 0;
    this.rearLeft = -1;
    this.items = 0;
    this.frontRight = this.maxSize - 1;
    this.rearRight = this.maxSize;
  }
  enQueue(element, fromLeft = true) {
    if (this.isFull()) {
      console.log(`Q already full no space to push.. ${element}`);
      return false;
    }
    if (fromLeft) {
      this.array[++this.rearLeft] = element;
      this.frontRight = this.rearLeft; //rearLeft and frontRight are the endpoints towards right
    } else {
      this.array[--this.rearRight] = element;
      this.frontLeft = this.rearRight; //rearRight and frontLeft
    }
  }
  isFull(){
      return this.items == this.maxSize;
  }
  demo() {
    let myDQueue = new DQueue();
  }
}
