//事件适配
function addHandler(obj, type, fn){
	if(obj && obj.addEventListener){
		obj.addEventListener(type, fn);
	}else if(obj.attachEvent){
		obj.attachEvent('on' + type, fn);
	}else{
		obj['on' + type] = fn;
	}
}
//$
function $(id){
	return document.querySelector(id);
}
//初始化页面长宽
var Width = 10,
	Height = 10;
//获取元素
var oCon = $('#container');
var oOrder = $('#order');
var oBtn = $('#btn');
//初始化页面
function createMaze(){
	//创建文档碎片
	var fragment = document.createDocumentFragment();
	//10*10网格
	for(var i = 0; i < Width; i++){
		for(var j = 0; j < Height; j++){
			var oDiv = document.createElement('div');
			oDiv.className = "maze-block";
			if(j == 0 && i != 0){
				oDiv.style.clear = "both"; 
			}
			if(j == 9){
				oDiv.className += " right-maze-block";
			}
			if(i == 9){
				oDiv.className += " bottom-maze-blcok";
			}
			fragment.appendChild(oDiv);
	 	}
	}
	//文档碎片添加到容器container
	oCon.appendChild(fragment);
}
//创建移动方块
function createAction(){
	var action = document.createElement('div');
	action.className = "action";
	action.style.position = "absolute";
	action.style.left = Math.ceil(Math.random() * 9) * 43 + 'px';
	action.style.top = Math.ceil(Math.random() * 9) * 43 + 'px';
	action.style.transform = "rotateZ(0deg)";
	oCon.appendChild(action);
}
//设置移动方块转向
function setDirection(degree){
	var action = $('.action');
	var predegreee = parseInt((action.style.transform).match(/[-]*\d+/g)[0]);//获得先前角度度数
	action.style.transform = 'rotateZ(' + (degree + predegreee ) + 'deg)';
}
//指令
var orders = {
	orderGo: function(num){
		var action = $('.action');
		// console.log(action);
		var degree = parseInt((action.style.transform).match(/[-]*\d+/g)[0]);
		// console.log(degree);
		//小技巧
		if(num != 110){
			degree = num;
			// console.log(degree);
		}
		switch(degree % 360){
			// TOP 
			case -0:
			case 0:{
					if(action.style.top == '0px'){
						alert("已到达边界处，无法前进！");
						return false;
					}
					action.style.top = (parseInt(action.style.top) - 43) + 'px';
					break;
				}
			// RIGHT
			case -270:
			case 90:{
				if(action.style.left == '387px'){
					alert("已到达边界处，无法前进！");
					return false;
				}
				action.style.left = (parseInt(action.style.left) + 43) + 'px';
				break;
			}
			// BOTTOM
			case -180:
			case 180:{
				if(action.style.top == '387px'){
					alert("已到达边界处，无法前进！");
					return false;
				}
				action.style.top = (parseInt(action.style.top) + 43) + 'px';
				break;
			}
			// LEFT
			case -90:
			case 270:{
				if(action.style.left == '43px'){
					alert("已到达边界处，无法前进！");
					return false;
				}
				action.style.left = (parseInt(action.style.left) - 43) + 'px';
			}
		}
	},

	//转向函数
	orderLeft: function(){
		setDirection(-90);
	},
	orderRight: function(){
		setDirection(90);
	},
	orderBottom: function(){
		setDirection(180);
	},
	//移动但不转向函数
	orderTraLeft: function(){
		this.orderGo(270);
	},
	orderTraRight: function(){
		this.orderGo(90);
	},
	orderTraBottom: function(){
		this.orderGo(180);
	},
	orderTraTop: function(){
		this.orderGo(0);
	},
	//转向且移动
	orderMovLeft: function(){
		this.action.style.transform = 'rotateZ(-90deg)';
		this.orderGo(110);
	},
	orderMovTop: function(){
		this.action.style.transform = 'rotateZ(0deg)';
		this.orderGo(110);
	},
	orderMovBottom: function(){
		this.action.style.transform = 'rotateZ(180deg)';
		this.orderGo(110);
	},
	orderMovRight: function(){
		this.action.style.transform = 'rotateZ(90deg)';
		this.orderGo(110);
	}

}
//页面加载
window.onload = function(){
	createMaze();
	createAction();
	// console.log(($('.action').style.transform).match(/[-]*\d+/g)[0]);
	// console.log($('.action').style.left);
	addHandler(oBtn, 'click', function(){
		var command = oOrder.value.toUpperCase();
		// console.log(command);
		switch(command){
			case 'GO': return orders.orderGo(110);
			case 'TUN LEF': return orders.orderLeft();
			case 'TUN RIG': return orders.orderRight();
			case 'TUN BAC': return orders.orderBottom();
			case 'TRA LEF': return orders.orderTraLeft();
			case 'TRA TOP': return orders.orderTraTop();
			case 'TRA BOT': return orders.orderTraBottom();
			case 'TRA RIG': return orders.orderTraRight();
			case 'MOV LEF': return orders.orderMovLeft();
			case 'MOV TOP': return orders.orderMovTop();
			case 'MOV BOT': return orders.orderMovBottom();
			case 'MOV RIG': return orders.orderMovRight();
		}
		alert("输入指令错误！");
	});

	//键盘方向键控制
	addHandler(document, 'keyup', function(e){
		switch(e.keycode){
			case 37: return orders.orderLeft();
            case 38: return orders.orderGo(111);
            case 39: return orders.orderRight();
            case 40: return orders.orderBottom();
            case 73: return orders.orderTraTop();
            case 74: return orders.orderTraLeft();
            case 75: return orders.orderTraBottom();
            case 76: return orders.orderTraRight();
            case 87: return orders.orderMovTop();
            case 65: return orders.orderMovLeft();
            case 68: return orders.orderMovRight();
            case 83: return orders.orderMovBottom();
		}
	});
}
