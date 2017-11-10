<template>
  <div class="contentDiv">
  <box gap="10px 10px" >
  
   <flexbox >
         <flexbox-item :span="3">
          <div style="font-size:14px;">帖子数：{{count}}</div>
        </flexbox-item>
         <flexbox-item>
         <div style="font-size:14px;"></div>
        </flexbox-item>
        <flexbox-item style="padding-left:20px;">
          <router-link to="/components/grzx/Wyft"><div style="font-size:14px;" class="textcell" >创建我的帖子</div></router-link>
        </flexbox-item>
      </flexbox>
     </box>
     
   <search
    v-model="theme"
    position="absolute"
     :auto-fixed="false"
     placeholder="可输入主题名"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>
  
    <group gutter="0">
      <cell    v-for="(item,index) in lists"  style="border-top:0px;">
       <span slot="title" ><img src="static/woman.png" width="18" height="18" style="vertical-align:middle;"/>&nbsp;&nbsp;<span style="vertical-align:middle;font-size:16px;color:#09BB07">{{item.name}}：<span style="color:black;font-size:14px;">{{item.theme}}</span></span></span>
       <div slot="inline-desc">
       <div style="font-size:12px;padding-top:2px;padding-bottom:0px;padding-left:25px;color:black;word-break:break-all"><div v-bind:class="{ hiddenDiv: item.content.length>50 && !flag[index]}" >{{item.content}}</div></div>
       <div style="color:#09BB07;padding-left:25px;font-size:12px;padding-top:2px;padding-bottom:2px;" @click="flagChange(index)"><span v-if="item.content.length>50 && !flag[index]" >全文</span><span v-if="flag[index]" >收起</span></div>
       <div style="padding-left:25px;font-size:10px;">{{item.releasetime}}</div>
       <div style="width:100%;text-align:right;padding-bottom:10px;"><img src="static/mytalk.png" width="18" height="18" v-on:click="talk(item.id)"/></div>
        <div style="background-color:#EFEFF4;margin-left:25px;font-size:12px;padding:6px;border-radius: 5px;" v-if="item.data.list.length>0">
        <div v-for="it in item.data.list" ><span style="color:#09BB07;">{{it.name}}：</span><span>{{it.content}}</span></div>
        </div>
       </div>
      </cell>
      
    </group>
<divider>到达底部了</divider>
<div v-transfer-dom>
      <x-dialog :show.sync="showWq" class="dialogs" >
        <div class="img-box">
             <group title="我的看法" style="margin-top:10px;">
      			<x-textarea title="" :autofocus="showWq" v-model="data.content" required  :max="200" ref="contentRef"></x-textarea>
    		</group>
    		<div>
    		<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="addReply">提交</x-button>
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
    this.category_id = this.$route.query.category_id
    this.data.stu_id = this.GLOBAL.student.id
    this.getData()
  },
  methods: {
    onSubmit () {
      this.getData()
    },
    flagChange (index) {
      this.flag[index] = !this.flag[index]
      this.$set(this.flag, index, this.flag[index])
      console.log(this.flag[index])
    },
    onCancel () {
      if (this.theme !== '') {
        this.theme = ''
        this.getData()
      }
    },
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/share/getSort',
        params: {'category_id': vue.category_id, theme: vue.theme},
        success: function (data) {
          vue.lists = data.list
          vue.count = data.data.count
        }
      })
    },
    talk (id) {
      this.data.share_id = id
      this.data.content = ''
      this.showWq = true
      let vue = this
      setTimeout(function () {
        vue.$refs.contentRef.focus()
      })
    },
    addReply () {
      let vue = this
      vue.post({
        url: '/public/api/share/addReply',
        data: vue.data,
        success: function (data) {
          vue.showWq = false
          vue.$vux.toast.show({
            text: '提交成功'
          })
          vue.getData()
        }
      })
    }
  },
  data () {
    return {
      showWq: false,
      count: '0',
      theme: '',
      data: { share_id: '', stu_id: '', content: '' },
      lists: [{}],
      flag: []
    }
  }
}
</script>
<style>
.fontmian{
  color:#FF7951;
}

</style>

