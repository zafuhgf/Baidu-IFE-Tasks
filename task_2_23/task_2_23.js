/**
 * [addEvent 事件兼容适配器]
 * @param {[type]}   obj  [对象]
 * @param {[type]}   type [事件类型]
 * @param {Function} fn   [事件函数]
 */
function addHandler(obj, type, fn){
    if(obj && obj.addEventListener){
        obj.addEventListener(type, fn);
    }else if(obj && obj.attachEvent){
        obj.attachEvent('on' + type, fn);
    }else{
        obj['on'+type] = fn;
    }
}
/**
 * [$ 返回匹配指定选择器的第一个元素]
 * @param  {[type]} id [元素ID]
 * @return {[type]}    [节点]
 */
function $(el){
    return document.querySelector(el);
}
/**
 * [$$ 返回匹配指定的选择器的所有元素]
 * @param  {[type]} id [元素ID]
 * @return {[type]}    [description]
 */
function $$(el){
    return document.querySelectorAll(el);
}
//定义遍历间隔时间
var interval = 300;
//判断是否正在遍历中
var lock = false;

window.onload = function(){
    //获取页面元素
    var root = $('.root'),
        // btnDF = $('#traverseDF'),
        // btnBf = $('#traverseBF'),
        operator = $('.operator'),
        search = $('#search')
        add = $('#add'),
        tree = new Tree(root);//实例化Tree对象
   
    //点击一次变色，点击两次恢复
    addHandler(root, "click", function(e){
        var div = e.target;
        if(div && div.nodeName == 'DIV'){
            var oriClass = div.className;
            if(oriClass.search('active ') == -1){
                div.style.backgroundColor = "#F31F1F";
                div.className = 'active ' + oriClass;
            }else{
                div.style.backgroundColor = '#fff';
                div.className = oriClass.replace('active ', '');
            }    
        }
    });

    //添加事件委托
    addHandler(operator, 'click', function(e){
        var btn = e.target;
        if(btn && btn.nodeName == "BUTTON"){
            if(lock){
                alert("正在遍历中……");
                return;
            }
            clearColor(tree);//清除已有的颜色
            switch(btn.id){
                case "traverseDF":
                case "traverseBF":
                    tree[btn.id]();
                    animation(tree.stack);
                    break;
                case "searchDF":
                case "searchBF":
                    tree["traverse" + btn.id.substring(0,2)]();    
                    animation(tree.stack, checkInput(search));
                    break;
                case "addNode":
                    var text = checkInput(add);
                    if(text == ""){
                        alert("节点内容不能为空!");
                    }    
                    addSubNode("active", text);
                    break;
                case "delNode":
                    if(delNode("active")){
                        alert("删除节点成功!");
                        break;
                    }                
            }            
        }
    });
}

function checkInput(ele){
    return ele.value.trim();
}
/**
 * [addSubNode 增加节点函数]
 * @param {[type]} className [当前被点击的节点]
 * @param {[type]} text      [节点内容]
 */
function addSubNode(className, text){
    var parents = document.getElementsByClassName(className);//可以选取多个节点,构成插入节点的父节点
    for(var i = 0; i < parents.length; i++){
        add(parents[i], text);
        parents[i].style.backgroundColor = "#F31F1F";
    }
    function add(parent, text){
        var node = document.createElement('div');
        node.innerHTML = text;
        parent.appendChild(node);
    }
}
/**
 * [delNode description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
function delNode(className){
    var nodes = document.getElementsByClassName(className);
    var length = nodes.length;
    if(length == 0)
        return false;
    for(var i = 0; i < length; i++){
        //node数组会在删除节点时改变
        nodes[0].parentNode.removeChild(0);
    }
    return true;
}

function clearColor(tree){

}

function animation(nodes, keyword){
    lock = true;
    var keyword = keyword || null;
    (function show(){
        var next = nodes.shift();
        if(next){
            next.style.backgroundColor = "#ccc";
            setTimeout(function(){
                if(!(next.firstChild.nodeValue == keyword)){//当前节点的子节点为文本节点
                    next.style.backgroundColor = "#fff";
                }
                show();
            },interval);
        }else{
            lock = false;
        }
    })();
}

function Tree(node){
    this.stack = [];
    this.root = node;
}

Tree.prototype.traverseDF = function(){
    
}

Tree.prototype.traverseBF = function(){
    
}



