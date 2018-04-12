<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1"> 
    <xforms:action id="action1" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript1"><![CDATA[orgDialog.model1ModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="sFID,sFName,sName,selected" src="" auto-load="false" id="orgs"/> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;display:none" id="rootLayout"> 
      <!--    class="x-contents-content x-full"-->  
      <xhtml:div class="x-panel x-full" xid="contentAllOrg"> 
        <xhtml:div class="x-panel-content" style="top:0px"> 
          <!--          <xhtml:div class="x-flex x-flex-column x-full"> -->  
          <xhtml:div class="x-flex x-flex-column x-full"> 
            <xhtml:div class="x-key"/>  
            <xhtml:div> 
              <xhtml:div class="x-query-input x-flex"> 
                <xhtml:i class="icon-android-search x-icon-lg"/>  
                <input type="text" class="x-flex1" data-bind="value:filterText,valueUpdate: 'input'"/>  
                <xhtml:i class="icon-close-circled  x-icon-lg x-cls-filter" data-bind="css:{hide:!filterText.get()},event:{click:$model.clsfilterText}"/> 
              </xhtml:div> 
            </xhtml:div>  
            <xhtml:div class="x-flex1 x-org-list-content"> 
              <!--              <xhtml:div class="x-full x-scroll-view"> -->  
              <xhtml:div id="orgList" class="x-foreach" data-bind="foreach:{data: $model.getList()}"
                style="padding-left:20px"> 
                <xhtml:div class="media" data-bind="css:{'x-currentRow':$object==$model.currentRow.get()}"> 
                  <xhtml:div class="pull-left x-org-checkbox" data-bind="if:$model.multiSelection"> 
                    <xhtml:span data-bind="component:{name:'$model/UI/base/components/knockout/checkbox'}"
                       data-events="onChange:doCheckChanged" bind-checked="$object.selected.get()" class="x-checkbox"/> 
                  </xhtml:div>  
                  <xhtml:div class="pull-left x-org-checkbox" data-bind="if:!$model.multiSelection.get()"> 
                    <xhtml:span name="orgUnit" data-bind="component:{name:'$model/UI/base/components/knockout/radio'},checked:$object.selected"
                       data-events="onChange:doCheckChanged" class="x-radio"/> 
                  </xhtml:div>  
                  <xhtml:div class="media-body" data-bind="click:$model.doRowClick.bind($model)"> 
                    <xhtml:div class="media"> 
                      <xhtml:div class="x-blob x-blob-radius pull-left media-object x-org-image"
                        xid="orgImage1"> 
                        <xhtml:div class="x-blob-bar" xid="div4"> 
                          <xhtml:i class="x-blob-edit icon-compose" xid="i1"/>  
                          <xhtml:i class="x-blob-del icon-close-round" xid="i2"/> 
                        </xhtml:div>  
                        <xhtml:img class="x-blob-img x-autofill" xid="image1" data-bind="attr:{src:$model.getOrgImageUrl($element,$object.sFID.get())}"/> 
                      </xhtml:div>  
                      <xhtml:div class="media-body"> 
                        <xhtml:h4 class="media-heading" data-bind="text:$object.sName"/>
                        <xhtml:div data-bind="if:$model.showFName.get()"> 
                        	<xhtml:div data-bind="text:$object.sFName"/>
                        </xhtml:div> 
                      </xhtml:div> 
                    </xhtml:div> 
                  </xhtml:div> 
                </xhtml:div> 
              </xhtml:div>  
              <!--              </xhtml:div> --> 
            </xhtml:div> 
          </xhtml:div>  
          <!--          </xhtml:div> --> 
        </xhtml:div>  
        <xhtml:div class="x-panel-bottom"> 
          <xhtml:span data-bind="if:$model.multiSelection,component:{name:'$model/UI/base/components/knockout/checkbox'}"
            class="x-checkbox" style="padding-left:20px" label="全选" data-events="onChange:checkboxAllChange"/>
          <xhtml:span data-bind="component:{name:'$model/UI/base/components/knockout/checkbox'}"
            class="x-checkbox" style="padding-left:20px" label="显示长名称" data-events="onChange:showOrHideFName"/>  
          <xhtml:a class="btn btn-link btn-only-label x-dialog-button" xid="cancelBtn"
            data-bind="event:{click:$model.cancelBtnClick}" id="btnOK"> 
            <i/>  
            <span>取消</span> 
          </xhtml:a>  
          <xhtml:a class="btn btn-primary btn-only-label x-dialog-button" xid="okBtn"
            data-bind="event:{click:$model.okBtnClick}"> 
            <i/>  
            <span>确定</span> 
          </xhtml:a> 
        </xhtml:div> 
      </xhtml:div>  
      <xui:place control="windowReceiver1" id="controlPlace1" style="position:absolute;left:212px;top:279px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="orgDialog.windowReceiver1Receive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script><![CDATA[
		this.__requireComponents = [ "base/components/knockout/checkbox",
			"base/components/knockout/radio",
			"base/components/knockout/output", "base/lib/bind/org",
			"base/lib/bind/bind.mapping", "base/lib/bind/express",
			"base/lib/bind/url" ].concat(this.__requireComponents||[]);
	]]> </xhtml:script>  
    <xhtml:script loadKO="true" src="/UI/base/lib/init.js"/>  
    <xhtml:script src="/UI/system/service/org/orgUtils.js"/>  
    <xhtml:script src="orgDialog.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/lib/bind/css/blob.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="orgDialog.css"/> 
  </xui:resource> 
</xui:window>
