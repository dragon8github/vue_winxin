
let state = {
    backPath: '',
    index_nav: [{
        index: 0,
        path: {
            path: '/chat'
        },
        hint: { type: "count", count: 0 }, //count,dot
        iconClass: 'icon-wechat',
        text: '微信'
    }],
    menu_active: { text: "", index: 0 },
}


const mutations = {
    //更新首页导航
    SET_MENU (state, index_nav) {
        state.index_nav = index_nav;
    },

     //底部导航激活
    SET_MENU_ACTIVE (state, _index) {
        state.menu_active = state.index_nav[_index]
    },

    //设置返回按钮跳转路径,router.afterEach设置
    BACK_PATH (state, _path) {
        state.backPath = { path: _path };
    },

    //设置聊天总数
    SET_CHAT_COUNT (state, count) {
        state.index_nav[0].hint.count = count;
    }
}



export default {
    state,
    mutations
}
