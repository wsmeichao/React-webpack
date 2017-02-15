/*
*	created by MC on 2017/1/3
*/
const Tool = {};
/*
*	用于页面的事件绑定
*	@param {obj} context 事件绑定的节点
*	@param {string} type 事件绑定的类型
*	@param {function} type 事件绑定的回调函数
*	目前还不完善,只能传入document对象,或者人为封装,例如：document.getElementById("#id") <-- 作为context参数传入
*/

Tool.bind = function(context,type,callback){
	let contextResult;
	if(typeof context == "object"){
		contextResult = context;
	}else{
		contextResult = document.querySelectorAll(context);
	}
	if (contextResult.addEventListener) {
        return contextResult.addEventListener(type, callback, false);
    } else if (contextResult.attachEvent) {
        return contextResult.attachEvent('on' + type, callback);
    } else {
        return contextResult['on' + type] = callback;
    }
}
Tool.unbind = function(context,type,callback){
	if(window.removeEventListerner){
		return context.removeEventListerner(type,callback,false);
	}else if(window.detachEvent){
		return context.detachEvent("on" + type, callback);
	}
}

/**
 * 本地数据存储或读取
 * 
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function (key, value) {
    if (arguments.length == 1) {
        return localStorage.getItem(key);
    } else {
        return localStorage.setItem(key, value);
    }
}

/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key);
    }
    return localStorage.removeItem();
}



export { Tool }