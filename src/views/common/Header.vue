<template>
    <div class="header">
        <div class="logo">{{logoText}}</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/images/user.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="github">github</el-dropdown-item>
                    <el-dropdown-item command="weibo">weibo</el-dropdown-item>
                    <el-dropdown-item command="wechat">wechat</el-dropdown-item>
                    <el-dropdown-item divided command="loginout">切换帐号</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog v-model="wechatBox" size="tiny">
            <img src="../../../static/images/weixin.png" style="display:block;margin:0 auto;width:80%;">
            <p style="text-align:center">微信扫描二维码</p>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                wechatBox:false,
                logoText: '这里有个宝藏，它空无一物，它价值千金',
                name: '游客'
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }else if (command == 'github'){
                    window.open("https://github.com/EvanLiu2968");
                }else if (command == 'weibo'){
                    window.open("http://weibo.com/rockmist");
                }else if (command == 'wechat'){
                    this.wechatBox=true;
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #fff;
        background-color: #20A0FF;
    }
    .header .logo{
        float: left;
        font-size:18px;
        margin-left:2em;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:10px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
