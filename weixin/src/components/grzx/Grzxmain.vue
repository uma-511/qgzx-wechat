<template>
  <div class="contentDiv">
  <div style="background-color:#FFFFFF;border-bottom:1px solid #EEEEEE">
  <box gap="10px 10px" >
  
   <flexbox v-if="!disabled">
        <flexbox-item :span="1.8">
          <div ><img class="circle" v-bind:src="apiPrefix+'/'+data.image" width="35" height="35" style="margin-top:5px;"/></div>
        </flexbox-item>
         <flexbox-item :span="3" >
          <div style="text-align:left;width:100%;">{{data.stu_name}}
           <div style="font-size:12px;margin-bottom:2px;">学号：{{data.student_id}}</div></div>
        </flexbox-item>
         <flexbox-item>
        </flexbox-item>
        <flexbox-item>
          <div class="textcell" style="margin-bottom:25px;margin-left:50px;width:50px;font-size:12px;border-radius: 10px;">{{data.work_status}}</div>
        </flexbox-item>
      </flexbox>
         <flexbox v-if="disabled">
        <flexbox-item :span="1.8">
          <div class="circle"><img src="static/usermain-gray.png" width="30" height="30" style="margin-top:8px;color:white;"/></div>
        </flexbox-item>
         <flexbox-item :span="3" >
          <div style="text-align:left;width:100%;color:#ccc;" v-if="data.status=='正常' && data.check_status!='提交' ">{{data.check_status}}
           </div>
           <div style="text-align:left;width:100%;color:#ccc;" v-if="data.status=='正常' && data.check_status=='提交' ">审核中...
           </div>
            <div style="text-align:left;width:100%;color:#ccc;" v-if="data.status!='正常'">{{data.status}}
           </div>
        </flexbox-item>
         <flexbox-item>
        </flexbox-item>
        <flexbox-item>
          <div  style="color:#09BB07;margin-left:30px;width:60px;font-size:12px;border-radius: 10px;font-style:italic;" @click="toZc" v-if="data.status=='正常' && data.check_status=='未注册'">点击注册</div>
          <div  style="color:#09BB07;margin-left:30px;width:60px;font-size:12px;border-radius: 10px;font-style:italic;" @click="toZc" v-if="data.status=='正常' && data.check_status=='审核不通过'">重新注册</div>
        </flexbox-item>
      </flexbox>
     </box>
     </div>
     <group>
      <cell title="我的资料" link="/components/grzx/Wdzl" :disabled="disabled">
      <span slot="title" style="font-size:14px;">我的资料</span>
      <div slot="icon" ><img src="static/card.png" width="20" height="20" style="padding-top:5px;"/>&nbsp;&nbsp;</div>
      </cell>
      <cell title="我的应聘" link="/components/grzx/Wdyp" :disabled="disabled">
      <span slot="title" style="font-size:14px;">我的应聘</span>
      <div slot="icon" ><img src="static/work.png" width="20" height="20" style="padding-top:5px;"/>&nbsp;&nbsp;</div>
      </cell>
      </group>
      <group>
      <cell title="我的社区" link="/components/grzx/Wdsq" :disabled="disabled">
      <span slot="title" style="font-size:14px;">我的社区</span>
      <div slot="icon" ><img src="static/talk.png" width="20" height="20" style="padding-top:5px;"/>&nbsp;&nbsp;</div>
      </cell>
      <cell title="我的建议" link="/components/grzx/Wdjy" :disabled="disabled">
      <span slot="title" style="font-size:14px;">我的建议</span>
      <div slot="icon" ><img src="static/mytalk.png" width="20" height="20" style="padding-top:5px;"/>&nbsp;&nbsp;</div>
      </cell>
      </group>
       <group>
      <cell title="我的消息" link="/components/grzx/Wdlsxx" :disabled="disabled">
      <span slot="title" style="font-size:14px;">我的消息</span>
      <div slot="icon" ><img src="static/notice.png" width="20" height="20" style="padding-top:5px;"/>&nbsp;&nbsp;</div>
      </cell>
     
    </group>
  </div>
</template>

<script>
import { XButton, Flexbox, FlexboxItem, Box, Datetime, Group, XInput, Cell } from 'vux'

export default {
  components: {
    XButton,
    Flexbox,
    FlexboxItem,
    Box,
    Datetime,
    Group,
    XInput,
    Cell
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('个人中心')
    if (this.GLOBAL.student.id === '') {
      this.init()
    } else {
      this.getData()
    }
  },
  methods: {
    init () {
      let vue = this
      vue.post({
        url: '/public/api/person/getStuMessage',
        params: {'code': vue.getURLParam('code')},
        success: function (data) {
          vue.GLOBAL.student = data.data
          vue.data = data.data
          vue.getDis()
        }
      })
    },
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getPerStatus',
        params: {'id': vue.GLOBAL.student.id},
        success: function (data) {
          vue.GLOBAL.student = data.data
          vue.data = data.data
          vue.getDis()
        }
      })
    },
    getDis () {
      let vue = this
      if (vue.GLOBAL.student.status === '正常') {
        if (vue.GLOBAL.student.check_status === '审核通过') {
          vue.disabled = false
        }
      } else {
        vue.disabled = true
      }
    },
    toZc () {
      this.$router.push({path: '/components/grzx/Xszc'})
    }
  },
  data () {
    return {
      disabled: true,
      data: {}
    }
  }
}

</script>

