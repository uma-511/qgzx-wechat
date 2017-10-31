<template>
  <div class="contentDiv">
   <search
       v-model="keyword"
    :auto-fixed="autoFixed"
    position="absolute"
    placeholder="可输入岗位名称或工作单位"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>
     <tab :line-width="2" custom-bar-width="100px" >
      <tab-item selected @on-item-click="handler('固定岗')">固定岗</tab-item>
      <tab-item @on-item-click="handler('临时岗')">临时岗</tab-item>
    </tab>
    <group gutter="0">
      
      <cell is-link title="岗位名称"  v-for="item in lists" @click.native="onClickDetail(item.job_id)" inline-desc='公司名称' style="border-top:0px;">
       <span slot="title" ><span style="vertical-align:middle;">{{item.post_name}}</span></span>
       <div slot="inline-desc"><div style="font-size:10px;padding-bottom:10px;">{{item.address}}</div><div style="font-size:14px;color:black;">{{item.unit_name}}<br/><badge style="background-color:#FF7951;" v-bind:text="item.status_list" v-if="item.status_list=='待审核'"></badge><badge style="background-color:#09BB07;" v-bind:text="item.status_list" v-if="item.status_list=='已录取'"></badge></div></div>
       <div slot="default" style="padding-right:10px;"><div style="font-size:14px;padding-bottom:5px;color:black;">面议</div><div style="font-size:14px;">{{item.release_time}}</div></div>
      </cell>
    </group>
<divider>到达底部了</divider>
  </div>
</template>

<script>
import { Group, Cell, ButtonTab, ButtonTabItem, Search, Tab, TabItem, Divider, Badge, Checker, Icon } from 'vux'

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
    Checker,
    Icon
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('我的应聘')
    this.getData()
  },
  methods: {
    onCancel () {
      if (this.keyword !== '') {
        this.keyword = ''
        this.getData()
      }
    },
    onSubmit () {
      this.getData()
    },
    handler (bz) {
      this.quality = bz
      this.getData()
    },
    onClickDetail (id) {
      this.$router.push({path: '/components/zpzx/Gwxq', query: {job_id: id, statue: 1}})
    },
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getApply',
        params: {'id': vue.GLOBAL.student.id, 'keyword': vue.keyword, 'quality': vue.quality},
        success: function (data) {
          vue.lists = data.list
        }
      })
    }
  },
  data () {
    return {
      lists: [],
      keyword: '',
      quality: '固定岗',
      autoFixed: false
    }
  }
}

</script>
<style>


</style>

