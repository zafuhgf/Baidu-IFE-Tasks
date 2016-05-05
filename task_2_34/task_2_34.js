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

