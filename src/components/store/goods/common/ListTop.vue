<template>
  <div class="section">
    <div class="wrapper">
        <div class="wrap-box">
            <!--类别菜单-->
            <div class="left-220" style="margin:0;">
                <div class="banner-nav">
                    <ul>
                    <!--此处声明下面可重复循环-->
                     
                        <li v-for="item in all.catelist" :key="item.id">
                            <!-- 左侧列表 -->
                            <h3>
                                <i class="iconfont icon-arrow-right"></i>
                                <!-- 顶级分类 -->
                                <span>{{item.title}}</span>
                                <!-- 子级分类 -->
                                <p>
                                    <span v-for="subitem in item.subcates" :key="subitem.id">{{subitem.title}}</span>
                                 
                                </p>
                            </h3>
                            <!-- 左侧列表鼠标放上去显示的遮盖窗口 -->
                            <div class="item-box">
                                <!--如有三级分类，此处可循环-->
                                <dl>
                                    <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                                    <dd>
                                    <!-- 这里遍历到的subitem可能还会有自己的subcates,并且可能无限 -->
                                        <!-- <a href="/goods/43.html">手机通讯</a> -->
                                    <!-- <a href="/goods/43.html" v-for="subitem in item.subcates" :key="subitem.id">{{subitem.title}}</a> -->

                                        <!-- 如果有无限层的时候，我们只能尝试封装一个单独的组件，因为只有组件才能递归调用自己，普通元素不行 -->
                                        <!-- 我们把起始的一层列表数据传递过去，让它渲染 -->
                                        <!-- 然后该组件还会判断每一层数据是否有下一级，如果有那么调用自己继续渲染，如果没有就结束 -->
                                        <app-category :list="item.subcates"></app-category>
                                    </dd>
                                </dl>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--/类别菜单-->
             
            <!--幻灯片-->
            <div class="left-705">
                <div class="banner-img">
                    <!-- element-ui走马灯 -->
                    <el-carousel indicator-position="outside">
                        <el-carousel-item v-for="item in all.sliderlist" :key="item.id">
                        <img :src="item.img_url" style="height:100%" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <!--/幻灯片-->
             
            <!--推荐商品-->
            <div class="left-220">
                <slide-list :list="all.toplist"></slide-list>
            </div>
            <!--/推荐商品-->
        </div>
    </div>
</div>
</template>
  
<script>
import appCategory from "./Category";
import slideList from "./SlideList";
  export default {
      data(){
          return {
              all:{
                  catelist:[],  //分类列表数据
                  sliderlist:[],   //轮播图列表数据
                  toplist:[],    //置顶商品列表数据
              }
          }
      },
      methods: {
          //获取全部数据
          getData() {
              this.$http.get(this.$api.goodsTop)
              .then(res=>{
                  if(res.data.status === 0){
                      this.all = res.data.message;
                  }else{
                      alert(res.data.message);
                  }
              })
          }
      },
      created(){
          this.getData();
      },
      components:{
          appCategory,
          slideList
      }
  }
</script>
  
<style scoped>
  .banner-img{
      left: 8px;
  }
</style>