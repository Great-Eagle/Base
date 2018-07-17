function $(para){
	return new Base(para);
}
function Base(para){
	this.elements=[];
	if(typeof para==="string"){
		switch(para.charAt(0)){
			case "#":
				this.getId(para.substr(1));
				break;
			case ".":
				this.getClass(para.substr(1));
				break;
			default:
				this.getTag(para);
		}
	}else if(typeof para==="object"){
		this.elements[0]=para;
	}
}

Base.prototype.getId=function(id){
	if(document.getElementById(id)) this.elements[0]=document.getElementById(id);
}
Base.prototype.getName=function(name){
	var names=document.getElementsByName(name);
	for(var i=0;i<names.length;i++){
		this.elements[i]=names[i];
	}
}
Base.prototype.getTag=function(tag){
	var tags=document.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){
		this.elements[i]=tags[i];
	}
}
Base.prototype.getClass=function(className){
	var classNames=document.getElementsByClassName(className);
	for(var i=0;i<classNames.length;i++){
		this.elements[i]=classNames[i];
	}
}
Base.prototype.find=function(para){
	var elems=this.elements;
	var arr=[];
	var k=0;
	var temp;
	var j;
	if(typeof para==="string"){
		switch(para.charAt(0)){
			case "#":
				for(var i=0;i<elems.length;i++){
					temp=elems[i].getElementById(para.substr(1));
					if(temp){
						arr[0]=temp;
						break;
					}
				}
				break;
			case ".":
				for(var i=0;i<elems.length;i++){
					temp=elems[i].getElementsByClassName(para.substr(1));
					for(j=0;j<temp.length;j++){
						arr[k++]=temp[j];
					}
				}
				break;
			default:
				for(var i=0;i<elems.length;i++){
					temp=elems[i].getElementsByTagName(para);
					for(j=0;j<temp.length;j++){
						arr[k++]=temp[j];
					}
				}
		}
	}
	this.elements=arr;
	return this;
}
Base.prototype.next=function(){
	for(var i=0;i<this.elements.length;i++){
		do{
			this.elements[i]=this.elements[i].nextSibling;
			if(this.elements[i]==null) throw new Error("下一个兄弟结点不存在！");
		}while(this.elements[i].nodeType===3);
	}
	return this;
}
Base.prototype.prev=function(){
	for(var i=0;i<this.elements.length;i++){
		do{
			this.elements[i]=this.elements[i].previousSibling;
			if(this.elements[i]==null) throw new Error("上一个兄弟结点不存在！");
		}while(this.elements[i].nodeType===3);
	}
	return this;
}
Base.prototype.index=function(){
	var children=this.elements[0].parentNode.children;
	for(var i=0;i<children.length;i++){
		if(children[i]===this.elements[0]) return i;
	}
	throw new Error("此结点无父节点！");
}






Base.prototype.attr=function(attr){
	return this.elements[0].getAttribute(attr);
}
Base.prototype.css=function(key,value){
	if(arguments.length===1){
		return getStyle(this.elements[0])[key];
	}
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style[key]=value;
	}
	return this;
}
Base.prototype.html=function(str){
	if(arguments.length===0){
		return this.elements[0].innerHTML;
	}
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].innerHTML=str;
	}
	return this;
}

Base.prototype.get=function(n){
	return this.elements[n];
}

Base.prototype.num=function(n){
	var temp=this.elements[n];
	this.elements=[];
	this.elements[0]=temp;
	return this;
}

Base.prototype.className=function(){
	return this.elements[0].className;
}

Base.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp("(\\s+|^)"+className+"(\\s+|$)")))
			this.elements[i].className+=" "+className;
	}
	return this;
}

Base.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].className=this.elements[i].className.replace(new RegExp("(\\s+|^)"+className+"(\\s+|$)")," ");
	}
	return this;
}
	
Base.prototype.addRule=function(num,selector,content,position){
	var sheet=document.styleSheets[num];
	if(typeof sheet.insertRule!="undefined"){
		sheet.insertRule(selector+"{"+content+"}",position);
	}else if(typeof sheet.addRule!="undefined"){
		sheet.addRule(selector,content,position);
	}
	return this;
}

Base.prototype.removeRule=function(num,position){
	var sheet=document.styleSheets[num];
	if(typeof sheet.deleteRule!="undefined"){
		sheet.deleteRule(position);
	}else if(typeof sheet.removeRule!="undefined"){
		sheet.removeRule(position);
	}
	return this;
}












Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmouseover=over;
		this.elements[i].onmouseout=out;
	}
	return this;
}

Base.prototype.toggle=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].countToggle=0;
		var args=arguments;
		addEvent(this.elements[i],"click",function(){
			args[this.countToggle++%args.length].call(this);
		});
	}
	return this;
}

Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display="block";
	}
	return this;
}

Base.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display="none";
	}
	return this;
}

//注册点击事件
Base.prototype.click=function(f){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=f;
	}
	return this;
}

//注册鼠标按下事件
Base.prototype.mousedown=function(f){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmousedown=f;
	}
	return this;
}

//注册鼠标移动事件
Base.prototype.mousemove=function(f){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmousemove=f;
	}
	return this;
}

//注册鼠标弹起事件
Base.prototype.mouseup=function(f){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmouseup=f;
	}
	return this;
}

Base.prototype.addListener=function(type,f){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],type,f);
	}
	return this;
}

Base.prototype.removeListener=function(type,f){
	for(var i=0;i<this.elements.length;i++){
		removeEvent(this.elements[i],type,f);
	}
	return this;
}

Base.prototype.center=function(){
	var style=getStyle(this.elements[0]);//;写为,出现错误
	var top=(document.documentElement.clientHeight-parseFloat(style.height))/2+getScroll().top;
	var left=(document.documentElement.clientWidth-parseFloat(style.width))/2+getScroll().left;
	this.elements[0].style.top=top+"px";
	this.elements[0].style.left=left+"px";
	return this;
}

Base.prototype.vcenter=function(){
	var style=getStyle(this.elements[0]);
	var top=(document.documentElement.clientHeight-parseFloat(style.height))/2+getScroll().top;
	this.elements[0].style.top=top+"px";
	return this;
}

Base.prototype.hcenter=function(){
	var style=getStyle(this.elements[0]);
	var left=(document.documentElement.clientWidth-parseFloat(style.width))/2+getScroll().left;
	this.elements[0].style.left=left+"px";
	return this;
}

Base.prototype.resize=function(){
	var stdX=getInner().width-this.elements[0].offsetWidth,
		stdY=getInner().height-this.elements[0].offsetHeight;
	if(this.elements[0].offsetLeft>stdX) this.elements[0].style.left=stdX+"px";
	if(this.elements[0].offsetTop>stdY) this.elements[0].style.top=stdY+"px";//勿忘“px”
	return this;
}

//锁屏
Base.prototype.lock=function(){
	this.elements[0].style.width=getInner().width+"px";
	this.elements[0].style.height=getInner().height+"px";
	addEvent(window,"scroll",scrollTop0=function(){
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
	});
	//this.elements[0].style.height不是this.elements[0].height
	return this;
}
	
	
	
	
	
//插件入口
Base.prototype.extend=function(name,f){
	Base.prototype[name]=f;
	return this;
}	
	
	
	

	
	