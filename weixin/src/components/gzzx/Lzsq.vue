<template>
  <div class="contentDiv">
  
  <div style="background-color:#FFFFFF;border-bottom:1px solid #EEEEEE">
  <box gap="10px 10px" >
   <flexbox >
        <flexbox-item :span="1.8">
          <div class="circle"><img src="static/woman.png" width="35" height="35" style="margin-top:5px;"/></div>
        </flexbox-item>
         <flexbox-item :span="3" >
          <div style="text-align:left;width:100%;">欧阳卓</div>
        </flexbox-item>
        <flexbox-item>
          <div class="textcell">已赚取3000元</div>
        </flexbox-item>
      </flexbox>
     <div style="margin-top:10px;"> <div style="font-size:12px;margin-bottom:2px;">已工作：678天</div>
     <div style="font-size:12px;margin-bottom:2px;">任职公司：佛山阿帕帕科技有限公司</div>
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
        url: '/dishui/zjsxhQuery',
        params: {'cxbj': '1', 'paraval': '913305005633351465', 'paramc': 'nsrsbh'},
        success: function (data) {
          let data1 = [{'gwmc': 'java程序员', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '1', 'gzxxdd': '', 'zwms': '', sfyp: '1'},
            {'gwmc': '美工', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '2', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '1'},
            {'gwmc': '需求工程师', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '1'}]
          vue.lists = data1
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
        url: '/public/api/Share/dismission',
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
      data: { student_id: '', reason: '', dimission_time: '', remark: '' }
    }
  }
}

</script>
