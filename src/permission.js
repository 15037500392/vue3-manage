import router from '@/router'
import { getToken } from '@/composables/auth.js'
import { toast,showFullLoading,hideFullLoading } from '@/composables/util.js'
import { useUserStore } from '@/store/user.js'


// 全局前置守卫

router.beforeEach((to,from,next) => {
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

    if(token){
        const userStore = useUserStore()
        userStore.setUserInfo() 
        hideFullLoading()
    }

    const title = `${to.meta.title ? to.meta.title : ''}--山谣的vue练习项目`
    document.title = title
    next()
})

router.afterEach((to, from) => {
    hideFullLoading()
  })