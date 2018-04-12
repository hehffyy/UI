<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:540px;top:60px;"/>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xui:place control="buildingView1" id="controlPlace1"></xui:place></xui:layout>  
    <xhtml:div component="/UI/bdcSys/components/buildingView.xbl.xml#buildingView" class="xui-autofill" data-bind="" id="buildingView1">
   <h3 style="text-align:center;" bind-text="$model.zrzName" id="default1"></h3>
   <div data-bind="foreach:$model.cengs" id="default2">
    <div class="x-row row_ceng" id="default3">
     <div class="x-col x-col-10 pri" id="default4">
      <div id="default5">
       <span bind-text="CH" id="default6"></span></div> </div> 
     <div class="x-col" id="default7">
      <div class="x-row" data-bind="foreach:$object.items" id="default8">
       <div class="x-col divH" data-bind="if:$object.HID,event:{ dragstart:$model.bindModelFn($model.showInfo)}" dragable="true" id="default9">
        <div class="x-row row_h" id="default10">
         <span class="h" bind-text="$object.HH" id="default11"></span>
         <i class="rec" id="default12"></i></div> 
        <div class="x-row hid" id="default13">
         <a href="#" bind-text="$object.HID" bind-click="$model.bindModelFn($model.showInfo)" id="default14"></a></div> 
        <div class="x-row allzt" id="default15">
         <span class="zt zt-fz" bind-css="'fz'+$object.FZZT" bind-visible="$object.FZZT!=0" id="default16"></span>
         <span class="zt zt-cf" bind-css="'cf'+$object.CFZT" bind-visible="$object.CFZT!=0" id="default17"></span>
         <span class="zt zt-dj" bind-css="'dj'+$object.DJZT" bind-visible="$object.DJZT!=0" id="default18"></span>
         <span class="zt zt-dy" bind-css="'dy'+$object.DYZT" bind-visible="$object.DYZT!=0" id="default19"></span>
         <span class="zt zt-yg" bind-css="'yg'+$object.YGZT" bind-visible="$object.YGZT!=0" id="default20"></span>
         <span class="zt zt-yy" bind-css="'yy'+$object.YYZT" bind-visible="$object.YYZT!=0" id="default21"></span></div> </div> </div> </div> </div> </div> </xhtml:div></xui:view>  
  <xui:resource id="resource1"/> 
</xui:window>
