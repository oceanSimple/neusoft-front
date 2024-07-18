import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/mock': {
                // 后台地址
                target: 'http://127.0.0.1:4523/m1/4475331-0-default',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/mock/, '')
            },
            '/server': {
                // 后台地址
                target: 'http://10.1.232.127:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/server/, '')
            },
            '/local': {
                // 后台地址
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/local/, '')
            },
            '/linux': {
                // 后台地址
                target: 'http://111.229.78.126:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/linux/, '')
            },
            '/cloud': {
                // 后台地址
                target: 'http://172.18.42.107:8084',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/cloud/, '')
            },
        }
    },
})
