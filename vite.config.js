import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),  WindiCSS({  
    scan: {  
        dirs: ['.'], // 当前目录下所有文件  
        fileExtensions: ['vue', 'js', 'ts'], // 同时启用扫描vue/js/ts  
    },  
}),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: ' http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
