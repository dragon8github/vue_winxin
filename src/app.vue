<template>
    <div id="app">
        
        <!-- 头部是不变的，通过组件components/index-header.vue + Vuex 来维护  -->
        <header class="app-header" style="display:none" v-show="appload">
            <div class="_effect" :class="{'_effect--50':decline}">
                <index-header style="overflow:visible;"></index-header>
            </div>
        </header>

        
        <!-- 身体是根据Vue-router路由 route-config.js 来切换内容 -->
        <section class="app-content" style="display:none" v-show="appload">
            <router-view keep-alive></router-view>
        </section>


        <!-- 头部是不变的，通过组件components/index-nav.vue + Vuex 来维护  -->
        <footer class="app-footer _line-fine" style="display:none" v-show="appload">
            <div class="_effect " :class="{'_effect--50':decline}">
                <index-nav></index-nav>
            </div>
        </footer>   


        <!-- 欢迎 -->
        <section class="welcome" v-show="welcome" style="display:none" transition="welcome">
        </section>


        <!-- 温馨提示 -->
        <section class="mobile-tips" style="dislay:none;" v-show="isnotMobile">
            <div class="mobile-tips-inner">
                <div class="mobile-model"> 
                    <img src="./assets/images/mobile.png" alt="">
                </div>
                <p><br>为保证最佳用户体验,<br></p>
                <p class="_align-left">1.请用chrome移动设备调试模式(F12)下打开</p>
                <p class="_align-left">2.手机浏览器访问</p>
                <br>
                <button class="weui_btn weui_btn_mini weui_btn_primary" v-touch:tap='isnotMobile = false'>关闭
                </button>
            </div>
        </section>
    </div>
</template>


<script>
import store from 'store'
import indexHeader from 'components/index-header.vue'
import indexNav from 'components/index-nav.vue'

require('assets/css/common.scss')
require('assets/css/base.scss')

export default {    
    replace: false,
    store,
    data() {
        return {
            appload: false,//主结构
            welcome: false,//欢迎页
            isnotMobile:false,//是否为移动设备访问
            decline: false //router animation
        }
    },
    methods : {
        //判断是否为移动端
        isMobile () {
            let userAgentInfo = navigator.userAgent;
            let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod")
            let flag = false;
            for (let v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = true; break; }
            };
            return flag;
        }
    },
    created () {    
        //如果是第一次打开
        if (this.$route.matched.length === 1) 
        {
            //则显示月球welcome界面
            this.welcome = true;   
            //两秒之后
            setTimeout(() => {
                 //隐藏月球欢迎界面
                 this.welcome = false;
                 //显示主界面
                 this.appload = true;
                 //如果不是移动端，则显示友好提示
                 if(!this.isMobile()){
                    this.isnotMobile = true;
                 }
            }, 1500)
        }        
        //否则
        else
        {   
            //直接显示主界面
            this.appload = true;
        } 
    },
    events: {
        'route-pipe' (_decline) {
            this.decline = _decline
        }
    },
    components: {
        indexHeader,
        indexNav
    }
}
</script>
<style scoped>
.welcome {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    transition: 0.5s all ease;
    background: url(./assets/images/launchimage.png) no-repeat center center;
    background-size: cover;
}

.welcome-leave {
    opacity: 0;
}
.mobile-tips{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0,0,0,.75);
    text-align: center;
    color: #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mobile-tips-inner{
    width: 330px;
    padding-bottom: 200px;
}
.mobile-model{
    flex-grow: 1;
}
</style>
