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
                        <el-form-item label="员工姓名">
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
                            <el-select v-model="newUserForm.userroleid" placeholder="请选择">
                                <el-option
                                    v-for="item in roleoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="权限分配">
                            <el-select v-model="newUserForm.userauthid" placeholder="请选择">
                                <el-option
                                    v-for="item in authoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
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
    data(){
        return {
            labelPosition: 'left',
            newUserForm: {
                username: '',
                userroleid: '',
                userauthid: '',
                usernameString:''
            },
            roleoptions: [
                {
                    value: '0',
                    label: '项目经理'
                },
                {
                    value: '1',
                    label: '项目组长'
                },
                {
                    value: '2',
                    label: '实施人员'
                },
                {
                    value: '3',
                    label: '开发人员'
                },
                {
                    value: '4',
                    label: '测试人员'
                },
                {
                    value: '5',
                    label: 'UI'
                }
            ],
            authoptions: [
                {
                    value: '0',
                    label: '管理员权限'
                },
                {
                    value: '1',
                    label: '项目管理权限'
                },
                {
                    value: '2',
                    label: '普通权限'
                },
                {
                    value: '3',
                    label: '只读权限'
                }
            ],
        }
    }
}
</script>