<<<<<<< HEAD
/*
 * @Author: 我家的小强 
 * @Date: 2018-01-12 11:06:20 
 * @Last Modified by: 我家的小强
 * @Last Modified time: 2018-01-18 14:13:47
 */
//1.导入vue相关的第三方包
import Vue from "vue";
//导入css
import "normalize.css";
//导入路由插件
import VueRouter from "vue-router";
//导入element-ui
import ElementUI from "element-ui";
//导入element-ui样式
import "../node_modules/element-ui/lib/theme-chalk/index.css";
import "./less/index.less";


//使用element-ui
Vue.use(ElementUI);

//启动vue插件
Vue.use(VueRouter);

//导入自己写的东西
import App from "./component/App.vue";
//导入路由配置
import routerConfig from "./router/index.js";

//导入axios，因为他不是vue插件，使用起来不方便，所以我们手动把它加入到原型中，方便使用
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8899"; //一配置，以后所有的请求就会自动使用这个域名
axios.defaults.withCredentials = true;//浏览器有个安全机制，如果是跨域请求，浏览器是不会把本地cookie信息携带过去的
Vue.prototype.$http = axios;

//导入api配置对象，为了使用更加方便，把它也加入到原型中
import api from "./js/api-config.js";
Vue.prototype.$api = api;

//路由实例
import beforeEach from "./router/beforeEach.js";//使用一个文件编写路由守卫
let vueRouter = new VueRouter(routerConfig);   //创建路由实例
vueRouter.beforeEach(beforeEach);  //注册守卫

//把根组件渲染到指定视图
new Vue({
  el: "#app",
  render: function (createElement) {
    return createElement(App);
  },
  router: vueRouter
})
=======
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//导入vue插件
import Vue from 'vue'
//根组件
import App from './App'
import Vuex from 'vuex'
import ElementUI from "element-ui"
import "../node_modules/element-ui/lib/theme-chalk/index.css"

//导入非vue插件
import axios from "axios"
import "normalize.css"
import "./css/style.css"

//导入自己写的模块
//接口配置
import api from "./js/api-config.js"
//路由实例
import router from "./router"
import "./assets/index.less"


//统一use启动vue插件
Vue.use(Vuex)
Vue.use(ElementUI)


//配置axios
//导入axios，因为他不是vue插件，使用起来不方便，所以我们手动把它加入到原型中，方便使用
axios.defaults.baseURL = "http://localhost:8899"; //一配置，以后所有的请求就会自动使用这个域名
axios.defaults.withCredentials = true;//浏览器有个安全机制，如果是跨域请求，浏览器是不会把本地cookie信息携带过去的


//统一扩展Vue原型
Vue.prototype.$http = axios;
//把api添加到Vue原型中
Vue.prototype.$api = api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
>>>>>>> 959572a47f737df3bf05fb3388c0be56207308f2
