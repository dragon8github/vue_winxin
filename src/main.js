import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import VueTouch from 'vue-touch'
import VueAnimatedList from 'vue-animated-list'
import zepto from 'webpack-zepto'
import fastclick from 'fastclick'
import store from 'store'
import routerMap from './route-config.js'
import filters from './filters'



Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueTouch) // 可以支持v-touch:swipeleft 和 v-touch:tap 等事件
Vue.use(VueAnimatedList)


Vue.config.debug = true;
Vue.config.devtools = true;


const router = new VueRouter({
    hashbang:true,
    saveScrollPosition: true
})

// 配置路由规则，传入路由对象。看来大部分人都是这样使用路由的
routerMap(router)

// 主要是把 vue-router 的狀態放進 vuex 的 state 中,這樣就可以透過改變 state 來進行路由的一些操作
// 以下3个可以从vuex取得并使用
// store.state.route.path   // current path (string)
// store.state.route.params // current params (object)
// store.state.route.query  // current query (object)
sync(store, router)

// 过滤 Vue 暂时不知道有什么用
filters(Vue)

// 这个插件特别常用，解决手机端 click点击延迟 ，但我不明白为什么有一些页面还使用了touchEnd事件呢？
fastclick.attach(document.body)

// 实例化一个 vue 对象作为路由的参数
const App = Vue.extend(require('./app.vue'))

// 开启路由
router.start(App, 'body')

// 定义全局变量
window.router = router
window.Vue = Vue
window.$ = zepto