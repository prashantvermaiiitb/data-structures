"use strict";

var Stack = require("../stack/Stack");
/**
 * Binary Tree data structure
 * - have Root node
 * - Root can have more children but atmost 2
 * - Left or Right child are being used for this purpose
 * - Value in the treeNode is like Left < Root <= Right
 * - If difference in the height of 1 subtree is greater than 2 then tree is not balanced.
 * - Binary search tree are ordered
 * - slower than the operation that could be performed on HASHTABLE
 */

/**
 * Basic Node class for the Binary search tree
 */
class Node {
  /**
   * constructor
   * @param {*} data
   * @param {*} left
   * @param {*} right
   */
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
  /**
   * display method for the current node
   */
  display() {
    console.log(`${this.data}`);
  }
}

/**
 * Class for the Binary Search Tree
 */
class BinarySearchTree {
  /**
   * constructor
   */
  constructor() {
    this.root = null; //top of the tree
  }

  /**
   * Searching the tree for the value
   * @param {*} searchKey
   */
  search(searchKey) {
    let current = this.root;
    while (current.data !== searchKey) {
      if (current.data < searchKey) {
        current = current.right;
      } else {
        current = current.left;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }

  /**
   * Recusive way to add the node in the tree
   */
  addRecursively(node, data) {
    //with recursion
    const searchTree = function (node, data) {
      if (node.data < data) {
        //look out in the right child
        if (node.right === null) {
          node.right = new Node(data);
          return;
        } else {
          return searchTree(node.right, data);
        }
      } else if (node.data > data) {
        //look out for the left child
        if (node.left === null) {
          node.left = new Node(data);
          return;
        } else {
          return searchTree(node.left, data);
        }
      } else {
        //duplicates are not allowed
        return null;
      }
    };
    searchTree(node, data);
  }
  /**
   * Adding the node non-recursively
   * @param {*} node
   * @param {*} data
   */
  addNonRecursive(node, data) {
    //way the lafore goes without recursion
    let parent,
      current = this.root,
      isLeftChild = false;
    while (true) {
      parent = current;
      if (current.data < data) {
        isLeftChild = false;
        current = current.right;
      } else {
        isLeftChild = true;
        current = current.left;
      }
      if (current == null) {
        break;
      }
    }
    //at this point parent/current will be having proper position
    if (isLeftChild) {
      parent.left = node;
    } else {
      parent.right = node;
    }
  }
  /**
   * Adding data in the binary search tree
   * @param {*} data
   */
  add(data, type = 2) {
    let node = this.root;
    let newNode = new Node(data);
    if (node == null) {
      //if the tree is empty
      this.root = newNode;
      return;
    } else {
      if (type === 1) {
        this.addRecursively(node, data);
      } else {
        this.addNonRecursive(newNode, data);
      }
    }
  }

  /**
   * Getting the inorder successor of the node that's supposed to be deleted.
   * @param {*} delnode
   */
  getInorderSuccessor(delnode) {
    let successorParent = delnode,
      successor = delnode,
      current = delnode.right;
    while (current !== null) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }
    //if we have an inorder successor for the node to be deleted
    if (successor !== delnode.right) {
      successorParent.left = successor.right;
      successor.right = delnode.right;
    }
    return successor;
  }
  /**
   * Remove the node from the tree
   * there are 4 use-cases overall
   * - node with no children - leaf node
   * - node with 1 children - either left or right
   * - node with 2 children - either left or right of it's parent
   * @param {*} data
   */
  remove(data, type = 2) {
    if (type === 1) {
      this.removeRecursive(data);
    } else {
      this.removeNonRecurisve(data);
    }
  }

  /**
   * Non-recursive version of the remove method
   * @param {*} data
   */
  removeNonRecurisve(data) {
    let parent,
      current = this.root,
      isLeftChild;
    while (current.data !== data) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        isLeftChild = true;
      } else {
        isLeftChild = false;
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    //leaf node
    if (current.left == null && current.right == null) {
      if (current === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (current.left == null) {
      //has right child
      if (current === this.root) {
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else if (current.right == null) {
      //has left child
    } else {
      //current has 2 child nodes
      let successor = this.getInorderSuccessor(current);
      if (current === this.root) {
        this.root = successor;
      } else if (isLeftChild) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
      successor.left = current.left;
    }
  }

  /**
   * Remove recursively the data being asked for from the tree
   * @param {*} data
   */
  removeRecursive(data) {
    const removeNode = function (node, data) {
      if (node === null) {
        //empty tree i.e. root == null -> true
        return null;
      }
      if (data === node.data) {
        //left node
        if (node.left === null && node.right === null) {
          return null;
        }
        //node with right child
        if (node.left === null) {
          return node.right;
        }
        //node with left child
        if (node.right === null) {
          return node.left;
        }
        //node with 2 children
        var successor = node.right;
        while (successor.left !== null) {
          successor = successor.left;
        }
        node.data = successor.data;
        node.right = removeNode(node.right, successor.data); //remove the successor from the tree of which node.right is the Root node.
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };

    this.root = removeNode(this.root, data);
  }
  /**
   * finding  the minimum element in the tree
   */
  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }
  /**
   * finding the maximum element in the tree
   */
  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
  /**
   * Root -> Left -> Right
   * @param {*} node
   */
  preOrder(node) {
    if (node !== null) {
      node.display();
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }
  /**
   * Left -> Right -> Root
   * @param {*} node
   */
  postOrder(node) {
    if (node !== null) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      node.display();
    }
  }
  /**
   * Left -> Root -> Right
   * @param {*} node
   */
  inOrder(node) {
    if (node !== null) {
      this.inOrder(node.left);
      node.display();
      this.inOrder(node.right);
    }
  }
  /**
   * Queue implementation for the level order
   */
  levelOrderQueue() {
    //approach 1
    let result = [];
    let Q = [];
    if (this.root !== null) {
      Q.push(this.root);
      while (Q.length > 0) {
        let tempNode = Q.shift(); // get the Front element out of it
        result.push(tempNode);
        tempNode.left !== null && Q.push(tempNode.left);
        tempNode.right !== null && Q.push(tempNode.right);
      }
      result.forEach((node) => {
        node.display();
      });
    } else {
      console.log(`Tree is empty and nothing to display :(`);
    }
  }

  /**
   * stack implementation for the level order
   */
  levelOrderStack() {
    //approach 2
    /**
     * take 2 stacks
     * 1 global - push this.root in that
     * boolean flag for content presence
     * 1 local stack
     * while global has content
     *    - pop() of the global
     *    - put it in the local
     *    - display the local
     *    - push the left / right child in local
     *    while the local is not empty
     *       - pop() the local and put that in global
     */
    let myGlobalStack = new Stack(),
      isLocalStackEmpty = false;

    myGlobalStack.push(this.root);
    while (!isLocalStackEmpty) {
      let localStack = new Stack();
      isLocalStackEmpty = true;
      while (!myGlobalStack.isEmpty()) {
        let tempNode = myGlobalStack.pop();
        if (tempNode !== null) {
          tempNode.display();
          localStack.push(tempNode.left);
          localStack.push(tempNode.right);
          if (tempNode.left !== null || tempNode.right !== null) {
            isLocalStackEmpty = false;
          }
        } else {
          localStack.push(null);
          localStack.push(null);
        }
      }
      while (!localStack.isEmpty()) {
        myGlobalStack.push(localStack.pop());
      }
    }
  }

  /**
   * Doing breadth first search traversal for the tree
   * @param {*} node
   */
  levelOrder(type = 2) {
    type == 2 ? this.levelOrderQueue() : this.levelOrderStack();
  }

  /**
   * Traversing the tree
   * @param {*} type
   */
  traverse(type) {
    switch (type) {
      case 1:
        console.log(`PRE ORDER DISPLAY OF THE TREE :`);
        this.preOrder(this.root);
        break;
      case 3:
        console.log(`POST ORDER DISPLAY OF THE TREE :`);
        this.postOrder(this.root);
        break;
      case 4:
        console.log(`Queue LEVEL ORDER DISPLAY OF THE TREE :`);
        this.levelOrder(2);
        break;
      case 5:
        console.log(`Stack LEVEL ORDER DISPLAY OF THE TREE :`);
        this.levelOrder(1);
        break;

      case 2:
      default:
        console.log(`IN ORDER DISPLAY OF THE TREE :`);
        this.inOrder(this.root);
        break;
    }
  }
  /**
   * If the delta among the tree heights is less than equal to 1
   * @param {*} node
   */
  isTreeBalanced(node) {
    this.findMaxHeight(node) - this.findMinHeight(node) <= 1;
  }
  /**
   * Getting the minimum height of the subtree
   * @param {*} node
   */
  findMinHeight(node = this.root) {
    if (node === null) {
      return -1;
    }
    const left = this.findMinHeight(node.left);
    const right = this.findMinHeight(node.right);
    if (left < right) {
      //whichever is small should be taken
      return left + 1;
    } else {
      return right + 1;
    }
  }

  /**
   * finding the maximum height of the tree
   * @param {*} node
   */
  findMaxHeight(node = this.root) {
    if (node === null) {
      return -1;
    }
    const left = this.findMaxHeight(node.left);
    const right = this.findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  /**
   * Demo for the functionality
   */
  static demo() {
    let myTree = new BinarySearchTree();
    myTree.add(81, 1); //inserting through recursive
    myTree.add(40, 1);
    myTree.add(100, 1);
    myTree.add(90, 1);
    myTree.add(20, 1);
    // myTree.traverse(1);
    // myTree.traverse(2);
    // myTree.traverse(3);
    myTree.add(70);
    myTree.add(60);
    myTree.add(110);
    myTree.add(101);
    myTree.add(200);
    // myTree.traverse(1);
    myTree.traverse(2);
    myTree.traverse(4);
    myTree.traverse(5);
    console.log(`minimum element in the tree`, myTree.findMin());
    console.log(`maximum element in the tree`, myTree.findMax());
    console.log(myTree.search(100));
    // console.log(myTree.root);

    console.log("------------------------------------------------------");
    console.log(`Minimum height of the tree`, myTree.findMinHeight());
    console.log(`Maximum height of the tree`, myTree.findMaxHeight());
    console.log("------------------------------------------------------");

    console.log(
      `\nremoving 60 from the Tree as leaf node left child example.\n`
    );
    myTree.remove(60);
    // myTree.traverse(2);
    // console.log(myTree.root);

    console.log(
      `\nremoving 200 from the Tree as leaf node left child example.\n`
    );
    myTree.remove(200);
    myTree.traverse(2);
    console.log(`maximum element in the tree`, myTree.findMax());
    console.log(myTree.root);

    console.log("------------------------------------------------------");
    console.log(`Minimum height of the tree`, myTree.findMinHeight());
    console.log(`Maximum height of the tree`, myTree.findMaxHeight());
    console.log("------------------------------------------------------");

    console.log(`\nremoving 40 from the Tree as 2 child node example.\n`);
    myTree.remove(40);
    myTree.traverse(2);
    console.log(`minimum element in the tree`, myTree.findMin());
    // console.log(myTree.root);

    console.log(
      `\nremoving 100 from the Tree as 2 child node with inorder successor example.\n`
    );
    myTree.remove(100, 1);
    myTree.traverse(2);
    console.log(`Maximum element in the tree`, myTree.findMax());
    // console.log(myTree.root);

    console.log("------------------------------------------------------");
    console.log(`Minimum height of the tree`, myTree.findMinHeight());
    console.log(`Maximum height of the tree`, myTree.findMaxHeight());
    console.log("------------------------------------------------------");
  }
}
BinarySearchTree.demo();
