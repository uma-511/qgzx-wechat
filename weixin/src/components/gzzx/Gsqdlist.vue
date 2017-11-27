<template>
  <div class="contentDiv">
    <group>     
      <cell  :title="'今日：'+today" >
      </cell>
    </group>
    <group  style="margin-top:30px;" v-for="item in lists">
      
      <cell  title="到岗时间："   >
			{{item.come_time}}
      </cell>
      <cell  title="离岗时间：" >
{{item.leave_time}}
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
    this.updateTitle('今日签到记录')
    this.today = this.$route.query.today
    this.getData()
  },
  methods: {
    getData () {
      let vue = this
      vue.post({
        url: '/public/api/person/getSignRecord',
        params: {'id': vue.GLOBAL.student.id},
        success: function (data) {
          vue.lists = data.list
        }
      })
    }
  },
  data () {
    return {
      lists: [{}],
      today: ''
    }
  }
}
</script>
<style>


</style>

