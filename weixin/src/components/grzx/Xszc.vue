<template>
	<div class="contentDiv">
	  <group>
    	<x-input title="姓名：" v-model="data.name" required placeholder="请输入" text-align="right"></x-input>
    	<datetime v-model="data.birthday"  title="出生年月："  required placeholder="请选择" text-align="right"></datetime>
    	<x-input title="学号：" v-model="data.student_xh" required placeholder="请输入"  text-align="right"></x-input>
    	<selector title="学院：" v-model="data.college_id" :options="xybhArr" placeholder="请选择"  direction="rtl" @on-change="collegeChange"></selector>
    	<selector title="系别：" v-model="data.class" :options="xbArr" placeholder="请选择"  direction="rtl" ></selector>
  	  </group>
  	   <group title="性别">
         <radio  :options="options" v-model="data.sex"></radio>
       </group>
         <uploader
    :max="max"
    :images="images"
    :handle-click="false"
    :show-header="true"
    :readonly="false"
    upload-url="uploadUrl"
    size="small" 
    title="佐证上传" 
    @preview="previewMethod"
    @add-image="addImageMethod"
    @remove-image="removeImageMethod"
  ></uploader>
       	   	  <div style="width:100%;text-align:center;">
<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="zc">注册</x-button>
  	  </div>
 
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
    this.updateTitle('注册')
    this.init()
    this.data.openid = this.GLOBAL.student.openid
    this.data.id = this.GLOBAL.student.id
  },
  methods: {
    collegeChange (val, label) {
      let vue = this
      vue.post({
        url: '/public/api/person/getClass',
        data: {college_id: val},
        success: function (data) {
          vue.xbArr = data.list
          console.log('成功')
        }
      })
    },
    previewMethod (url) {
      this.imgsrc = url.url
      this.showTp = true
    },
    addImageMethod () {
    },
    removeImageMethod () {
    },
    zc () {
      let vue = this
      if (vue.data.name === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写名字'
        })
        return
      } else if (vue.data.birthday === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写出生日期'
        })
        return
      } else if (vue.data.student_xh === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写学号'
        })
        return
      } else if (vue.data.college_id === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未选择学院'
        })
        return
      } else if (vue.data.class === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未选择系别'
        })
        return
      }
      var flag = false
      for (var val of vue.xbArr) {
        if (val.key === vue.data.class) {
          flag = true
        }
      }
      if (!flag) {
        vue.data.class = ''
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未选择系别'
        })
        return
      }
      vue.post({
        url: '/public/api/person/addStudent',
        data: vue.data,
        success: function (data) {
          console.log('成功')
          vue.$vux.toast.show({
            text: '注册成功，请等待审核'
          })
          vue.$router.push({path: '/components/grzx/Grzxmain'})
        }
      })
    },
    init () {
      let vue = this
      vue.post({
        url: '/public/api/person/getCollege',
        params: {},
        success: function (data) {
          vue.xybhArr = data.list
          console.log('成功')
        }
      })
    }
  },
  data () {
    return {
      data: {name: '', sex: 'male', id: '', student_xh: '', college_id: '', class: '', birthday: '', openid: ''},
      options: [{key: 'male', value: '男'}, {key: 'female', value: '女'}],
      max: 5,
      images: [{url: '/static/bq.png'}, {url: '/static/car.png'}],
      uploadUrl: 'E:\\ygfworkspaces\\zfapp\\WebContent\\weixin\\static\\image',
      imgsrc: '',
      showTp: false,
      xybhArr: [],
      xbArr: []
    }
  }
}
</script>
<style>
</style>

