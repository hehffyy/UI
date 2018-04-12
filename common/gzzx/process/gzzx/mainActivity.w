<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="height:auto;left:98px;top:271px;"> 
    <xforms:action id="action1" ev:event="onload"> 
      <xforms:script id="xformsScript1"><![CDATA[mainActivity.modelLoad(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="myZhuXian" concept="B_GongZuoZhuXian"
      store-type="grid" limit="15" confirm-refresh="false" confirm-delete="false"
      onValueChanged="mainActivity.myZhuXianValueChanged"> 
      <reader id="default8" action="/common/gzzx/logic/action/queryMyAllZhuXianAction"/>  
      <writer id="default9" action="/common/gzzx/logic/action/saveGongZuoZhuXianAction"/>  
      <creator id="default10" action="/common/gzzx/logic/action/createGongZuoZhuXianAction"/> 
    </data>  
    <xforms:action id="action3" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript3"><![CDATA[mainActivity.modelModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="huoDongOfZX" concept="B_GongZuoHuoDong"
      store-type="simple" limit="-1"> 
      <reader id="default11" action="/common/gzzx/logic/action/queryGongZuoHuoDongAction"/>  
      <writer id="default12" action="/common/gzzx/logic/action/saveGongZuoHuoDongAction"/>  
      <creator id="default15" action="/common/gzzx/logic/action/createGongZuoHuoDongAction"/>  
      <master id="master1" data="myZhuXian" relation="fZhuXian"/> 
    </data>  
    <xforms:action id="action2" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript2"><![CDATA[mainActivity.modelXBLLoaded(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action4" ev:event="xforms-model-construct-done"> 
      <xforms:script id="xformsScript4"><![CDATA[mainActivity.modelModelConstructDone(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="huoDongCB" concept="B_HuoDongCuiBan"
      limit="0" store-type="simple"> 
      <reader action="/common/gzzx/logic/action/queryHuoDongCuiBanAction"/>  
      <writer action="/common/gzzx/logic/action/saveHuoDongCuiBanAction"/>  
      <creator action="/common/gzzx/logic/action/createHuoDongCuiBanAction"/>  
      <master id="master2" data="huoDongOfZX" relation="fHuoDong"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="huoDongCL" concept="B_HuoDongChuLi" limit="-1"
      store-type="simple"> 
      <reader id="default19" action="/common/gzzx/logic/action/queryHuoDongChuLiAction"/>  
      <master id="master3" data="huoDongOfZX" relation="fHuoDong"/> 
    </data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true" class="zhuXian"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xui:place control="grid1" style="display:none"/>  
      <xhtml:div class="x-popMenu" id="gzPop" style="display:none" onclick="$(this).hide();"> 
        <div class="x-popMenu-overlay"/>  
        <xhtml:div class="x-popMenu-content popover fade right in" style="top: -1000px;"> 
          <!--        <div class="popover-inner"> -->  
          <div class="arrow"/>  
          <div class="popover-content"> 
            <ul> 
              <li> 
                <a href="javascript:void(0)" level="1" data-bind="event:{click:$model._callModelFn.bind($model,'setGuanZhu')}"> 
                  <i class="icon2-gz1"/>一般关注
                </a> 
              </li>  
              <li> 
                <a href="javascript:void(0)" level="2" data-bind="event:{click:$model._callModelFn.bind($model,'setGuanZhu')}"> 
                  <i class="icon2-gz2"/>特别关注
                </a> 
              </li>  
              <li class="x-menu-divider divider"/>  
              <li> 
                <a href="javascript:void(0)" level="" data-bind="event:{click:$model._callModelFn.bind($model,'setGuanZhu')}"> 
                  <i class="icon2-gz0"/>取消关注
                </a> 
              </li> 
            </ul> 
          </div>  
          <!--        </div> --> 
        </xhtml:div> 
      </xhtml:div>  
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="200px"
        mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;"
        has-drag-bar="true" has-arrow-button="false" resizable="false"> 
        <xhtml:div region="left"> 
          <xhtml:div style="padding: 12px 10px 10px 15px;"> 
            <xhtml:button class="linkBtn" id="newCustomZhuXian"> 
              <xhtml:i class="icon icon-system-edit-alt" style="margin-top: 3px"/>  
              <xhtml:span onclick="mainActivity.newCustomZhuXianClick(event)">新建主线</xhtml:span> 
            </xhtml:button> 
          </xhtml:div>  
          <xhtml:div style="width: 90%;margin: 0 auto;    border-bottom: 1px solid #ddd;"/>  
          <xhtml:ul id="navZhuXian"> 
            <xhtml:li> 
              <xhtml:a href="javascript:(0);" data-bind="event:{click:$model.setListType.bind($model)}"
                title="我的主线"> 
                <xhtml:i class="icon icon-system-user"/>  
                <xhtml:span class="mgL5">我的主线</xhtml:span> 
              </xhtml:a> 
            </xhtml:li>  
            <!--            <xhtml:li> -->  
            <!--              <xhtml:a href="javascript:(0);" data-bind="event:{click:$model.setListType.bind($model)}"-->  
            <!--                title="我的活动"> -->  
            <!--                <xhtml:i class="icon icon-system-th-list"/>  -->  
            <!--                <xhtml:span class="mgL5"><![CDATA[我的活动]]></xhtml:span> -->  
            <!--              </xhtml:a> -->  
            <!--            </xhtml:li>  -->  
            <xhtml:li> 
              <xhtml:a href="javascript:(0);" data-bind="event:{click:$model.setListType.bind($model)}"
                title="特别关注"> 
                <xhtml:i class="icon icon-system-heart-empty"/>  
                <xhtml:span class="mgL5">特别关注</xhtml:span> 
              </xhtml:a> 
            </xhtml:li>  
            <xhtml:li> 
              <xhtml:a href="javascript:(0);" data-bind="event:{click:$model.setListType.bind($model)}"
                title="回收站"> 
                <xhtml:i class="icon icon-system-trash"/>  
                <xhtml:span class="mgL5">回收站</xhtml:span> 
              </xhtml:a> 
            </xhtml:li> 
          </xhtml:ul> 
        </xhtml:div>  
        <xhtml:div region="right" style="background: url('./images/bg.png')"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="layoutMain" style="width:100%; height: 100%;;"> 
            <top id="borderLayout-top1" size="50px"> 
              <xhtml:div class="navbar" id="mainTitle" onselectstart="return false;"> 
                <xhtml:div class="navbar-inner" style="height:44px;"> 
                  <xhtml:span class="brand" data-bind="text:$model.listTypeName"/>  
                  <xhtml:button id="btnRefresh" class="btn" style="float:right;margin:2px 0 0 -9px;height: 36px;border-radius: 0 4px 4px 0;border: 1px solid #dddddd;"
                    data-bind="style:{display:$model.contentId.get() == 'containerList'?'inline':'none'},event:{click:$model.myZhuXian.refreshData.bind($model.myZhuXian)}"> 
                    <span>刷新</span> 
                  </xhtml:button>  
                  <xui:place control="listPage" style="float:right;height:36px;padding:2px 8px;margin:0;"/>  
                  <xhtml:div class="pull-right" style="display:none;margin-top:3px"
                    data-bind="style:{'display':$model.contentId.get() == 'containerDetail'?'inline-block':'none'}"> 
                    <xhtml:div class="buttonbar"> 
                      <xhtml:button class="btn" data-bind="event:{click:$model.myZhuXian.refreshData.bind($model.myZhuXian)}"> 
                        <i class="icon2-refresh"/> 
                      </xhtml:button>  
                      <xhtml:button class="btn" data-bind="disable:$model.myZhuXian.bof(),event:{click:myZhuXian.pre.bind($model.myZhuXian)}"> 
                        <i data-bind="css: { 'icon2-left': !$model.myZhuXian.bof(),'icon2-disleft':$model.myZhuXian.bof() }"/> 
                      </xhtml:button>  
                      <xhtml:button id="nextBtn" class="btn" data-bind="disable:$model.myZhuXian.eof(),event:{click:$model.myZhuXian.next.bind($model.myZhuXian)}"> 
                        <i data-bind="css: { 'icon2-disright': $model.myZhuXian.eof(),'icon2-right' : !$model.myZhuXian.eof() }"/> 
                      </xhtml:button>  
                      <xhtml:button id="btnBack" class="btn" data-bind="event:{click:$model._callModelFn.bind($model, 'showList')}"> 
                        <i class="icon2-back"/>  
                        <label>返回</label> 
                      </xhtml:button> 
                    </xhtml:div> 
                  </xhtml:div> 
                </xhtml:div> 
              </xhtml:div> 
            </top>  
            <center id="borderLayout-center1"> 
              <xhtml:div class="contents" id="contents"> 
                <xhtml:div class="content" id="containerList" data-bind="style:{display:$model.contentId.get()=='containerList'}?'inline':'none'"> 
                  <xhtml:div class="toolbar" id="listToolbar"> 
                    <xhtml:div class="clearfix"> 
                      <xui:place control="gridFilter1"/>  
                      <xui:place control="gridFilter2"/>  
                      <xhtml:div class="buttonbar" style="float:right"> 
                        <xui:place control="smartFilter1"/>  
                        <button class="btn" type="button" id="btnSearch" onclick="mainActivity.btnSearchClick(event)"> 
                          <i class="icon icon-system-search"/> 
                        </button> 
                      </xhtml:div> 
                    </xhtml:div> 
                  </xhtml:div>  
                  <xui:place control="bindList"/> 
                </xhtml:div>  
                <xhtml:div class="content" id="containerDetail" style="visibility:hidden;padding-bottom:20px"
                  data-bind="if:$model.contentId.get()=='containerDetail',style:{visibility:myZhuXian.getCount()&gt;0 &amp;&amp; $model.contentId.get()=='containerDetail'?'visible':'hidden'}"> 
                  <xui:place control="bindDetail"/> 
                </xhtml:div> 
              </xhtml:div> 
            </center> 
          </xhtml:div> 
        </xhtml:div> 
      </xhtml:div>  
      <xui:place control="wrViewHuoDong" id="controlPlace1" style="position:absolute;left:463px;top:209px;"/>  
      <xui:place control="wdEdit" id="controlPlace2" style="position:absolute;left:524px;top:212px;"/>  
      <xui:place control="wdCuiBan" id="controlPlace3" style="position:absolute;left:594px;top:212px;"/>  
      <xui:place control="wdZhuXian" id="controlPlace5" style="left:651px;top:216px;"/>
    </xui:layout>  
    <xhtml:div component="/UI/system/components/filter.xbl.xml#gridFilter" id="gridFilter1"
      filter-data="myZhuXian" filter-relation="fSourceType" class="pull-left" all-selected-label="'所有类型'"
      auto-refresh="false"> 
      <xforms:label ref="name" id="default2"/>  
      <xforms:value ref="type" id="default3"/>  
      <xforms:itemset id="default4" auto-load-data="true"> 
        <xforms:column ref="type" visible="false" id="default13"/>  
        <xforms:column ref="name" id="default14"/>  
        <itemset-data xmlns="" id="default26">  
          <rows id="default27"> 
            <row id="default28"> 
              <cell id="default29">来文</cell>  
              <cell id="default30">来文</cell> 
            </row>  
            <row id="default31"> 
              <cell id="default32">通知</cell>  
              <cell id="default33">通知</cell> 
            </row>  
            <row id="default34"> 
              <cell id="default35"/>  
              <cell id="default36">所有类型</cell> 
            </row> 
          </rows> 
        </itemset-data> 
      </xforms:itemset> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/filter.xbl.xml#gridFilter" id="gridFilter2"
      filter-data="myZhuXian" filter-relation="fStatus" class="pull-left" auto-refresh="false"
      all-selected-label="'所有状态'" data-bind="visible:$model.listTypeName.get()!='回收站'"> 
      <xforms:label ref="name" id="default5"/>  
      <xforms:value ref="status" id="default6"/>  
      <xforms:itemset id="default7" auto-load-data="true"> 
        <xforms:column ref="status" visible="false" id="default39"/>  
        <xforms:column ref="name"/>  
        <itemset-data xmlns="">  
          <rows id="default53"> 
            <row id="default54"> 
              <cell id="default55">处理中</cell>  
              <cell id="default56">处理中</cell> 
            </row>  
            <row id="default57"> 
              <cell id="default58">已完成</cell>  
              <cell id="default59">已完成</cell> 
            </row>  
            <row id="default60"> 
              <cell id="default61"/>  
              <cell id="default62">所有状态</cell> 
            </row> 
          </rows> 
        </itemset-data> 
      </xforms:itemset> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
      id="smartFilter1" filter-data="myZhuXian" filter-relations="fTitle"/>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="myZhuXian"/>  
    <xhtml:div component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
      class="" type="flow" id="bindList"> 
      <xhtml:table class="table table-hover table-striped table-bottom celllayout"
        data-config="{'myZhuXian':'1'}" id="zhuXianTable"> 
        <xhtml:tr> 
          <xhtml:th style="width:5px"/>  
          <xhtml:th style="width:20px"/>  
          <xhtml:th>标题</xhtml:th>  
          <xhtml:th style="width:60px">办件</xhtml:th>  
          <xhtml:th style="width:160px">创建时间</xhtml:th> 
        </xhtml:tr>  
        <xhtml:tr style="display:none" data-bind="attr:{rowid:$object.getID()},event:{click:$model._callModelFn.bind($model,'showDetial')}"> 
          <xhtml:td class="w2" style="padding:7px 0 7px 0"/>  
          <xhtml:td class="w2" style="padding:7px 0 7px 0"> 
            <a href="javascript:void(0);" data-bind="if:$model.listTypeName.get()!='回收站',event:{click:$model._callModelFn.bind($model,'showPopGuanZhu')}"> 
              <i class="icon2-gz0" data-bind="css: $model.getGuanZhuIcon($object.val('fLevelId'))"/> 
            </a> 
          </xhtml:td>  
          <xhtml:td class="list_name" style="padding-left:0;"> 
            <xhtml:div class="ellipsis"> 
              <xhtml:span data-bind="html:$model.getZhuXianTitleHTML($object.ref('fSourceType'),$object.ref('fTitle')),attr:{'title':$object.ref('fTitle')}"/> 
            </xhtml:div> 
          </xhtml:td>  
          <xhtml:td class="span2 list_name"> 
            <xhtml:span title="" data-bind="text:val('bjWC') + '/' + val('bjZS'),attr:{'title':val('bjWC') + '/' + val('bjZS')}"/> 
          </xhtml:td>  
          <xhtml:td class="span4 list_name"> 
            <span data-bind="text:$model.transformDatetime($object.ref('fCreateTime'))"/> 
          </xhtml:td> 
        </xhtml:tr> 
      </xhtml:table> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next"
      id="listPage" data="myZhuXian" align="right" page-count="5"/>  
    <xhtml:div component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
      type="flow" id="bindDetail" data="myZhuXian" list="false"> 
      <xhtml:div class="row-fluid"> 
        <xhtml:div class="span20"> 
          <xhtml:div class="box-shadow box-zhuxian" data-bind="if:myZhuXian.getCurrentRow()"> 
            <!--          pd10-->  
            <xhtml:div class="me-padding-bottom8 bottom-dashed"> 
              <h3 data-bind="text:myZhuXian.val('fTitle')"/>  
              <div> 
                <div class="me-margin-right20 inline"> 
                  <span class="muted">类型：</span>  
                  <span data-bind="text:myZhuXian.val('fSourceType')"/> 
                </div>  
                <div class="me-margin-right20 inline"> 
                  <span class="muted">创建人：</span>  
                  <span data-bind="text:myZhuXian.val('fCreatorName')"/> 
                </div>  
                <div class="me-margin-right20 inline"> 
                  <span class="muted">创建时间：</span>  
                  <span data-bind="text:$model.transformDatetime(myZhuXian.ref('fCreateTime'))"/> 
                </div>  
                <a href="javascript:void(0);" class="inline" style="float:right"
                  data-bind="if:$model.listTypeName.get()!='回收站',event:{click:$model._callModelFn.bind($model,'showPopGuanZhu','left')}"> 
                  <i class="icon2-gz0" data-bind="css: $model.getGuanZhuIcon(myZhuXian.val('fLevelId'))"/> 
                </a>  
                <button style="float:right" class="linkBtn" data-bind="event:{click:$model._callModelFn.bind($model,'setStatusToFinish',myZhuXian.getCurrentRow())}"> 
                  <i data-bind="css:{'icon2-account':myZhuXian.val('fStatus')=='处理中','icon2-attend':myZhuXian.val('fStatus')=='已完成'}"/>  
                  <label data-bind="text:myZhuXian.val('fStatus')"/> 
                </button>  
                <button style="float:right" class="linkBtn" data-bind="event:{click:$model._callModelFn.bind($model,'newCustomHuoDong',myZhuXian.getCurrentRow())}"> 
                  <i class="icon2-add"/>  
                  <label>发起活动</label> 
                </button>  
                <div class="clearfix"/> 
              </div> 
            </xhtml:div>  
            <xhtml:div class="ckeditorContent bottom-dashed " data-bind="html:myZhuXian.val('fContent')"/>  
            <xhtml:div component="/UI/base/components/attachment.xbl.xml#attachment"
              data-bind="" access="duud" id="attachmentZhuXian" ref="data('myZhuXian')/fAttachment"
              class="flexboxlegacy" onBrowse="afterUploadZhuXianFile"> 
              <div class="x-attachment"> 
                <div class="x-attachment-content x-card-border"> 
                  <div class="x-doc-process"> 
                    <div class="progress-bar x-doc-process-bar" role="progressbar"
                      style="width:0%;"/> 
                  </div>  
                  <div data-bind="foreach:$attachmentItems"> 
                    <div class="x-attachment-cell"> 
                      <div class="x-attachment-item x-item-other" data-bind="attr:{title:$object.docName},click:$model.previewOrRemoveItem.bind($model),style:{opacity: $model.$access.get() % 4 &gt;= 2 || $model.$state.get() == 'remove' ? '1.0' : '0.5',backgroundImage:($model.previewPicture.bind($model,$object))()}"> 
                        <a data-bind="visible:$model.$state.get() == 'remove'"
                          class="x-remove-barget"/> 
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
            <xhtml:div class="row"> 
              <xhtml:div class="row-fluid"> 
                <xhtml:div class="span20 "> 
                  <xhtml:div class="pd10 clearfix" data-bind="if:$model.listTypeName.get()!='回收站'"> 
                    <xhtml:button class="linkBtn" data-bind="event:{click:$model._callModelFn.bind($model,'moveToRecycle',myZhuXian.getCurrentRow())}"> 
                      <i class="icon2-delete"/>  
                      <label>删除</label> 
                    </xhtml:button>  
                    <xhtml:button class="linkBtn" data-bind="event:{click:$model._callModelFn.bind($model,'editZhuXianContext',myZhuXian.getCurrentRow())}"> 
                      <i class="icon2-memo"/>  
                      <label>编辑</label> 
                    </xhtml:button>  
                    <xhtml:button class="linkBtn" data-bind="event:{click:$model._callModelFn.bind($model,'viewYueJianYiJian',myZhuXian.getCurrentRow())}"> 
                      <i class="icon2-comment"/>  
                      <label>阅件意见</label> 
                    </xhtml:button> 
                  </xhtml:div> 
                </xhtml:div> 
              </xhtml:div> 
            </xhtml:div> 
          </xhtml:div> 
        </xhtml:div> 
      </xhtml:div>  
      <!-- 领导批示 -->  
      <xhtml:div component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
        class="" data-bind="" type="flow" id="bindLDPS" data="huoDongOfZX" filter="$row.val('fItemType')=='领导批示'"
        list="true"> 
        <xhtml:div class="box-shadow box-gongzuo"> 
          <xhtml:div class="me-padding-bottom8" id="hdTitle"> 
            <xhtml:div style="padding:10px 0"> 
              <h4 style="display:inline" data-bind="text:'[' + $object.val('fItemName') + '] ' + $object.val('FAssistedOrg')"/> 
            </xhtml:div> 
          </xhtml:div>  
          <xhtml:div id="lingDaoPY"> 
            <xhtml:div component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
              class="" type="flow" id="bindLingDaoPYList"> 
              <xhtml:table class="table table-bottom celllayout" data-config="{'huoDongCL':'0,1'}"> 
                <tr> 
                  <td rowspan="2" style="width:80px;vertical-align: middle;font-size:14px;font-weight: bold;"
                    data-bind="text:$object.ref('fOrgUnitName')"/>  
                  <td height="30px"> 
                    <div class="inline"> 
                      <div class="me-margin-right20 inline"> 
                        <span class="muted">呈批时间：</span>  
                        <span data-bind="text:$model.transformDatetime($object.ref('fCreateTime'))"/> 
                      </div>  
                      <div class="me-margin-right20 inline"> 
                        <span class="muted">批示时间：</span>  
                        <span data-bind="text:$model.transformDatetime($object.ref('fFinishTime'))"/> 
                      </div> 
                    </div> 
                  </td> 
                </tr>  
                <tr> 
                  <td> 
                    <div data-bind="html:$object.ref('fContent')"/> 
                  </td> 
                </tr> 
              </xhtml:table> 
            </xhtml:div> 
          </xhtml:div> 
        </xhtml:div> 
      </xhtml:div>  
      <!--  办件-->  
      <xhtml:div component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
        class="" data-bind="" type="flow" id="bindBJ" data="huoDongOfZX" filter="$row.val('fItemType')=='办件'"
        list="true"> 
        <xhtml:div class="box-shadow box-gongzuo"> 
          <xhtml:div class="me-padding-bottom8 bottom-dashed" id="hdTitle"> 
            <xhtml:div style="padding:10px 0"> 
              <h4 style="display:inline" data-bind="text:'[' + $object.val('fHostOrg') + ']' + $object.val('fActivityTitle')"/>  
              <a style="display:inline" data-bind="text:'[' + $object.val('fActivityStatus') + ']',style:{color:$object.val('fActivityStatus')=='已完成'?'red':'green'},event:{click:$model._callModelFn.bind($model,'viewGongZuoItem',$object)}"/> 
            </xhtml:div>  
            <!-- 副标题区域 -->  
            <xhtml:div> 
              <div class="inline"> 
                <div class="me-margin-right20 inline"> 
                  <span class="muted">事项：</span>  
                  <span data-bind="text:$object.ref('fItemName')"/> 
                </div>  
                <div class="me-margin-right20 inline"> 
                  <span class="muted">会办：</span>  
                  <span data-bind="text:$object.ref('FAssistedOrg')"/> 
                </div>  
                <div class="me-margin-right20 inline"> 
                  <span class="muted">开始日期：</span>  
                  <span data-bind="text:$model.transformDatetime($object.ref('fStartTime'),true)"/> 
                </div>  
                <div class="me-margin-right20 inline"> 
                  <span class="muted">预期完成日期：</span>  
                  <span data-bind="text:$model.transformDatetime($object.ref('fExpectedFinishDate'),true)"/> 
                </div>  
                <div class="me-margin-right20 inline"> 
                  <span class="muted">实际完成日期：</span>  
                  <span data-bind="text:$model.transformDatetime($object.ref('fActualFinishDate'),true)"/> 
                </div> 
              </div>  
              <div class="clearfix"/> 
            </xhtml:div> 
          </xhtml:div>  
          <!-- 主题内容区域 -->  
          <xhtml:div class="ckeditorContent bottom-dashed " data-bind="html:$object.ref('fActivityTarget')"
            id="hdTarget"/>  
          <!-- 附件 -->  
          <xhtml:div> 
            <xhtml:div component="/UI/base/components/attachment.xbl.xml#attachment"
              access="d" id="attachmentHuoDong" ref="data('huoDongOfZX')/fAttachment"
              class="flexboxlegacy"> 
              <div class="x-attachment" data-bind="visible:$attachmentItems.get().length&gt;0"> 
                <div class="x-attachment-content x-card-border"> 
                  <div class="x-doc-process"> 
                    <div class="progress-bar x-doc-process-bar" role="progressbar"
                      style="width:0%;"/> 
                  </div>  
                  <div data-bind="foreach:$attachmentItems"> 
                    <div class="x-attachment-cell"> 
                      <div class="x-attachment-item x-item-other" data-bind="attr:{title:$object.docName},click:$model.previewOrRemoveItem.bind($model),style:{opacity: $model.$access.get() % 4 &gt;= 2 || $model.$state.get() == 'remove' ? '1.0' : '0.5',backgroundImage:($model.previewPicture.bind($model,$object))()}"> 
                        <a data-bind="visible:$model.$state.get() == 'remove'"
                          class="x-remove-barget"/> 
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
          </xhtml:div>  
          <!--  操作区域  -->  
          <xhtml:div class="row"> 
            <xhtml:div class="row-fluid"> 
              <xhtml:div class="span20 "> 
                <xhtml:div class="pd10 clearfix"> 
                  <xhtml:button class="linkBtn" data-bind="event:{click:$model._callModelFn.bind($model,'editHuoDongTarget',$object)}"> 
                    <i class="icon2-memo"/>  
                    <label>编辑</label> 
                  </xhtml:button>  
                  <xhtml:button class="linkBtn" data-bind="event:{click:$model._callModelFn.bind($model,'urgeHuoDong',$object)}"> 
                    <i class="icon2-task"/>  
                    <label>督办</label> 
                  </xhtml:button>  
                  <xhtml:button class="linkBtn" data-bind="event:{click:$model._callModelFn.bind($model,'gongZuoCuiban',$object)}"> 
                    <i class="icon2-discuss"/>  
                    <label>催办</label> 
                  </xhtml:button>  
                  <xhtml:button class="linkBtn" data-bind="event:{click:$model._callModelFn.bind($model,'viewGongZuoItem',$object)}"> 
                    <i class="icon-system-eye"/>  
                    <label>查看</label> 
                  </xhtml:button> 
                </xhtml:div> 
              </xhtml:div> 
            </xhtml:div> 
          </xhtml:div> 
        </xhtml:div> 
      </xhtml:div> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner"
      id="wrViewHuoDong"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="" width="400px" height="300px" modal="true" id="wdEdit" url="/UI/base/common/dialog/htmlEditorDialog.w"
      status="maximize" reload-on-open="true"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="催办内容" width="600px" height="300px" modal="true" id="wdCuiBan" url="/UI/common/gzzx/process/gzzx/huoDongCuiBan.w"
      resizable="true" minmaxable="true" reload-on-open="true"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="新增主线" width="610px" height="500px" modal="true" id="wdZhuXian" resizable="true"
      minmaxable="true" reload-on-open="true" onReceive="mainActivity.wdZhuXianReceive"
      url="/UI/common/gzzx/process/gzzx/oneZhuXian.w"/>
  </xui:view>  
  <xui:resource id="resource1"> 
    <!--    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/base/lib/bootstrap/bootstrap.css"/>  -->  
    <xhtml:script><![CDATA[
		this.__requireComponents = this.__requireComponents.concat(["base/components/knockout/windowDialog" ]);
	]]> </xhtml:script>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink2" href="/UI/common/gzzx/process/gzzx/mainActivity.css"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/lib/init.js" loadKO="true"/>  
    <xhtml:script id="htmlScript1" src="mainActivity.js"/> 
  </xui:resource> 
</xui:window>
