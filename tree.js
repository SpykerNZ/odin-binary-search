export const TreeNode = (value) => {
  const data = value;
  const left = null;
  const right = null;

  return {
    data,
    left,
    right,
  };
};

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export const Tree = (array) => {
  const sortedUniqueArray = [...new Set(array.sort((a, b) => a - b))];
  let root = buildTree(sortedUniqueArray);

  function buildTree(array, start = 0, end = array.length - 1) {
    // Builds a balanced binary tree
    // 'Array' argument must be a sorted unique array
    if (start > end) return null;
    const mid = parseInt((start + end) / 2);
    const node = TreeNode(array[mid]);
    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);
    return node;
  }

  function insert(value, node = this.root) {
    // Create node if it does not exist
    if (node === null) return TreeNode(value);
    // If there is already a duplicate, don't create any new node!
    if (node.data === value) return node;
    // Insert a value into the tree left or right
    if (node.data > value) {
      node.left = insert(value, node.left);
    } else if (node.data < value) {
      node.right = insert(value, node.right);
    }
    return node;
  }

  function remove(value, node = this.root) {
    // base case
    if (node == null) return;
    // Check which direction to remove nodes!
    if (node.data > value) {
      node.left = remove(value, node.left);
    } else if (node.data < value) {
      node.right = remove(value, node.right);
    } else {
      // if the node has no child
      if (node.left == null && node.right == null) {
        return null;
      }
      // node with one child
      else if (node.left == null) {
        return node.right;
      } else if (node.right == null) {
        return node.leftl;
      }
      // If node has two children!
      // Get inorder successor
      else {
        let temp = minValueNode(node.right);
        node.data = temp.data;
        node.right = remove(node.data, node.right);
      }
    }
    return node;
  }

  function minValueNode(node) {
    let current = node;
    while (current.left != null) current = current.left;
    return current;
  }

  function find(value) {
    // Find the value and return the related node
    let current = this.root;
    while (current != null) {
      if (current.data == value) return current;
      else if (current.left > value) current = current.left;
      else current = current.right;
    }
  }

  function getData(node) {
    // default function for returning node data
    return node.data;
  }

  function levelOrder(func = getData) {
    // traverse the tree breadth-first level
    // then use node as argument to function!
    let discoveredNodes = [root];
    let result = [];
    while (discoveredNodes.length > 0) {
      let current = discoveredNodes.shift();
      result.push(func(current));
      if (current.left != null) discoveredNodes.push(current.left);
      if (current.right != null) discoveredNodes.push(current.right);
    }
    return result;
  }

  function inorder(func = getData, node = this.root, result = []) {
    // traverse the tree inorder
    if (node == null) return;
    inorder(func, node.left, result);
    result.push(func(node));
    inorder(func, node.right, result);
    return result;
  }

  function preorder(func = getData, node = this.root, result = []) {
    // traverse the tree preorder
    if (node == null) return;
    result.push(func(node));
    preorder(func, node.left, result);
    preorder(func, node.right, result);
    return result;
  }

  function postorder(func = getData, node = this.root, result = []) {
    // traverse the tree postorder
    if (node == null) return;
    postorder(func, node.left, result);
    postorder(func, node.right, result);
    result.push(func(node));
    return result;
  }

  function height(node = this.root) {
    // Get the height of a node
    if (node == null) return 0;
    const left_height = height(node.left);
    const right_height = height(node.right);
    return Math.max(left_height, right_height) + 1;
  }

  function depth(value, node = this.root) {
    // Get the depth of a node
    if (node == null) return 0;
    if (node.data == value) return 1;
    let left_depth = depth(value, node.left);
    if (left_depth != 0) return left_depth + 1;
    let right_depth = depth(value, node.right);
    if (right_depth != 0) return right_depth + 1;
    return 0;
  }

  function isBalanced(node = this.root) {
    // Check if the tree is balanced
    return Math.abs(height(node.left) - height(node.right)) <= 1;
  }

  function rebalance() {
    // Rebalance the binary search tree
    const arr = inorder(getData, this.root);
    this.root = buildTree(arr);
  }

  return {
    root,
    insert,
    remove,
    find,
    levelOrder,
    preorder,
    inorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};
