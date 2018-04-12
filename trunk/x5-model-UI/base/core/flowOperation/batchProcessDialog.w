<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:10px;height:auto;top:9px;"> 
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="id,selected,isEnd,label,btnStatus,executorCount" src="" auto-load="false" id="activityData"
      store-type="simple" confirm-delete="false" confirm-refresh="false"> 
      <rule id="dataRule1" column="selected" type="xsd:integer"/>  
      <rule id="dataRule2" column="isEnd" type="xsd:integer"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="activityID,sName,sExecuteMode,sPreemptMode,sExecuteMode2" src="" auto-load="false"
      id="flowToData" store-type="simple" confirm-delete="false" confirm-refresh="false"/>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="owner,sFID,sFName,responsible,sName" src="" auto-load="false" id="executorData"
      store-type="simple" confirm-delete="false" confirm-refresh="false"> 
      <rule id="dataRule5" column="responsible" type="xsd:integer"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="message,ruleMessage,smartValue" src="" auto-load="true" id="controlData"
      store-type="simple" confirm-delete="false" confirm-refresh="false"> 
      <rows xmlns="" id="default1">  
        <row id="default2"> 
          <cell id="default3"/>  
          <cell id="default4"/> 
        </row> 
      </rows> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="selected,isEnd,label,btnStatus" src="" auto-load="false" id="noticeData"
      store-type="simple" confirm-delete="false" confirm-refresh="false"> 
      <rule id="dataRule6" column="selected" type="xsd:integer"/>  
      <rule id="dataRule7" column="isEnd" type="xsd:integer"/> 
    </data>  
    <xforms:action id="action1" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript1"><![CDATA[batchProcessDialog.model1ModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      auto-load="true" id="dTask" concept="SA_Task" relations="sContent,sData1,version"
      store-type="simple" data-type="json" confirm-refresh="false" limit="1"> 
      <reader id="default6" action="/system/logic/action/queryTaskAction"/>  
      <writer id="default5" action="/system/logic/action/saveTaskAction"/>  
      <filter name="idFilter" id="filter1"><![CDATA[1=0]]></filter> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="" src="" auto-load="true" id="taskList" store-type="simple"/>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="dSuperviseMsg" concept="B_SuperviseMsg"
      limit="-1" store-type="simple"> 
      <reader id="default7" action="/base/core/flow/logic/action/queryB_SuperviseMsgAction"/>  
      <writer id="default8" action="/base/core/flow/logic/action/saveB_SuperviseMsgAction"/>  
      <creator id="default9" action="/base/core/flow/logic/action/createB_SuperviseMsgAction"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="guid,name,content,supervise,apply,stop" src="" auto-load="true" id="ruleData"
      store-type="simple" confirm-delete="false" confirm-refresh="false"/> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;display:none" id="rootLayout"> 
      <xhtml:div class="x-panel x-full" xid="panel"> 
        <xhtml:ul class="x-panel-top nav nav-tabs" style="height:40px;dislay:none"
          data-bind="visible:$model.stepCount.get()&gt;1"> 
          <li data-bind="visible:$model.isBatch.get()"> 
            <a id="navTaskList" href="#contentTaskList" data-toggle="tab"
              style="height:40px">任务选择</a> 
          </li>  
          <li data-bind="visible:!!$model.dataFormUrl.get()"> 
            <a id="navBizForm" href="#contentOperationForm" data-toggle="tab"
              style="height:40px">填写表单</a> 
          </li>  
          <li class="active"> 
            <a href="#contentProcessControl" data-toggle="tab" style="height:40px">设置接收人</a> 
          </li> 
        </xhtml:ul>  
        <xhtml:div class="x-panel-content" style="top: 40px;" data-bind="style:{top:$model.stepCount.get()&gt;1?'40px':'0px'}"> 
          <xhtml:div class="tab-content xui-autofill"> 
            <xhtml:div id="contentTaskList" class="tab-pane xui-autofill"> 
              <div id="viewTaskGrid" class="xui-autofill"/> 
            </xhtml:div>  
            <xhtml:div id="contentOperationForm" class="xui-autofill tab-pane"/>  
            <xhtml:div id="contentProcessControl" class="tab-pane in active"> 
              <xhtml:label xid="message" class="text-center" style="width:100%;font-weight: bold;margin-bottom:8px"
                data-bind="visible:$model.activityData.getCount() == 0,text:$model.controlData.ref('message')"/>  
              <xhtml:div class="panel-group"> 
                <xhtml:div class="panel panel-default" data-bind="visible:!!$model.ruleData.getCount()&gt;0"> 
                  <xhtml:div class="panel-heading">规则提示</xhtml:div>  
                  <xhtml:div data="ruleData" component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
                    list="true" id="bindRuleData"> 
                    <xhtml:div class="x-row list"> 
                      <xhtml:div class="x-col" data-bind="html:val('content'),attr:{title:val('name')}"/>  
                      <xhtml:div class="x-col" style="max-width:100px" data-bind="visible:val('supervise')==1"> 
                        <xhtml:a class="link-apply" href="#" data-bind="event:{click:$model._callModelFn.bind($model,'showSuperviseRule')},text:val('apply')==1?'监管已答复':'监管未答复',css:val('apply')==1?'':'noApplied'"/> 
                      </xhtml:div> 
                    </xhtml:div> 
                  </xhtml:div> 
                </xhtml:div>  
                <xhtml:div class="panel panel-default x-list" data-bind="visible:$model.activityData.getCount() &gt; 0"> 
                  <xhtml:div class="panel-heading">接收人</xhtml:div>  
                  <xhtml:div data="activityData" component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
                    list="true" id="bindActivityData"> 
                    <xhtml:div class="list-group-item" data-bind="style:{'border-width':$model.activityData.getCount() &gt; 1?'1px':'0px'}"> 
                      <xhtml:div class="row" data-bind="visible: $model.activityData.getCount() &gt; 1"> 
                        <xhtml:div class="col-xs-12"> 
                          <xhtml:div class="input-group"> 
                            <xhtml:span class="input-group-addon"> 
                              <xhtml:span data-bind="component:{ref:ref('selected'),name:'$model/UI/base/components/knockout/checkbox'}"
                                data-events="onChange:checkbox2Change" bind-ref="ref('selected')"
                                bind-visible="$model.activityData.getCount()&gt; 1" class="x-checkbox"/> 
                            </xhtml:span>  
                            <xhtml:div class="form-control font-bold x-output" data-bind="{text:val('label')}"/> 
                          </xhtml:div> 
                        </xhtml:div> 
                      </xhtml:div>  
                      <xhtml:div class="row" data-bind="visible:!val('isEnd')"> 
                        <xhtml:div class="col-xs-12 x-list x-img-list" data-bind="event:{click:$model._callModelFn.bind($model,'imgListClick')}"> 
                          <xhtml:div id="bindExecutorData" list="true" component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
                            data="executorData" filter="js:val('id') == $row.val('owner')"> 
                            <xhtml:div class="x-img-item org"> 
                              <xhtml:div class="x-img-content"> 
                                <a> 
                                  <div class="x-blob x-blob-radius x-img"> 
                                    <div class="x-blob-bar"> 
                                      <i class="x-blob-edit icon-compose"/>  
                                      <i class="x-blob-del icon-close-round"/> 
                                    </div>  
                                    <img class="x-blob-img x-autofill" data-bind="attr:{src:$model.getOrgImageUrl($element,val('sFID'))}"/> 
                                  </div> 
                                </a>  
                                <a data-bind="visible:$parent.val('btnStatus') === 'removeAll',event:{click:$model._callModelFn.bind($model,'imgListRemoveItemClick')}"
                                  class="x-img-top-right x-img-list-remove-item"/>  
                                <xhtml:div class="x-img-status" data-bind="visible:val('responsible') === 1"/> 
                              </xhtml:div>  
                              <span class="x-img-name" data-bind="{text:val('sName')}"/> 
                            </xhtml:div> 
                          </xhtml:div>  
                          <xhtml:div data-bind="visible:!$model.flowToExecutorReadonly"> 
                            <xhtml:div class="x-img-item x-img-list-add" style="height:65px"
                              data-bind="visible:!val('btnStatus'),event:{click:$model._callModelFn.bind($model,'flowToAddClick')}"> 
                              <xhtml:div class="x-img-content"> 
                                <a> 
                                  <img data-bind="{attr:{src:justep.Request.BASE_URL + '/UI/base/core/flowOperation/img/add.png'}}"
                                    class="x-img x-img-border"/> 
                                </a> 
                              </xhtml:div> 
                            </xhtml:div>  
                            <xhtml:div class="x-img-item x-img-list-remove" style="height:65px"
                              data-bind="visible:!val('btnStatus') &amp;&amp; val('executorCount') &gt; 0,event:{click:$model.imgListRemoveClick}"> 
                              <xhtml:div class="x-img-content"> 
                                <a> 
                                  <img data-bind="{attr:{src:justep.Request.BASE_URL + '/UI/base/core/flowOperation/img/remove.png'}}"
                                    class="x-img x-img-border"/> 
                                </a> 
                              </xhtml:div> 
                            </xhtml:div> 
                          </xhtml:div>  
                          <xhtml:div class="x-img-item x-img-list-remove-all" data-bind="visible:val('btnStatus')==='removeAll'"
                            onClick="butone.Context.getBindModel().imgListRemoveAllClick(event,'bindExecutorData');"> 
                            <a style="color:#f57e7b;">清空所有</a> 
                          </xhtml:div>  
                          <xhtml:div style="clear:both"/> 
                        </xhtml:div> 
                      </xhtml:div> 
                    </xhtml:div> 
                  </xhtml:div> 
                </xhtml:div>  
                <xhtml:div class="panel panel-default"> 
                  <xhtml:div class="panel-heading">附言</xhtml:div>  
                  <xhtml:textarea class="form-control" data-bind="component:{ref:$model.dTask.ref('sContent'),name:'$model/UI/base/components/knockout/textarea'}"
                    rows="3" style="border-top-right-radius: 0px;border-top-left-radius: 0px;"/> 
                </xhtml:div> 
              </xhtml:div> 
            </xhtml:div> 
          </xhtml:div> 
        </xhtml:div>  
        <xhtml:div class="x-panel-bottom"> 
          <xhtml:a class="btn btn-link btn-only-label x-dialog-button" xid="cancelBtn"
            data-bind="event:{click:$model.cancelBtnClick}"> 
            <i/>  
            <span>取消</span> 
          </xhtml:a>  
          <xhtml:a class="btn btn-primary btn-only-label x-dialog-button" xid="okBtn"
            data-bind="event:{click:$model.okBtnClick},visible:!$model.stop.get()"> 
            <i/>  
            <span>确定</span> 
          </xhtml:a> 
        </xhtml:div> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace1" style="position:absolute;top:58px;left:357px;"/>  
      <xui:place control="wdSelectExecutors" id="controlPlace4" style="position:absolute;left:434px;top:57px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="batchProcessDialog.windowReceiverReceive"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="选择办理人" width="556px" height="364px" modal="true" id="wdSelectExecutors"
      url="/UI/system/components/orgSelectExt/dialog/orgDialog.w"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script><![CDATA[
		this.__requireComponents = this.__requireComponents.concat(["base/lib/bootstrap/bootstrap","base/components/knockout/checkbox","base/components/knockout/textarea",
					"base/components/knockout/input", "base/lib/bind/url","base/lib/bind/org","base/components/knockout/messageDialog",
					"base/components/knockout/windowDialog" ]);
	]]> </xhtml:script>  
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/lib/jquery-ui-1.7.1/themes/base/ui.all.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/lib/jquery.jqGrid-4.4.3/css/ui.jqgrid.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/lib/bind/css/blob.css"/>  
    <xhtml:script src="/UI/base/lib/jquery.jqGrid-4.4.3/js/i18n/grid.locale-cn.js"/>  
    <xhtml:script src="/UI/base/lib/jquery.jqGrid-4.4.3/js/jquery.jqGrid.min.js"/>  
    <xhtml:script src="/UI/base/lib/jquery-ui-1.7.1/external/cookie/jquery.cookie.min.js"/>  
    <xhtml:script loadKO="true" src="/UI/base/lib/init.js"/>  
    <xhtml:script src="/UI/system/service/org/orgUtils.js"/>  
    <xhtml:script src="/UI/system/components/process/process.js"/>  
    <xhtml:script src="/UI/system/components/windowFrame/windowFrame.js"/>  
    <xhtml:script src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script src="batchProcessDialog.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="batchProcessDialog.css"/> 
  </xui:resource> 
</xui:window>
