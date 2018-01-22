import Vue from "vue";

export default {
  //全局状态 =》 相当于是data
  state: {
    //购物车购买数据约定key就是商品ID，values就是商品的购买数据(也就是count)
    //购物车的默认数据是从本地storage里面取的，相当于调用接口获取初始数据，如果数据为空，就给一个空对象
    shopping: JSON.parse(localStorage.getItem("shopping")) || {}
  },

  //相当于是计算属性 computed
  getters:{
    //这里的方法会自动接收到state状态
    shoppingSum(state){
      //第二个参数是0，做sum的默认处理，如果不做，那么第一次相加的时候，就是v + undefined = NAN
      return Object.values(state.shopping).reduce((sum,v)=> sum + v, 0);
    },
    //获取所有商品的id
    shoppingIds(state){
      return Object.keys(state.shopping).join(",");
    }
  },

    mutations: {
      //这里的方法会自动接收到state状态，然后第二个参数是用户自己传的，
      //这里通过赋值结构的es6语法从第二个参数中解出id与count
      modifyShopping(state,{id, count}){
        //这里有个坑,就是涉及到视图是否刷新的问题，有两个办法解决，一个是用直接设置整个对象：var obj = {a:10, b:20},而不能通过obj.a = 10，这种方式来修改值，这样视图不会进行刷新；第二种方法就是下面这种Vue.set()
        // console.log(id, count);   //89 10
        Vue.set(state.shopping, id, count);
        //第一个值为localstorage的名字，第二个为值
        localStorage.setItem("shopping",JSON.stringify(state.shopping));
      },

      //删除某商品的数量 =》 从状态和storage里都删除
      delShopping(state, id){
        Vue.delete(state.shopping, id);
        localStorage.setItem("shopping", JSON.stringify(state.shopping))
      }
    }
}