function addHandler(obj, type, fn){
	if(obj && obj.addEventListener){
		obj.addEventListener(type, fn, false);
	}else if(obj && obj.attachEvent){
		obj.attachEvent('on' + type, fn);
	}else{
		obj['on' + type] = fn;
	}
}

var tBody = document.getElementById('table').childNodes[1];
var order = document.getElementById('order');
var btn = document.getElementById('btn');
var dirs = ["Top", "Right", "Bottom", "Left"];
/**
 * [getBlock 获取方块单元格对象]
 * @param  {[type]} x [横轴方向]
 * @param  {[type]} y [竖轴方向]
 * @return {[type]}   [对象]
 */
function getBlock(x,y){
	return tBody.childNodes[y*2].childNodes[x*2+1];
}
//设置方块div样式方向
function setDir(block, d){
	block.className = d;
}
//设置方块头部红色区域div
function setDiv(block){
	block.innerHTML = "<div></div>";
}
//清除单元格中的div
function cleanDiv(block){
	block.innerHTML = '';
}
//更新单元格
function setBlock(block){
	setDiv(block);
	setDir(block, dirs[blockNow.dir]);
	//清除之前单元格的格式与div
	setDir(blockNow.Block, '');
	cleanDiv(blockNow.Block);
	//新单元格对象赋予全局单元格对象
	blockNow.Block = block;
}
//定义方块位置全局对象
var blockNow = {
	//获取在表格中的方块对象
	Block : getBlock(5, 5),
	//left
	dir : 3,
	X : 5,
	Y : 5
}


setDiv(blockNow.Block);
setDir(blockNow.Block, "Left");
//方块移动函数
function GO(){
	switch(blockNow.Block.className){
		case 'Left':
			if(blockNow.X > 1){
				blockNow.X--;
				//更新方块单元格对象
				var newBlock = getBlock(blockNow.X, blockNow.Y);
				setBlock(newBlock);
			}
		case 'Right':
			if(blockNow.X < 10){
				blockNow.X++;
				var newBlock = getBlock(blockNow.X, blockNow.Y);
				setBlock(newBlock);
			}
		case 'Bottom':
			if(blockNow.Y < 10){
				blockNow.Y++;
				var newBlock = getBlock(blockNow.X, blockNow.Y);
				setBlock(newBlock); 
			}
		case 'Left':
			if(blockNow.Y > 1){
				blockNow.Y--;
				var newBlock = getBlock(blockNow.X, blockNow.Y);
				setBlock(newBlock);
			}
	}
}
//方块转向函数
function calDir(z){
	var d = (blockNow.dir + z >= 0 ? blockNow.dir + z : 3)%4;
	blockNow.dir = d;
	setDir(blockNow.Block, dirs[d]);
}

window.onload = function(){
	addHandler(btn, 'click', function(){
		switch(order.value.trim()){
			case 'GO':
				GO();
				break;
			case 'TUN LEF':
				calDir(-1);//函数未完成
				break;
			case 'TUN RIG':
				calDir(1);//函数未完成
				break;
			case 'TUN BAC':
				calDir(2);//函数未完成
				break;
		}
	});
}