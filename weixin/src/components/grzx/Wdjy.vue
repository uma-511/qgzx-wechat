<template>
  <div class="contentDiv">
  <box gap="10px 10px" >
  
   <flexbox >
         <flexbox-item :span="3">
          <div style="font-size:14px;">建议数：{{lists.length}}</div>
        </flexbox-item>
         <flexbox-item>
        </flexbox-item>
        <flexbox-item style="padding-left:20px;">
          <router-link to="/components/grzx/Wyjy"><div style="font-size:14px;" class="textcell" >我要建议</div></router-link>
        </flexbox-item>
      </flexbox>
     </box>
     
  
    <group gutter="0">
      <cell    v-for="(item,index) in lists"  style="border-top:0px;">
       <span slot="title" ><img src="static/mytalk.png" width="18" height="18" style="vertical-align:middle;"/>&nbsp;&nbsp;<span style="vertical-align:middle;font-size:16px;color:#09BB07">{{item.option_title}}</span></span>
       <div slot="inline-desc">
       <div style="font-size:12px;padding-top:2px;padding-bottom:0px;padding-left:25px;color:black;word-break:break-all"><div v-bind:class="{ hiddenDiv: item.option_content.length>50 && !flag[index]}" >{{item.option_content}}</div></div>
       <div style="color:#09BB07;padding-left:25px;font-size:12px;padding-top:2px;padding-bottom:2px;"  @click="flagChange(index)"><span v-if="item.option_content.length>50 && !flag[index]" >全文</span><span v-if="flag[index]" >收起</span></div>
       <div style="font-size:10px;width:100%;text-align:right;">{{item.createtime}}</div>
        <div style="background-color:#EFEFF4;margin-left:25px;font-size:12px;padding:6px;border-radius: 5px;margin-top:2px;" v-if="item.zhuangtai=='已回复'">
        <div><span style="color:#09BB07;">回复：</span><span>{{item.content}}</span></div>
        </div>
       </div>
      </cell>
      
    </group>
<divider>到达底部了</divider>

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
    this.updateTitle('我的建议')
    this.getData()
  },
  methods: {
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getSuggest',
        params: {'id': vue.GLOBAL.student.id},
        success: function (data) {
          vue.lists = data.list
        }
      })
    },
    flagChange (index) {
      this.flag[index] = !this.flag[index]
      this.$set(this.flag, index, this.flag[index])
      console.log(this.flag[index])
    }
  },
  data () {
    return {
      lists: [],
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

