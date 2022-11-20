<template>
  <div class="f-tag-list">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      @tab-change="handleTabChange"
      @tab-remove="removeTab"
      style="min-width: 100px"
    >
      <el-tab-pane
        v-for="item in tabList"
        :closable="item.path != '/'"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { router } from "../../router";
import { useCookies } from "@vueuse/integrations/useCookies";
const route = useRoute();
const cookie = useCookies();
let tabIndex = 2;
const activeTab = ref(route.path);
let tabList = ref([
  {
    title: "后台管理",
    path: "/",
  },
]);
// 添加标签导航
function addTab(tab){
    let noTab = tabList.value.findIndex(t=>t.path == tab.path) == -1
    if(noTab){
        tabList.value.push(tab)
    }

    cookie.set("tabList",tabList.value)
}

// 根据路由更新事件增加新的tab页
onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path
    addTab({
        title:to.meta.title,
        path:to.path
    })
});

const removeTab = (t) => {
  let tabs = tabList.value;
  let a = activeTab.value;
  if (a == t) {
    tabs.forEach((tab, index) => {
      if (tab.path == t) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          a = nextTab.path;
        }
      }
    });
  }
  activeTab.value = a;
  tabList.value = tabList.value.filter((tab) => tab.path != t);
  console.log(tabList.value,'删除')
  cookie.set("tabList", tabList.value);
};

// tab点击事件
const handleTabChange = (path) => {
  activeTab.value = path;
  router.push(path);
};

// 初始化标签导航列表
function initTabList() {
  let tabs = cookie.get("tabList") || [];
  console.log(tabs, "tabs");
  if (tabs.length) {
    tabList.value = tabs;
  }
}
initTabList();

// 关闭事件
const handleCommand = (data) => {
  switch (data) {
    case "closeOther":
    closeOther()
      break;
    case "closeAll":
      closeAll();
      break;
  }
};

// 关闭所有标签页
function closeAll() {
  tabList.value.splice(0, tabList.value.length, {
    title: "后台管理",
    path: "/",
  });
  router.push("/");
}

// 关闭除自己外其他标签页
function closeOther(){
  tabList.value = tabList.value.filter((tab) => tab.path === activeTab.value || tab.path === '/');
  cookie.set("tabList", tabList.value);
}
</script>

<style lang="less" scoped>
.f-tag-list {
  @apply bg-gray-100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 2px;
}
.tag-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  line-height: 32px;
  text-align: center;
  background: #fff;
}
/deep/.el-tabs__header {
  margin-bottom: 0 !important;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__nav,
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item {
  border: none !important;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item {
  height: 32px;
  line-height: 32px;
  background: #fff;
  margin: 2px;
}
/deep/.el-tabs__nav-next,
/deep/.el-tabs__nav-next {
  line-height: 44px;
  height: 44px;
}
</style>
