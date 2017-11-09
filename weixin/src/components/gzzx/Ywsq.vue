<template>
  <div class="contentDiv">

  <div style="background-color:#FFFFFF;border-bottom:1px solid #EEEEEE">
  <box gap="10px 10px" >
   <flexbox >
        <flexbox-item :span="1.8">
          <div class="circle"><img src="static/woman.png" width="35" height="35" style="margin-top:5px;"/></div>
        </flexbox-item>
         <flexbox-item :span="3" >
          <div style="text-align:left;width:100%;">{{currInfo.stu_name}}</div>
        </flexbox-item>
        <flexbox-item>
          <div class="textcell">日期：{{currInfo.current_time}}</div>
        </flexbox-item>
      </flexbox>
     <div style="margin-top:10px;"> <div style="font-size:12px;margin-bottom:2px;">任职公司：{{currInfo.currComp}}</div></div>
     </box>
     </div>
    <div style="background-color:#FFFFFF;margin-top:10px;margin-bottom:10px;border-top:1px solid #EEEEEE;border-bottom:1px solid #EEEEEE">
    <box gap="10px 10px">
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="4" align="center"><div class="boxdiv" @click="bq"><img src="static/bq.png" width="30" height="30"/><div >补签</div></div></flexbox-item>
		<flexbox-item :span="4" align="center"><div class="boxdiv" @click="wq"><img src="static/wq.png" width="30" height="30"/><div >外勤</div></div></flexbox-item>
		<flexbox-item :span="4" align="center"><div class="boxdiv" @click="qj" style="border-right:1px solid #9ED99D;"><img src="static/qj.png" width="30" height="30"/><div >请假</div></div></flexbox-item>
		<!--<flexbox-item :span="3" align="center"><div class="boxdiv"  @click="jb" style="border-right:1px solid #9ED99D;"><img src="static/jb.png" width="30" height="30"/><div>加班</div></div></flexbox-item>
    -->
    </flexbox>
      </box>
       </div>
       <group gutter="0">

      <cell is-link title="申请记录" link="/components/gzzx/Ywsqjl" >
      <span slot='icon'><img src="static/menu.png" width="25" height="25"/>&nbsp;</span>
      </cell>
      </group>
      <!--
        <box gap="10px 10px">
      <flexbox style="margin-top:50px;" >
        <flexbox-item>
          <x-button   plain type="primary"  >签到</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button  plain type="primary" disabled >申请</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button  plain type="primary" @click.native="">查询</x-button>
        </flexbox-item>
      </flexbox>
     </box>
     -->
      <div v-transfer-dom>
      <x-dialog :show.sync="showBq" class="dialogs">
        <div class="img-box">
             <group title="请选择日期" style="margin-top:10px;">
      			<datetime v-model="today"  title="补签日期"></datetime>
    		</group>
    		<div>
    		<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="">确定</x-button>
    		</div>

        </div>
        <div @click="showBq=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>

     <div v-transfer-dom>
      <x-dialog :show.sync="showWq" class="dialogs">
        <div class="img-box">
             <group title="请选择日期" style="margin-top:10px;">
      			<datetime v-model="today"  title="外勤日期"></datetime>
    		</group>
    		<div>
    		<x-button  style="width:90%;margin-top:20px;margin-bottom:20px;"  mini type="primary" @click.native="">确定</x-button>
    		</div>

        </div>
        <div @click="showWq=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>

  </div>
</template>

<script>
import { XButton, Flexbox, FlexboxItem, Box, Divider, Group, Cell, XDialog, TransferDomDirective as TransferDom, Datetime } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    XButton,
    Flexbox,
    FlexboxItem,
    Box,
    Divider,
    Group,
    Cell,
    XDialog,
    Datetime
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('办事申请')
    this.getData()
  },
  methods: {
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getCurrInfo',
        params: {'student_id': vue.GLOBAL.student.id},
        success: function (data) {
          vue.currInfo = data.data
        }
      })
    },
    bq () {
      this.showBq = true
    },
    wq () {
      this.showWq = true
    },
    qj () {
      this.$router.push({ path: '/components/gzzx/Qjsq' })
    },
    jb () {
      this.$router.push({ path: '/components/gzzx/Jbsq' })
    }
  },
  data () {
    return {
      results: [],
      showBq: false,
      showWq: false,
      lists: [],
      today: '2017-10-19',
      data: { qdstatue: 0, sbqdsj: '09:00', xbqdsj: '18:00', sbsj: '09:00', xbsj: '18:00', sbqddz: '', xbqddz: '' },
      currInfo: { stu_name: '', currComp: '', current_time: '' }
    }
  }
}

</script>
<style>
.boxdiv {
  height:65px;
  border:1px solid #9ED99D;
  border-right:0px solid #9ED99D;
  text-align:center;
  font-size:14px;
  padding-top:15px;
}
.boxdiv {
   cursor: pointer;
}
.dialogs {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
