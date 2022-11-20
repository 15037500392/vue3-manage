<template>
  <div class="login-box">
    <div class="left-container flex-box-vertical text-light-50 bg-purple-500">
      <h1 class="welcome-tips">欢迎光临</h1>
      <p>啦啦啦，我要学vue3啦</p>
    </div>
    <div class="right-container flex-box-vertical">
      <div class="login-text text-neutral-500">欢迎回来</div>
      <div class="text-neutral-300 login-tip">账号密码登录</div>
      <el-form ref="formRef" :model="loginForm" :rules="rules">
        <el-form-item prop="account">
          <el-input
            v-model="loginForm.account"
            :prefix-icon="User"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :prefix-icon="Lock"
            show-password
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="onSubmit(formRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref,onMounted,onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import { Login } from "@/api/manager";
import { setToken } from '@/composables/auth.js'
import { toast } from '@/composables/util.js'
import { useUserStore } from '@/store/user.js'
const loginForm = reactive({
  account: "",
  password: "",
});

const rules = {
  account: [
    {
      required: true,
      message: "账号不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "账号不能为空",
      trigger: "blur",
    },
  ],
};

const formRef = ref(null);
const loading = ref(false);
const router = useRouter();
// 登录
const onSubmit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      Login({
        username: loginForm.account,
        password: loginForm.password,
      })
        .then((res) => {
          setToken(res.token)
          
          toast("登录成功","success")
          router.push("/");
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};
// const onKeyup = (e) =>{
//     if(e.key === "Enter"){
//         onSubmit(formRef)
//     }
// }
// onMounted(() => {
//     document.addEventListener('keyup',onKeyup)
// })

// onUnmounted(() => {
//     document.removeEventListener('keyup',onKeyup)
// })
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
