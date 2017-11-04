<template>
	<div class="contentDiv">
	 <card>
      <div slot="content" class="cardContent">
      	<div class="title"><img src="static/notice.png" width="18" height="18" />&nbsp;<span>发帖须知：</span></div>
 		<div>
 		    1、请文明发帖；<br/>
			2、不文明的帖子将会追究责任；<br/>
			3、发布禁止内容，账号将被停止使用。<br/>
	   </div>
      </div>
    </card>
	  <group>
	  <selector title="板块类别" v-model="data.category_id" :options="options" required placeholder="请选择"></selector>
    	<x-input title="帖子主题" v-model="data.theme" required placeholder="请输入"></x-input>
        <x-textarea title="帖子内容" v-model="data.content" required placeholder="请输入"></x-textarea>
  	  </group>
       	   	  <div style="width:100%;text-align:center;">
<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="tzfb">提交</x-button>
  	  </div>
	
  	</div>
</template>

<script>
import { Group, Cell, Divider, Badge, Card, ButtonTab, ButtonTabItem, XInput, Checklist, Radio, XTextarea, Selector, XButton } from 'vux'

export default {
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
    XTextarea,
    Selector,
    XButton
  },
  created: function () {
    this.updateTitle('我要发帖')
    this.init()
  },
  methods: {
    init () {
      let vue = this
      vue.post({
        url: '/public/api/person/getCategory',
        params: {},
        success: function (data) {
          vue.options = data.list
        }
      })
    },
    tzfb () {
      let vue = this
      if (vue.data.category_id === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未选择板块类别'
        })
        return
      }
      if (vue.data.theme === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写帖子主题'
        })
        return
      }
      if (vue.data.content === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写帖子内容'
        })
        return
      }
      vue.post({
        url: '/public/api/person/myPost',
        data: vue.data,
        success: function (data) {
          console.log('成功')
          vue.$vux.toast.show({
            text: '发帖成功'
          })
          vue.$router.push({path: '/components/grzx/Wdtz'})
        }
      })
    }
  },
  data () {
    return {
      data: {category_id: '', student_id: this.GLOBAL.student.id, theme: '', content: ''},
      options: []
    }
  }
}
</script>
<style>
.cardContent{
	font-size:12px;
	color:#09BB07;
	padding:10px;
}
.cardContent .title{
	font-size:14px;
	color:#FF7951;
}
</style>

