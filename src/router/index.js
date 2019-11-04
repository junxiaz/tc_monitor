import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const fixedRouter = [
    {
        path: '',
        hideen: true,
        component: rb => require(['@/views/Login.vue'], rb),
    },
    {
        path: '',
        component: rb => require(['@/components/Layout.vue'], rb),
        children: [
            { path: '/project', name: '项目管理', icon: 'iconfont icon-wenjianjia', hideen: true, component: rb => require(['@/views/Project.vue'], rb) },
            { path: '/api', name: '接口管理', icon: 'iconfont icon-zuzhijiagoujiekou', component: rb => require(['@/views/Api.vue'], rb) },
            { path: '/user', name: '用户管理', icon: 'iconfont icon-yonghu-tianchong', component: rb => require(['@/views/User.vue'], rb) },
            { path: '/group', name: '用户组管理', icon: 'iconfont icon-wenjianjia', component: rb => require(['@/views/Group.vue'], rb) },
        ]
    }
]

export default new Router({
    routes: fixedRouter
    // routes: [
    //     {path: '/', component: rb => require(['@/views/Login.vue'], rb)},
    //     {path: '/login', component: rb => require(['@/views/Login.vue'], rb)},
    //     {path: '/project', component: rb => require(['@/views/Project.vue'], rb)},
    //     {path: '/api', component: rb => require(['@/views/Api.vue'], rb)},
    //     {path: '/user', component: rb => require(['@/views/User.vue'], rb)},
    //     {path: '/group', component: rb => require(['@/views/Group.vue'], rb)},
    // ]
})