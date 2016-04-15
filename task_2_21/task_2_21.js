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
//存放内容数据
var tagData= [], hobbyData = [];

//划分输入内容函数
oConfirm.onclick = function(){
	var oStr = oHobby.value.trim();
	//以非数字、字母、汉字的字符为划分依据
	//filter过滤
	var oWord = oStr.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e){
		if(e != null && e.length > 0){
			return true;
		}else{
			return false;
		}
	});
	hobbyData = hobbyData.concat(oWord);
	//渲染函数
	render();
}

//渲染函数
function render(){
	oDisplay.innerHTML = hobbyData.map(function(d) {//d表示hobbyData中的数组元素
        return '<div>' + d + '</div>';
    }).join('');
}