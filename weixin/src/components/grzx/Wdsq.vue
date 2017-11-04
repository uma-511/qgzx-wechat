<template>
  <div class="contentDiv">
   
  <card  >
 <div slot="content" class="card-padding" style="padding:10px;">
  <flexbox >
         <flexbox-item :span="6">
          <div style="font-size:14px;">总帖数：{{zts}}</div>
        </flexbox-item>
         <flexbox-item>
         <div style="font-size:14px;"></div>
        </flexbox-item>

        <flexbox-item style="padding-left:20px;">
          <router-link to="/components/grzx/Wdtz"><div style="font-size:14px;" class="textcell" >我的帖子</div></router-link>
        </flexbox-item>
      </flexbox>
      </div>
     </card>
      <!--
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
  -->
    <group :title="tabItem.name" titleColor="#09BB07" v-for='(tabItem,tabIndex) in lists'>
      <cell is-link title="岗位名称" v-if="item.pid==tabItem.id" v-for="item in zlist" @click.native="onClickDetail(item.id)"  inline-desc='公司名称' style="border-top:0px;">
       <span slot="title" ><img src="static/zttalk.png" width="18" height="18" style="vertical-align:middle;"/>&nbsp;&nbsp;<span style="vertical-align:middle;font-size:16px;">{{item.name}}</span></span>
       <div slot="inline-desc"><div style="font-size:10px;padding-top:2px;padding-bottom:0px;padding-right:15px;">{{item.description}}</div></div>
       <div slot="default" style="padding-right:10px;"><div style="font-size:14px;padding-bottom:5px;color:black;text-align:left;">帖子数：<span class="fontmian">{{item.zts}}</span></div></div>
      	
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, ButtonTab, ButtonTabItem, Search, Tab, TabItem, Divider, Badge, Icon, Flexbox, FlexboxItem, Box, Card } from 'vux'

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
    Box,
    Card
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('我的社区')
    this.getData()
  },
  methods: {
    onClickDetail (id) {
      this.$router.push({path: '/components/grzx/Wdsqxq', query: {category_id: id}})
    },
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/share/classify',
        params: {},
        success: function (data) {
          vue.lists = data.list
          vue.zlist = data.zlist
          vue.zts = data.data.zts
        }
      })
    }
  },
  data () {
    return {
      results: [],
      value: '',
      lists: [{}],
      zlist: [{}],
      zts: '0'
    }
  }
}
</script>
<style>
.fontmian{
  color:#FF7951;
}

</style>

