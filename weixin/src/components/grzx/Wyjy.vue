<template>
	<div class="contentDiv">
	 <card>
      <div slot="content" class="cardContent">
      	<div class="title"><img src="static/notice.png" width="18" height="18" />&nbsp;<span>建议须知：</span></div>
 		<div>
 		    1、哈哈哈哈哈哈<br/>
			2、啊哈嗲行点击案例集大吉大利<br/>
			3、哈哈哈哈哈哈<br/>
			4、啊哈嗲行点击案例集大吉大利<br/>
	   </div>
      </div>
    </card>
	  <group>
    	<x-input title="建议主题" v-model="data.xm" required placeholder="请输入"></x-input>
        <x-textarea title="建议内容" v-model="data.bz" required></x-textarea>
  	  </group>
	 <button-tab style="margin:20px;" >
        <button-tab-item selected>提交</button-tab-item>
      </button-tab>  
	
  	</div>
</template>

<script>
import { Group, Cell, Divider, Badge, Card, ButtonTab, ButtonTabItem, XInput, Checklist, Radio, XTextarea, Selector } from 'vux'

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
    Selector
  },
  created: function () {
    this.updateTitle('我要建议')
  },
  methods: {
    change (val, label) {
      console.log('change', val, label)
    }
  },
  data () {
    return {
      data: {bklb: '1', 'xm': 'java程序员', 'xb': '1', 'xh': '02340', 'sfzh': '4304321232324424', 'yhk': '4423424234324234234'},
      options: [{key: '1', value: '工作心得'}, {key: '2', value: '工作趣事'}, {key: '3', value: '校园生活'}]
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

