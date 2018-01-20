//vue过滤器其实就是一个函数，只不过使用方式比较特殊，需要在模板中通过管道符(|)调用
// import Vue from "vue"
// Vue.filter("date",function (date) {
//   return new Date(date).toLocaleDateString();
// })

//导出过滤函数
export default function(date){
  return new Date(date).toLocaleDateString();
}