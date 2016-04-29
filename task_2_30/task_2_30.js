//事件适配函数
function addHandler(obj, type, fn){
	if(obj && obj.addEventListener){
		obj.addEventListener(type);
	}else if(obj && obj.attachEvent){
		obj.attachEvent("on" + type, fn)
	}else{
		obj["on" + type] = fn;
	}
}
//$函数
function $(el){
	return document.querySelector(el);
}
//$$函数
function $$(el){
	return document.querySelectorAll(el);
}
//获取验证元素
var oBtn = $('#btn');
//获取各项表单对象
var eleArr = [$('#msg'), $('pwd'), $('repwd'), $('email'), $('mobile')];
//校验数组
var checkResult = {
	tip: "",
	right: false
}
//生成错误提示数组
var oriTip = ["必填，长度为4~16个字符", "必填，长度为6~16个字符", "重复输入密码", "example@some.com", "请输入11位手机号"];
//判断输入内容是否符合要求函数
function validate(e){
	var str = e.value.trim();
	//判断是否为空
	if(str.length == 0){
		checkResult.tip = "输入不能为空"；
		checkResult.right = false;
		return;//一定要return吗？
	}
	// //输入校验
	// switch(e){

	// }
	//名称校验
	if(e === eleArr[0]){
		//匹配非单字节的字符，汉字和其他文字视为2个字符
		var len = str.replace(new RegExp('[^\x00-\xff]', 'g'), 'aa').length;
		if(len >= 4 && len <= 16){
			checkResult.tip = "名称可用";
			checkResult.right = true;
		}else{
			checkResult.tip = "请检查名称字符数";
			checkResult.right = false;
		}
	}
	//密码校验
	if(e === eleArr[1]){
		if(str.match(/^[a-zA-Z0-9]{6,16}$/)){
			checkResult.tip = "密码格式正确";
			checkResult.right = true;
		}else{
			checkResult.tip = "密码格式错误";
			checkResult.right = false;
		}
	}
	//密码重复确认
	if(e === eleArr[2]){
		if(str === eleArr[1].value.trim()){
			checkResult.tip = "密码正确";
			checkResult.right = true;
		}else{
			checkResult.tip = "两次密码输入不同";
			checkResult.right = false;
		}
	}
	//邮箱校验
	if(e === eleArr[3]){
		var apos = str.indexOf("@");
		var dotpos = str.lastIndexOf(".");
		if(apos < 1 || dotpos - apos < 2){
			checkResult.tip = "邮箱格式正确";
			checkResult.right = true;
		}else{
			checkResult.tip = "邮箱格式错误";
			checkResult.right = false;
		}
	}
	//电话校验
	if(e === eleArr[4]){
		if(str.match(/^[0-9]{11}$/)){
			checkResult.tip = "电话格式正确";
			checkResult.right = true;
		}else{
			checkResult.tip = "电话格式不正确";
			checkResult.right = false;
		}
	}
}
//页面加载执行
window.onload = function(){


}