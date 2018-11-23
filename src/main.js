import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 导入ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 导入置顶模块
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);


// 导入 axios
// 类似于 vue-resource this.$http
import axios from 'axios'
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios;


// 下载 VueRouter
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 导入 全局的样式
import "./assets/site/css/style.css";

// 导入每一个页面的 组件
import index from './components/index.vue'
import detail from "./components/02.detail.vue";

// 实例化路由规则
let routes = [
  { path: "/", redirect: "/index" },
  {
    path:'/index',
    component:index
  },
  // 使用动态路由匹配 传递参数
  {
    path: "/detail/:artID",
    component: detail
  }

];

// 实例化VueRouter
let router = new VueRouter({
  routes
});

// 导入 moment.js
import moment from "moment";
// 私有过滤器
Vue.filter("shortTime", value => {
  //   console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  // console.log(moment(value).format("YYYY😘MM😘DD👍"));
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY🚲MM🚲DD🚲");
});


new Vue({
  render: h => h(App),
  // 路由选项
  router
}).$mount("#app");
