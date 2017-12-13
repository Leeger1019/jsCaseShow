//随机数
function random(min,max){//min 1  max 5
				return Math.floor(Math.random()*(max-min+1)) + min;
			}

//cookie 操作
function setcookie(key,value,day){
			var date=new Date();
			date.setDate(date.getDate()+day);//设置过期时间
			document.cookie=key+'='+encodeURI(value)+';expires='+date;
		}
function getcookie(key){
			var arr=decodeURI(document.cookie).split('; ');//编码后拆分成数组
			for(var i=0;i<arr.length;i++){
				var newarr=arr[i].split('=');//对数组的每一项再次拆分
				if(newarr[0]==key){//比较key值
					return newarr[1];//输出key对应的value
				}
			}
		}
function delcookie(key){
			setcookie(key,'value',-1);//-1:代表过去时间
		}


//运动的封装
function getstyle(obj,attr){
				if(obj.currentStyle){
					return obj.currentStyle[attr];
				}else{
					return getComputedStyle(obj)[attr];
				}
			}
function move(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bstop=true;//假设所有的属性都到目标点了。
		for(var attr in json){
			//求当前值
			var current=null;
			if(attr=='opacity'){
				current=Math.round(getstyle(obj,attr)*100);
			}else{
				current=parseInt(getstyle(obj,attr));
			}
			//判断速度
			var speed=(json[attr]-current)/7;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			//判断定时器停止和输出
			if(current!=json[attr]){//当前值不等于目标，继续运动。
				if(attr=='opacity'){
					obj.style[attr]=(current+speed)/100;
					obj.style.filter='alpha(opacity='+(current+speed)+')';
				}else{
					obj.style[attr]=current+speed+'px';
				}
				bstop=false;
			}
		}
		if(bstop){
			clearInterval(obj.timer);
			fn&&fn();	
		}
			
	},20)
}

//拖拽
function drag(obj){
				obj.onmousedown=function(ev){
					ev=ev||window.event;
					var sx=ev.clientX-obj.offsetLeft;
					var sy=ev.clientY-obj.offsetTop;
					document.onmousemove=function(ev){
						//第二步：通过不变的短线，变化的坐标，求出盒子拖拽过程中的left和top值。
						var ev=ev||window.event;//重新获取事件对象。事件动作不一样。
						var x=ev.clientX-shortx;
						var y=ev.clientY-shorty;
						
						if(x<0){
							x=0;
						}else if(x>document.documentElement.clientWidth-oDiv.offsetWidth){
							x=document.documentElement.clientWidth-oDiv.offsetWidth;
						}
						
						if(y<0){
							y=0;
						}else if(y>document.documentElement.clientHeight-oDiv.offsetHeight){
							y=document.documentElement.clientHeight-oDiv.offsetHeight;
						}
						
						oDiv.style.left=x+'px';
						oDiv.style.top=y+'px';
					}
					
					document.onmouseup=function(){
						document.onmousemove=null;
						document.onmouseup=null;
					}
					return false;
				}
		}

