// // 取到需要权限判断的路由表
// import router from '@/router'
// import { fixedRouter } from '@/router'
// var addRouFlag = false

// global.antRouter = '' //全局的路由

// router.beforeEach((to, from, next) => {
//     // 取到用户的角色
//     let GetRole = sessionStorage.getItem('status')
//     // 如果登录了
//     if (GetRole) {
//         next() //next()方法后的代码也会执行
//         // // 1.如果路由表 没根据角色进行筛选,就筛选一次
//         if (!addRouFlag) {
//             addRouFlag = true
//             // 2.根据用户的角色、和需要动态展示的路由，生成符合用户角色的路由
            
//             // 3.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
//             global.antRouter = fixedRouter
//             // 4.将生成好的路由addRoutes
//             router.addRoutes(fixedRouter)
//             // 5.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
//             router.push({ path: to.path })
//         }
//     } else {
//         // 用户没登录，跳转到登录页面
//         if (to.path === '/') {
//             next()
//         } else {
//             next('/')
//         }
//     }

// })

