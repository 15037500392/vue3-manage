<template>
    <div>商城首页</div>
    <div>{{userStore.userInfo.username}}</div>
</template>

<script  setup>
    import { useUserStore } from '@/store/user.js'

    const userStore = useUserStore()
    
    console.log(userStore,'userStore')
</script>

<style lang="scss" scoped>
    
</style>