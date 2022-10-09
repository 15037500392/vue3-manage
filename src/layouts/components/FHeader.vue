<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><Promotion /></el-icon>
      山谣山谣
    </span>
    <el-icon class="icon-btn"><fold /></el-icon>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="刷新"
      placement="top-start"
    >
      <el-icon class="icon-btn" @click="handleRefresh"><refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="isFullscreen ? '退出全屏' : '全屏'"
        placement="top-start"
      >
        <el-icon class="icon-btn" v-if="!isFullscreen" @click="toggle"
          ><full-screen
        /></el-icon>
        <el-icon class="icon-btn" v-else @click="toggle"><Aim /></el-icon>
      </el-tooltip>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar
            :size="25"
            :src="userStore.userInfo.avatar"
            class="mx-5"
          ></el-avatar>
          {{ userStore.userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <form-drawer 
  ref="formDrawerRef"
  title="修改密码"
  destroyOnClose
   @submit="editPassword(ruleFormRef)">
    <el-form
      ref="ruleFormRef"
      :model="passwordForm"
      :rules="passwordRules"
      v-loading="loading"
      label-width="120px"
    >
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="passwordForm.oldpassword" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="passwordForm.password" />
      </el-form-item>
      <el-form-item label="重复新密码" prop="repassword">
        <el-input v-model="passwordForm.repassword" />
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import { ref, reactive } from "vue";
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
} from "@element-plus/icons-vue";
import { useUserStore } from "@/store/user.js";
import { Logout, EditPassword } from "@/api/manager.js";
import { showModal, toast } from "@/composables/util.js";
import { removeToken } from "@/composables/auth.js";
import { useRouter } from "vue-router";
import { useFullscreen } from "@vueuse/core";
import FormDrawer from '@/components/FormDrawer.vue'
const { isFullscreen, toggle } = useFullscreen();
const router = useRouter();
const userStore = useUserStore();
const drawerVisible = ref(false);
const formDrawerRef = ref(null)
const passwordForm = reactive({
  oldpassword: "",
  password: "",
  repassword: "",
});
const passwordRules = reactive({
  oldpassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  password: [{ required: true, message: "请输入新密码", trigger: "blur" }],
  repassword: [
    { required: true, message: "请重复输入新密码", trigger: "blur" },
  ],
});
// 退出登录
const logout = () => {
  showModal("是否要退出登录?")
    .then((res) => {
      console.log(res, "dd");
      Logout().finally(() => {
        removeToken();
        router.push("/login");
      });
    })
    .catch((res) => {
      console.log(res, "ddd");
    });
};

const ruleFormRef = ref(null);
const loading = ref(false)
// 修改密码
const editPassword = async (formEl) => {
  console.log(formEl, "formEl");
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      EditPassword(passwordForm)
        .then((res) => {
          if (res) {
            removeToken();
            toast("修改成功", "success");
          }
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

// 菜单栏触发事件
const handleCommand = (data) => {
  switch (data) {
    case "logout":
      logout();
      break;
    case "rePassword":
    formDrawerRef.value.open()
      break;
    default:
      break;
  }
};

const handleRefresh = () => {};
const handleClose = () => {
  drawerVisible.value = false;
};
</script>

<style lang="less" scoped>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>
