import axios from "axios";
import { getToken } from '@/composables/auth.js';
import { toast } from '@/composables/util.js'
var service = axios.create({
  baseURL: "/api",
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
  const token =getToken();
  if (token) {
    config.headers["token"] = token;
  }
  return config;
},(error) =>{
    return Promise.reject(err)
}
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  (error) => {
    toast(error.response.data.msg,"error")
  }
);

export default service;
