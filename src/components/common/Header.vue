<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">福佳集团项目管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip
                        effect="dark"
                        :content="fullscreen ? `取消全屏` : `全屏`"
                        placement="bottom"
                    >
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message ? `有${message}条未读消息` : `消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>-->
                <!-- 用户头像 -->
                <!-- <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>-->
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>-->
                        <el-dropdown-item divided command="change">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog
            title="修改密码"
            :visible.sync="dialogVisible"
            width="50%"
            :close-on-click-modal="false"
        >
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="旧密码" prop="oldpass">
                    <el-input v-model.number="ruleForm.oldpass"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        var validateoldpass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'));
            } else if (JSON.parse(localStorage.getItem('ms_data')).password != value) {
                return callback(new Error('密码错误'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            dialogVisible: false,

            collapse: false,
            fullscreen: false,
            name: '系统管理员',
            message: 2,
            ruleForm: {
                pass: '',
                checkPass: '',
                oldpass: ''
            },
            rules: {
                pass: [{ validator: validatePass, trigger: 'blur' }],
                checkPass: [{ validator: validatePass2, trigger: 'blur' }],
                oldpass: [{ validator: validateoldpass, trigger: 'blur' }]
            }
        };
    },

    inject: ['bus'],
    computed: {
        username() {
            let username = localStorage.getItem('ms_name');
            return username ? username : this.name;
        }
    },
    methods: {
        //修改密码上传
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let userdata = JSON.parse(localStorage.getItem('ms_data'));
                    userdata.password = this.ruleForm.checkPass;
                    userdata.workList = [];
                    this.$api.task.changedataUser(userdata).then(() => {
                        localStorage.removeItem('ms_name');
                        localStorage.removeItem('ms_data');
                        localStorage.removeItem('ms_id');
                        localStorage.removeItem('ms_username');
                        this.$router.push('/login');
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_name');
                localStorage.removeItem('ms_data');
                localStorage.removeItem('ms_id');
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            } else if (command == 'change') {
                this.dialogVisible = true;
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            this.bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (!document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped lang="scss">
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    /* background: url(../../assets/img/loginLogo.png); */
    float: left;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
