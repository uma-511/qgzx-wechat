<template>
  <div class="contentDiv">

  <div style="background-color:#FFFFFF;border-bottom:1px solid #EEEEEE">
  <box gap="10px 10px" >
   <flexbox >
        <flexbox-item :span="1.8">
          <div class="circle"><img src="static/woman.png" width="35" height="35" style="margin-top:5px;"/></div>
        </flexbox-item>
         <flexbox-item :span="3" >
          <div style="text-align:left;width:100%;">{{data.stu_name}}</div>
        </flexbox-item>
        <flexbox-item>
          <div class="textcell">日期：{{data.current_time}}</div>
        </flexbox-item>
      </flexbox>
     <div style="margin-top:10px;"> <div style="font-size:12px;margin-bottom:2px;"></div></div>
     </box>
     </div>
   <group title="请输入查询条件">
      <datetime v-model="starttime" @on-change="startchange" title="开始月份" :end-date="maxMonth" :min-year="2017" :max-year="maxYear" format="YYYY-MM"></datetime>
      <datetime v-model="endtime" @on-change="endchange" title="结束月份" :end-date="maxMonth" :min-year="2017" :max-year="maxYear" format="YYYY-MM" :min-date="starttime"></datetime>
    </group>

     <group title="工资单">
      <cell  v-for="item in list" v-bind:title="item.rq" :value="'工资：'+item.gz+'元'" is-link link="/components/gzzx/Gzdxq"></cell>
    </group>

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
    this.updateTitle('工资查询')
    this.getData()
  },
  methods: {
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getSalary',
        params: {'student_id': vue.GLOBAL.student.id, 'start_time': '', 'end_time': ''},
        success: function (data) {
          vue.data = data.data
          vue.list = data.list
        }
      })
    },
    startchange () {
      // this.data.starttime = '2016-09-10'
    },
    endchange () {
      let vue = this
      vue.post({
        url: '/public/api/person/getSalary',
        params: {'student_id': vue.GLOBAL.student.id, 'start_time': vue.starttime, 'end_time': vue.endtime},
        success: function (data) {
          vue.data = data.data
          vue.list = data.list
        }
      })
    },
    getThisMonth () {
      let now = new Date()
      let cmonth = now.getMonth() + 1
      let day = now.getDate()
      if (cmonth < 10) cmonth = '0' + cmonth
      if (day < 10) day = '0' + day
      return now.getFullYear() + '-' + cmonth + '-' + day
    },
    getPreMonth () {
      let now = new Date()
      let cmonth = now.getMonth()
      // let day = now.getDate()
      if (cmonth < 10) cmonth = '0' + cmonth
      // if (day < 10) day = '0' + day
      return now.getFullYear() + '-' + cmonth
    },
    setToday () {
      let now = new Date()
      let cmonth = now.getMonth()
      let day = now.getDate()
      if (cmonth < 10) cmonth = '0' + cmonth
      if (day < 10) day = '0' + day
      // this.value7 = now.getFullYear() + '-' + cmonth + '-' + day
      // console.log('set today ok')
      return now.getFullYear() + '-' + cmonth + '-' + day
    },
    thisYear () {
      let now = new Date()
      return now.getFullYear()
    }
  },
  data () {
    // let thisMonth = this.getThisMonth()
    let preMonth = this.getPreMonth()
    let maxDate = this.setToday()
    let my = this.thisYear()
    return {
      maxYear: my,
      starttime: preMonth,
      endtime: preMonth,
      maxMonth: maxDate,
      list: [ { rq: '2017-08', gz: '300' }, { rq: '2017-09', gz: '300' }, { rq: '2017-10', gz: '400' } ],
      data: { stu_name: '', current_time: '' }
    }
  }
}

</script>
