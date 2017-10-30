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
          <div class="textcell">日期：2017-10-18</div>
        </flexbox-item>
      </flexbox>
     <div style="margin-top:10px;"> <div style="font-size:12px;margin-bottom:2px;">本月总工时：120小时</div></div>
     </box>
     </div>
   <group title="请输入查询条件">
      <datetime v-model="data.starttime" @on-change="change" title="开始时间"></datetime>
      <datetime v-model="data.endtime" @on-change="change" title="结束时间"></datetime>
    </group>
    
     <group title="出勤统计">
      <cell title="出勤天数：" :value="data.cqts+'天'"></cell>
      <cell title="休息天数：" :value="data.xxts+'天'"></cell>
      <cell title="迟到：" :value="data.cdts+'天'"></cell>
      <cell title="早退：" :value="data.ztts+'天'"></cell>
      <cell title="旷工：" :value="data.kgts+'天'"></cell>
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
    change () {
      this.data.starttime = '2016-09-10'
    }
  },
  data () {
    return {
      starttime: '',
      endtime: '',
      data: { cqts: '1', xxts: '1', cdts: '3', ztts: '2', kgts: '3', wqts: '3' }
    }
  }
}

</script>
