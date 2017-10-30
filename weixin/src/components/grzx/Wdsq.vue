<template>
  <div class="contentDiv">
  <box gap="10px 10px" >
  
  <flexbox >
         <flexbox-item :span="3">
          <div style="font-size:14px;">今天：100</div>
        </flexbox-item>
         <flexbox-item>
         <div style="font-size:14px;">帖子数：124312</div>
        </flexbox-item>
        <flexbox-item style="padding-left:20px;">
          <router-link to="/components/grzx/Wdsqxq"><div style="font-size:14px;" class="textcell" >我的帖子</div></router-link>
        </flexbox-item>
      </flexbox>
     </box>
     
   <search
    @result-click="resultClick"
    @on-change="getResult"
    :results="results"
    v-model="value"
    position="absolute"
    auto-scroll-to-top top="46px"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>
  
    <group title="工作交流" titleColor="#09BB07">
      <cell is-link title="岗位名称"  v-for="item in gzxdlists" link="/components/grzx/Wdsqxq" inline-desc='公司名称' style="border-top:0px;">
       <span slot="title" ><img src="static/zttalk.png" width="18" height="18" style="vertical-align:middle;"/>&nbsp;&nbsp;<span style="vertical-align:middle;font-size:16px;">{{item.title}}</span></span>
       <div slot="inline-desc"><div style="font-size:10px;padding-top:2px;padding-bottom:0px;padding-right:15px;">{{item.jj}}</div></div>
       <div slot="default" style="padding-right:10px;"><div style="font-size:14px;padding-bottom:5px;color:black;text-align:left;">主题：<span class="fontmian">{{item.zts}}</span></div><div style="font-size:14px;color:black;">帖数：<span class="fontmian">{{item.tzs}}</span></div></div>
      	
      </cell>
    </group>
      <group title="学生生活" titleColor="#09BB07">
      
      <cell is-link title="岗位名称"  v-for="item in xsshlists" link="/components/grzx/Wdsqxq" inline-desc='公司名称' style="border-top:0px;">
       <span slot="title" ><img src="static/zttalk.png" width="18" height="18" style="vertical-align:middle;"/>&nbsp;&nbsp;<span style="vertical-align:middle;font-size:16px;">{{item.title}}</span> </span>
       <div slot="inline-desc"><div style="font-size:10px;padding-top:2px;padding-bottom:0px;padding-right:15px;">{{item.jj}}</div></div>
       <div slot="default" style="padding-right:10px;"><div style="font-size:14px;padding-bottom:5px;color:black;text-align:left;">主题：<span class="fontmian">{{item.zts}}</span></div><div style="font-size:14px;color:black;">帖数：<span class="fontmian">{{item.tzs}}</span></div></div>
      	
      </cell>
    </group>
<divider>到达底部了</divider>
  </div>
</template>

<script>
import { Group, Cell, ButtonTab, ButtonTabItem, Search, Tab, TabItem, Divider, Badge, Icon, Flexbox, FlexboxItem, Box } from 'vux'

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
    Icon,
    Flexbox,
    FlexboxItem,
    Box
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('我的社区')
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
          let data1 = [{'gwmc': 'java程序员', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '1', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '美工', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '2', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '需求工程师', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '项目经理', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '美工', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '2', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '需求工程师', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '项目经理', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '美工', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '2', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '需求工程师', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'},
            {'gwmc': '项目经理', 'gzdd': '佛山市-南海区', 'ggmc': '佛山阿啪啪信息科技有限公司', 'cx': '8千-1万', 'fbsj': '2017-09-09', 'gwxz': '1', 'sfrm': '0', 'gzxxdd': '', 'zwms': '', sfyp: '0'}]
          vue.lists = data1
        }
      })
    }
  },
  data () {
    return {
      results: [],
      value: '',
      lists: [],
      gzxdlists: [{ title: '工作心得', jj: '主要交流勤工助学中的工作心得，以便同学们一起成长', zts: '20', tzs: '100' }, { title: '工作趣事', jj: '大家工作中遇到什么有趣的事情，都来说说吧！', zts: '20', tzs: '100' }],
      xsshlists: [{ title: '校园那些事', jj: '那些年，我们一起走过的校园生活，是否还能记起', zts: '20', tzs: '100' }]
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
.fontmian{
  color:#FF7951;
}

</style>

