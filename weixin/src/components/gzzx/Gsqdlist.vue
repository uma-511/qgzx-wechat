<template>
  <div class="contentDiv">
    <group gutter="0" style="margin-top:30px;">
      
      <cell is-link title="岗位名称"  v-for="item in lists" link="/components/gzzx/Gsqd" inline-desc='公司名称' style="border-top:0px;">
       <span slot="title" ><span style="vertical-align:middle;">{{item.gwmc}}</span> <badge text="固" v-if="item.gwxz==1" style="background-color:green;"></badge><badge text="临" v-if="item.gwxz==2" style="background-color:green;"></badge><span>&nbsp;</span><badge text="火" v-if="item.sfrm==1"></badge></span>
       <div slot="inline-desc"><div style="font-size:10px;padding-bottom:10px;">{{item.gzdd}}</div><div style="font-size:14px;color:black;">{{item.ggmc}}&nbsp;<badge style="background-color:green;" text="成功应聘" v-if="item.sfyp==1"></badge></div></div>
       <div slot="default" style="padding-right:10px;"><div style="font-size:14px;padding-bottom:5px;color:black;">8千-1万</div><div style="font-size:14px;">{{item.fbsj}}</div></div>
      	
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
    this.updateTitle('工作中心/公司签到')
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
    }
  },
  data () {
    return {
      results: [],
      value: '',
      lists: []
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

