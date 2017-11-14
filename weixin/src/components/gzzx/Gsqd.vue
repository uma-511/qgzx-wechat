<template>
  <div class="contentDiv">
  
  <div style="background-color:#FFFFFF;border-bottom:1px solid #EEEEEE">
  <box gap="10px 10px" >
   <flexbox >
        <flexbox-item :span="1.8">
          <div><img class="circle" v-bind:src="apiPrefix+'/'+GLOBAL.student.image" width="35" height="35" style="margin-top:5px;"/></div>
        </flexbox-item>
         <flexbox-item :span="3" >
          <div style="text-align:left;width:100%;">{{data.stu_name}}</div>
        </flexbox-item>
        <flexbox-item>
          <div class="textcell">日期：{{data.current_time}}</div>
        </flexbox-item>
      </flexbox>
     <div style="margin-top:10px;"> <div style="font-size:12px;margin-bottom:2px;">任职公司：{{data.unit_name}}</div></div>
     </box>
     </div>
    <div style="background-color:#FFFFFF;margin-top:10px;margin-bottom:50px;border-top:1px solid #EEEEEE;border-bottom:1px solid #EEEEEE">
    <box gap="10px 10px">
      <flexbox :gutter="0" wrap="wrap">
       <flexbox-item :span="3">
      	 <flow orientation="vertical" style="height:200px;">
          <flow-state state="上" v-bind:title="'上班'" is-done v-if="data.come_time==''"></flow-state>
          <flow-state state="上" v-bind:title="'到岗时间:'+data.current_time+' '
          +data.come_time"  v-if="data.come_time!=''">
          </flow-state>
          <flow-line v-bind:is-done="data.qdstatue!=2"></flow-line>     
         <flow-state state="下" v-bind:title="'下班'" is-done v-if="data.leave_time=='' || data.leave_time==null"></flow-state>
         <flow-state state="下" v-bind:title="'离岗时间:'+data.current_time+' '+data.leave_time"  v-if="data.leave_time!='' && data.leave_time!=null"></flow-state>
        </flow>
        <div style="height:40px;"></div>
      </flexbox-item>
      <flexbox-item>
      	<flexbox orient="vertical">
      	  <flexbox-item>
        	<div style="height:100px;"></div>
        </flexbox-item>
      	 <flexbox-item>
        	<x-button  type="primary" style="height:50px;width:120px;" @click.native="dgqd" v-if="data.come_time==''">到岗签到</x-button>
        	<div v-if="data.come_time!=''" style="font-size:12px;">&nbsp;</div>
        </flexbox-item>
        <flexbox-item>
        	<div style="height:150px;"></div>
        </flexbox-item>
              	 <flexbox-item>
        	<x-button  type="primary" style="height:50px;width:120px;"  @click.native="lgqd"  v-if="(data.leave_time=='' || data.leave_time==null) && data.come_time!='' && data.come_time!=null">离岗签到</x-button>
        	<div v-if="data.leave_time!=''  && data.leave_time!=null" style="font-size:12px;">&nbsp;</div>
        </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
      </box>
       </div>
        <!--
        <box gap="10px 10px">
      <flexbox style="margin-top:50px;">
        <flexbox-item>
          <x-button   plain type="primary"  disabled >签到</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button  plain type="primary">申请</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button  plain type="primary" @click.native="">查询</x-button>
        </flexbox-item>
      </flexbox>
     </box>
     -->
  </div>
</template>

<script>
import { Flow, Card, FlowState, FlowLine, XButton, Flexbox, FlexboxItem, Box, Divider } from 'vux'

export default {
  components: {
    Flow,
    Card,
    FlowState,
    FlowLine,
    XButton,
    Flexbox,
    FlexboxItem,
    Box,
    Divider
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('公司签到')
    this.getData()
  },
  methods: {
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getSignMessage',
        params: {'id': vue.GLOBAL.student.id},
        success: function (data) {
          vue.data = data.data
        }
      })
    },
    dgqd () {
      let vue = this
      vue.post({
        url: '/public/api/person/sign_come',
        params: {'id': vue.GLOBAL.student.id, employing_unit_id: vue.data.employing_unit_id},
        success: function (data) {
          vue.data = data.data
        }
      })
    },
    lgqd () {
      let vue = this
      vue.post({
        url: '/public/api/person/sign_leave',
        params: {'id': vue.GLOBAL.student.id, employing_unit_id: vue.data.employing_unit_id},
        success: function (data) {
          vue.data = data.data
        }
      })
    }
  },
  data () {
    return {
      results: [],
      value: '',
      lists: [],
      data: {}
    }
  }
}

</script>
