<<<<<<< HEAD
//因为当前不是vue组件，所以无法this.$http  以及this.$api来拿东西，只能单独引入
import axios from "axios";
import api from "../js/api-config.js";
=======
//因为当前没有Vue组件，所以不能使用this.$http之类的，我们要再这里单独引入
import axios from "axios";
import api from "@/js/api-config.js"


//不用检测登录权限的页面的路径
let noLoginCheckPage = [
  'index',
  'goodsList',
  'goodsDetail',
  'shopcart'
];

>>>>>>> 959572a47f737df3bf05fb3388c0be56207308f2

//1.先获取用户要去的页面
//2.如果用户要去登录页，
//2.1那么判断用户是否登陆过，如果登录过，就跳转到后台主页
//2.2如果用户没登录过，那就不用处理
//3.如果用户要去别的后台相关的页面
//3.1那么判断用户是不是登陆过，是的话就不用处理，不是的话就跳转到登录页面

<<<<<<< HEAD
export default function (to , from , next) {
  var toPageName = to.name;

  //请求接口判断用户有没有登录
  axios.get(api.isLogin)
  .then(res=>{
    let isLogin = false;
    if(res.data.code == "logined"){
      isLogin = true;
    }

    //用户访问登录页面，如果已经登录，那么自动跳转到首页
    if(toPageName == "login" && isLogin){
      next("/admin");
    }else if(toPageName != "login" && !isLogin){
      //用户访问后台管理页面，但是他没有登录，那么自动转到登录页
      //跳到登录页的时候，把当前页面通过url参数记录下来

      next({name:'login', query:{nextPage: to.fullPath}});
      
    }else{
      next();
    }
  })
=======

export default function(to, from, next){
  var toPageName = to.name;
  // console.log(toPageName);
  //如果用户访问的页面，无需登录校验，那么直接调用next方法进行路由跳转
  //some方法用来检测数据中是否具有符合条件的元素，只要有一个满足就是true符合
  if(noLoginCheckPage.some(v=> v == toPageName)){
    return next();
  }

  //请求接口判断用户是否已经登录了
  axios.get(api.isLogin)
    .then(res => {
      let isLogin = false;
      if(res.data.code == "logined"){
        isLogin = true;
      }

      //用户访问登录页面，如果已经登录过了，就跳转到首页
      if(toPageName == "login" && isLogin){
        next("/");
      }else if(toPageName != 'login' && !isLogin){
        //用户访问非登录页的时候，但没登录，跳转到登录页
        //
        next({name:'login', query:{nextPage:to.fullPath}})
      }else{
        next();
      }
    })
>>>>>>> 959572a47f737df3bf05fb3388c0be56207308f2
}