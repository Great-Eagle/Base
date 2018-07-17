//添加事件
function addEvent(elem,type,f){
	// if(addEventListener){
	// 	elem.addEventListener(type,f,false);
	// }else{
		// elem.attachEvent("on"+type,function(e){
		// 	f.call(elem,e);
		// });
		if(!elem.count) elem.count={};
		if(!elem.events) elem.events={};//添加if(!elem.events)
		if(!elem.events[type]){
			elem.count[type]=0;
			elem.events[type]=[];
			elem["on"+type]=addEvent.exec;
		}
		if(!addEvent.equal(elem.events[type],f)) elem.events[type][elem.count[type]++]=f;//添加else
		
		
	// }
}
addEvent.exec=function(){
	var e=window.event;
	for(var i in this.events[e.type]){
		this.events[e.type][i].call(this,e);
	}
}
addEvent.equal=function(arr,f){
	for(var i in arr){
		if(f===arr[i]) return true;
	}
	return false;
}

//移除事件
function removeEvent(elem,type,f){
	// if(removeEventListener){
	// 	elem.removeEventListener(type,f,false);
	// }else{
		if(elem.events[type])
		for(var i in elem.events[type]){
			if(f===elem.events[type][i]) delete elem.events[type][i];
		}
	// }
}




//跨浏览器获取视口大小
function getInner(){
	return window.innerWidth?{
		width:window.innerWidth,
		height:window.innerHeight
	}:{
		width:document.documentElement.clientWidth,
		height:document.documentElement.clientHeight
	};
}

//兼容样式
function getStyle(elem){
	if(window.getComputedStyle){
		return window.getComputedStyle(elem,null);//非IE
	}else{
		return elem.currentStyle;//IE
	}
}

//兼容事件对象
function getEvent(e){
	return e||window.event;
}

//阻止默认行为
function preDef(e){
	var e=getEvent(e);
	if(e.preventDefault){//W3C
		e.preventDefault();
	}else{
		e.returnValue=false;//IE
	}
}


//取消左右空格
function trim(str){
	return str.replace(/(^\s+)|(\s+$)/g,"");
}



//兼容滚动条
function getScroll(){
	return {
		top:document.documentElement.scrollTop||document.body.scrollTop,
		left:document.documentElement.scrollLeft||document.body.scrollLeft
	};
}



