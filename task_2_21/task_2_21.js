//事件适配器
function addEvent(obj, type, fn){
	if (obj && obj.addEventListener) {
		obj.addEventListener(type, fn, false);
	}else if (obj && obj.attachEvent) {
		obj.attachEvent('on' + type, fn);
	}else{
		obj['on' + type] = fn;
	}	
}
//创建$(id)函数
function $(id){
	return document.getElementById(id);
}
//获取页面元素
var oTag = $("tag"),
	tagDisplay = $("tag-display"),
	oHobby = $("hobby"),
	oConfirm = $("confirm"),
	hobbyDisplay = $("hobby-display");

//实例化对象
var tagObj = new createList(tagDisplay), 
	hobbyObj = new createList(hobbyDisplay); 

//页面加载
window.onload = function(){
	//Tag标签输入
	addEvent(oTag, 'keyup', showTag);
	//Hobby爱好输入
	addEvent(oConfirm, 'click', showHobby);
	//鼠标经过Tag标签
	addEvent(tagDisplay, 'mouseover', function(e){
		if(e.target && e.target.nodeName == "DIV"){
			e.target.firstChild.insertData(0, "点击删除");
			e.target.style.background = "red";
		}
	});
	//鼠标离开Tag标签
	addEvent(tagDisplay, 'mouseout', function(e){
		if (e.target && e.target.nodeName == "DIV"){
			e.target.firstChild.deleteData(0, 4);
			e.target.style.background = "#11EAF1";
		};
	});
	//鼠标点击Tag标签
	addEvent(tagDisplay, 'click', function(e){
		if (e.target && e.target.nodeName == "DIV"){
			tagDisplay.removeChild(e.target);
		}
	});
}
//构造函数与原型混合方式
function createList(divList){
	//将Tag存入queue数组中
	this.queue = [];
	//render渲染函数
	this.render = function(){
		var str = '';
		this.queue.forEach(function(e){
			str += '<div>' + e + '</div>';
		});
		divList.innerHTML = str;	
	}
}
//向Tag的queue最后加入数组元素
createList.prototype.rightPush = function(str){
	this.queue.push(str);
	this.render();
};
//Tag的queue删除第一个数组元素
createList.prototype.leftShift = function(){
	this.queue.shift();
	this.render();
};
//输入内容分割处理
function splitInput(str){
	var arrInput = str.trim().split(/[,，;；、。.\s\n]+/);
	return arrInput;
}
//showTag函数
function showTag(){
	if(/[,，;；、\s\n]+/.test(oTag.value) || event.keycode == 13){
		var data = splitInput(oTag.value);
		var newTag = data[0];
		//判断是否有Tag重复
		if(tagObj.queue.indexOf(newTag) === -1){
			tagObj.rightPush(newTag);
			//判断Tag数是否超过10
			if (tagObj.queue.length > 10){
				tagObj.leftShift();
			}
		}
		tagObj.render();
		oTag.value = "";
	}
}
//showHobby函数
function showHobby(){
	var data = splitInput(oHobby.value);
	data.forEach(function(e){
		if(hobbyObj.queue.indexOf(e) === -1){
			hobbyObj.rightPush(e);
			if(hobbyObj.queue.length > 10){
				hobbyObj.leftShift();
			}
		}
		hobbyObj.render();
		oHobby.value = "";
	});	
}





