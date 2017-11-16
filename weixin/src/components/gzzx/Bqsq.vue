<template>
  <div class="contentDiv">
  
  <div style="background-color:#FFFFFF;border-bottom:1px solid #EEEEEE">
  <box gap="10px 10px" >
   <flexbox >
        <flexbox-item :span="1.8">
          <div><img class="circle" v-bind:src="apiPrefix+'/'+GLOBAL.student.image" width="35" height="35" style="margin-top:5px;"/></div>
        </flexbox-item>
         <flexbox-item :span="3" >
          <div style="text-align:left;width:100%;">{{GLOBAL.student.stu_name}}</div>
        </flexbox-item>
        <flexbox-item>
        </flexbox-item>
        <flexbox-item>
          <div class="textcell" @click="onClickDetail">查看记录</div>
        </flexbox-item>
      </flexbox>
     </box>
     </div>
   <group title="请认真填写以下内容">
       <datetime v-model="startdate" @on-change="change" title="补签日期" text-align="right" v-bind:start-date="startdate_s" v-bind:end-date="enddate"></datetime>
       <datetime-range v-model="start_time"  title="到岗时间"  v-bind:start-date="startdate" v-bind:end-date="startdate" text-align="right"></datetime-range>
      	<datetime-range v-model="end_time"  title="离岗时间" v-bind:start-date="startdate" v-bind:end-date="startdate"  text-align="right"></datetime-range>
		<x-textarea title="补签原因" v-model="data.reason" required text-align="right"></x-textarea>
  	  </group>
  	  <div style="width:100%;text-align:center;">
<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="saveData">提交</x-button>
  	  </div>
  </div>
</template>

<script>
import { XButton, Flexbox, FlexboxItem, Box, Datetime, Group, XInput, Cell, DatetimeRange, XTextarea, Selector } from 'vux'

export default {
  components: {
    XButton,
    Flexbox,
    FlexboxItem,
    Box,
    Datetime,
    Group,
    XInput,
    Cell,
    DatetimeRange,
    XTextarea,
    Selector
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('请假申请')
    let now = new Date()
    this.startdate_s = now.getFullYear() + '-01-01'
    this.enddate = getYstoday()
  },
  methods: {
    change (value) {
      if (this.start_time.length > 0) {
        this.start_time[0] = value
      }
      if (this.end_time.length > 0) {
        this.end_time[0] = value
      }
    },
    onClickDetail () {
      this.$router.push({path: '/components/gzzx/Ywsqjl', query: {initId: 1}})
    },
    saveData () {
      let vue = this
      if (vue.start_time.length <= 0 && vue.end_time.length <= 0) {
        vue.$vux.alert.show({
          title: '提示',
          content: '到岗时间与离岗时间至少填写一项'
        })
        return
      }
      if (vue.data.reason === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写补签原因'
        })
        return
      }
      vue.data.duty_time = vue.start_time[0] + ' ' + vue.start_time[1] + ':' + vue.start_time[2]
      vue.data.departure_time = vue.end_time[0] + ' ' + vue.end_time[1] + ':' + vue.end_time[2]
      vue.$vux.confirm.show({
        title: '提示',
        content: '是否确定提交',
        onConfirm () {
          vue.post({
            url: '/public/api/person/addSignin',
            data: vue.data,
            success: function (data) {
              console.log('成功')
              vue.$vux.toast.show({
                text: '申请成功'
              })
              vue.$router.push({path: '/components/gzzx/Ywsqjl', query: {initId: 1}})
            }
          })
        }
      })
    }
  },
  data () {
    return {
      startdate: '',
      enddate: '',
      startdate_s: '',
      start_time: [],
      end_time: [],
      data: { student_id: this.GLOBAL.student.id, duty_time: '', departure_time: '', reason: '' }
    }
  }
}
function getYstoday () {
  let now = new Date()
  now.setTime(now.getTime() - 24 * 60 * 60 * 1000)
  let cmonth = now.getMonth() + 1
  let day = now.getDate()
  if (cmonth < 10) cmonth = '0' + cmonth
  if (day < 10) day = '0' + day
  return now.getFullYear() + '-' + cmonth + '-' + day
}
</script>
