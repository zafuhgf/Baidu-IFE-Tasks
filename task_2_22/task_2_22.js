w//事件适配器
function addEvent(obj, type, fn){
	if(obj && obj.addEventListener){
		obj.addEventListener(type, fn, false);
	}else if(obj && obj.attachEvent){
		obj.attachEvent('on' + type, fn);
	}else{
		obj['on' + type] = fn;
	}
}
//获取页面元素
var oRoot = document.querySelector('.root'),
	oBtns = document.querySelectorAll('input'),
	preBtn = oBtns[0],
	inBtn = oBtns[1],
	postBtn = oBtns[2],
	//实例化TreeOrder对象
	treeOrder = new TreeOrder();
//页面加载执行
window.onload = function(){
	//先序遍历
	addEvent(preBtn, 'click', function(){
		treeOrder.preOrder(oRoot);
		treeOrder.render();
	});
	//中序遍历
	addEvent(inBtn, 'click', function(){
		treeOrder.inOrder(oRoot);
		treeOrder.render();
	});
	//后序遍历
	addEvent(postBtn, 'click', function(){
		treeOrder.postOrder(oRoot);
		treeOrder.render();
	});
}
//构造函数与原型混合方式
function TreeOrder(){
	//存储节点元素
	this.treeStack = [];
	this.treeOrdering = false;
}
//先序遍历
TreeOrder.prototype.preOrder = function(node){
	this.treeStack.push(node);
	if(node.firstElementChild){
		this.preOrder(node.firstElementChild);
	}
	if (node.lastElementChild){
		this.preOrder(node.lastElementChild);
	}
}
//中序遍历
TreeOrder.prototype.inOrder = function(node){
	if(node.firstElementChild){
		this.inOrder(node.firstElementChild);
	}
	this.treeStack.push(node);
	if (node.lastElementChild){
		this.inOrder(node.lastElementChild);
	}
}
//后序遍历
TreeOrder.prototype.postOrder = function(node){
	if(node.firstElementChild){
		this.postOrder(node.firstElementChild);
	}
	if (node.lastElementChild){
		this.postOrder(node.lastElementChild);
	}
	this.treeStack.push(node);
}
//渲染动画函数
TreeOrder.prototype.render = function(){
	var treeStack = this.treeStack,
		speeder = document.querySelector("#speeder"),
		item = 0,
		self = this,//this再赋值给self的原因？
		timer = null;
	self.treeStack = [];//why?
	if(!self.treeOrdering){
		self.treeOrdering = true;
		treeStack[item].style.backgroundColor = "#F125C2";
		timer = setInterval(function(){
			if(item == treeStack.length-1){
				treeStack[item].style.backgroundColor = "#fff";
				self.treeOrdering = false;
				clearInterval(timer);
			}else{
				++item;
				treeStack[item-1].style.backgroundColor = "#fff";
				treeStack[item].style.backgroundColor = "#F125C2";
			}
		},speeder.value);
	}

}