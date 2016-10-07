<template>

    <div class="_full_inner _scroll _effect component-chat" :class="{'_effect--30':decline}">

        <!-- 搜索框 -->
        <search-bar></search-bar>

        <!-- 聊天列表 -->
        <ul class="wechat-list">
            <li class="item _line-fine" v-for="item in wechat_list" transition="chat-item">
                
                <!-- 
                     通过 v-touch:tap 事件设置当前聊天对象并且路由跳转到聊天页面,
                     正常而言是以id作为参数的,但作者偷懒设计为索引代替id
                 -->
                <div class="info" 
                    :class="{'current':currentIndex==$index}" 
                    @touchstart="info_touchstart($index)" 
                    v-touch:tap="info_tap($index)"  
                    v-touch:swipeleft="info_swipeleft($index)" 
                    v-touch-options:swipe="{ direction: 'horizontal' }">

                        <!-- 头像 -->
                        <div class="ico-box">
                            <i :class="item.chatConfigModel | f_news 'nclass'" 
                                v-text="item.chatBaseModel | f_news 'ntext'" 
                                v-show="item.chatBaseModel | f_news 'nshow'">
                            </i>
                            <div class="ico">
                                <img :src="item.base.iconSrc" alt="pic">
                            </div>
                        </div>

                        <!-- 详情 -->
                        <div class="desc">

                            <!-- 时间 -->
                            <div class="desc-time" v-text="item.chatBaseModel.endTimeStr | fmtDate 'hh:ss'"></div>

                            <!-- 标题:好友名、微信群名 -->
                            <div class="desc-title" v-text="item.base.name"></div>

                            <!-- 短信内容 -->
                            <div class="desc-message">
                                <div class="desc-mute iconfont icon-mute" :title="item.chatConfigModel.newsMute | json" v-show="item.chatConfigModel.newsMute"></div>
                                <span :title="item.base.type" v-show="item.base.type==='friends'" v-text="item.chatBaseModel.endChatAuth+':'"></span>
                                <span v-text="item.chatBaseModel.endChatTxt"></span>
                            </div>                        
                        </div>
                </div>

                <!-- 左滑菜单 -->
                <div class="handle">
                    <div class="handle-unread" v-touch:tap='increase_newsState($index,1)' v-show="item.chatBaseModel.newsUnreadCount==0">标为未读</div>
                    <div class="handle-unread" v-touch:tap='increase_newsState($index,0)' v-show="item.chatBaseModel.newsUnreadCount>0">标为已读</div>
                    <div class="handle-del" v-touch:tap="delete_item($index)">删除</div>
                </div>

            </li>
        </ul>
    </div>
    <!-- router -->
    <router-view transition="cover" keep-alive></router-view>
</template>

<script>

import searchBar from 'components/search-bar.vue'
import { wechat_list } from 'getters'
import {
    get_menu_wechat_list,
    set_menu_active,
    set_chat,
    set_chat_count,
    set_news_state,
    delete_news
} from 'actions'



export default {
    vuex: {
        getters: {
            wechat_list
        },
        actions: {
            get_menu_wechat_list,
            set_menu_active,
            set_chat,
            set_chat_count,
            set_news_state,
            delete_news
        }
    },
    route: {
        activate ({ from, to, next }) {
            this.set_menu_active(0)
            next()
        }
    },
    data () {
        return {
            decline: false,
            currentIndex: -1, //列表item处在左划状态
            isTouchSwipe: false, //验证是否处于左划状态
        }
    },
    events: {
        'route-pipe' (_decline) {
            this.decline = _decline
            this.$parent.$emit('route-pipe', _decline)
        }
    },
    methods: {
        info_touchstart(_index) {
            this.currentIndex = -1
        },
        // 好友列表点击事件
        info_tap(_index) {
            var index = _index;
            if (index >= 0 && !this.isTouchSwipe) {
                // 设置当前聊天好友的索引
                this.set_chat(this.wechat_list[index])
                // 跳转到聊天界面
                this.$router.go({
                    path: "/chat/dialogue"
                })
            }
            this.isTouchSwipe = false
        },
        // 好友左滑事件
        info_swipeleft(_index) {
            event.stopPropagation()
            if (!this.isTouchSwipe) {
                this.isTouchSwipe = true
                this.currentIndex = _index
            } else {
                this.isTouchSwipe = false
            }
        },
        // 计算未读数量
        computed_unRead_count () {            
            let sum = 0;
            this.wechat_list.forEach(({chatBaseModel, chatConfigModel }, index) => {
                if (!chatConfigModel.newsMute) {
                    let count = chatBaseModel.newsUnreadCount
                    sum += count
                }
            })
            this.set_chat_count(sum)
        },
        //改变已读未读状态并回调计算未读总和
        increase_newsState(index, val) {
            this.isTouchSwipe = false;            
            this.set_news_state(index, val, () => {
                this.currentIndex = -1
                this.computed_unRead_count()
            })
        },
        // 删除信息
        delete_item(index) {
            this.delete_news(index, () => {
                this.currentIndex = -1;
                this.computed_unRead_count()
            })
        }
    },
    filters: {
        f_news(obj, attr) {
            var obj = obj || {}
            let newsClass = obj.newsMute ? '_news-dot' : '_news-count'
            let newsText = !obj.newsMute ? obj.newsUnreadCount : ''
            let newsShow = (obj.newsUnreadCount > 0)
            let o = {
                nclass: newsClass,
                ntext: newsText,
                nshow: newsShow
            }
            return o[attr]
        }
    },
    components: {
        searchBar
    },
    created () {
        this.get_menu_wechat_list(() => {
            this.computed_unRead_count()
        })
    }
}
</script>
<style scoped>
</style>
