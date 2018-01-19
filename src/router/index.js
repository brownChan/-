<<<<<<< HEAD
import Login from "../component/login/Login.vue";
import Register from "../component/register/Register.vue";
import Admin from "../component/admin/Admin.vue";
//引入商品分类
import GoodsCgList from "../component/admin/goods/category/list.vue";
import GoodsCgEdit from "../component/admin/goods/category/edit.vue";
//引入商品内容
import GoodsCtList from "../component/admin/goods/content/list.vue";
import GoodsCtEdit from "../component/admin/goods/content/edit.vue";

let adminGoods = [
  //商品分类
  { name: "goodsCgList", path: "goods/category/list", component: GoodsCgList },
  { name: "goodsCgEdit", path: "goods/category/edit/:id", component: GoodsCgEdit },
  { name: "goodsCgAdd", path: "goods/category/add", component: GoodsCgEdit },
  //商品内容
  { name: "goodsCtList", path: "goods/content/list", component: GoodsCtList },
  { name: "goodsCtEdit", path: "goods/content/edit/:id", component: GoodsCtEdit },
  { name: "goodsCtAdd", path: "goods/content/add", component: GoodsCtEdit }
]
//该文件对外导出路由配置
export default {
  routes: [
    //登陆
    {name:"login",path:"/login",component:Login},
    //register
    { name: "register", path: "/register", component: Register},
    //后台管理
    {name:"admin",path:"/admin",component:Admin, children: adminGoods},
    //重定向redirect
    {path:"/", redirect: "/admin"},
  ]
}
=======
import Vue from 'vue'
import Router from 'vue-router'

//导入路由守卫
import beforeEach from "./beforeEach.js"


//导入被路由控制的组件
//这里的@就是指src目录，如果导入的是js vue json文件，就可以省略后缀名
import Login from "@/components/login/Login"
import Store from "@/components/store/Store";
import GoodsList from "@/components/store/goods/List"
import GoodsDetail from "@/components/store/goods/Detail"
import Shopcart from "@/components/store/shopcart/Shopcart"
import OrderCommit from "@/components/store/order/Commit"
import OrderPay from "@/components/store/order/Pay"

//启动路由插件
Vue.use(Router)

//创建路由实例，并添加路由守卫
let router = new Router({
  routes: [
    //首页就是商品列表
    {name:'index', path:'/', component :Store, children:[
      //商品列表
      { name: 'goodsList', path: "goods/list", component: GoodsList },
      { name: 'goodsDetail', path: "goods/detail/:id", component: GoodsDetail },
      //购物车
      { name: 'shopcart', path: "shopcart", component: Shopcart },
      //订单
      { name: 'orderCommit', path: "order/commit", component: OrderCommit },
      { name: 'orderPay', path: "order/pay", component: OrderPay }
    ]},
    //登录
    {name:'login',path:'/login', component: Login},
  ]
})
router.beforeEach(beforeEach)

export default router
>>>>>>> 959572a47f737df3bf05fb3388c0be56207308f2
