function addHandler(obj, type, fn){
	if(obj && obj.addEventListener){
		obj.addEventListener(type, fn, false);
	}else if(obj && obj.attachEvent){
		obj.attachEvent('on' + type, fn);
	}else{
		obj['on' + type] = fn;
	}
}

v