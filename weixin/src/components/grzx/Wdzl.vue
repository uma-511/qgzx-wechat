<template>
	<div class="contentDiv">
	  <group>
    	<x-input title="姓名：" v-model="data.stu_name"   text-align="right" readonly></x-input>
    	<datetime v-model="data.birthday"  title="出生年月："  text-align="right" readonly></datetime>
    	<x-input title="学号：" v-model="data.student_id"   text-align="right" readonly></x-input>
    	<x-input title="学院：" v-model="data.col_name"  text-align="right" readonly></x-input>
    	<x-input title="系别：" v-model="data.cla_name"  text-align="right" readonly></x-input>
  	  </group>
  	   <group title="性别">
         <radio  :options="options" v-model="data.sex" readonly></radio>
       </group>
         <uploader
    :max="max"
    :images="images"
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
import { Group, Cell, Divider, Badge, Card, ButtonTab, ButtonTabItem, XInput, Checklist, Radio, XDialog, TransferDomDirective as TransferDom, Selector, Datetime, XButton } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
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
    XButton
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
    init () {
      let vue = this
      vue.post({
        url: '/public/api/person/getPerStatus',
        params: {'id': vue.GLOBAL.student.id},
        success: function (data) {
          vue.data = data.data
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
      images: [{url: '/static/bq.png'}, {url: '/static/car.png'}],
      uploadUrl: 'E:\\ygfworkspaces\\zfapp\\WebContent\\weixin\\static\\image',
      imgsrc: '',
      showTp: false,
      xybhArr: []
    }
  }
}
</script>
<style>
</style>

