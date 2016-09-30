//套路1：引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'


//套路2：让vue使用vuex
Vue.use(Vuex)



//套路3：定义状态（state,全局变量) + 套路4：定义突变（mutations,主要负责更新state）
import base from './modules/base' //基本通用
import chat from './modules/chat' //聊天
import contacts from './modules/contacts' //联系人
import find from './modules/find' //发现



//套路5：输出状态和突变
export default new Vuex.Store({
    modules: {
        base,
        chat,
        contacts,
        find
    },
    strict: true
})
