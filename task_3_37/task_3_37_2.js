function $(ele){
	return document.querySelector(ele);
}
function $$(ele){
	return document.querySelectorAll(ele);	
}
var eventUtil = {
	addHandler : function(obj, type, fn){
		if(obj && obj.addEventListener){
			obj.addEventListener(type, fn, false);
		}else if(obj && obj.attachEvent){
			obj.attachEvent('on' + type, fn);
		}else{
			obj['on' + type] = fn;
		}
	}
}

//获取元素
var mask = $('#mask'),
	popup = $('#popup'),
	title = $$('h2')[0],
	close = $$('span')[0],
	confirm = $$('button')[0],
	cancle = $$('button')[1],
	click = $$('button')[2];

function setBlcok(){
	mask.style.display = 'block';
	popup.style.display = 'block';	
}
function setNone(){
	mask.style.display = 'none';
	popup.style.display = 'none';
}

function setDrag(event){
	event = event || window.event;
	var disX, disY;
	disX = event.clientX - popup.offsetLeft;
	disY = event.clientY - popup.offsetTop;
	document.onmousemove = function(event){
		event = event || window.event;
		popup.style.left = event.clientX + 200 - disX + 'px';
		popup.style.top = event.clientY + 100 - disY + 'px';
	}
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmousedown = null;
	}
}

//绑定事件
eventUtil.addHandler(click, 'click', setBlcok);
eventUtil.addHandler(close, 'click', setNone);
eventUtil.addHandler(confirm, 'click', function(){alert("This is a popup!")});
eventUtil.addHandler(cancle, 'click', setNone);
eventUtil.addHandler(title, 'mousedown', setDrag);

