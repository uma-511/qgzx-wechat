<template>
	<div class="contentDiv">
	      <tab :line-width="2" custom-bar-width="100px" >
      <tab-item selected @on-item-click="showDiv(1)">岗位介绍</tab-item>
      <tab-item @on-item-click="showDiv(2)">公司简介</tab-item>
    </tab>
    <div v-if="show==1" style="padding-top:10px;">
	 <card>
	 <div slot="content" class="card-padding" >
	 	<div class="title">{{data.job_name}}&nbsp;<img src="static/hot1.png" width="20" height="20" v-if="data.sfrm==1"/></div>
	 	
	 	<div ><badge v-bind:text="data.quality" style="background-color:#FF7951;"></badge>
	 	<badge text="工资面议" style="background-color:#09BB07;"></badge>
	 	</div>	 	
	 	<div style="font-size:15px;margin-top:15px">
	 	<p >性别要求：{{data.sex_list}}</p>
	 	<p >岗位要求：{{data.Skills}}</p>
	 	<p >发布单位：{{data.apartment}}</p>
	 		<p >发布时间：{{data.release_time}}</p>
	 		<p >工作地址：{{data.address}}</p>
	 		<p>公司名称：{{data.unit_name}}</p>
	 	</div>
	 </div>	 	
	 </card>
	
	  <card>
	 <div slot="content" class="card-padding" >
	 <div >岗位描述</div> 	
	 	<div style="margin-left:20px;font-size:14px;word-wrap:break-word; overflow:hidden;" v-html="data.remarks"></div> 	
	 </div>	 	
	 </card>
	   	  <div style="width:100%;text-align:center;">
<x-button v-if="statue==0" style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="zwsq">申请职位</x-button>
  	  </div>
	</div>
	<div v-if="show==2" style="padding-top:10px;">
		  <card>
	 <div slot="content" class="card-padding" >
	 <div class="title">{{data.unit_name}}</div> 	
	 	 		<p style="padding-top:5px;padding-bottom:5px;font-size:12px;">公司地址：{{data.address}}</p>
	 	 		<div >简介：</div> 	
	 	<div style="margin-left:20px;font-size:14px;word-wrap:break-word; overflow:hidden;" v-html="data.introduce"></div> 	
	 </div>	 	
	 </card>
	</div>
  	</div>
</template>

<script>
import { Group, Cell, Divider, Badge, Card, ButtonTab, ButtonTabItem, XButton, Tab, TabItem } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Divider,
    Badge,
    Card,
    ButtonTab,
    ButtonTabItem,
    XButton,
    Tab,
    TabItem
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('招聘详情')
    this.job_id = this.$route.query.job_id
    this.statue = this.$route.query.statue
    this.getData()
  },
  methods: {
    zwsq () {
      let vue = this
      vue.post({
        url: '/public/api/person/applyJob',
        params: {id: vue.GLOBAL.student.id, job_id: vue.job_id},
        success: function (data) {
          vue.$vux.toast.show({
            text: '申请成功'
          })
          vue.$router.push({path: '/components/grzx/Wdyp'})
        }
      })
    },
    showDiv (bz) {
      this.show = bz
    },
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getJobDetails',
        params: {'job_id': vue.job_id},
        success: function (data) {
          vue.data = data.data
        }
      })
    }
  },
  data () {
    return {
      statue: 0,
      job_id: '',
      data: {},
      show: 1
    }
  }
}
</script>
<style>
	.card-padding{
		padding:20px;
		padding-left:15px;
	}
	.title{
		font-weight:bold;
		font-size:17px;
		font-family:-apple-system-font, 'Helvetica Neue', sans-serif
	}
</style>

