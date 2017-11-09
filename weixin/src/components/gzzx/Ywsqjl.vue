<template>
  <div class="contentDiv">
     <tab :line-width="2" custom-bar-width="100px" >
      <tab-item selected @on-item-click="bqSelect(1)">补签</tab-item>
      <tab-item @on-item-click="bqSelect(2)">外勤</tab-item>
       <tab-item @on-item-click="bqSelect(3)">请假</tab-item>
        <!--<tab-item @on-item-click="bqSelect(4)">加班</tab-item>-->
    </tab>
    <group gutter="0">
      
      <cell  title="2017-09-09"  v-for="item in bqlists"  style="border-top:0px;" v-if="statue.bqShow">
      <span slot="title" style="font-size:14px;color:#FF7951"><img src='static/check2.png' width="16" height="16"/>&nbsp;&nbsp;2017-09-09</span> 
       <div slot="inline-desc"><div style="font-size:10px;padding-bottom:5px;"></div><div style="font-size:12px;color:black;">{{item.ggmc}}</div></div>
       <div slot="default" style="padding-right:10px;"><div style="font-size:14px;padding-bottom:5px;color:black;">补签1次</div><div style="font-size:10px;">{{item.fbsj}}</div></div>
      	
      </cell>
      <cell  title="2017-09-09"  v-for="item in wqlists"  style="border-top:0px;" v-if="statue.wqShow">
      <span slot="title" style="font-size:14px;color:#FF7951"><img src='static/car.png' width="18" height="18"/>&nbsp;&nbsp;2017-09-09</span> 
       <div slot="inline-desc"><div style="font-size:10px;padding-bottom:5px;"></div><div style="font-size:12px;color:black;">{{item.ggmc}}</div></div>
       <div slot="default" style="padding-right:10px;"><div style="font-size:14px;padding-bottom:5px;color:black;">外勤1次</div><div style="font-size:10px;">{{item.fbsj}}</div></div>
      	
      </cell>
            <cell  title="2017-09-09"  v-for="item in qjlists"  style="border-top:0px;" v-if="statue.qjShow">
      <span slot="title" style="font-size:14px;color:#FF7951"><img src='static/rl.png' width="16" height="16" style="vertical-align:middle;"/>&nbsp;&nbsp;<span style="vertical-align:middle;">2017-09-09</span>&nbsp;&nbsp;<badge text="已批准" style="background-color:#09BB07;margin-bottom:5px;" ></badge></span> 
       <div slot="inline-desc"><div style="font-size:10px;padding-bottom:5px;"></div>
       <div style="font-size:12px;color:black;">
       <div>请假类别：事假</div>
       <div>开始时间：2017-09-09 09:00</div>
       <div>结束时间：2017-09-09 09:00</div>
       <div>请假时长：4小时</div>
       <div>备注：ahdahdhasdjaldjaljdsajsfka</div>
       <div>公司名称：{{item.ggmc}}</div></div>
      	</div>
      </cell>
      
      <cell  title="2017-09-09"  v-for="item in jblists"  style="border-top:0px;" v-if="statue.jbShow">
      <span slot="title" style="font-size:14px;color:#FF7951"><img src='static/clock.png' width="16" height="16" style="vertical-align:middle;"/>&nbsp;<span style="vertical-align:middle;">2017-09-09</span>&nbsp;&nbsp;<badge text="已批准" style="background-color:#09BB07;margin-bottom:5px;" ></badge></span> 
       <div slot="inline-desc"><div style="font-size:10px;padding-bottom:5px;"></div>
       <div style="font-size:12px;color:black;">
       <div>开始时间：2017-09-09 09:00</div>
       <div>结束时间：2017-09-09 09:00</div>
       <div>加班时长：4小时</div>
       <div>备注：ahdahdhasdjaldjaljdsajsfka</div>
       <div>公司名称：{{item.ggmc}}</div></div>
      	</div>
      </cell>
    </group>
<divider>到达底部了</divider>
  </div>
</template>

<script>
import { Group, Cell, ButtonTab, ButtonTabItem, Search, Tab, TabItem, Divider, Badge, Icon } from 'vux'

export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    Group,
    Cell,
    Search,
    Tab,
    TabItem,
    Divider,
    Badge,
    Icon
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('申请记录')
    this.getData()
  },
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    },
    bqSelect (bz) {
      console.log(bz)
      if (bz === 1) {
        this.statue.bqShow = true
        this.statue.wqShow = false
        this.statue.qjShow = false
        this.statue.jbShow = false
      } else if (bz === 2) {
        this.statue.bqShow = false
        this.statue.wqShow = true
        this.statue.qjShow = false
        this.statue.jbShow = false
      } else if (bz === 3) {
        this.statue.bqShow = false
        this.statue.wqShow = false
        this.statue.qjShow = true
        this.statue.jbShow = false
      } else if (bz === 4) {
        this.statue.bqShow = false
        this.statue.wqShow = false
        this.statue.qjShow = false
        this.statue.jbShow = true
      }
    },
    getData () {
      let vue = this
      vue.post({
        url: '/dishui/zjsxhQuery',
        params: {'cxbj': '1', 'paraval': '913305005633351465', 'paramc': 'nsrsbh'},
        success: function (data) {
          let data1 = [{'gwmc': 'java程序员', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '1', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '美工', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '2', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '需求工程师', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'}]
          vue.bqlists = data1
        }
      })
    }
  },
  data () {
    return {
      results: [],
      statue: { bqShow: true, wqShow: false, qjShow: false, jbShow: false },
      lists: [],
      bqlists: [{'gwmc': 'java程序员', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '1', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '美工', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '2', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '需求工程师', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'}],
      wqlists: [{'gwmc': 'java程序员', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '1', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '美工', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '2', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '需求工程师', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'}],
      qjlists: [{'gwmc': 'java程序员', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '1', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '美工', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '2', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '需求工程师', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'}],
      jblists: [{'gwmc': 'java程序员', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '1', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '美工', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '2', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '需求工程师', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'}]
    }
  }
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}

</script>
<style>


</style>

