import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/index.js";
import {createPinia} from "pinia";
const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
    .use(router)
    .use(pinia)
app.mount('#app')
