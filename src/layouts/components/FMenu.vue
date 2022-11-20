<template>
    <div class="f-menu" :style="{ width: isCollapse ? '50px': '250px'}">   
        <el-menu
        default-active="2"
        :collapse="isCollapse"
        :unique-opened="true"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        :collapse-transition="false"
        @select="handleSelect"
      >
      <template v-for="(item,index) in userStore.menus" :key="index">
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                         <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
       
       
      </el-menu>
    </div>
   
</template>

<script setup>
import { useRouter,useRoute} from "vue-router";
import { useUserStore } from '@/store/user.js'
import { ref } from 'vue'
import {
  HotWater,
  Expand,
  Fold,
  Refresh,
  Cloudy,
  Promotion,
  ArrowDown,
  FullScreen,
  Aim,
  Help,
} from "@element-plus/icons-vue";
const route = useRoute()
const userStore = useUserStore()
const router = useRouter()
const defaultActive  = ref(route.push)

   const  handleSelect = (data) =>{
        router.push(data)
   }
    const props = defineProps({
        isCollapse:{
            type:Boolean,
            default: false
        }
    })

   
</script>

<style lang="less" scoped>
    .f-menu{
        width:250px;
        top:60px;
        bottom: 0;
        left: 0;
        overflow-y: auto;
        @apply shadow-md fixed bg-light-50;
    
    }
</style>