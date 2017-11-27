<template>
  <div class="contentDiv">
   <search
    v-model="keyword"
    :auto-fixed="autoFixed"
    position="absolute"
    placeholder="可输入岗位名称或工作单位"
    @on-cancel="onCancel"
    @on-focus="onFocus"
    @on-submit="onSubmit"
    ref="search"></search>
    <div slot="content" >
    	<div class="wrapper" >
         	<div class="nav-item" :key="tabIndex" :class='{active: tabIndex == nowIndex}' v-for='(tabItem,tabIndex) in tabParams' @click='tabToggle(tabIndex)'>
             <span :class='{dropdownBtn: tabIndex == 0}' >{{tabItem.value}}&nbsp;<img src="static/down-gray.png" width="12" height="12" v-if='nowIndex!=tabIndex'/><img src="static/up-green.png" width="12" height="12" v-if='nowIndex==tabIndex'/></span>
         	</div>
    	</div>
    	<div v-for='(tabItem,tabIndex) in tabParams' >
            <ul  class="dropdownWrapper" v-show='nowIndex==tabIndex' >
                <li  :class='{ selectItem: tabItem.dataKey==-1}' style="text-align:left;padding-left:20px;border:1px solid #F2F2F2;border-top:0px;" @click='clickLi(tabItem.key,0,tabIndex,0)'>全部</li>
                <li  :class='{ selectItem: tabItem.dataKey==item.key}' v-for='(item, index) in tabItem.menu' style="text-align:left;padding-left:20px;border:1px solid #F2F2F2;border-top:0px;" @click='clickLi(item.key,item.value,tabIndex)'>{{item.value}}</li>
            </ul>
         </div>
    </div>
    <div>
    <div class="overlayer" @touchmove.prevent v-if="dropdownActive"></div>
    <group gutter="0">
       
      <cell is-link title="岗位名称"  v-for="item in lists"  inline-desc='公司名称' style="border-top:0px;"  @click.native="onClickDetail(item.id)">
       <span slot="title" ><span style="vertical-align:middle;">{{item.job_name}}</span> <badge v-bind:text="item.quality.substring(0,1)"  v-if="item.quality=='临时岗'" style="background-color:#FF7951;"></badge><badge v-bind:text="item.quality.substring(0,1)"  v-if="item.quality=='固定岗'" style="background-color:#09BB07;"></badge></span>
       <div slot="inline-desc"><div style="font-size:10px;padding-bottom:5px;">{{item.address}}</div><div style="font-size:14px;color:black;">{{item.unit_name}}</div></div>
       <div slot="default" style="padding-right:10px;"><div style="font-size:14px;padding-bottom:5px;color:black;">面议</div><div style="font-size:10px;">招聘人数：{{item.p_number}}</div><div style="font-size:12px;">{{item.release_time}}</div></div>
      	
      </cell>
    </group>
</div>
<divider>到达底部了</divider>

  </div>
</template>

<script>
import { Group, Cell, ButtonTab, ButtonTabItem, Search, Tab, TabItem, Divider, Badge, Icon, Card } from 'vux'

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
    Card
  },
  created: function () {
    this.updateTitle('招聘中心')
    this.getData()
  },
  methods: {
    onCancel () {
      if (this.keyword !== '') {
        this.keyword = ''
        this.getData()
      }
    },
    onFocus () {
      this.nowIndex = -1
      this.dropdownActive = false
    },
    onSubmit () {
      this.getData()
    },
    tabToggle: function (index) {
      if (this.nowIndex === index) {
        if (this.dropdownActive) {
          this.nowIndex = -1
        }
        this.dropdownActive = !this.dropdownActive
      } else {
        this.dropdownActive = true
        this.nowIndex = index
      }
    },
    clickLi: function (key, value, index, bz) {
      console.log(key)
      this.dropdownActive = false
      this.nowIndex = -1
      if (bz === 0) {
        this.tabParams[index].dataKey = -1
        this.tabParams[index].value = this.tabParams[index].tabvalue
        if (index === 0) {
          this.quality = ''
        }
      } else {
        this.tabParams[index].dataKey = key
        this.tabParams[index].value = value
        if (index === 0) {
          this.quality = key
        }
      }
      if (index === 0) {
        this.getData()
      }
    },
    onClickDetail (id) {
      this.$router.push({path: '/components/zpzx/Gwxq', query: {job_id: id, statue: 0}})
    },
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getOffers',
        params: {'quality': vue.quality, 'keyword': vue.keyword},
        success: function (data) {
          vue.lists = data.list
        }
      })
    }
  },
  data () {
    return {
      keyword: '',
      quality: '',
      autoFixed: false,
      lists: [],
      nowIndex: -1,
      dropdownActive: false,
      tabParams: [{key: '0', tabvalue: '岗位性质', value: '岗位性质', dataKey: '-1', menu: [{key: '固定岗', value: '固定岗'}, {key: '临时岗', value: '临时岗'}]}]
    }
  }
}
</script>
<style>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wrapper>div {
        flex: 1;
        text-align: center;
        height: 36px;
        line-height: 36px;
    }
    .dropdownWrapper {
        /*margin-top: 36px;*/
        font-size: 14px;
         z-index:11;
         position: fixed;
         background-color:white;
         width:100%;
    }
    .dropdownWrapper li {
        display: block;
        height: 36px;
        line-height: 36px;
    }

    .nav-item.active {
        background: #EFEFF4;
        color:#09BB07;
    }
    .dropdownBtn {
        display: block;
        width: 100%;
        height: 100%;
        
    }
    .nav-item {
        cursor: pointer;
    }
    .selectItem{
     border-left:2px solid #09BB07;
     color:#09BB07;
    }
    /*遮罩层*/
.overlayer{
    position:fixed;
    width:100%;
    height:100%;
    z-index:10;
    background-color:black;
    filter:alpha(opacity=50); 
    -moz-opacity:0.5; 
    -khtml-opacity: 0.5; 
    opacity: 0.5; 
}
</style>

