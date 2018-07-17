$().extend("animate",function(obj,f){
	obj.attr=(obj.attr+"").toLowerCase();
	var attr=obj.attr==="x"?"left":obj.attr==="y"?"top":
			 obj.attr==="w"?"width":obj.attr==="h"?"height":
			 obj.attr==="o"?"opacity":obj.attr!==undefined?obj.attr:"left",
		start=attr==="opacity"?(obj.start!==undefined?obj.start:parseFloat(getStyle(this.elements[0])[attr])):
			  (obj.start!==undefined?obj.start:parseFloat(getStyle(this.elements[0])[attr])),
		step=attr==="opacity"?(obj.step!==undefined?obj.step:0.05):(obj.step!==undefined?obj.step:10),
		//opacity=obj.opacity?obj.opacity:
		type=obj.step!==undefined?"constant":"buffer",
		t=obj.t!==undefined?obj.t:10;
	if(obj.target===undefined&&obj.inc===undefined) throw new Error("缺少必要参数！");
	var	target=obj.target!==undefined?obj.target:obj.inc+start;//obj.target!==undefined不能写为if(obj.target)，否则obj.target=0也不执行了
	// var mul=null;
	// if(obj.mul===undefined){
	// 	mul={};
	// 	mul[attr]=target;
	// }else{
	// 	mul=obj.mul;
	// }
	if(target>start) step=Math.abs(step);
	else step=-Math.abs(step);

	//var elems=this.elements;//不能放在这
	var d=document.getElementById("d");
	
	for(var i=0;i<this.elements.length;i++){
		var elem=this.elements[i];//here
		elem.style[attr]=attr!=="opacity"?start+"px":start;
		var val=start;
		if(elem.timer===undefined) elem.timer={}; 
		if(elem.timer[attr]!==undefined) clearInterval(elem.timer[attr]);	
		elem.timer[attr]=setInterval(function(){
			if(type==="buffer"){
				step=(target-val)/6;
				if(target>start) step=Math.ceil(step*100)/100;
				else step=Math.floor(step*100)/100;
			}
			if(step>=0&&val+step>=target||step<=0&&val+step<=target){
				clearInterval(elem.timer[attr]);
				elem.style[attr]=attr!=="opacity"?target+"px":target;
				if(typeof f==="function") f();
			}else{
				val+=step;
				elem.style[attr]=attr!=="opacity"?val+"px":val;
			}
			d.innerHTML+=step+"</br>";
		},t)
	}
	return this;
});