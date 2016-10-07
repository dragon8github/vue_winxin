/**
 * index-nav 底部导航栏
 */

// 获取底部菜单栏的列表
export const get_index_nav = ({ dispatch }) => {
    let index_nav = require('../mock/index-nav')
    dispatch('SET_MENU', index_nav)
}

// 设置底部菜单栏的active项
export const set_menu_active = ({ dispatch }, _index) => {
    dispatch('SET_MENU_ACTIVE', _index)
}

// 设置未读短信数
export const set_chat_count = ({ dispatch }, count) => {
    dispatch('SET_CHAT_COUNT', count)
}

/**
 * chat 微信好友界面
 */

// 设置短信为已读或者未读
export const set_news_state = ({ dispatch }, index, val, fn) => {
    dispatch('SET_NEWS_STATE', index, val)
    !!fn && fn()
}

// 删除短信
export const delete_news = ({ dispatch }, index, fn) => {
    dispatch('DELETE_NEWS', index)
    !!fn && fn()
}

// 获取聊天列表的静态json数据
export const get_menu_wechat_list = ({ dispatch }, fn) => {
    let list = require('../mock/chat')
    dispatch('SET_MENU_WECHAT_LIST', list)
    !!fn && fn()
}

// 设置当前聊天好友索引
export const set_chat = ({ dispatch }, model) => {
    dispatch('CHAT', model)
}

/**
 * conatct  
 */ 

// 获取好友详情资料
export const get_person_info = ({ dispatch }, id, fn) => {
    let info = require('../mock/person-info-' + id)
    dispatch('PERSON_INFO', info)
    !!fn && fn()
}

// 获取好友列表
export const get_friends_list = ({ dispatch }, id) => {
    let friends = require('../mock/contact')
    dispatch('CONTACT_FRIENDS', friends)
}

// 查找好友
export const set_iframe_url = ({ dispatch }, urlObj, fn) => {
    dispatch('SET_IFRAME_URL', urlObj)
    !!fn && fn()
}