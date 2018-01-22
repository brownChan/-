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
//导入全局状态
import store from "./store";
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


//导入自己封装的vue插件
import MyFilter from "./filter"
//使用
Vue.use(MyFilter);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:new Vuex.Store(store)
})
