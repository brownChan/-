<template>
  <div>
    <!-- 导航 -->
    <div class="section">
      <div class="location">
          <span>当前位置：</span>
          <router-link to="/goods/list">首页</router-link>
      </div>
    </div>

    <!-- 头部 -->
    <list-top></list-top>

    <!-- 主体 -->
    <list-main></list-main>
  </div>
</template>
  
<script>
import ListTop from "./common/ListTop";
import ListMain from "./common/ListMain";
  export default {
    //下面为ES6语法
    components:{
      ListTop,
      ListMain
    }
  }
</script>
  
<style scoped>
  
</style>