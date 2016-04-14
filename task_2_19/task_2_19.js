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

// window.onload = function(){
(function(){
	//定义数组和获取页面元素
	var	data = [],//存放数据
		num = $("num"),//输入的数字
		leftIn = $("left-in"),//左侧入
		rightIn = $("right-in"),//右侧入
		leftOut = $("left-out"),//左侧出
		rightOut = $("right-out"),//右侧出
		random = $("random"),//随机生成数据
		start = $("start"),//开始排序
		sort = $("sort");//数据显示区域
	//dom操作
	var domOpe = {
		//左侧入函数
		lIn : function(value){
			var newDiv = document.createElement("div");
			newDiv.style.height = value*4 + 'px';
			data.unshift(num);
			sort.insertBefore(newDiv,sort.firstChild);
			// console.log(data);
		},
		//右侧入函数
		rIn : function(value){
			var newDiv = document.createElement("div");
			newDiv.style.height = value*4 + 'px';
			data.push(num);
			sort.appendChild(newDiv);
		},
		//左侧出函数
		lOut : function(){
			if(sort.firstChild !== null){
				data.shift();
				sort.removeChild(sort.firstChild);
			}else{
				alert("数据已被清空！");
			}
		},
		//右侧出函数
		rOut : function(){
			if (sort.lastChild !== null) {
				data.pop();
				sort.removeChild(sort.lastChild);
			}else{
				alert("数据已被清空！");
			}
		},
		//随机生成10-100的数据
		ranData : function(){
			sort.innerHTML = null;//清除数据显示区域的div图形
			data.length = 0;//置空data数组
			for(var i=0; i<50; i++){
				domOpe.rIn(parseInt(Math.random()*91)+10);
			}
		}

	}
	//排序可视化函数
	function dataSort(d){
		var len = data.length,
			div = d,
			i = 0,
			j = 0,
			temp,
			clear = null;
		clear = setInterval(test,15);
			// console.log(clear);

		//排序函数test 从小到大冒泡排序
		function test() {
			if(i < len){
				if (j < len-i-1) {
					if(data[j] > data[j+1]){
						temp = data[j];
						data[j] = data[j+1];
						data[j+1] = temp;
						div[j].style.height = data[j] * 4 + 'px';
						div[j+1].style.height = data[j+1] * 4 + 'px';
					}
					j++;
					return;	
				}else{
					j = 0;
				}
				i++;
			}else{
				clearInterval(clear);
			}

		}
	}
	//分配事件函数
	leftIn.onclick = function(){
		if(data.length < 60){
			var value = parseInt(num.value);
			/^([0-9]{1,2}|100)$/.test(value) ? domOpe.lIn(value) : alert("请输入正确的数值！");
		}else{
			alert("数据已饱和！");
		}
	}
	rightIn.onclick = function(){
		if(data.length < 60){
			var value = parseInt(num.value);
			/^([0-9]{1,2}|100)$/.test(value) ? domOpe.rIn(value) : alert("请输入正确的数值！");
		}else{
			alert("数据已饱和！");
		}
	}
	leftOut.onclick = domOpe.lOut;
	rightOut.onclick = domOpe.rOut;
	random.onclick = domOpe.ranData;

	start.onclick = function(){
		var div = sort.getElementsByTagName("div");
		// console.log(divs.length);
		dataSort(div);
	}

})();