<template>
  <div class="contentDiv">

         <card style="margin-left:15px;margin-right:15px;margin-bottom:20px;padding:10px;border: 1px solid #FBF9FE">
      <div slot="content" class="cardContent" >
      	<div class="title"><span style="font-size:16px;color:#09BB07">面试通知</span>
      	<div style="font-size:10px;color:black">2017年6月12日</div>
      	</div>
 		<div style="font-size:12px;">
 		    <span style="color:#B0B061">面试职位：</span><span style="color:black">java开发</span><br/>
			<span style="color:#B0B061">所属公司：</span><span style="color:black">佛山阿帕帕科技有限公司</span><br/>
			<span style="color:#B0B061">面试时间：</span><span style="color:black">2017-09-09 09:00</span><br/>
			<span style="color:#B0B061">面试地点：</span><span style="color:black">普君新城华府302</span><br/>
			<span style="color:#B0B061">联系人：</span><span style="color:black">小杨</span><br/>
			<span style="color:#B0B061">联系电话：</span><span style="color:black">0909098988</span><br/>
	   </div>
	   <div style="font-size:12px;color:#09BB07">记得准时参加哦</div>
      </div>
    </card>
         <card style="margin-left:15px;margin-right:15px;margin-bottom:20px;padding:10px;border: 1px solid #FBF9FE">
      <div slot="content" class="cardContent" >
      	<div class="title"><span style="font-size:16px;color:#09BB07">面试通知</span>
      	<div style="font-size:10px;color:black">2017年6月12日</div>
      	</div>
 		<div style="font-size:12px;">
 		    <span style="color:#B0B061">面试职位：</span><span style="color:black">java开发</span><br/>
			<span style="color:#B0B061">所属公司：</span><span style="color:black">佛山阿帕帕科技有限公司</span><br/>
			<span style="color:#B0B061">面试时间：</span><span style="color:black">2017-09-09 09:00</span><br/>
			<span style="color:#B0B061">面试地点：</span><span style="color:black">普君新城华府302</span><br/>
			<span style="color:#B0B061">联系人：</span><span style="color:black">小杨</span><br/>
			<span style="color:#B0B061">联系电话：</span><span style="color:black">0909098988</span><br/>
	   </div>
	   <div style="font-size:12px;color:#09BB07">记得准时参加哦</div>
      </div>
    </card>
         <card style="margin-left:15px;margin-right:15px;margin-bottom:20px;padding:10px;border: 1px solid #FBF9FE">
      <div slot="content" class="cardContent" >
      	<div class="title"><span style="font-size:16px;color:#09BB07">面试通知</span>
      	<div style="font-size:10px;color:black">2017年6月12日</div>
      	</div>
 		<div style="font-size:12px;">
 		    <span style="color:#B0B061">面试职位：</span><span style="color:black">java开发</span><br/>
			<span style="color:#B0B061">所属公司：</span><span style="color:black">佛山阿帕帕科技有限公司</span><br/>
			<span style="color:#B0B061">面试时间：</span><span style="color:black">2017-09-09 09:00</span><br/>
			<span style="color:#B0B061">面试地点：</span><span style="color:black">普君新城华府302</span><br/>
			<span style="color:#B0B061">联系人：</span><span style="color:black">小杨</span><br/>
			<span style="color:#B0B061">联系电话：</span><span style="color:black">0909098988</span><br/>
	   </div>
	   <div style="font-size:12px;color:#09BB07">记得准时参加哦</div>
      </div>
    </card>
<divider>到达底部了</divider>

  </div>
</template>

<script>
import { Group, Cell, Card, ButtonTab, ButtonTabItem, Search, Tab, TabItem, Divider, Badge, Icon, Flexbox, FlexboxItem, Box, XDialog, TransferDomDirective as TransferDom, XTextarea, XButton } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Group,
    Card,
    Cell,
    Search,
    Tab,
    TabItem,
    Divider,
    Badge,
    Icon,
    Flexbox,
    FlexboxItem,
    Box,
    XDialog,
    XTextarea,
    XButton
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('我的消息')
    this.getData()
  },
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    },
    getData () {
      let vue = this
      vue.post({
        url: '/dishui/zjsxhQuery',
        params: {'cxbj': '1', 'paraval': '913305005633351465', 'paramc': 'nsrsbh'},
        success: function (data) {
        }
      })
    },
    talk () {
      this.data.talkid = '1'
      this.data.content = ''
      this.showWq = true
    }
  },
  data () {
    return {
      results: [],
      value: '',
      showWq: false,
      data: { content: '', talkid: '' },
      lists: [{ talkid: '1', name: '欧阳卓', title: '食堂的饭菜不好吃', content: '主要交流勤工助学中的工作心得，以便同学们一起成长;主要交流勤工助学中的工作心得，以便同学们一起成长主要交流勤工助学中的工作心得，以便同学们一起成长', sj: '09:00', talks: [{ name: '小王', content: '哈哈哈哈，果然是' }, { name: '小于', title: '食堂的饭菜不好吃', content: '说的很有道理啊说的很有道理啊说的很有道理啊' }] }, { name: '小杨', title: '食堂的饭菜不好吃', content: '大家工作中遇到什么有趣的事情，都来说说吧！', sj: '昨天', talks: null }]
    }
  }
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}

</script>
<style>
.fontmian{
  color:#FF7951;
}

</style>

