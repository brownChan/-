<template>
  <div class="comment-box">
    <!--取得评论总数-->
    <form id="commentForm" name="commentForm" class="form-box" @submit.prevent = "subComment">
      <div class="avatar-box">
        <i class="iconfont icon-user-full"></i>
      </div>
      <div class="conn-box">
        <div class="editor">
          <!-- 填写评论的区域 -->
          <textarea v-model="comment" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
          <span class="Validform_checktip"></span>
        </div>
        <div class="subcon">
          <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
          <span class="Validform_checktip"></span>
        </div>
      </div>
    </form>
    <ul id="commentList" class="list-box">
      <p v-if="commentList.length == 0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
      <li v-for="(item,index) in commentList" :key="index">
        <div class="avatar-box">
          <i class="iconfont icon-user-full"></i>
        </div>
        <div class="inner-box">
          <div class="info">
            <span>{{item.user_name}}</span>
            <span>{{item.add_time | date}}</span>
          </div>
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>
    <!--放置页码-->
    <div class="page-box" style="margin:5px 0 0 62px">
      <el-pagination :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="5"
        layout="total, sizes, prev, pager, next, jumper" :total="pageData.totalcount">
    </el-pagination>
    </div>
    <!--/放置页码-->
  </div>
</template>
  
<script>
  export default {
    props:["tablename"],
    data () {
      return {
        pageData:{},        //总条数
        currentPage:1,      //当前页
        id:null,          //被评论的商品id
        comment:'',       //当前评论
        commentList:[],    //评论列表
        pagination:{       //分页
          pageIndex: 1,
          pageSize: 5
        }
      }
    },
    methods: {
      //获取评论数据
      getCommentData(){
        this.$http.get(this.$api.commentList + this.tablename + "/" + this.id,{params:this.pagination})
        .then(res=>{
          this.commentList = res.data.message;
          this.pageData = res.data;
        })
      },

      //发表评论
      subComment(){
        this.$http.post(this.$api.comment + this.tablename + "/" + this.id, 
        {commenttxt: this.comment})
        .then(res=>{
          console.log(res);
          //发表成功后，需要马上获取数据
          this.comment = "";  //提交成功清空输入框
          this.getCommentData();  //重新渲染评论列表
        })
      }
    },
    created(){
      this.id = this.$route.params.id;
      this.getCommentData();
    }
  }
</script>
  
<style scoped>
  
</style>