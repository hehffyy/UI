<xui:window xmlns:justep="http://www.justep.com/x5#" xmlns:xui="http://www.justep.com/xui"
	xmlns:xbl="http://www.w3.org/ns/xbl" xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xsl:version="2.0"
	xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xforms="http://www.justep.com/xforms"
	xmlns:ev="http://www.w3.org/2001/xml-events"
	xmlns:saxon="http://saxon.sf.net/"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema"
	xmlns:ns="http://www.justep.com/x5#" 
	xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
	component="/UI/system/components/window.xbl.xml#window" id="window_1">
	<xforms:model id="officeViewerWindow">
		<xforms:action ev:event="onload">
			<xforms:script>
				OP.load();
			</xforms:script>
		</xforms:action>
	</xforms:model>
	<xui:resource>
		<xhtml:style type="text/css"><![CDATA[
			html{
				overflow:hidden;
			}
            html, body, div{
					margin: 0;
					padding: 0;
					border: 0;
					font-size: 100%;
					font: inherit;
					vertical-align: baseline;
			}
         ]]>
        </xhtml:style>
		<xhtml:script language="JavaScript" type="text/javascript" src="/UI/system/service/doc/docUtil2.js"></xhtml:script>
		<xhtml:script language="JavaScript" type="text/javascript">
		<![CDATA[
        	var OP = {
	        	load: function() {
	        		$('#ov').attr('showToolbar',false);
	        		$OV2('ov').CreateOfficeViewer('100%','100%');
	        		var param = $(justep.Context.getRequestBody()).text(); 
	        		if(!param)
	        			param = decodeURIComponent(justep.Request.URLParams.param);
					OP.officeViewerInit(OV2.JSON.parse(param));
	        	},
				getUrl:function(docPath,fileID){
	            	if(!this.docUrl){
	            		var u = justep.doc.InnerUtils.getdocServerAction(docPath, "/repository/file/cache/office/"+fileID);
            			this.docUrl = u.indexOf(window.location.protocol) < 1 ? u : window.location.protocol+"//"+ window.location.host + u;
            		}
            		return this.docUrl;	 
	            },
	            officeViewerInit: function(obj) {
	            	if ($OV2("ov").IsOpened()){
	            		return;
	            	}
	            	this.OVP = obj;
	            	this.OVP.saving = false;
	            	this.OVP.isRevision = false;
	            	this.OVP.isModified = false;
            		$OV2("ov").Toolbars = false;
            		$OV2("ov").HttpInit();
   					$OV2("ov").HttpAddpostString("FileID", this.OVP.fileID);
   					$OV2("ov").HttpAddpostString("FileExt", this.OVP.fileExt);
   					$OV2("ov").HttpAddpostString("FileID", this.OVP.fileID);
   					$OV2("ov").HttpAddpostString("VersionID", this.OVP.versionID);
   					$OV2("ov").HttpAddpostString("PartType", this.OVP.partType);
   					$OV2("ov").HttpOpenFileFromStream(this.getUrl(this.OVP.host,this.OVP.fileID),$OV2("ov").GetProgIDByDocType(this.OVP.fileExt));
   					var errorCode = $OV2("ov").GetErrorCode();
					if(errorCode!= 0){
						alert("office文件打开异常 错误编码["+errorCode+"]");
					}
	            	if(this.OVP.partType == "revision" ) {
	            		if($OV2("ov").IsWordOpened()){
	            			$OV2("ov").ActiveDocument().ShowRevisions = true;	
	            		}
	            	}else{
	            		if($OV2("ov").IsWordOpened()){
	            			$OV2("ov").ActiveDocument().AcceptAllRevisions();	
	            		}
	            	}
   					$OV2("ov").DisableHotKey(true);
   					$OV2("ov").DisableViewRightClickMenu(true);
   					if (this.OVP.showField && $OV2("ov").IsWordOpened()) {
	            		$OV2("ov").focus();
	            	}
	            	if (this.OVP.programID != "History"){
	                    $OV2("ov").DisableOfficeReviewingBar(false);
	                }
	                $OV2("ov").ProtectDoc(2);
	            }
            };
        ]]>
        </xhtml:script>
	</xui:resource>
	
	<xui:view id="view_1">
		<xui:layout style="width:100%;height:100%;">
			<xhtml:div id="ovParent" style="width:100%;height:100%">
				<xhtml:div id="ov"></xhtml:div>
			</xhtml:div>
		</xui:layout>
	</xui:view>	
</xui:window>