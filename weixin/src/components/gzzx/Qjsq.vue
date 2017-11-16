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
       <selector title="请假类别" v-model="data.type_list" :options="qjlbArr" required direction="rtl"></selector>
       <datetime-range v-model="start_time"  title="开始时间"  v-bind:start-date="startdate" v-bind:end-date="enddate" text-align="right"></datetime-range>
      	<datetime-range v-model="end_time"  title="结束时间" v-bind:start-date="startdate" v-bind:end-date="enddate"  text-align="right"></datetime-range>
		<x-textarea title="备注" v-model="data.remark" required text-align="right"></x-textarea>
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
  },
  methods: {
    onClickDetail () {
      this.$router.push({path: '/components/gzzx/Ywsqjl', query: {initId: 3}})
    },
    saveData () {
      let vue = this
      if (vue.data.type_list === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未选择请假类别'
        })
        return
      }
      if (vue.start_time.length <= 0) {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写开始时间'
        })
        return
      }
      if (vue.end_time.length <= 0) {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写结束时间'
        })
        return
      }
      if (vue.data.remark === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写备注'
        })
        return
      }
      vue.data.start_time = vue.start_time[0] + ' ' + vue.start_time[1] + ':' + vue.start_time[2]
      vue.data.end_time = vue.end_time[0] + ' ' + vue.end_time[1] + ':' + vue.end_time[2]
      if (vue.data.start_time > vue.data.end_time) {
        vue.$vux.alert.show({
          title: '提示',
          content: '请假开始时间不能大于结束时间'
        })
        return
      }
      vue.$vux.confirm.show({
        title: '提示',
        content: '是否确定提交',
        onConfirm () {
          vue.post({
            url: '/public/api/person/addVacate',
            data: vue.data,
            success: function (data) {
              console.log('成功')
              vue.$vux.toast.show({
                text: '申请成功'
              })
              vue.$router.push({path: '/components/gzzx/Ywsqjl', query: {initId: 3}})
            }
          })
        }
      })
    }
  },
  data () {
    return {
      qjlbArr: [{key: '0', value: '事假'}, {key: '1', value: '年假'}, {key: '2', value: '病假'}],
      startdate: getStartDay(),
      enddate: getEndDay(),
      start_time: [],
      end_time: [],
      data: { student_id: this.GLOBAL.student.id, type_list: '1', start_time: '', end_time: '', remark: '' }
    }
  }
}

function getStartDay () {
  let now = new Date()
  now.setMonth(now.getMonth() - 1)
  let cmonth = now.getMonth()
  let day = now.getDate()
  if (cmonth < 10) cmonth = '0' + cmonth
  if (day < 10) day = '0' + day
  return now.getFullYear() + '-' + cmonth + '-' + day
}

function getEndDay () {
  let now = new Date()
  now.setMonth(now.getMonth() + 3)
  let cmonth = now.getMonth()
  let day = now.getDate()
  if (cmonth < 10) cmonth = '0' + cmonth
  if (day < 10) day = '0' + day
  return now.getFullYear() + '-' + cmonth + '-' + day
}
</script>
