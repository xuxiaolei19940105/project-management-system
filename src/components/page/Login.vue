<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title01"><img src="../../assets/img/logo-bg.png" height="45" width="360" /></div>
            <div class="ms-content01">
                <div class="ms-title">用户登录</div>
                <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input v-model="param.username" placeholder="username">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">登录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data: function() {
        return {
            param: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            var usernameS = this.param.username;
            var passwordS = this.param.password;
            if(!usernameS){
                this.$message.error("请输入用户名!");
            }
            if(!passwordS){
                this.$message.error("请输入密码!");
            }
            if(usernameS && passwordS){
                let paramdata={};
                paramdata.username=usernameS;
                paramdata.password=passwordS;
                this.$api.task.login(paramdata).then((response)=>{
                    var responsevalue=response;
                    if(responsevalue){
                        if(responsevalue.data && responsevalue.data !=""){
                            let returndata =responsevalue.data;
                            localStorage.setItem('ms_data', JSON.stringify(returndata));
                            localStorage.setItem('ms_name',  returndata.name);
                            localStorage.setItem('ms_id',  returndata.id);
                            localStorage.setItem('ms_username',  returndata.username);
                            localStorage.setItem('ms_roleId',  returndata.roleId);
                            this.$router.push('/');
                            this.$message.success('登录成功');
                        }else{
                            this.$message.error("请输入正确用户名和密码!");
                            return false;
                        }
                    }else{
                        this.$message.error("请输入正确用户名和密码!");
                        return false;
                    }
                });
            }else{
                this.$message.error("请输入用户名和密码!");
                return false;
            }
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/Logo-title.png);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #000;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;

    overflow: hidden;
}
.ms-content01 {
    background: rgba(255, 255, 255, 0.3);
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.ms-title01 {
    margin-bottom: 50px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
