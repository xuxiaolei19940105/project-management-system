<template>
    <div>
        <el-card>
            <div style="text-align:right;padding-bottom:10px;">
                <el-button size="mini" @click="dialogVisible = true" :disabled="!creatDisabled">新建角色</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                border
                :default-sort="{prop: 'roleNum', order: 'descending'}"
            >
                <el-table-column prop="roleNum" label="角色编码" width="180"></el-table-column>
                <el-table-column prop="roleName" label="角色类型" width="180"></el-table-column>
                <el-table-column prop="roleDescribe" label="描述"></el-table-column>
                <!-- <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="delete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>-->
            </el-table>

            <el-dialog title="新建角色" :visible.sync="dialogVisible" width="30%">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="角色类型">
                        <el-input v-model="form.type"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="form.describe"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="newRole">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
export default {
    inject: ['reload'],
    created() {
        this.$api.task.getRoleList().then(response => {
            this.tableData = response.data;
        });
        let roleList = JSON.parse(localStorage.getItem('ms_role'));
        this.creatDisabled = roleList.includes('29');
    },

    data() {
        return {
            creatDisabled: false,
            //新建角色
            form: {
                type: '',
                describe: ''
            },
            //新建角色弹窗
            dialogVisible: false,

            //角色列表
            tableData: []
        };
    },
    methods: {
        //删除角色
        delete(row) {
            console.log(row);
        },

        //新建确定
        newRole() {
            this.dialogVisible = false;
            this.createRole();
        },

        //新建角色接口
        createRole() {
            let roleObject = {};
            roleObject.roleName = this.form.type;
            roleObject.roleDescribe = this.form.describe;
            this.$api.task.createRole(roleObject).then(() => {
                this.$message.success('创建成功');
                this.reload();
            });
        }
    }
};
</script>
