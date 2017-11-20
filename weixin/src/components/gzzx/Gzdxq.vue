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
          <div class="textcell"></div>
        </flexbox-item>
      </flexbox>
     <div style="margin-top:10px;"> <div style="font-size:12px;margin-bottom:2px;"></div></div>
     </box>
     </div>

     <group >
      <cell  title="工时：" :value="data.work_hours+'小时'" ></cell>    
      <cell  title="单价：" :value="data.unit_price+'元'" ></cell>    
      <cell  title="工资：" :value="data.wages+'元'" ></cell>      
    </group>
            	  <div style="width:100%;text-align:center;">
<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="back">返回</x-button>
  	  </div>
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
    this.updateTitle('工资单详情')
    this.getData()
  },
  methods: {
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getSalaryDetail',
        params: {student_id: vue.GLOBAL.student.id, time: vue.$route.query.rq},
        success: function (data) {
          vue.data = data.data
        }
      })
    },
    back () {
      this.$router.push({path: '/components/gzzx/Gzdcx'})
    }
  },
  data () {
    return {
      data: { work_hours: '', unit_price: '', wages: '' }
    }
  }
}

</script>
