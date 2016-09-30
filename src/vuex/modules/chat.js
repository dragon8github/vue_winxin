
let state = {
    wechat_list: [],
    //base
    chat_base: {
        "id": 1,
        "name": "聊天中",
        "wxid": "",
        "qq": "",
        "email": "",
        "type": "friends",
        "iconSrc": "",
        "qrCode": "",
        "signature": ""
    },
    //dialogue
    dialogue_type: 'friends',
    //聊天内容
    dialogue: [],
    //聊天bar
    dialogue_bar: {
        menu: [{
            title: '',
            link: '',
            subMenu: [{
                title: '',
                link: ''
            }, {
                title: '',
                link: ''
            }]
        }]
    },
    //聊天人员
    chat_member: [{"id": 1,iconSrc:"",name:""}],
    //聊天配置
    chat_config: {
        "chatBackground": null, //背景
        "groupNotice": "", //群公告
        "isStick": false, //置顶
        "newsMute": true, //消息免打扰
        "contactsSave": false,
        "showGroupNickname": true, //显示群聊天昵称
    }
}


const mutations = {
    /* 往wechat_list 里面塞入信息 */
    ["SET_MENU_WECHAT_LIST"](state, list) {
        state.wechat_list = list
    },
    /* 设置已读和未读的数量 */
    ["SET_NEWS_STATE"](state,index,val){
        state.wechat_list[index].chatBaseModel.newsUnreadCount = val
    },
    /* 删除信息 */ 
    ["DELETE_NEWS"](state,index){
        state.wechat_list.splice(index,1);
    },
    ["CHAT"](state, {
        base,
        // chatBaseModel,
        chatDialogueModel,
        chatDialogueBarModel,
        chatMemberModel,
        chatConfigModel
    }) {
        state.dialogue_type = base.type;
        state.chat_base = base;
        state.dialogue = chatDialogueModel
        state.dialogue_bar = chatDialogueBarModel;
        state.chat_member = chatMemberModel;
        state.chat_config = chatConfigModel;
    }
}

export default {
    state,
    mutations
}
