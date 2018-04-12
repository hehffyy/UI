(function(global){
	
	var eventable = function(obj){
		obj.attachEvent=function(name, catcher, callObj){
			name='ev_'+name.toLowerCase();
			if (!this[name])
				this[name]=new this.eventCatcher();
				
			return(name+':'+this[name].addEvent(catcher, callObj||this)); //return ID (event name & event ID)
		}
		obj.callEvent=function(name, arg0){ 
			name='ev_'+name.toLowerCase();
			if (this[name])
				return this[name].apply(this, arg0);
			return true;
		}
		obj.checkEvent=function(name){
			return (!!this['ev_'+name.toLowerCase()])
		}
		obj.eventCatcher=function(){
			var dhx_catch = [];
			var dhx_callObj = [];
			var z = function(){
				var res = true;
				for (var i = 0; i < dhx_catch.length; i++){
					if (dhx_catch[i] != null){
						var zr = dhx_catch[i].apply(dhx_callObj[i], arguments);
						res=res&&zr;
					}
				}
				return res;
			}
			z.addEvent=function(ev, callObj){
				if (typeof (ev) != "function")
					ev=eval(ev);
				if (ev){
					dhx_callObj.push(callObj);
					return dhx_catch.push(ev)-1;
				}
				return false;
			}
			z.removeEvent=function(id){
				dhx_catch[id]=null;
				dhx_callObj[id]=null;
			}
			return z;
		}
		obj.detachEvent=function(id){
			if (id != false){
				var list = id.split(':');           //get EventName and ID
				this[list[0]].removeEvent(list[1]); //remove event
			}
		}
	}
	
	global.eventable = eventable;
	  
})(window);
