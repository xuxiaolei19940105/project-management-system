<template>
    <div>
        <el-card>
            <el-form
                label-width="70px"
                v-model="newUserForm"
                ref="newUserForm"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="员工姓名" >
                            <el-input
                                v-model="newUserForm.username"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名" >
                            <el-input
                                v-model="newUserForm.usernameString"
                                placeholder="请选择姓名全拼,例如(lixiaoming)"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="职位">
                            <el-select v-model="newUserForm.userroleid" value-key="id" placeholder="请选择">
                                <el-option
                                    v-for="item in roleoptions"
                                    :key="item.id"
                                    :label="item.roleName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="权限分配">
                            <el-select v-model="newUserForm.userauthid" value-key="id" placeholder="请选择">
                                <el-option
                                    v-for="item in authoptions"
                                    :key="item.id"
                                    :label="item.authName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    props: {
        rowdata: Object,
        operationmode: String
    },
    data(){
        return {
            labelPosition: 'left',
            newUserForm: {
                id:'',
                username: '',
                userroleid: '',
                userauthid: '',
                usernameString:''
            },
            roleoptions: [],
            authoptions: [],
        }
    },
    created() {
        //获取人员角色
        if (this.operationmode == 'edit') {
            this.newUserForm.id=this.rowdata.id;
            this.newUserForm.username=this.rowdata.name;
            this.newUserForm.usernameString=this.rowdata.username;
        }
        this.$api.task.getUserRole().then(response => {
            let responsevalue = response.data;
            if (responsevalue) {
                this.roleoptions=responsevalue;
                if (this.operationmode == 'edit') {
                    this.newUserForm.userroleid=this.rowdata.roleId;
                }
            }else {
                this.$message.success('请联系Admin!');
            }
        })
        this.$api.task.getUserAuth().then(response => {
            let responsevalue = response.data;
            if (responsevalue) {
               this.authoptions=responsevalue;
               if (this.operationmode == 'edit') {
                    this.newUserForm.userauthid=this.rowdata.authId;
                }
            }else {
                this.$message.success('请联系Admin!');
            }
        })
    }
}
</script>