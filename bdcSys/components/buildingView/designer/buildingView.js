justep.design.BuildingView = function(config) {
	justep.design.BuildingView.superclass.constructor.call(this, config);

};

justep.extend(justep.design.BuildingView,justep.design.Component,
{
					paintContent : function(xmlNode) {
						this.createElement("<div id='" + this.id
								+ "' isViewPartContent ='false'></div>",
								xmlNode);
						$(this.element)
								.append('<h3 style="text-align:center;">幢名称</h3>' 
										//data-bind="foreach:$model.cengs"
										+'<div>'
										//each ceng
										+'<div class="x-row row_ceng">'
										+'<div class="x-col x-col-10 pri">'
										+'	<div><span>层号</span></div>'
										+'</div>'
										+'</div>'
										+'</div>');
						for(var i=0;i<2;i++){
							$(".row_ceng",this.element).append(
									 '<div class="x-col x-col-20">'
									+'	<div class="x-row">'
									+'  	<div class="x-col colH" dragable="true">'
									+'    		<div class="x-row row_h">'
									+'      		<span class="hh">户号</span>'
									+'      		<i class="rec"/>'
									+'    		</div>'
									+'    		<div class="x-row hid">' 
									+'      		<a href="#">户ID</a>' 
									+'    		</div>'
									+'    		<div class="x-row allzt">'
									+'      		<span class="zt zt-fz"/>'
									+'      		<span class="zt zt-cf"/>'
									+'      		<span class="zt zt-dj"/>'
									+'      		<span class="zt zt-dy"/>'
									+'      		<span class="zt zt-yg"/>'
									+'      		<span class="zt zt-yy"/>'
									+'   		</div>'
									+'  	</div>'
									+'	</div>'
									+'</div>'
							);
						}
					}
});
