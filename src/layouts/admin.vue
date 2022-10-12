<template>
    <el-container>
        <el-header>
            <f-header :is-collapse="isCollapse" @open="open" @close="close"/>
        </el-header>
        <el-container>
            <el-aside :style="{ width: isCollapse ? '50px': '250px'}">
                <f-menu :is-collapse="isCollapse"/>
            </el-aside>
            <el-main>
                <f-tag-list/>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTagList from './components/FTagList.vue' 
import { ref } from 'vue'
const isCollapse = ref(true)
const open = () => isCollapse.value = true
const close = () => {
    console.log('进来了吗')
    isCollapse.value = false
    console.log(isCollapse.value,'isCollapse')
}
</script>

<style lang="scss" scoped>
    
</style>