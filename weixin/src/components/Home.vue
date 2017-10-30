<template>
  <div style="margin-top:50px;">
    <group gutter="0">
      
      <cell is-link title="招聘中心/招聘搜索" link="/components/zpzx/Gwss" >
      </cell>
      <cell is-link title="个人中心/注册" link="/components/grzx/Xszc" >
      </cell>
      <cell is-link title="个人中心/我的应聘" link="/components/grzx/Wdyp" >
      </cell>
      <cell is-link title="工作中心/公司签到" link="/components/gzzx/Gsqd" >
      </cell>
       <cell is-link title="工作中心/考勤查询" link="/components/gzzx/Gscx" >
      </cell>
       <cell is-link title="工作中心/业务申请" link="/components/gzzx/Ywsq" >
      </cell>
      <cell is-link title="工作中心/请假申请" link="/components/gzzx/Qjsq" >
      </cell>
       <cell is-link title="工作中心/离职申请" link="/components/gzzx/Lzsq" >
      </cell>
      <cell is-link title="工作中心/加班申请" link="/components/gzzx/Jbsq" >
      </cell>
       <cell is-link title="工作中心/工资单查询" link="/components/gzzx/Gzdcx" >
      </cell>
      <cell is-link title="工作中心/工资单详情" link="/components/gzzx/Gzdxq" >
      </cell>
       <cell is-link title="个人中心/个人中心" link="/components/grzx/Grzxmain" >
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
    }
  },
  data () {
    return {
      results: [],
      value: 'test'
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

