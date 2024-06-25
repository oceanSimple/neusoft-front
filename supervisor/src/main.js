import {
  createSSRApp,
} from 'vue';
import App from "./App.vue";
// main.js，注意要在use方法之后执行
import * as Pinia from 'pinia';
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  return {
    app,
    Pinia,
  };
}

