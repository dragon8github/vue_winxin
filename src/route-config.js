import store from 'store'

export default function(router) {
    //个人资料
    const personInfo = {
            component: resolve => {
                require(['./views/contact/person-info.vue'], resolve)
            },
            subRoutes: {
                //个人资料设置
                'person-info-set': {
                    component: resolve => {
                        require(['./views/contact/person-info-set.vue'], resolve)
                    }
                }
            }
    }

    //个人相册
    const albums = {
        component: resolve => {
            require(['./views/find/albums-friends.vue'], resolve)
        },
        subRoutes: {
            //个人资料
            'person-info': personInfo
        }
    }
    
    //相互引用 (不知道作用)
    personInfo.albums = albums

    //对话框
    const dialogue = {
        component : resolve => {
            require(['./views/chat/dialogue.vue'], resolve)
        },  
        subRoutes: {
            //聊天详情
            'chat-detail': {
                component: resolve => {
                    require(['./views/chat/chat-detail.vue'], resolve)
                },
                subRoutes: {
                    'person-info': personInfo
                }       
            },
            //群聊天信息
            'chat-info': {
                component: resolve => {
                    require(['./views/chat/chat-info.vue'], resolve)
                },
                subRoutes: {
                    'person-info': personInfo
                }
            },
            // 小游戏 + 广告
            'link': {
                component: resolve => {
                    require(['./components/iframe.vue'], resolve)
                }
            }
        }
    }

    //重定向 (也可以理解为默认打开的路由地址)
    router.redirect({
        '/': '/chat'
    })

    //核心路由
    router.map({
        '/chat': {
            component: resolve => {
                require(['./views/chat.vue'], resolve)
            },
            subRoutes: {
                'dialogue': dialogue,
                'add-friends': {
                    component: resolve => {
                        require(['./views/contact/add-friends.vue'], resolve)
                    }
                },
                'sao-yi-sao': {
                    component: resolve => {
                        require(['./views/find/sao-yi-sao.vue'], resolve)
                    }
                },
                'group-chat': {
                    component: resolve => {
                        require(['./views/contact/group-chat.vue'], resolve)
                    }
                }
            }
        },
        '*': {
            name: '404',
            component: resolve => {
                require(['./views/404.vue'], resolve)
            }
        },
        '/contact': {
            component: resolve => {
                require(['./views/contact.vue'], resolve)
            },
            subRoutes: {
                //个人资料
                'person-info': personInfo,
                'public-info': {
                    component: resolve => {
                        require(['./views/contact/public-info.vue'], resolve)
                    }
                },
                'new-friends': {
                    component: resolve => {
                        require(['./views/contact/new-friends.vue'], resolve)
                    },
                    subRoutes: {
                        'add-friends': {
                            component: resolve => {
                                require(['./views/contact/add-friends.vue'], resolve)
                            }
                        }
                    }
                },
                'add-friends': {
                    component: resolve => {
                        require(['./views/contact/add-friends.vue'], resolve)
                    }
                },
                'group-chat': {
                    component: resolve => {
                        require(['./views/contact/group-chat.vue'], resolve)
                    }
                },
                'tag': {
                    component: resolve => {
                        require(['./views/contact/tag.vue'], resolve)
                    }
                },
                'public': {
                    component: resolve => {
                        require(['./views/contact/public.vue'], resolve)
                    }
                }
            }
        },
        '/find': {
            component: resolve => {
                require(['./views/find.vue'], resolve)
            },
            subRoutes: {
                'albums-friends': albums,
                'sao-yi-sao': {
                    component: resolve => {
                        require(['./views/find/sao-yi-sao.vue'], resolve)
                    }
                },
                'yao-yi-yao': {
                    component: resolve => {
                        require(['./views/find/yao-yi-yao.vue'], resolve)
                    }
                },
                'drift-bottle': {
                    component: resolve => {
                        require(['./views/find/drift-bottle.vue'], resolve)
                    }
                },
                'shopping': {
                    component: resolve => {
                        require(['./components/iframe.vue'], resolve)
                    }
                }
            }
        },
        '/me': {
            component: resolve => {
                require(['./views/me.vue'], resolve)
            }
        }
    })


    /**
     * 每次路由跳转之后会执行的事件
     * 通过这个我们可以实现“返回”功能,这也是我之前一直没找到的方法
     * 这里解释一下为什么不直接使用from。而使用backPath：
     * 正常情况下from确实可以实现“返回”；
     * 但是,一旦将场景假设成第二层和第三层之间切换时，
     * 如果还使用from的话，就会来回跳转二和三层，回不了第一层，所以正确的思路应该是
     * 每次获取上一层路由,当然这和路由规则也密不可分
     */
    router.afterEach(function({ from, to }) {
        //获取来路(未使用)
        let fromPath = from.path || '/';
        //获取跳转页
        let toPath = to.path;
        //获取上一层(有可能为空)
        let backPath = toPath.slice(0, toPath.lastIndexOf('/'));
        //调用Vuex
        store.dispatch('BACK_PATH', backPath)
    })

}
