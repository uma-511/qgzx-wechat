<template>
	<div class="contentDiv">

	  <group>
	  <selector title="建议单位" v-model="data.receiver" :options="options" required ></selector>
    	<x-input title="建议主题" v-model="data.option_title" required placeholder="请输入"></x-input>
        <x-textarea title="建议内容" v-model="data.option_content" required :max="200"></x-textarea>
  	  </group>
             	   	  <div style="width:100%;text-align:center;">
<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="jytj">提交</x-button>
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
    this.updateTitle('我要建议')
  },
  methods: {
    jytj () {
      let vue = this
      if (vue.data.receiver === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还没选择建议单位'
        })
        return
      }
      if (vue.data.option_title === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还没填写建议标题'
        })
        return
      }
      if (vue.data.option_content === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写建议内容'
        })
        return
      }
      vue.post({
        url: '/public/api/person/addSuggest',
        data: vue.data,
        success: function (data) {
          console.log('成功')
          vue.$vux.toast.show({
            text: '建议提交成功'
          })
          vue.$router.push({path: '/components/grzx/Wdjy'})
        }
      })
    }
  },
  data () {
    return {
      data: {student_id: this.GLOBAL.student.id, 'option_title': '', 'option_content': '', receiver: '0'},
      options: [{key: '0', value: '学校'}, {key: '1', value: '学院'}, {key: '2', value: '用人单位'}]
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

