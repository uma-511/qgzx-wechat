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
     <div style="margin-top:10px;"> <div style="font-size:12px;margin-bottom:2px;"></div></div>
     </box>
     </div>
     <box gap="10px 10px">
<div style="margin-top:20px;color:#FF7951;font-size:20px;">{{data.rq}}总工资：{{data.zgz}}元</div>
    </box>
     <group >
      <cell  title="基本工资：" :value="data.jbgz+'元'" ></cell>    
      <cell  title="岗位工资：" :value="data.gwgz+'元'" ></cell>    
      <cell  title="绩效工资：" :value="data.jxgz+'元'" ></cell>    
      <cell  title="其他奖金：" :value="data.qtgz+'元'" ></cell>    
      <cell  title="扣除工资：" :value="data.kcgz+'元'" ></cell>    
    </group>
            	  <div style="width:100%;text-align:center;">
<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="">返回</x-button>
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
      data: { rq: '2017-04', zgz: '2000', jbgz: '300', gwgz: '2000', jxgz: '300', qtgz: '2000', kcgz: '100' }
    }
  }
}

</script>
