#!/usr/bin/node

import { Tree, prettyPrint } from "./tree.js";

// Driver script to test the BST as per assignment instructions

// Generate a random array
const arrayLength = 10;
const arrayMax = 50;
const randomArray = Array.from({ length: arrayLength }, () =>
  Math.ceil(Math.random() * arrayMax)
);

// Build a binary search tree form the array
const myTree = Tree(randomArray);

// Confirm the tree is balanced
console.log(myTree.isBalanced());

// Print elements in level, pre, post and inorder
console.log(myTree.levelOrder());
console.log(myTree.preorder());
console.log(myTree.inorder());
console.log(myTree.postorder());

// Add several large numbers to unbalance tree
myTree.insert(arrayMax + 1);
myTree.insert(arrayMax + 2);
myTree.insert(arrayMax + 3);

// Confirm the tree is unbalanced
console.log(myTree.isBalanced());
// Rebalance the tree
myTree.rebalance();

// Confirm the tree is balanced
console.log(myTree.isBalanced());

// Print elements in level, pre, post and inorder
console.log(myTree.levelOrder());
console.log(myTree.preorder());
console.log(myTree.inorder());
console.log(myTree.postorder());

prettyPrint(myTree.root);
