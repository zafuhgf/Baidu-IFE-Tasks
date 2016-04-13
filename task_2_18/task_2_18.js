//创建事件适配器函数
function addEvent(obj, type, fn){
	if(obj && obj.addEventListener){
		obj.addEventListener(type, fn, false);
	}else if(obj && obj.attachEvent){
		obj.attachEvent('on'+type, fn);
	}else{
		obj['on'+type] = fn;
	}
}
//创建$(id)函数
function $(id){
	return document.getElementById(id);
}

window.onload = function(){
	var content = $("cont-in");
	var input = document.getElementsByClassName("btn");
	var ul = document.getElementsByTagName("ul")[0];
	//左侧入
	input[0].onclick = function(){
		if (content.value.length <= 0 || content.value.match(/[^0-9]/)) {
			alert("输入有误，请重新输入！");
			return false;
		}
		var newLi = document.createElement("li");
		newLi.innerHTML = content.value;	
		ul.insertBefore(newLi, ul.firstChild);
		//增加点击删除函数
		newLi.onclick = delLi;
		content.value = null; 	
	}
	//右侧入
	input[1].onclick = function(){
		if (content.value.length <= 0 || content.value.match(/[^0-9]/)) {
			alert("输入有误，请重新输入！");
			return false;
		}
		var newLi = document.createElement("li");
		newLi.innerHTML = content.value;	
		ul.appendChild(newLi);
		//增加点击删除函数
		newLi.onclick = delLi;
		content.value = null; 	
	}
	//左侧出
	input[2].onclick =function(){
		if (ul.hasChildNodes()) {
			alert(ul.firstChild.innerHTML);
			ul.removeChild(ul.firstChild);
		}else{
			alert("队列为空！");
			return false;
		}
	}
	//右侧出
	input[3].onclick =function(){
		if (ul.hasChildNodes()) {
			alert(ul.lastChild.innerHTML);
			ul.removeChild(ul.lastChild);
		}else{
			alert("队列为空！");
			return false;
		}
	}
	//点击删除函数
	function delLi(){
		this.parentNode.removeChild(this);
	}
}