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
      <tab :line-width="2" custom-bar-width="100px" >
      <tab-item selected @on-item-click="itemClick('固定岗')">固定岗</tab-item>
      <tab-item @on-item-click="itemClick('临时岗')">临时岗</tab-item>
    </tab>
    <div>
    <group gutter="0">
       
      <cell is-link title="岗位名称"  v-for="item in lists"  inline-desc='公司名称' style="border-top:0px;"  @click.native="onClickDetail(item.id)">
       <span slot="title" ><span style="vertical-align:middle;">{{item.job_name}}</span> <badge v-bind:text="item.quality.substring(0,1)"  style="background-color:#09BB07;"></badge></span>
       <div slot="inline-desc"><div style="font-size:10px;padding-bottom:10px;">{{item.address}}</div><div style="font-size:14px;color:black;">{{item.unit_name}}</div></div>
       <div slot="default" style="padding-right:10px;"><div style="font-size:14px;padding-bottom:5px;color:black;">面议</div><div style="font-size:14px;">{{item.release_time}}</div></div>
      	
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
    onClickDetail (id) {
      this.$router.push({path: '/components/zpzx/Gwxq', query: {job_id: id}})
    },
    itemClick (bz) {
      this.quality = bz
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
      quality: '固定岗',
      autoFixed: false,
      lists: []
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

