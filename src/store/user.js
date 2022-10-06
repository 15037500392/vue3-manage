import { defineStore } from "pinia";
import { GetUserInfo } from "@/api/manager";
export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: {},
    };
  },
  actions: {
    setUserInfo() {
      GetUserInfo().then((res) => {
        this.userInfo = Object.assign({}, res);
      });
    },
  },
});
