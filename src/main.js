import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
// 下载 VueRouter
import VueRouter from "vue-router";

Vue.use(VueRouter);



// 导入 全局的样式
import "./assets/site/css/style.css";

// 导入每一个页面的 组件
import index from './components/index.vue'

// 实例化路由规则
let routes = [
  { path: "/", redirect: "/index" },
  {
    path:'/index',
    component:index
  }

];

// 实例化VueRouter
let router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  // 路由选项
  router
}).$mount("#app");
