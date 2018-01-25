<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link>&gt;
                <router-link :to="{ name: 'shopcart' }">购物车</router-link>&gt;
                <router-link to="">支付中心</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-16">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{order.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{order.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{order.area}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{order.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{order.order_amount}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="message">
                                    <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                    <span>{{order.message}}</span>
                                </div>
                            </div>
                            <div class="el-col el-col-8">
                                <div id="container">
                                    二维码图片
                                    <canvas width="300" height="300"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
</template>

<script>
    //引入二维码插件
    import $ from "jquery";
    import "@/lib/qr/jqueryqr";
    export default {
        data () {
            return {
                id:null,
                order:{}   
            }
        },
        methods: {
            getData(){
                this.$http.get(this.$api.order + this.id)
                .then(res=>{
                    //注意，后端返回的是数组
                    this.order = res.data.message[0];
                })
            },
            //不断检测订单的状态如果为2代表用户支付了，那就跳转到支付成功页面
            checkStatus(){
                let timer = setInterval(()=>{
                    this.$http.get(this.$api.order + this.id)
                    .then(res=>{
                        if(res.data.message[0].status ==2){
                            clearInterval(timer);
                            this.$router.push({name:'complete'})
                        }
                    })
                })
            }
        },
        //使用jQuery插件，需要保证dom渲染到视图中，所以使用这个生命周期函数
        mounted(){
            $("#container").erweima({
                //这个ip地址是本地地址，手机打不开，想要扫一扫打开这个网页，需要保证手机和电脑处在同一个局域网内，或者提供一个公网ip
                text:"http:127.0.0.1:8080/pay/${this.id}/${this.order.order_amount}",
                label:"支付"
            })
        },
        created(){
            this.id = this.$route.params.id;
            this.getData();
            this.checkStatus();
        }
    }
</script>

<style>

</style>