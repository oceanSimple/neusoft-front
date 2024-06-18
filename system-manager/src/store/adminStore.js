import {defineStore} from "pinia";
import {adminLogin} from "../api/admin.js";
import router from "../router/index.js";

export const useAdminStore = defineStore("admin", {
    state: () => ({
        code: "default",
        nickname: "default nickname"
    }),
    actions: {
        async login(code, password) {
            const data = await adminLogin(code, password)
            if (data) {
                // 将code保存在state中
                this.code = code
                // 将data.data保存为jwtToken
                localStorage.setItem("jwtToken", data.data)
                // 跳转到首页
                await router.push("/home")
            } else {
                console.log("登录失败")
            }
        }
    }
})