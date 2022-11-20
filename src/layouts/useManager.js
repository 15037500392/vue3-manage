import { ref, reactive } from "vue";
import { Logout,EditPassword } from "@/api/manager.js";
import { removeToken } from "@/composables/auth.js";
import { showModal } from "@/composables/util.js";
import { useRouter } from "vue-router";
// 修改密码
export function useRepassword() {
  const formDrawerRef = ref(null);
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
  const ruleFormRef = ref(null);
  const loading = ref(false);
  // 修改密码
  const editPassword = async (formEl) => {
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

  const openDrawerVisible = () => formDrawerRef.value.open();
  return {
    passwordForm,
    passwordRules,
    ruleFormRef,
    loading,
    editPassword,
    openDrawerVisible,
    formDrawerRef,
  };
}

// 退出登录
export function useLogout() {
  const router = useRouter();
  // 退出登录
  const logout = () => {
    showModal("是否要退出登录?")
      .then((res) => {
        Logout().finally(() => {
          removeToken();
          router.push("/login");
        });
      })
      .catch((res) => {
      });
  };
  return {
    logout
  }
}
