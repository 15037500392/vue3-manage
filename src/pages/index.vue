<template>
  <el-row :gutter="20">
    <!-- 骨架屏部分start -->
    <template v-if="!statisticsTotal.length">
      <el-col :span="6" v-for="i in 4" :key="i">
        <el-skeleton style="width: 100%" animated loading>
          <template #template>
            <el-card shadow="hover" class="border-0">
              <template #header>
                <div class="flex justify-between">
                  <el-skeleton-item style="width: 50%"></el-skeleton-item>
                  <el-skeleton-item style="width: 10%"></el-skeleton-item>
                </div>
              </template>
              <span class="text-3xl font-bold text-gray-500">
                <el-skeleton-item
                  variant="h3"
                  style="width: 30%"
                ></el-skeleton-item
              ></span>
              <el-divider />
              <div class="flex justify-between text-sm text-gray-500">
                <el-skeleton-item style="width: 50%"></el-skeleton-item>
                <el-skeleton-item style="width: 30%"></el-skeleton-item>
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
    </template>
      <!-- 骨架屏部分end -->
    <el-col :span="6" v-for="(item, index) in statisticsTotal" :key="index">
      <el-card shadow="hover" class="border-0">
        <template #header>
          <div class="flex justify-between">
            <span class="text-sm">{{ item.title }}</span>
            <el-tag class="mx-1" :type="item.unitColor">{{ item.unit }}</el-tag>
          </div>
        </template>
        <span class="text-3xl font-bold text-gray-500"> <count-to :value="item.value"></count-to></span>
        <el-divider />
        <div class="flex justify-between text-sm text-gray-500">
          <span>{{ item.subTitle }}</span>
          <span>{{ item.subValue }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <index-navs></index-navs>
 
</template>

<script setup>
import { useUserStore } from "@/store/user.js";
import { getStatistics1 } from "@/api/index.js";
import { ref, reactive } from "vue";
import CountTo from "../components/CountTo.vue";
import IndexNavs from "../components/IndexNavs.vue";
const userStore = useUserStore();
let statisticsTotal = ref([]);

getStatistics1().then((res) => {
  statisticsTotal.value = [...res.panels];
  console.log(statisticsTotal, "statisticsTotal");
});
</script>

<style scoped>
.statistics-box {
  border: 1px solid #000;
}
</style>
