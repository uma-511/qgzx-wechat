<template>
  <div class="contentDiv">
  <box gap="10px 10px" >
  
   <flexbox >
         <flexbox-item :span="3">
          <div style="font-size:14px;">今天：100</div>
        </flexbox-item>
         <flexbox-item>
         <div style="font-size:14px;">帖子数：124312</div>
        </flexbox-item>
        <flexbox-item style="padding-left:20px;">
          <router-link to="/components/grzx/Wyft"><div style="font-size:14px;" class="textcell" >创建我的帖子</div></router-link>
        </flexbox-item>
      </flexbox>
     </box>
     
   <search
    @result-click="resultClick"
    @on-change="getResult"
    :results="results"
    v-model="value"
    position="absolute"
    auto-scroll-to-top top="46px"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>
  
    <group gutter="0">
      <cell    v-for="item in lists"  style="border-top:0px;">
       <span slot="title" ><img src="static/woman.png" width="18" height="18" style="vertical-align:middle;"/>&nbsp;&nbsp;<span style="vertical-align:middle;font-size:16px;color:#09BB07">{{item.name}}：<span style="color:black;font-size:14px;">{{item.title}}</span></span></span>
       <div slot="inline-desc">
       <div style="font-size:12px;padding-top:2px;padding-bottom:0px;padding-left:25px;color:black;">{{item.content}}</div>
       <div style="color:#09BB07;padding-left:25px;font-size:12px;padding-top:2px;padding-bottom:2px;">全文</div>
       <div style="padding-left:25px;font-size:10px;">{{item.sj}}</div>
       <div style="width:100%;text-align:right;padding-bottom:10px;"><img src="static/mytalk.png" width="18" height="18" v-on:click="talk"/></div>
        <div style="background-color:#EFEFF4;margin-left:25px;font-size:12px;padding:6px;border-radius: 5px;" v-if="item.talks!=null && item.talks!=[]">
        <div v-for="it in item.talks" ><span style="color:#09BB07;">{{it.name}}：</span><span>{{it.content}}</span></div>
        </div>
       </div>
      </cell>
      
    </group>
<divider>到达底部了</divider>
<div v-transfer-dom>
      <x-dialog :show.sync="showWq" class="dialogs">
        <div class="img-box">
             <group title="我的看法" style="margin-top:10px;">
      			<x-textarea title="" v-model="data.content" required></x-textarea>
    		</group>
    		<div>
    		<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="">提交</x-button>
    		</div>
    		
        </div>
        <div @click="showWq=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { Group, Cell, ButtonTab, ButtonTabItem, Search, Tab, TabItem, Divider, Badge, Icon, Flexbox, FlexboxItem, Box, XDialog, TransferDomDirective as TransferDom, XTextarea, XButton } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Group,
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
    this.updateTitle('社区分享')
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

