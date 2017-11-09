<template>
  <div >
    <group gutter="0">
     <cell  link="/components/gzzx/Gsqd" is-link :disabled="disabled">
      <span slot="title" style="font-size:14px;">工作签到</span>
      <div slot="icon" ><img src="static/check.png" width="20" height="20" style="padding-top:5px;"/>&nbsp;&nbsp;</div>
      </cell>
       <cell  link="/components/gzzx/Gscx" :disabled="disabled">
      <span slot="title" style="font-size:14px;">考勤情况</span>
      <div slot="icon" ><img src="static/clock.png" width="20" height="20" style="padding-top:5px;"/>&nbsp;&nbsp;</div>
      </cell>
       <cell  link="/components/gzzx/Gzdcx" :disabled="disabled">
      <span slot="title" style="font-size:14px;">工资单</span>
      <div slot="icon" ><img src="static/result.png" width="20" height="20" style="padding-top:5px;"/>&nbsp;&nbsp;</div>
      </cell>
             <cell  link="/components/gzzx/Ywsq" :disabled="disabled">
      <span slot="title" style="font-size:14px;">考勤补签</span>
      <div slot="icon" ><img src="static/work.png" width="20" height="20" style="padding-top:5px;"/>&nbsp;&nbsp;</div>
      </cell>
       <cell  link="/components/gzzx/Lzsq" :disabled="disabled">
      <span slot="title" style="font-size:14px;">离职申请</span>
      <div slot="icon" ><img src="static/edit.png" width="20" height="20" style="padding-top:5px;"/>&nbsp;&nbsp;</div>
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, ButtonTab, ButtonTabItem, Search, Tab, TabItem, Divider, Badge } from 'vux'

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
    Badge
  },
  created: function () {
    // this.closeShowBack()
    this.updateTitle('工作中心')
    if (this.GLOBAL.student.status === '正常') {
      if (this.GLOBAL.student.check_status === '审核通过') {
        this.disabled = false
      } else {
        this.disabled = true
      }
    } else {
      this.disabled = true
    }
  },
  methods: {
  },
  data () {
    return {
      results: [],
      value: 'test',
      disabled: false
    }
  }
}

</script>

