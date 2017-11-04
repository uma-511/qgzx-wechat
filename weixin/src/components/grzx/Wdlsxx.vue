<template>
  <div class="contentDiv">

         <card v-for="item in list" style="margin-left:15px;margin-right:15px;margin-bottom:10px;padding:10px;border: 1px solid #FBF9FE">
      <div slot="content" class="cardContent" style="color:black;">
      	<div class="title"><span style="font-size:16px;color:#09BB07">{{item.advice_title}}</span>
      	<div style="font-size:10px;color:black">{{item.sendtime}}</div>
      	</div>
 		<div style="font-size:12px;" v-html="item.content">
	   </div>
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
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getMessage',
        data: {'id': vue.GLOBAL.student.id},
        success: function (data) {
          vue.list = data.list
        }
      })
    }
  },
  data () {
    return {
      list: [{}]
    }
  }
}

</script>
<style>
.fontmian{
  color:#FF7951;
}

</style>

