<template>
  <div class="contentDiv">

  <div style="background-color:#FFFFFF;border-bottom:1px solid #EEEEEE">
  <box gap="10px 10px" >
   <flexbox >
        <flexbox-item :span="1.8">
          <div class="circle"><img src="static/woman.png" width="35" height="35" style="margin-top:5px;"/></div>
        </flexbox-item>
         <flexbox-item :span="3" >
          <div style="text-align:left;width:100%;">{{currInfo.stu_name}}</div>
        </flexbox-item>
        <!-- <flexbox-item>
          <div class="textcell">已赚取3000元</div>
        </flexbox-item> -->
      </flexbox>
     <div style="margin-top:10px;"> <!-- <div style="font-size:12px;margin-bottom:2px;">已工作：678天</div> -->
     <div style="font-size:12px;margin-bottom:2px;">任职公司：{{currInfo.currComp}}</div>
     </div>
     </box>
     </div>
   <group title="请认真填写以下内容">
      <x-input title="离职原因" v-model="data.reason" required></x-input>
       <datetime v-model="data.dimission_time"  title="预计离岗时间"   required></datetime>
		<x-textarea title="备注" v-model="data.remark" ></x-textarea>
  	  </group>
  	  <div style="width:100%;text-align:center;">
<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="lzsq">申请</x-button>
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
    this.updateTitle('离职申请')
    this.getData()
  },
  methods: {
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getCurrInfo',
        params: {'student_id': vue.GLOBAL.student.id},
        success: function (data) {
          vue.currInfo = data.data
        }
      })
    },
    lzsq () {
      let vue = this
      vue.data.student_id = vue.GLOBAL.student.id
      if (vue.data.reason === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写离职原因'
        })
        return
      }
      if (vue.data.dimission_time === '') {
        vue.$vux.alert.show({
          title: '提示',
          content: '您还未填写预计离岗时间'
        })
        return
      }
      vue.post({
        url: '/public/api/share/dismission',
        data: vue.data,
        success: function (data) {
          vue.$vux.toast.show({
            text: '离职申请成功，请等待审核'
          })
          vue.$router.push({path: '/components/grzx/Grzxmain'})
        }
      })
    }
  },
  data () {
    return {
      data: { student_id: '', reason: '', dimission_time: '', remark: '' },
      currInfo: { stu_name: '', currComp: '', current_time: '' }
    }
  }
}

</script>
