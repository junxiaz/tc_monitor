import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

export const fixedRouter = [
    {
        path: '/',
        hideen: true,
        component: rb => require(['@/views/Login.vue'], rb),
    },
    {
        path: '',
        component: rb => require(['@/components/Layout.vue'], rb),
        children: [
            { path: '/project', hideen: false, name: '项目管理', icon: 'iconfont icon-wenjianjia', component: rb => require(['@/views/Project.vue'], rb),},
            { path: '/api', hideen: false, name: '接口管理', icon: 'iconfont icon-zuzhijiagoujiekou', component: rb => require(['@/views/Api.vue'], rb),},
            { path: '/user', hideen: false, name: '用户管理', icon: 'iconfont icon-yonghu-tianchong', component: rb => require(['@/views/User.vue'], rb) },
            { path: '/group', hideen: false, name: '用户组管理', icon: 'iconfont icon-usergroup1', component: rb => require(['@/views/Group.vue'], rb) },
            { path: '/templet', hideen: false, name: '模板管理', icon: 'iconfont icon-moban', component: rb => require(['@/views/Templet.vue'], rb) },
            { path: '/add', hideen: true, name: '添加接口', component: rb => require(['@/views/AddApi.vue'], rb) },
        ]
    },
]

let router = new Router({
    routes: fixedRouter
})

global.antRouter = '' //全局的路由

let addRouFlag = false

router.beforeEach((to, from, next) => {
    // 取到用户的角色
    let GetRole = sessionStorage.getItem('userName')
    // 如果登录了
    if (GetRole) {
        next() //next()方法后的代码也会执行
        if (!addRouFlag) {
            addRouFlag = true
            // 1.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
            global.antRouter = fixedRouter
            // 2.将生成好的路由addRoutes
            router.addRoutes(fixedRouter)
            // 3.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
            router.push({ path: to.path })
        }
    } else {
        // 用户没登录，跳转到登录页面
        if (to.path === '/') {
            next()
        } else {
            next('/')
        }
    }
})

export default router

