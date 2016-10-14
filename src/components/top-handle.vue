<template>
    <div class="_cover-top">
        <!-- 返回 -->
        <div class="top-back">
            <div class="_ellipsis iconfont icon-return-arrow" v-link="backPath" v-text="backText">
            </div>
        </div>


        <!-- 右插槽 -->
        <div class="top-other">
            <slot name="right">
                <div class="_align-right" v-link="nextPath">
                    <span class="iconfont" :class="nextIcon"></span>
                </div>
            </slot>
        </div>

        
         <!-- 标题插槽 -->
        <div class="top-title _effect" :class="{'_effect--50':decline}">
            <slot name="center">
                <p>
                    <span v-text='curText'></span>
                </p>
            </slot>
        </div>
    </div>
</template>

<script>

import {backPath } from 'getters'

export default {
    props: {
        //返回文本
        'backText': {
            type: String,
            default: '返回'
        },
        //衰退:cur是否变更为prev页
        'decline': {
            default: false
        },
        //当前文本
        'curText': {
            //type:String
        },
        //右侧按钮下一页
        'nextPath': {
            // type:Object
        },
        //右侧按钮class
        'nextIcon': {
            type: String
        }
    },
    vuex: {
        getters: {
            backPath
        }
    }
}
</script>
<style scoped>
</style>
