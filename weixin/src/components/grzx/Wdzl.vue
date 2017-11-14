<template>
	<div class="contentDiv">
	  <group>
    	<x-input title="姓名：" v-model="data.stu_name"   text-align="right" readonly></x-input>
    	<selector title="性别：" v-model="data.sex" :options="options" placeholder="请选择"  direction="rtl" readonly></selector>
    	<x-input title="民族：" v-model="data.nation"   text-align="right" readonly ></x-input>
    	<x-input title="联系电话：" v-model="data.tel" required   text-align="right" readonly></x-input>
    	<x-input title="学号：" v-model="data.student_id"   text-align="right" readonly></x-input>
    	<x-input title="学院：" v-model="data.col_name"  text-align="right" readonly></x-input>
    	   <selector title="参保情况：" v-model="data.medicaldata" :options="medicalArr"   direction="rtl" readonly></selector>
    <selector title="参保情况1：" v-model="data.accidentdata" :options="accidentArr" direction="rtl" readonly></selector>
       <cell title="意向岗位:">
       <div slot="title" style="">意向岗位：<span style="font-size:12px;">（一年级学生主要安排劳务型工作）</span></div>
       <div slot="inline-desc" style="margin-top:10px;">
           <checker v-model="jobdataArr" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="1">劳务性</checker-item>
        <checker-item :value="2">管理型</checker-item>
        <checker-item :value="3">专业技能型</checker-item>
      </checker>
      </div>
  	  </cell>
  	  <x-textarea title="勤工助学经历:" v-model="data.experience" ></x-textarea>
  	         <cell title="勤工助学时间:">
       <div slot="inline-desc" style="margin-top:10px;">
     <tab :line-width="1" custom-bar-width="40px"  style="margin-bottom:10px;">
        <tab-item selected @on-item-click="handler('周一')">周一</tab-item>
        <tab-item  @on-item-click="handler('周二')">周二</tab-item>
        <tab-item  @on-item-click="handler('周三')">周三</tab-item>
        <tab-item  @on-item-click="handler('周四')">周四</tab-item>
        <tab-item  @on-item-click="handler('周五')">周五</tab-item>
        <tab-item  @on-item-click="handler('周六')">周六</tab-item>
        <tab-item  @on-item-click="handler('周日')">周日</tab-item>
    </tab>
           <checker v-show="showChecker=='周一'" v-model="mondataArr" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="1">周一上午(08:30-09:15)</checker-item>
        <checker-item :value="2">周一上午(09:20-10:05)</checker-item>
        <checker-item :value="3">周一上午(10:25-11:10)</checker-item>
        <checker-item :value="4">周一上午(11:15-12:10)</checker-item>
        <checker-item :value="5">周一下午(14:00-14:45)</checker-item>
        <checker-item :value="6">周一下午(14:50-15:35)</checker-item>
        <checker-item :value="7">周一下午(15:40-16:25)</checker-item>
        <checker-item :value="8">周一下午(16:30-17:15)</checker-item>
        </checker>
        <checker v-show="showChecker=='周二'" v-model="tuedataArr" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="1">周二上午(08:30-09:15)</checker-item>
        <checker-item :value="2">周二上午(09:20-10:05)</checker-item>
        <checker-item :value="3">周二上午(10:25-11:10)</checker-item>
        <checker-item :value="4">周二上午(11:15-12:10)</checker-item>
        <checker-item :value="5">周二下午(14:00-14:45)</checker-item>
        <checker-item :value="6">周二下午(14:50-15:35)</checker-item>
        <checker-item :value="7">周二下午(15:40-16:25)</checker-item>
        <checker-item :value="8">周二下午(16:30-17:15)</checker-item>
        
                </checker>
        <checker v-show="showChecker=='周三'" v-model="weddataArr" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item :value="1">周三上午(08:30-09:15)</checker-item>
        <checker-item :value="2">周三上午(09:20-10:05)</checker-item>
        <checker-item :value="3">周三上午(10:25-11:10)</checker-item>
        <checker-item :value="4">周三上午(11:15-12:10)</checker-item>
        <checker-item :value="5">周三下午(14:00-14:45)</checker-item>
        <checker-item :value="6">周三下午(14:50-15:35)</checker-item>
        <checker-item :value="7">周三下午(15:40-16:25)</checker-item>
        <checker-item :value="8">周三下午(16:30-17:15)</checker-item>
        
                </checker>
        <checker v-show="showChecker=='周四'" v-model="thudataArr" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item :value="1">周四上午(08:30-09:15)</checker-item>
        <checker-item :value="2">周四上午(09:20-10:05)</checker-item>
        <checker-item :value="3">周四上午(10:25-11:10)</checker-item>
        <checker-item :value="4">周四上午(11:15-12:10)</checker-item>
        <checker-item :value="5">周四下午(14:00-14:45)</checker-item>
        <checker-item :value="6">周四下午(14:50-15:35)</checker-item>
        <checker-item :value="7">周四下午(15:40-16:25)</checker-item>
        <checker-item :value="8">周四下午(16:30-17:15)</checker-item>
        
                </checker>
        <checker v-show="showChecker=='周五'" v-model="fridataArr" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item :value="1">周五上午(08:30-09:15)</checker-item>
        <checker-item :value="2">周五上午(09:20-10:05)</checker-item>
        <checker-item :value="3">周五上午(10:25-11:10)</checker-item>
        <checker-item :value="4">周五上午(11:15-12:10)</checker-item>
        <checker-item :value="5">周五下午(14:00-14:45)</checker-item>
        <checker-item :value="6">周五下午(14:50-15:35)</checker-item>
        <checker-item :value="7">周五下午(15:40-16:25)</checker-item>
        <checker-item :value="8">周五下午(16:30-17:15)</checker-item>
        
                </checker>
        <checker v-show="showChecker=='周六'" v-model="satdataArr" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item :value="1">周六上午(08:30-09:15)</checker-item>
        <checker-item :value="2">周六上午(09:20-10:05)</checker-item>
        <checker-item :value="3">周六上午(10:25-11:10)</checker-item>
        <checker-item :value="4">周六上午(11:15-12:10)</checker-item>
        <checker-item :value="5">周六下午(14:00-14:45)</checker-item>
        <checker-item :value="6">周六下午(14:50-15:35)</checker-item>
        <checker-item :value="7">周六下午(15:40-16:25)</checker-item>
        <checker-item :value="8">周六下午(16:30-17:15)</checker-item>

      </checker>
              <checker v-show="showChecker=='周日'" v-model="sundataArr" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item :value="1">周日上午(08:30-09:15)</checker-item>
        <checker-item :value="2">周日上午(09:20-10:05)</checker-item>
        <checker-item :value="3">周日上午(10:25-11:10)</checker-item>
        <checker-item :value="4">周日上午(11:15-12:10)</checker-item>
        <checker-item :value="5">周日下午(14:00-14:45)</checker-item>
        <checker-item :value="6">周日下午(14:50-15:35)</checker-item>
        <checker-item :value="7">周日下午(15:40-16:25)</checker-item>
        <checker-item :value="8">周日下午(16:30-17:15)</checker-item>

      </checker>
      </div>
  	  </cell>
  	  </group>
  	          <uploader
    :max="1"
    :images="images"
    :handle-click="false"
    :show-header="true"
    :readonly="true"
    upload-url="uploadUrl"
    size="small" 
    title="头像" 
    @preview="previewMethod"
  ></uploader>
         <uploader
    :max="max"
    :images="attachfiles"
    :handle-click="false"
    :show-header="true"
    :readonly="true"
    upload-url="uploadUrl"
    size="small" 
    title="佐证上传" 
    @preview="previewMethod"
  ></uploader>
		     <div v-transfer-dom>
      <x-dialog :show.sync="showTp" class="dialogs">
        <div class="img-box">
           <img v-bind:src="imgsrc" style="max-width:100%"/>    		
        </div>
        <div @click="showTp=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  	</div>
  
</template>

<script>
import Uploader from 'vux-uploader'
import { Tab, TabItem, Group, Cell, Divider, Badge, Card, ButtonTab, ButtonTabItem, XInput, Checklist, Radio, XDialog, TransferDomDirective as TransferDom, Selector, Datetime, XButton, Checker, CheckerItem, XTextarea } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Group,
    Cell,
    Divider,
    Badge,
    Card,
    ButtonTab,
    ButtonTabItem,
    XInput,
    Checklist,
    Radio,
    Uploader,
    XDialog,
    Selector,
    Datetime,
    XButton,
    Checker,
    CheckerItem,
    XTextarea
  },
  created: function () {
    this.updateTitle('我的资料')
    this.data.openid = this.GLOBAL.student.openid
    this.data.student_id = this.GLOBAL.student.student_id
    this.init()
  },
  methods: {
    change (val, label) {
      console.log('change', val, label)
    },
    previewMethod (url) {
      this.imgsrc = url.url
      this.showTp = true
    },
    handler (bz) {
      this.showChecker = bz
    },
    init () {
      let vue = this
      vue.post({
        url: '/public/api/person/getPerStatus',
        params: {'id': vue.GLOBAL.student.id},
        success: function (data) {
          vue.data = data.data
          vue.jobdataArr = vue.data.jobdata
          vue.mondataArr = vue.data.mondata
          vue.tuedataArr = vue.data.tuedata
          vue.weddataArr = vue.data.weddata
          vue.thudataArr = vue.data.thudata
          vue.fridataArr = vue.data.fridata
          vue.satdataArr = vue.data.satdata
          vue.sundataArr = vue.data.sundata
          vue.images = [{url: vue.apiPrefix + '/' + vue.data.image}]
          var imgs = vue.data.attachfiles.split(',')
          for (var img of imgs) {
            var item = {url: vue.apiPrefix + '/' + img}
            vue.attachfiles.push(item)
          }
          console.log('成功')
        }
      })
    }
  },
  data () {
    return {
      data: {},
      options: [{key: 'male', value: '男'}, {key: 'female', value: '女'}],
      max: 5,
      images: [],
      attachfiles: [],
      imgsrc: '',
      showTp: false,
      showChecker: '周一',
      xybhArr: [],
      mzArr: [],
      medicalArr: [{key: '0', value: '未购买大学生医疗保险'}, {key: '1', value: '已购买大学生医疗保险'}],
      accidentArr: [{key: '0', value: '未购买学生意外伤害险'}, {key: '1', value: '已购买学生意外伤害险'}],
      mondataArr: [],
      tuedataArr: [],
      weddataArr: [],
      thudataArr: [],
      fridataArr: [],
      satdataArr: [],
      sundataArr: [],
      jobdataArr: []
    }
  }
}
</script>
<style>
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
  margin-bottom:5px;
}
.demo1-item-selected {
  border: 1px solid green;
}
</style>

