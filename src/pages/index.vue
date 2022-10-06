<template>
    <div>商城首页</div>
    <div>{{userStore.userInfo.username}}</div>
    <el-button @click="logout">退出登录</el-button>
</template>

<script  setup>
    import { useUserStore } from '@/store/user.js'
    import { showModal } from '@/composables/util.js'
    import { useRouter } from 'vue-router'
    import { removeToken } from '@/composables/auth.js';
    import { Logout } from '@/api/manager.js'
    const userStore = useUserStore()
    const router = useRouter()
    const logout = () => {
        showModal("是否要退出登录?").then(res => {
            console.log(res,'dd')
            Logout().finally(()=>{
                removeToken()   
                router.push("/login")
            })
        }).catch(res => {
            console.log(res,'ddd')
        })
    }
    console.log(userStore,'userStore')
</script>

<style lang="scss" scoped>
    
</style>