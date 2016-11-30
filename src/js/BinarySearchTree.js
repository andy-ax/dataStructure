function BinarySearchTree () {
	//节点构造函数
	var node = function (key) {
		this.key = key;
		this.left = null;
		this.right = null;
	};

	this.root = null;

	//插入键(帮助函数)
	var insertNode = function (node, newNode) {
		if (newNode.key < node.key) {
			if (node.left === null) {
				node.left = newNode;
			} else {
				insertNode(node.left, newNode);
			}
		} else {
			if (node.right === null) {
				node.right = newNode;
			} else {
				insertNode(node.right, newNode);
			}
		}
	};
	//插入键
	BinarySearchTree.prototype.insert = function (key) {
		var newNode = new node(key);

		if (!this.root) {//如果根节点为null则直接将根节点设为newNode
			this.root = newNode;
		} else {
			insertNode(this.root,newNode);//否则跳转到insertNode
		}
	};


	//callback(val){...val相关操作}
	var inOrderTraverseNode = function(node, callback){
		if (node !== null) {
			inOrderTraverseNode(node.left, callback);
			callback(node.key);
			inOrderTraverseNode(node.right, callback);
		}
	};
	//中序遍历
	BinarySearchTree.prototype.inOrderTraverse = function (callback) {
		inOrderTraverseNode(this.root, callback);
	};

	var preOrderTraverseNode = function(node, callback){
		if (node !== null) {
			callback(node.key);
			preOrderTraverseNode(node.left, callback);
			preOrderTraverseNode(node.right, callback);
		}
	};
	//先序遍历
	BinarySearchTree.prototype.preOrderTraverse = function (callback) {
		preOrderTraverseNode(this.root, callback);
	};

	var postOrderTraverseNode = function(node, callback){
		if (node !== null) {
			postOrderTraverseNode(node.left, callback);
			postOrderTraverseNode(node.right, callback);
			callback(node.key);
		}
	};
	//后序遍历
	BinarySearchTree.prototype.postOrderTraverse = function (callback) {
		postOrderTraverseNode(this.root, callback);
	};

	var minNode = function (node) {
		if (node !== null) {
			while (node && node.left !== null) {
				node = node.left;
			}

			return node;
		}
		return null;
	};
	//最小值
	BinarySearchTree.prototype.min = function () {
		return minNode(this.root).key;
	};

	var maxNode = function (node) {
		if (node !== null) {
			while (node && node.right !== null) {
				node = node.right;
			}

			return node;
		}
		return null;
	};
	//最大值
	BinarySearchTree.prototype.max = function () {
		return maxNode(this.root).key;
	};

	var searchNode = function (node, key) {
		if (node === null) {
			return false;
		}
		if (key < node.key) {//左值
			return searchNode(node.left, key);
		} else  if (key > node.key) {//右值
			return searchNode(node.right, key);
		} else {//当前值
			return true;
		}
	};
	//搜索树
	var search = function (key) {
		return searchNode(this.root,key);
	};

	var removeNode = function (node, key) {
		if (node === null) {//节点不存在
			return null;
		}
		if (key < node.key) {//左值
			node.left = removeNode(node.left, key);
			return node;
		} else if (key > node.key) {//右值
			node.right = removeNode(node.right, key);
			return node;
		} else {
			//没有子节点
			if (node.left === null && node.right === null) {
				node = null;
				return node;
			}

			//有一个子节点
			if (node.left === null) {
				node = node.right;
				return node;
			} else if (node.right === null) {
				node = node.left;
				return node;
			}

			//有两个子节点
			var aux = minNode(node.right);
			node.key = aux.key;
			node.right = removeNode(node.right, aux.key);
			return node;
		}
 	};
	var remove = function (key) {
		this.root = removeNode(this.root, key);
	}
}
