/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式	：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};


/*定义$(id)方法*/
function $(id){
	if(typeof id != 'undefined'){
		return document.getElementById('id');
	}
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 输入的城市数据必须为中英文字符 & 输入的空气指数必须为整数
 * 城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
 * 输入不合规格时，需要给出提示
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	/*var city = $('aqi-city-input').innerText;
	var aqi = $('aqi-value-input').innerText;*/
	var srtCity = $('aqi-city-input').value.trim();
	var strAqi = $('aqi-value-input').value.trim();
	//对输入的值进行规范处理
	if (!strCity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
		alert("城市名必须为中英文字符！");
		return;//为何要返回？
	}
	if (!strAqi.match(/^\d+$/)) {
		alert("空气指数必须为整数！");
		return;
	}
	//向aqiData装入数据
	aqiData[strCity] = strAqi;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();