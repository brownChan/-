<template>
  <div id="login">
    <h1>登录商城</h1>
    <!-- model用来关联表单数据，rules用来指定校验规则 -->
    <el-form label-position="labelPosition" label-width="80px"       :model="formLabelAlign" class="inp" :rules="rules" ref="ruleForm">
      <!-- 如果要表单校验与重置功能，必须加上prop属性 -->
      <el-form-item label="用户账号" prop="user_name">
        <el-input v-model="formLabelAlign.user_name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="formLabelAlign.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
  export default {
    data() {
      //检验账号，将来配置到下面的validator配置项
      var validateUname = (rule,value,callback)=>{
        if(value === ""){
          callback(new Error("账号不能为空"));
        }else{
          callback();
        }
      }
      //校验密码，将来配置到下面的validator配置项
      var validatePass = (rule,value,callback)=>{
        if(value === ""){
          callback(new Error("密码不能为空"));
        }else{
          callback();
        }
      }
      return {
        //表单提交的数据
        formLabelAlign: {
          user_name: '',
          password: ''
        },
        //表单验证规则
        rules:{
          user_name:[
            {validator: validateUname, trigger:"blur"},
            {required: true, message:"请输入账号", trigger:"blur"},
            {min: 5, max: 18, message:"账号在5~18位", trigger:"blur"}
          ],
          password:[
            {required: true, message:"请输入密码", trigger:"blur"},
            {validator: validatePass, trigger:"blur"},
            {pattern:/^\w{3,18}$/, message:"密码在3~18位", trigger:"blur"}
          ]
        }
      }
    },
    methods: {
      //登陆
      login () {
        this.$http.post(this.$api.login,this.formLabelAlign)
        .then(res=>{
          if(res.data.status === 0){
            //使用路由插件后，组件实例就会有两个对象
            //$router代表路由实例，$route代表url对象
            //我们这里通过$route对象获取url中的信息，$router对象进行路由跳转等操作
            let nextPage = this.$route.query.nextPage;
            this.$router.push({path:nextPage? nextPage:'/admin'});
        //     this.$alert('登陆成功，马上跳转到首页', '温馨提示', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     this.$router.push("/admin")
        //     // this.$message({
        //     //   type: 'info',
        //     //   message: `action: ${ action }`
        //     // });
        //   }
        // });
            // this.$alert("登陆成功，马上跳转到首页");
            // this.$router.push("/admin")
          }else{
            this.$alert(res.data.message,"温馨提示");
          }
        })
      },
      //表单提交
      submitForm (formName){
        //通过ref引用得到form表单元素，然后调用validate方法去检验全部字段
        //全部字段都通过校验，那么回调收到的值为true，否则为false
        //$refs是vue提供的用于替代传统的dom方法获取方式
        //this.$refs.title = document.querySelector("h1");
        this.$refs[formName].validate(result =>{
          if(result){
            this.login();
          }else{//其中一个规则不符合都会执行else
            this.$alert("错误了，重来吧");
            return false;
          }
        })
      },
      //重置
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    }
  }

</script>
  
<style scoped>

  #login{
    width: 400px;
    height: 200px;
    border:1px solid #fff;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform:translateY(-50%);
    background-color: #000;
    border-radius:10px;
    padding-bottom:20px;
    padding-left: 10px;
    font-weight: 700;
  }
  .inp{
    margin-top:30px;
    padding-right:20px;
  }
  h1{
    text-align: center;
    color: #000;
    position: absolute;
    top:-100px;
    left:50%;
    transform: translateX(-50%);
    font-family: 华文彩云;
  }
</style>