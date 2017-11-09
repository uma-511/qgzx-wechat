// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import { DatetimePlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin } from 'vux'
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)
Vue.use(AjaxPlugin)

Vue.use(Vuex)
Vue.use(VueRouter)

/**
 * 定义常量
 */
const domainName = 'qgzx.tunnel.qydev.com'
const serverName = 'qgzx.tunnel.qydev.com'
const apiPrefix = 'http://' + serverName + '/QingongzhuxueSystem-PHP'
const loginTimeOutErrorCode = 'login_timeout_error'
/**
 * 设置vuex
 */
const store = new Vuex.Store({})
store.registerModule('vux', {
  state: {
    loading: false,
    showBack: true,
    title: '招聘中心'
  },
  mutations: {
    updateLoading (state, loading) {
      state.loading = loading
    },
    updateShowBack (state, showBack) {
      state.showBack = showBack
    },
    updateTitle (state, title) {
      state.title = title
    }
  }
})

const routes = [{
  path: '/',
  component: function (resolve) {
    require(['./components/grzx/Grzxmain.vue'], resolve)
  }
},
{
  path: '/components/zpzx/Gwss',
  component: function (resolve) {
    require(['./components/zpzx/Gwss.vue'], resolve)
  }
},
{
  path: '/components/zpzx/Gwxq',
  component: function (resolve) {
    require(['./components/zpzx/Gwxq.vue'], resolve)
  }
},
{
  path: '/components/grzx/Xszc',
  component: function (resolve) {
    require(['./components/grzx/Xszc.vue'], resolve)
  }
},
{
  path: '/components/grzx/Wdyp',
  component: function (resolve) {
    require(['./components/grzx/Wdyp.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Gsqdlist',
  component: function (resolve) {
    require(['./components/gzzx/Gsqdlist.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Gsqd',
  component: function (resolve) {
    require(['./components/gzzx/Gsqd.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Gscx',
  component: function (resolve) {
    require(['./components/gzzx/Gscx.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Ywsq',
  component: function (resolve) {
    require(['./components/gzzx/Ywsq.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Qjsq',
  component: function (resolve) {
    require(['./components/gzzx/Qjsq.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Lzsq',
  component: function (resolve) {
    require(['./components/gzzx/Lzsq.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Jbsq',
  component: function (resolve) {
    require(['./components/gzzx/Jbsq.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Gzdcx',
  component: function (resolve) {
    require(['./components/gzzx/Gzdcx.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Gzdxq',
  component: function (resolve) {
    require(['./components/gzzx/Gzdxq.vue'], resolve)
  }
},
{
  path: '/components/grzx/Grzxmain',
  component: function (resolve) {
    require(['./components/grzx/Grzxmain.vue'], resolve)
  }
},
{
  path: '/components/grzx/Wdsq',
  component: function (resolve) {
    require(['./components/grzx/Wdsq.vue'], resolve)
  }
},
{
  path: '/components/grzx/Wdsqxq',
  component: function (resolve) {
    require(['./components/grzx/Wdsqxq.vue'], resolve)
  }
},
{
  path: '/components/grzx/Wdjy',
  component: function (resolve) {
    require(['./components/grzx/Wdjy.vue'], resolve)
  }
},
{
  path: '/components/grzx/Wyft',
  component: function (resolve) {
    require(['./components/grzx/Wyft.vue'], resolve)
  }
},
{
  path: '/components/grzx/Wdlsxx',
  component: function (resolve) {
    require(['./components/grzx/Wdlsxx.vue'], resolve)
  }
},
{
  path: '/components/grzx/Wyjy',
  component: function (resolve) {
    require(['./components/grzx/Wyjy.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Ywsqjl',
  component: function (resolve) {
    require(['./components/gzzx/Ywsqjl.vue'], resolve)
  }
},
{
  path: '/components/gzzx/Gzzxmain',
  component: function (resolve) {
    require(['./components/gzzx/Gzzxmain.vue'], resolve)
  }
},
{
  path: '/components/grzx/Wdzl',
  component: function (resolve) {
    require(['./components/grzx/Wdzl.vue'], resolve)
  }
},
{
  path: '/components/grzx/Wdtz',
  component: function (resolve) {
    require(['./components/grzx/Wdtz.vue'], resolve)
  }
}
]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoading', true)
  store.commit('updateShowBack', true)
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoading', false)
})
FastClick.attach(document.body)

Vue.config.productionTip = true

/**
 * 定义全局公用常量
 */
Vue.prototype.domainName = domainName
Vue.prototype.serverName = serverName
Vue.prototype.apiPrefix = apiPrefix
/**
 * 定义全局公用方法
 */
Vue.prototype.http = function (opts) {
  let vue = this
  vue.$vux.loading.show({
    text: 'Loading'
  })
  console.log(apiPrefix + opts.url)
  console.log(JSON.stringify(opts.params))
  console.log(JSON.stringify(opts.data))
//  测试代码
  vue.$http({
    method: opts.method,
    url: apiPrefix + opts.url,
    headers: opts.headers || {},
    params: opts.params || {},
    data: opts.data || {},
    emulateJSON: true,
    _timeout: 3000,
    onTimeout: (request) => {
      vue.$vux.loading.hide()
      vue.$vux.alert.show({
        title: '提示',
        content: '系统繁忙，请稍后再试'
      })
    }
  }).then(function (response) {
    console.log(response)
    if (response.data.code === 200) {
      opts.success(response.data.data)
    } else {
      vue.$vux.alert.show({
        title: '提示',
        content: response.data.msg
      })
    }
    vue.$vux.loading.hide()
  }).catch(function (error) {
    vue.$vux.loading.hide()
    if (!opts.error) {
      let response = error.response
      // let errorMessage = '请求失败'

      if (response && response.data) {
        if (response.data.code === loginTimeOutErrorCode) {
          window.location.href = '/'
        }
        // errorMessage = response.data.message
      }

      // vue.$vux.alert.show({
        // title: '提示',
        // content: errorMessage
      // })
    } else {
      opts.error(error.response.data.data)
    }
  })
}

Vue.prototype.get = function (opts) {
  opts.method = 'get'
  this.http(opts)
}

Vue.prototype.post = function (opts) {
  opts.method = 'post'
  this.http(opts)
}
Vue.prototype.valid = function (opts) {
  let vue = this
  let valid = true

  if (opts.ref && !opts.ref.valid) {
    valid = false
  }

  if (opts.ignoreRefs) {
    let newRefs = []
    for (let i in opts.refs) {
      let ref = opts.refs[i]
      for (let j in opts.ignoreRefs) {
        let ignoreRef = opts.ignoreRefs[j]
        if (ref !== ignoreRef) {
          newRefs.push(ref)
        }
      }
    }
    opts.refs = newRefs
  }

  for (let i in opts.refs) {
    if (!opts.refs[i].valid) {
      valid = false
      break
    }
  }

  if (valid) {
    opts.success()
  } else if (opts.error) {
    opts.error()
  } else {
    vue.$vux.toast.show({
      text: '请检查输入'
    })
  }
}

Vue.prototype.closeShowBack = function () {
  this.$store.commit('updateShowBack', false)
}

Vue.prototype.updateTitle = function (value) {
  this.$store.commit('updateTitle', value)
}
Vue.prototype.getURLParam = function (strParamName) {
  var strReturn = ''
  var strHref = window.location.href
  var bFound = false
  var cmpstring = strParamName
  if (strHref.indexOf('?') > -1) {
    var strQueryString = strHref.split('?')[1]
    var aQueryString = strQueryString.split('&')
    for (var iParam of aQueryString) {
      if (iParam.split('=')[0] === cmpstring) {
        var aParam = iParam.split('=')
        strReturn = aParam[1]
        bFound = true
        break
      }
    }
  }
  if (bFound === false) {
    return null
  }
  return strReturn
}
var global_ = {student: {'id': 9, 'student_id': '学号', 'openid': 'o-Out1Iy67LhFow6kRlIADP-uqDM', 'name': '姓名', 'sex': 'male', 'college_id': '学院号'}}
Vue.prototype.GLOBAL = global_
/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
