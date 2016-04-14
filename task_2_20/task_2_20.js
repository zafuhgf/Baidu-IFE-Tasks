//创建$(id)函数
function $(id){
	return document.getElementById(id);
}
//获取页面元素
var oContent = $("content"),
	oCut = $("cut"),
	oQuery = $("query"),
	oDisplay = $("display");
	oSearch = $("search");
//存放内容数据
var oData= [];
//划分输入内容函数
oCut.onclick = function(){
	var oStr = oContent.value.trim();
	var oWord = oStr.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e){
		if(e != null && e.length > 0){
			return true;
		}else{
			return false;
		}
	});
	oData = oData.concat(oWord);
	//渲染函数
	render();
}
//查询匹配函数
oQuery.onclick = function(){
	var oStr = oSearch.value.trim();
	render(oStr);
}
//渲染函数
function render(str){
	oDisplay.innerHTML = oData.map(function(d) {
        if (str != null && str.length > 0) {
            d = d.replace(new RegExp(str, "g"), "<span class='select'>" + str + "</span>");
        }
        return '<div>' + d + '</div>';
    }).join('');
}