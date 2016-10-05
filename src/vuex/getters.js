/**
  * how: 2016.9.30 李钊鸿 v1
  * problem：对 ({ base }) 这种参数格式表示不理解。为什么和文档 (state, getters) 不一致？
  *          文档地址：http://vuex.vuejs.org/en/getters.html
  * answer: 原来{ base } == state.base，那就不难理解了。
            为了可读性，建议还是使用 state 和 state.base 这种书写格式
 **/

//base
export const index_nav =  ( state ) => state.base.index_nav
export const menu_active = ({ base }) => base.menu_active
export const backPath = ({ base }) => base.backPath


//chat
export const wechat_list = ({ chat }) => chat.wechat_list
export const chat_base = ({ chat }) => chat.chat_base
export const dialogue_type = ({ chat }) => chat.dialogue_type
export const dialogue = ({ chat }) => chat.dialogue
export const dialogue_bar = ({ chat }) => chat.dialogue_bar
export const chat_member = ({ chat }) => chat.chat_member
export const chat_config = ({ chat }) => chat.chat_config


//contact
export const person_info = ({ contacts }) => contacts.person_info
export const contact_friends = ({ contacts }) => contacts.contact_friends

//find
export const iframe_url = ({ find }) => find.iframe_url
export const iframe_title = ({ find }) => find.iframe_title
