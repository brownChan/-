<template>
  <div>
    <app-Header></app-Header>
    <router-view></router-view>
    <app-Footer></app-Footer>
  </div>
</template>
  
<script>
import appHeader from './common/Header.vue'
import appFooter from './common/Footer.vue'
  export default {
    //注册子组件
    components:{
      appHeader,
      appFooter
    }
  }
</script>
  
<style scoped>
  
</style>