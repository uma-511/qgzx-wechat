<template>
  <div id="app">
  	<x-header style="background-color:#098207;">{{title}}</x-header>    
    <router-view></router-view>
	<tabbar>
      <tabbar-item  @on-item-click="menuTo(1)">
        <img slot="icon" src="static/menumain-gray.png" v-if="nowIndex!=1"/><img slot="icon" src="static/menumain-green.png" v-if="nowIndex==1"/>
        <span slot="label" >工作中心</span>
      </tabbar-item>
      <tabbar-item  @on-item-click="menuTo(2)">
        <img slot="icon" src="static/searchmain-green1.png" v-if="nowIndex==2"><img slot="icon" src="static/searchmain-gray1.png" v-if="nowIndex!=2"/>
        <span slot="label">招聘中心</span>
      </tabbar-item>
      <tabbar-item  @on-item-click="menuTo(3)" selected>
        <img slot="icon" src="static/usermain-gray1.png" v-if="nowIndex!=3"><img slot="icon" src="static/usermain-green1.png" v-if="nowIndex==3"/>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, XHeader, Cell, Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem,
    XHeader,
    Cell,
    Loading
  },
  created: function () {
    this.init()
  },
  methods: {
    menuTo (index) {
      this.nowIndex = index
      let disabled = false
      if (this.GLOBAL.student.status === '正常') {
        if (this.GLOBAL.student.check_status === '未注册') {
          disabled = true
        }
      } else {
        disabled = true
      }
      if (index === 1) {
        if (disabled) {
          this.$vux.alert.show({
            title: '提示',
            content: '请先注册'
          })
          return
        }
        this.$router.push({ path: '/components/gzzx/Gzzxmain' })
      } else if (index === 2) {
        if (disabled) {
          this.$vux.alert.show({
            title: '提示',
            content: '请先注册'
          })
          return
        }
        this.$router.push({ path: '/components/zpzx/Gwss' })
      } else if (index === 3) {
        this.$router.push({ path: '/components/grzx/Grzxmain' })
      }
    },
    init () {
      let vue = this
      vue.post({
        url: '/public/api/person/getStuMessage',
        params: {'code': vue.getURLParam('code')},
        success: function (data) {
          vue.GLOBAL.student = data.data
        }
      })
    }
  },
  data () {
    return {
      nowIndex: 3
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.loading,
      title: state => state.vux.title
    })
  }
}

</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/close';
html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
body {
  background-color: #fbf9fe;
}
.contentDiv{
  padding-bottom:100px;
}
.textcell {
  text-align: center;
  color: #20b907;
  background-color: #EEEEEE;
  border-radius: 4px;
  background-clip: padding-box;
  
}
.circle {
  width: 50px;
  height: 50px;
  border-radius: 425px;
  background-color: #ccc;
  text-align: center;
}
.hiddenDiv{
overflow:hidden;
height:50px;
}
</style>
