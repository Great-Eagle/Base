//鼠标拖拽
$().extend("drag",function(range){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmousedown=function(e){
			var sign=true;
			for(var i in range){
				if(e.target===range[i]){sign=false; break;}
			}
			if(sign) return;
			if(trim(this.innerHTML).length==0) preDef(e);
			e=getEvent(e);
			var x=e.clientX-this.offsetLeft;
			var y=e.clientY-this.offsetTop;
			var that=this;
			document.onmousemove=function(e){
				e=getEvent(e);
				var left=e.clientX-x;
				var top=e.clientY-y;
				var w=getInner().width-that.offsetWidth;
				var h=getInner().height-that.offsetHeight;
				left=left<0?0:(left>w?w:left);
				top=top<0?0:(top>h?h:top);
				that.style.left=left+"px";
				that.style.top=top+"px";
			};
			document.onmouseup=function(){
				this.onmousemove=null;
				this.onmouseup=null;
			};
		};
	}
	return this;
});