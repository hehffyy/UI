<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="left:423px;height:auto;top:176px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="huoDong" concept="B_GongZuoHuoDong" store-type="simple"
      limit="15" confirm-refresh="false"> 
      <reader id="default11" action="/common/gzzx/logic/action/queryMyYueJianAction"/>  
      <writer id="default12"/>  
      <creator id="default15"/> 
    </data>  
    <xforms:action id="action1" ev:event="onload"> 
      <xforms:script id="xformsScript1"><![CDATA[yueJianCenter.modelLoad(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action2" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript2"><![CDATA[yueJianCenter.modelModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="lingDaoPS" concept="B_HuoDongChuLi" limit="-1"
      onRefreshCreateParam="yueJianCenter.lingDaoPSRefreshCreateParam" store-type="simple"> 
      <reader id="default1" action="/common/gzzx/logic/action/queryZhuXianLingDaoPSAction"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="chuLi" concept="B_HuoDongChuLi" store-type="simple"
      limit="10"> 
      <master id="master1" data="huoDong" relation="fHuoDong"/>  
      <reader id="default2" action="/common/gzzx/logic/action/queryHuoDongChuLiAction"/>  
      <writer id="default3" action="/common/gzzx/logic/action/saveHuoDongChuLiAction"/>  
      <creator id="default4" action="/common/gzzx/logic/action/createHuoDongChuLiAction"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="status,name" src="" auto-load="false" id="data"/>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="state,name" src="" auto-load="false" id="cdata" store-type="simple"
      auto-new="true"/>  
    <xforms:action id="action3" ev:event="xforms-ready"> 
      <xforms:script id="xformsScript3"><![CDATA[yueJianCenter.modelReady(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;padding-left:10px;padding-right:10px;"> 
        <top size="40px" id="borderLayout-top1"> 
          <xhtml:div id="div1" class="navbar"> 
            <xhtml:div class="navbar-inner" id="div2" style="height:40px;"> 
              <xhtml:div class="buttonbar" data-bind="style:{display:$model.contentId.get() == 'containerList'?'inline':'none'}"> 
                <xui:place control="gridFilter1" id="controlPlace1" style="margin-top: 3px;background-color:#fff;width:120px;height:28px;"/>  
                <xui:place control="gridSelect1" id="controlPlace4" style="margin-top: 3px;background-color:#fff;width:100px;height:28px;"/>  
                <xui:place control="smartFilter1" style="margin-top: 3px;background-color: #fff;width:300px;height:28px;"/>  
                <button class="btn" type="button" id="btnSearch" onclick="yueJianCenter.btnSearchClick(event)"
                  style="margin-top: 3px;vertical-align:top;border:1px solid #dddddd;"> 
                  <i class="icon icon-system-search"/> 
                </button> 
              </xhtml:div>  
              <xhtml:div data-bind="style:{display:$model.contentId.get() == 'containerList'?'inline':'none'}"> 
                <xhtml:button id="btnRefresh" class="btn" style="float:right;margin:3px 0px 0px -1px;height: 36px;border-radius: 0 4px 4px 0;border: 1px solid #dddddd;"
                  data-bind="event:{click:$model.huoDong.refreshData.bind($model.huoDong)}"> 
                  <label>刷新</label> 
                </xhtml:button>  
                <xui:place control="listPage" style="float:right;margin:3px 0px 0px;"/> 
              </xhtml:div>  
              <xhtml:div class="buttonbar" style="display:none" data-bind="style:{'display':($model.contentId.get() == 'containerDetail' || $model.contentId.get() == 'fileContent') &amp;&amp; huoDong.getCurrentRow()?'inline-block':'none'}"> 
                <xhtml:button id="btnReplay" class="btn" style="border: 1px solid #dddddd;"
                  data-bind="event:{click:$model._callModelFn.bind($model, 'publishYiJian')}"> 
                  <i class="icon-system-edit-alt"/>  
                  <label>发表意见</label> 
                </xhtml:button>  
                <!--<xhtml:button id="btnJbsx" class="btn" style="border: 1px solid #dddddd;"
                  data-bind="event:{click:$model._callModelFn.bind($model, 'jbsx')}"> 
                  <i class="icon-system-edit-alt"/>  
                  <label>交办事项</label> 
                </xhtml:button> 
              --></xhtml:div>  
              <xhtml:div class="pull-right" style="display:none;margin-top:3px" data-bind="style:{'display':($model.contentId.get() == 'containerDetail' || $model.contentId.get() == 'fileContent')?'inline-block':'none'}"> 
                <xhtml:div class="buttonbar"> 
                  <!--                  <xhtml:button class="btn" data-bind="event:{click:$model.huoDong.refreshData.bind($model.huoDong)}"> -->  
                  <!--                    <i class="icon2-refresh"/> -->  
                  <!--                  </xhtml:button>  -->  
                  <!--                  <xhtml:button class="btn" data-bind="disable:$model.huoDong.bof(),event:{click:huoDong.pre.bind($model.huoDong)}"> -->  
                  <!--                    <i data-bind="css: { 'icon2-left': !$model.huoDong.bof(),'icon2-disleft':$model.huoDong.bof() }"/> -->  
                  <!--                  </xhtml:button>  -->  
                  <!--                  <xhtml:button id="nextBtn" class="btn" data-bind="disable:$model.huoDong.eof(),event:{click:$model.huoDong.next.bind($model.huoDong)}"> -->  
                  <!--                    <i data-bind="css: { 'icon2-disright': $model.huoDong.eof(),'icon2-right' : !$model.huoDong.eof() }"/> -->  
                  <!--                  </xhtml:button>  -->  
                  <xhtml:button id="btnIdeas" class="btn" style="border: 1px solid #dddddd;"
                    data-bind="event:{click:$model._callModelFn.bind($model, 'showDetial')},visible:$model.contentId.get()=='fileContent'"> 
                    <i class="icon-system-eye"/>  
                    <label>查看意见</label> 
                  </xhtml:button>
                  <xhtml:button id="btnBack" class="btn" style="border: 1px solid #dddddd;"
                    data-bind="event:{click:$model._callModelFn.bind($model, 'showList')}"> 
                    <i class="icon2-back"/>  
                    <label>返回列表</label> 
                  </xhtml:button> 
                </xhtml:div> 
              </xhtml:div> 
            </xhtml:div> 
          </xhtml:div> 
        </top>  
        <center id="borderLayout-center1"> 
          <xhtml:div id="contents" style="width:100%;height:100%;" class="xui-container"> 
            <xhtml:div id="containerList" data-bind="visible:$model.contentId.get()=='containerList'"> 
              <xui:place control="bindList"/> 
            </xhtml:div>  
            <xhtml:div id="containerDetail" style="padding-top:15px;height:100%;overflow:auto;display:none"
              data-bind="if:$model.contentId.get()=='containerDetail',visible:huoDong.getCount()&gt;0 &amp;&amp; $model.contentId.get()=='containerDetail'"> 
              <xui:place control="bindDetail"/>  
              <span id="scrolltop" onclick="$(containerDetail).scrollTop('0')"
                style="left:auto;right:2px;" data-bind="visible:$model.listScrollTop.get()&gt;0">回顶部</span> 
            </xhtml:div>
          </xhtml:div> 
        </center> 
      </xhtml:div>  
      <xui:place control="wdEdit" id="controlPlace2" style="left:318px;top:160px;"/>  
      <xui:place control="changeDialog" id="controlPlace3" style="position:absolute;top:159px;left:215px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
      id="smartFilter1" filter-data="huoDong" filter-relations="fActivityTitle,fHostOrg"/>  
    <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next"
      id="listPage" page-count="5" data="huoDong" align="right"/>  
    <xhtml:div component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
      class="" type="flow" id="bindList" data="huoDong"> 
      <xhtml:table class="table table-hover table-bottom celllayout" data-config="{'huoDong':'1'}"
        id="yueJianTable"> 
        <xhtml:tr> 
          <xhtml:th style="width:200px">来文单位</xhtml:th>  
          <xhtml:th>来文名称</xhtml:th>  
          <xhtml:th style="width:60px">状态</xhtml:th>  
          <xhtml:th style="width:105px">类型</xhtml:th>  
          <xhtml:th style="width:105px">发布时间</xhtml:th>  
          <xhtml:th style="width:105px">查看/发表</xhtml:th>  
          <!--<xhtml:th style="width:105px">最后发表</xhtml:th>  
          <xhtml:th style="width:105px">领导签批</xhtml:th> 
        --> 
        </xhtml:tr>  
        <xhtml:tr class="cp" style="display:none;" data-bind="attr:{rowid:$object.getID()},event:{click:$model._callModelFn.bind($model,'showDetial')}"> 
          <xhtml:td data-bind="text:$object.ref('fHostOrg'),attr:{'title':$object.ref('fHostOrg')}"
            class="ellipsis"/>  
          <xhtml:td class="list_name ellipsis" style="padding-left:0;"> 
            <!--            <xhtml:div class="ellipsis"> -->  
            <xhtml:a href="javascript:(0)" data-bind="html:$object.ref('fActivityTitle'),attr:{'title':$object.ref('fActivityTitle')}"/>  
            <!--            </xhtml:div> --> 
          </xhtml:td>  
          <xhtml:td data-bind="text:$object.val('fState')"/>  
          <xhtml:td data-bind="text:$object.val('fItemType')"/>  
          <xhtml:td> 
            <span data-bind="html:$model.formatDateTime($object.ref('fStartTime')),attr:{'title':$model.transformDatetime($object.ref('fStartTime'))}"/> 
          </xhtml:td>  
          <xhtml:td data-bind="text:($object.val('fViewCount')== ''?0:$object.val('fViewCount')) + '/' + ($object.val('fChuLiCount')== ''?0:$object.val('fChuLiCount'))"/>  
          <!--<xhtml:td class="noPaddingTB"> 
            <cite style="display:block" data-bind="text:$object.ref('fLastPerson')"/>  
            <em> 
              <span data-bind="html:$model.formatDateTime($object.ref('fLastTime')),attr:{'title':$model.transformDatetime($object.ref('fLastTime'))}"/> 
            </em> 
          </xhtml:td>  
          <xhtml:td class="noPaddingTB"> 
            <cite style="display:block" data-bind="text:$object.ref('fLastLingDao')"/>  
            <em> 
              <span data-bind="html:$model.formatDateTime($object.ref('fLastPSTime')),attr:{'title':$model.transformDatetime($object.ref('fLastPSTime'))}"/> 
            </em> 
          </xhtml:td> 
        --> 
        </xhtml:tr> 
      </xhtml:table> 
    </xhtml:div>  
    <xhtml:div component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
      class="pl bm" data-bind="if:huoDong.getCurrentRow()" type="flow" id="bindDetail"
      data="huoDong" style="margin:0 20px"> 
      <xhtml:table cellspacing="0" cellpadding="0"> 
        <xhtml:tr> 
          <xhtml:td class="pls ptm pbm pi"> 
            <div class="hm"> 
              <span class="xg1">查看:</span>  
              <span class="xi1" data-bind="text:huoDong.val('fViewCount')==''?0:huoDong.val('fViewCount')"/>  
              <span class="pipe">|</span>  
              <span class="xg1">发表:</span>  
              <span class="xi1" data-bind="text:huoDong.val('fChuLiCount')==''?0:huoDong.val('fChuLiCount')"/> 
            </div> 
          </xhtml:td>  
          <xhtml:td class="plc ptm pbn vwthd pi"> 
            <div class="y"> 
              <a href="javascript:(0)" title="上一主题" data-bind="disable:$model.huoDong.bof(),event:{click:huoDong.pre.bind($model.huoDong)}"> 
                <i alt="上一主题" class="vm" data-bind="css: { 'icon2-left': !$model.huoDong.bof(),'icon2-disleft':$model.huoDong.bof() }"/> 
              </a>  
              <a href="javascript:(0)" title="下一主题" data-bind="disable:$model.huoDong.eof(),event:{click:$model.huoDong.next.bind($model.huoDong)}"> 
                <i alt="下一主题" class="vm" data-bind="css: { 'icon2-disright': $model.huoDong.eof(),'icon2-right' : !$model.huoDong.eof() }"/> 
              </a> 
            </div>  
            <h3 class="ts" data-bind="text:huoDong.val('fActivityTitle')"/> 
          </xhtml:td> 
        </xhtml:tr>  
        <xhtml:tr> 
          <xhtml:td class="pls"> 
            <div class="fbt"> 
              <div class="xg1">来文单位</div>  
              <div class="xi1 ellipsis" data-bind="text:huoDong.val('fHostOrg'),attr:{title:huoDong.val('fHostOrg')}"/> 
            </div>  
            <div class="fbt"> 
              <div class="xg1">发布时间</div>  
              <div class="xi1" data-bind="html:$model.formatDateTime(huoDong.ref('fStartTime'))"/> 
            </div> 
          </xhtml:td>  
          <xhtml:td class="plc"> 
            <xhtml:div class="ckeditorContent bottom-dashed "/>  
            <xhtml:div component="/UI/base/components/attachment.xbl.xml#attachment"
              data-bind="" access="d" showName="true" id="attachmentHuoDong" ref="data('huoDong')/fAttachment"
              class="flexboxlegacy"> 
              <div class="x-attachment"> 
                <div class="x-attachment-content x-card-border"> 
                  <div class="x-doc-process"> 
                    <div class="progress-bar x-doc-process-bar" role="progressbar"
                      style="width:0%;"/> 
                  </div>  
                  <div data-bind="foreach:$attachmentItems"> 
                    <div class="x-attachment-cell"> 
                      <div> 
                        <div style="margin-bottom:5px" class="x-attachment-item x-item-other"
                          data-bind="attr:{title:$object.docName},click:$model.previewOrRemoveItem.bind($model),style:{opacity: $model.$access.get() % 4 &gt;= 2 || $model.$state.get() == 'remove' ? '1.0' : '0.5',backgroundImage:($model.previewPicture.bind($model,$object))()}"> 
                          <a data-bind="visible:$model.$state.get() == 'remove'"
                            class="x-remove-barget"/> 
                        </div>  
                        <label data-bind="text:$object.docName;visible:$model.showName"
                          style="display:block;margin-left:10px"/> 
                      </div> 
                    </div> 
                  </div>  
                  <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; ($limit.get() == '-1' || $limit.get() &gt; $attachmentItems.get().length)"> 
                    <div class="x-attachment-item x-item-upload" data-bind="visible:$state.get() == 'upload' &amp;&amp; $access.get() % 512 &gt;= 256"/> 
                  </div>  
                  <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; $attachmentItems.get().length &gt; 0"> 
                    <div class="x-attachment-item x-item-remove" data-bind="click:changeState.bind($object,'remove'),visible:$access.get() % 2048 &gt;= 1024"/> 
                  </div>  
                  <div style="clear:both;"/> 
                </div> 
              </div> 
            </xhtml:div> 
          </xhtml:td> 
        </xhtml:tr> 
      </xhtml:table>  
      <table cellspacing="0" cellpadding="0" class="ad"> 
        <tbody> 
          <tr> 
            <td class="pls"/>  
            <td class="plc"/> 
          </tr> 
        </tbody> 
      </table>  
      <xhtml:div component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
        class="" type="flow" id="bindLingDaoPSList" list="true" data="lingDaoPS"> 
        <!--        <xhtml:div> -->  
        <xhtml:table cellspacing="0" cellpadding="0"> 
          <xhtml:tr> 
            <xhtml:td class="pls"> 
              <div class="fbt"><!-- 
                <div class="xg1">签批领导</div>  
                --><div class="xw1" data-bind="text:$object.ref('fOrgUnitName')"/> 
              </div>  
              <div class="fbt"> 
                <!--<div class="xg1">签批时间</div>  
                --><div class="xi1" data-bind="html:$model.formatDateTime($object.ref('fFinishTime'))"/> 
              </div> 
            </xhtml:td>  
            <xhtml:td class="plc"> 
              <xhtml:div class="ckeditorContent bottom-dashed " data-bind="html:$object.val('fContent')"/>  
              <xhtml:div component="/UI/base/components/attachment.xbl.xml#attachment"
                data-bind="" access="d" showName="true" id="attachmentPS" ref="data('lingDaoPS')/fAttachment"
                class="flexboxlegacy"> 
                <div class="x-attachment"> 
                  <div class="x-attachment-content x-card-border"> 
                    <div class="x-doc-process"> 
                      <div class="progress-bar x-doc-process-bar" role="progressbar"
                        style="width:0%;"/> 
                    </div>  
                    <div data-bind="foreach:$attachmentItems"> 
                      <div class="x-attachment-cell"> 
                        <div> 
                          <div style="margin-bottom:5px" class="x-attachment-item x-item-other"
                            data-bind="attr:{title:$object.docName},click:$model.previewOrRemoveItem.bind($model),style:{opacity: $model.$access.get() % 4 &gt;= 2 || $model.$state.get() == 'remove' ? '1.0' : '0.5',backgroundImage:($model.previewPicture.bind($model,$object))()}"> 
                            <a data-bind="visible:$model.$state.get() == 'remove'"
                              class="x-remove-barget"/> 
                          </div>  
                          <label data-bind="text:$object.docName;visible:$model.showName"
                            style="display:block;margin-left:10px"/> 
                        </div> 
                      </div> 
                    </div>  
                    <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; ($limit.get() == '-1' || $limit.get() &gt; $attachmentItems.get().length)"> 
                      <div class="x-attachment-item x-item-upload" data-bind="visible:$state.get() == 'upload' &amp;&amp; $access.get() % 512 &gt;= 256"/> 
                    </div>  
                    <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; $attachmentItems.get().length &gt; 0"> 
                      <div class="x-attachment-item x-item-remove" data-bind="click:changeState.bind($object,'remove'),visible:$access.get() % 2048 &gt;= 1024"/> 
                    </div>  
                    <div style="clear:both;"/> 
                  </div> 
                </div> 
              </xhtml:div> 
            </xhtml:td> 
          </xhtml:tr> 
        </xhtml:table>  
        <table cellspacing="0" cellpadding="0" class="ad"> 
          <tbody> 
            <tr> 
              <td class="pls"/>  
              <td class="plc"/> 
            </tr> 
          </tbody> 
        </table> 
      </xhtml:div> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="" width="650px" height="450px" modal="true" id="wdEdit" url="/UI/base/common/dialog/htmlEditorDialog.w"
      status="minimize" reload-on-open="true"/>  
    <xhtml:div component="/UI/system/components/filter.xbl.xml#gridFilter" all-selected-label="'全部'"
      id="gridFilter1" filter-data="huoDong" filter-relation="fItemType"> 
      <xforms:label ref="name" id="default5"/>  
      <xforms:value ref="status" id="default6"/>  
      <xforms:itemset id="default7" data="data"> 
        <xforms:column ref="status" visible="false" id="default28"/>  
        <xforms:column ref="name" id="default29"/>  
        <itemset-data xmlns="" id="default32">  
          <rows id="default33"/> 
        </itemset-data> 
      </xforms:itemset> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
      dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
      ext-separator="," id="gridSelect1" onCloseup="yueJianCenter.gridSelect1Closeup"
      ref="data('cdata')/state" label-ref="data('cdata')/name" all-selected-label-ref="'全部'"> 
      <xforms:label ref="name" id="default9"/>  
      <xforms:value ref="state" id="default14"/>  
      <xforms:itemset id="default16"> 
        <xforms:column ref="state" visible="false" id="default25"/>  
        <xforms:column ref="name" id="default26"/>  
        <itemset-data xmlns="" id="default66">  
          <rows id="default67"> 
            <row id="default68"> 
              <cell id="default69"/>  
              <cell id="default70">全部状态</cell> 
            </row>  
            <row id="default71"> 
              <cell id="default72">未阅</cell>  
              <cell id="default73">未阅</cell> 
            </row>  
            <row id="default74"> 
              <cell id="default75">已阅</cell>  
              <cell id="default76">已阅</cell> 
            </row> 
          </rows> 
        </itemset-data> 
      </xforms:itemset> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="交办事项" width="650px" height="450px" modal="true" id="changeDialog" url="/UI/common/gzzx/process/gzzx/changeToOther.w"
      reload-on-open="true" status="minimize" resizable="false" minmaxable="false"/>  
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/base/lib/bootstrap/bootstrap.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink2" href="/UI/common/gzzx/process/gzzx/mainActivity.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink3" href="/UI/common/gzzx/process/gzzx/yueJianCenter.css"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/lib/init.js" loadKO="true"/>  
    <xhtml:script id="htmlScript1" src="yueJianCenter.js"/>
    <xhtml:script id="htmlScript5" src="/UI/base/core/template/butoneExtend.js"/>   
    <xhtml:script id="htmlScript3" src="/UI/system/service/doc/docUtil.js"/>  
    <xhtml:script id="htmlScript4" src="/UI/system/service/doc/docUtil2.js"/> 
  </xui:resource> 
</xui:window>
