import { defineStore } from "pinia";
import { GetUserInfo } from "@/api/manager";
export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: {},
    };
  },
  getters: {
    menus: (state) => state.userInfo.menus,
  },
  actions: {
    setUserInfo() {
      return new Promise((resolve,reject) => {
        GetUserInfo().then((res) => {
          this.userInfo = Object.assign({}, res);
          resolve(res)
        });
      }).catch(err => reject(err))
      
    },
  },
});
