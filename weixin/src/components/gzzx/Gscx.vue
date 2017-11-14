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
     <!-- <div style="margin-top:10px;"> <div style="font-size:12px;margin-bottom:2px;">本月总工时：120小时</div></div> -->
     </box>
     </div>
   <group title="请输入查询条件">
      <datetime v-model="starttime" @on-change="change" :end-date="endtime" :min-year=2017 title="开始时间"></datetime>
      <datetime v-model="endtime" @on-change="change" :start-date="starttime" :end-date="today" title="结束时间"></datetime>
    </group>

     <group title="出勤统计">
      <cell title="出勤天数：" :value="data.cqts+'天'"></cell>
      <cell title="休息天数：" :value="data.xxts+'天'"></cell>
      <cell title="迟到：" :value="data.cdts+'天'"></cell>
      <cell title="早退：" :value="data.ztts+'天'"></cell>
      <!-- <cell title="旷工：" :value="data.kgts+'天'"></cell> -->
      <cell title="外勤：" :value="data.wqts+'天'"></cell>

    </group>
     <!--
           <box gap="10px 10px">
      <flexbox style="margin-top:50px;">
        <flexbox-item>
          <x-button   plain type="primary" >签到</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button  plain type="primary">申请</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button  plain type="primary"  disabled >查询</x-button>
        </flexbox-item>
      </flexbox>
     </box>
     -->
  </div>
</template>

<script>
import { XButton, Flexbox, FlexboxItem, Box, Datetime, Group, XInput, Cell } from 'vux'

export default {
  components: {
    XButton,
    Flexbox,
    FlexboxItem,
    Box,
    Datetime,
    Group,
    XInput,
    Cell
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('考勤情况')
    this.getData()
  },
  methods: {
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getAttend',
        params: {'student_id': vue.GLOBAL.student.id, 'start_time': vue.starttime, 'end_time': vue.endtime},
        success: function (data) {
          vue.data = data.data
        }
      })
    },
    change () {
      let vue = this
      vue.post({
        url: '/public/api/person/getAttend',
        params: {'student_id': vue.GLOBAL.student.id, 'start_time': vue.starttime, 'end_time': vue.endtime},
        success: function (data) {
          vue.data = data.data
        }
      })
    },
    startchange (newValue) {
      if (newValue !== '') {
        this.starttime = newValue
      }
    },
    endchange (newValue) {
      let vue = this
      if (newValue !== '') {
        this.endtime = newValue
      }
      vue.post({
        url: '/public/api/person/getAttend',
        params: {'student_id': vue.GLOBAL.student.id, 'start_time': vue.starttime, 'end_time': vue.endtime},
        success: function (data) {
          vue.data = data.data
        }
      })
    },
    setToday () {
      let now = new Date()
      let cmonth = now.getMonth() + 1
      let day = now.getDate()
      if (cmonth < 10) cmonth = '0' + cmonth
      if (day < 10) day = '0' + day
      // this.value7 = now.getFullYear() + '-' + cmonth + '-' + day
      // console.log('set today ok')
      return now.getFullYear() + '-' + cmonth + '-' + day
    }
  },
  data () {
    let ed = this.setToday()
    return {
      starttime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-01',
      endtime: ed,
      today: ed,
      data: { cqts: '1', xxts: '1', cdts: '3', ztts: '2', kgts: '3', wqts: '3', current_time: '', stu_name: '' }
    }
  }
}

</script>
