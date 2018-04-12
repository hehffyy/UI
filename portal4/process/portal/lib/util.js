(function(globel){
	var AUTOID = 0,
		arrayPrototype = Array.prototype,
	    slice = arrayPrototype.slice,
	    supportsSplice = function () {
            var array = [],
                lengthBefore,
                j = 20;

            if (!array.splice) {
                return false;
            }

            // This detects a bug in IE8 splice method:
            // see http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/6e946d03-e09f-4b22-a4dd-cd5e276bf05a/

            while (j--) {
                array.push("A");
            }

            array.splice(15, 0, "F", "F", "F", "F", "F","F","F","F","F","F","F","F","F","F","F","F","F","F","F","F","F");

            lengthBefore = array.length; //41
            array.splice(13, 0, "XXX"); // add one element

            if (lengthBefore+1 != array.length) {
                return false;
            }
            // end IE8 bug

            return true;
        }();
        
    function spliceNative (array) {
        return array.splice.apply(array, slice.call(arguments, 1));
    }

    function eraseNative (array, index, removeCount) {
        array.splice(index, removeCount);
        return array;
    }

    function eraseSim (array, index, removeCount) {
        return replaceSim(array, index, removeCount);
    }

    function fixArrayIndex (array, index) {
        return (index < 0) ? Math.max(0, array.length + index)
                           : Math.min(array.length, index);
    }
    
    function spliceSim (array, index, removeCount) {
        var pos = fixArrayIndex(array, index),
            removed = array.slice(index, fixArrayIndex(array, pos+removeCount));

        if (arguments.length < 4) {
            replaceSim(array, pos, removeCount);
        } else {
            replaceSim(array, pos, removeCount, slice.call(arguments, 3));
        }

        return removed;
    }
    
    function replaceSim (array, index, removeCount, insert) {
        var add = insert ? insert.length : 0,
            length = array.length,
            pos = fixArrayIndex(array, index);

        // we try to use Array.push when we can for efficiency...
        if (pos === length) {
            if (add) {
                array.push.apply(array, insert);
            }
        } else {
            var remove = Math.min(removeCount, length - pos),
                tailOldPos = pos + remove,
                tailNewPos = tailOldPos + add - remove,
                tailCount = length - tailOldPos,
                lengthAfterRemove = length - remove,
                i;

            if (tailNewPos < tailOldPos) { // case A
                for (i = 0; i < tailCount; ++i) {
                    array[tailNewPos+i] = array[tailOldPos+i];
                }
            } else if (tailNewPos > tailOldPos) { // case B
                for (i = tailCount; i--; ) {
                    array[tailNewPos+i] = array[tailOldPos+i];
                }
            } // else, add == remove (nothing to do)

            if (add && pos === lengthAfterRemove) {
                array.length = lengthAfterRemove; // truncate array
                array.push.apply(array, insert);
            } else {
                array.length = lengthAfterRemove + add; // reserves space
                for (i = 0; i < add; ++i) {
                    array[pos+i] = insert[i];
                }
            }
        }

        return array;
    }
        
	var util = {
		getId: function(prefix, name){
			prefix = prefix || 'id';
			name = name || ++AUTOID; 
			return prefix + '-' + name; 
		},
		format: function() {
			var slice = [].slice,
				args = slice.call(arguments),
				rst = args.shift();	
		  return rst.replace(/{(\d+)}/g, function(match, number) { 
		    return typeof args[number] != 'undefined'
		      ? args[number]
		      : match
		    ;
		  });
		},
		extend: function(child, parent) {
			var _hasProp = {}.hasOwnProperty; 
			for (var key in parent) { 
				if (_hasProp.call(parent, key)) 
					child[key] = parent[key]; 
				} 
				function ctor() { 
					this.constructor = child; 
				} 
				ctor.prototype = parent.prototype; 
				child.prototype = new ctor; 
				child.parent = parent.prototype; 
			return child; 
		},
		domHelp: {
			create: function(config){
				return $(util.format('<{0} id="{1}"></{0}>', config.tagName, config.id))
			},
			div: function(config){
				if(!config){
					config = {
						id: util.getId()
					};
				}else if(typeof config == 'string'){
					config = {id: config};
				}
				
				config.tagName = 'div';
				return util.domHelp.create(config);
			}
		},
        clone: function(item) {
            if (item === null || item === undefined) {
                return item;
            }

            var type = Object.prototype.toString.call(item);

            // Date
            if (type === '[object Date]') {
                return new Date(item.getTime());
            }

            var i, j, k, clone, key;

            // Array
            if (type === '[object Array]') {
                i = item.length;

                clone = [];

                while (i--) {
                    clone[i] = util.clone(item[i]);
                }
            }
            // Object
            else if (type === '[object Object]' && item.constructor === Object) {
                clone = {};

                for (key in item) {
                    clone[key] = util.clone(item[key]);
                }
            }

            return clone || item;
		},
        map: function(array, fn, scope) {
        	var arrayPrototype = Array.prototype;
            if ('map' in arrayPrototype) {
                return array.map(fn, scope);
            }

            var results = [],
                i = 0,
                len = array.length;

            for (; i < len; i++) {
                results[i] = fn.call(scope, array[i], i, array);
            }

            return results;
        },
        getKeys: ('keys' in Object.prototype) ? Object.keys : function(object) {
            var keys = [],
                property;

            for (property in object) {
                if (object.hasOwnProperty(property)) {
                    keys.push(property);
                }
            }

            return keys;
        },
		cut: function(widths){
			var isPercent = true;
			/*
			$.each(widths, function(i, width){
				if(width!=undefined){
					isPercent = (width+'').indexOf('%')!=-1;
					if(!isPercent)
						return true;
				}
			});
			*/
			if(isPercent){
				var total = 0, l = 0;
				$.each(widths, function(i, width){
					if(width!=undefined){
						width = parseInt(width);
						total += width;
					}else{
						l++;
					}
				});
				var number = widths.length;
					remaider  = ((100-total) % l) || 0,
					value = (100-total-remaider)/l;
				for(var i = 0; i<number; i++){
					if(widths[i] == undefined)
						widths[i] = value; 
				} 
				widths[number-1] = widths[number-1] + remaider;
				return widths;
			}
		},
		Array: {
			isArray: function(value) {
	            return Object.prototype.toString.call(value) === '[object Array]';
	        },
	        indexOf: function(array, item, from) {
	            if ('indexOf' in Array.prototype) {
	                return array.indexOf(item, from);
	            }

	            var i, length = array.length;

	            for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) {
	                if (array[i] === item) {
	                    return i;
	                }
	            }

	            return -1;
	        },
	        splice: supportsSplice ? spliceNative : spliceSim,
	        erase: supportsSplice ? eraseNative : eraseSim
		},
		String: {
		    leftPad: function(string, size, character) {
		        var result = String(string);
		        character = character || " ";
		        while (result.length < size) {
		            result = character + result;
		        }
		        return result;
		    }
		},
		time: function(){
			var d=new Date(),
				rst=d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日\r";
			rst+="星期"+'日一二三四五六'.charAt(d.getDay())+"\r";
			return rst; 
		},
		getParameterByName: function(name){
		  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		  var regexS = "[\\?&]" + name + "=([^&#]*)";
		  var regex = new RegExp(regexS);
		  var results = regex.exec(window.location.search);
		  if(results == null)
		    return "";
		  else
		    return decodeURIComponent(results[1].replace(/\+/g, " "));
		}		
	};
	
	globel.util = util;
})(window);
