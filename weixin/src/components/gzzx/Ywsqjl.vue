<template>
  <div class="contentDiv">
     <tab :line-width="2" custom-bar-width="100px" >
      <tab-item v-bind:selected="initId==1" @on-item-click="bqSelect(1)">补签</tab-item>
     <!-- <tab-item @on-item-click="bqSelect(2)">外勤</tab-item>-->
       <tab-item v-bind:selected="initId==3" @on-item-click="bqSelect(3)">请假</tab-item>
        <!--<tab-item @on-item-click="bqSelect(4)">加班</tab-item>-->
    </tab>
    <group gutter="0">
      
      <cell  v-for="item in bqlists"  style="border-top:0px;" v-show="statue.bqShow">
      <span slot="title" style="font-size:14px;color:#FF7951"><img src='static/check2.png' width="16" height="16"/>&nbsp;&nbsp;{{item.createtime}}&nbsp;&nbsp;<badge v-bind:text="item.buqian" style="background-color:#09BB07;margin-bottom:5px;" ></badge></span> 
        <div slot="inline-desc"><div style="font-size:10px;padding-bottom:5px;"></div>
       <div style="font-size:12px;color:black;">
       <div>补签到岗：{{item.duty_time}}</div>
       <div>补签离岗：{{item.departure_time}}</div>
       <div>补签原因：{{item.reason}}</div>
       <div>公司名称：{{item.unit_name}}</div></div>
      	</div>
      </cell>
      <cell  title="2017-09-09"  v-for="item in wqlists"  style="border-top:0px;" v-show="statue.wqShow">
      <span slot="title" style="font-size:14px;color:#FF7951"><img src='static/car.png' width="18" height="18"/>&nbsp;&nbsp;2017-09-09</span> 
       <div slot="inline-desc"><div style="font-size:10px;padding-bottom:5px;"></div><div style="font-size:12px;color:black;">{{item.ggmc}}</div></div>
       <div slot="default" style="padding-right:10px;"><div style="font-size:14px;padding-bottom:5px;color:black;">外勤1次</div><div style="font-size:10px;">{{item.fbsj}}</div></div>
      	
      </cell>
            <cell  title="2017-09-09"  v-for="item in qjlists"  style="border-top:0px;" v-show="statue.qjShow">
      <span slot="title" style="font-size:14px;color:#FF7951"><img src='static/rl.png' width="16" height="16" style="vertical-align:middle;"/>&nbsp;&nbsp;<span style="vertical-align:middle;">{{item.createtime}}</span>&nbsp;&nbsp;<badge v-bind:text="item.status" style="background-color:#09BB07;margin-bottom:5px;" ></badge></span> 
       <div slot="inline-desc"><div style="font-size:10px;padding-bottom:5px;"></div>
       <div style="font-size:12px;color:black;">
       <div>请假类别：{{item.type_list}}</div>
       <div>开始时间：{{item.start_time}}</div>
       <div>结束时间：{{item.end_time}}</div>
       <div>备注：{{item.remark}}</div>
       <div>公司名称：{{item.unit_name}}</div></div>
      	</div>
      </cell>
      
      <cell  title="2017-09-09"  v-for="item in jblists"  style="border-top:0px;" v-show="statue.jbShow">
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
    this.initId = this.$route.query.initId
    this.bqSelect(this.initId)
    this.getData()
  },
  methods: {
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
        url: '/public/api/person/getApplyRecord',
        params: {student_id: vue.GLOBAL.student.id},
        success: function (data) {
          if (data.list.length > 0) {
            vue.bqlists = data.list
          } else {
            vue.bqlists = null
          }
        }
      })
      vue.post({
        url: '/public/api/person/getVacateRecord',
        params: {student_id: vue.GLOBAL.student.id},
        success: function (data) {
          if (data.list.length > 0) {
            vue.qjlists = data.list
          } else {
            vue.qjlists = null
          }
        }
      })
    }
  },
  data () {
    return {
      results: [],
      statue: { bqShow: true, wqShow: false, qjShow: false, jbShow: false },
      lists: [],
      initId: 0,
      bqlists: [{}],
      wqlists: [{}],
      qjlists: [{}],
      jblists: [{}]
    }
  }
}
</script>
<style>


</style>

