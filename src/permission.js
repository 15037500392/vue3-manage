import {router,addRoutes} from '@/router'
import { getToken } from '@/composables/auth.js'
import { toast,showFullLoading,hideFullLoading } from '@/composables/util.js'
import { useUserStore } from '@/store/user.js'


// 全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to,from,next) => {
    showFullLoading()
    const token = getToken()

    // 没有登录，强制跳转回登录页
    if(!token && to.path !== "/login"){
        toast("请先登录","error")
        return next({path:"/login"})
    }

    //  防止重复登录
    if(token && to.path === "/login"){
        toast("请勿重复登录","error")
        return next({path:from.path ? from.path : ''})
    }

    let hasNewRoute = false
    if(token && !hasGetInfo){
        const userStore = useUserStore()
        await userStore.setUserInfo().then(res =>{
            hasNewRoute = addRoutes(res.menus)
            hideFullLoading()
        }) 
        hasGetInfo = true
       
    }
    const title = `${to.meta.title ? to.meta.title : ''}--山谣的vue练习项目`
    document.title = title
    hasNewRoute ? next(to.fullPath) : next()
})

router.afterEach((to, from) => {
    hideFullLoading()
  })