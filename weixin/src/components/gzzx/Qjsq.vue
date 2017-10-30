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
        </flexbox-item>
        <flexbox-item>
          <div class="textcell">查看记录</div>
        </flexbox-item>
      </flexbox>
     <div style="margin-top:10px;"> <div style="font-size:12px;margin-bottom:2px;">本月请假时长：0小时</div></div>
     </box>
     </div>
   <group title="请认真填写以下内容">
       <selector title="请假类别" v-model="data.qjlb" :options="qjlbArr" required></selector>
       <datetime-range v-model="data.starttime"  title="开始时间"  v-bind:start-date="data.startdate" v-bind:end-date="data.enddate" ></datetime-range>
      	<datetime-range v-model="data.endtime"  title="结束时间" v-bind:start-date="data.startdate" v-bind:end-date="data.enddate"></datetime-range>
    	<x-input title="时长（小时）" v-model="data.sc" required></x-input>
		<x-textarea title="备注" v-model="data.bz" required></x-textarea>
  	  </group>
  	  <div style="width:100%;text-align:center;">
<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="">提交</x-button>
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
      qjlbArr: [{key: '1', value: '事假'}, {key: '2', value: '调休'}],
      endtime: '',
      data: { startdate: '2017-09-19', enddate: '2017-11-19', qjlb: '1', starttime: ['2017-10-19', '09', '00'], endtime: ['2017-10-19', '18', '00'], sc: '', bz: '' }
    }
  }
}

</script>
