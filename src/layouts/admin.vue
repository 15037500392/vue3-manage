<template>
  <el-container>
    <el-header>
      <f-header :is-collapse="isCollapse" @open="open" @close="close" />
    </el-header>
    <el-container>
      <el-aside :style="{ width: isCollapse ? '50px' : '250px' }">
        <f-menu :is-collapse="isCollapse" />
      </el-aside>
      <el-main>
        <f-tag-list />
        <router-view v-slot="{ Component }">
          <keep-alive :max="10">
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";
import { ref } from "vue";
const isCollapse = ref(true);
const open = () => (isCollapse.value = true);
const close = () => {
  isCollapse.value = false;
};
</script>

<style lang="scss" scoped></style>
