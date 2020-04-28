<template>
    <div>
        <el-card>
            <dytable
                :columns="personColumns"
                :table-data="persontableData"
                :total="total"
                ref="multipleTable"
                :page-num="pageNum"
                :page-size="pageSize"
                @current-change="onCurrentChange"
                @on-selection-change="onSelectionChange"
                @size-change="onSizeChange"
                v-loading="false"
                element-loading-text="加载中"
            ></dytable>
        </el-card>
        <el-dialog
            title="修改人员信息"
            :visible.sync="dialogNewUserVisible"
            width="50%"
            :append-to-body="true"
            v-if="dialogNewUserVisible"
            :close-on-click-modal="false"
        >
            <userinformation ref="sonNewuser" :rowdata="rowdata" :operationmode="operationmode"/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogNewUserVisible=false">取 消</el-button>
                <el-button type="primary" @click="updateUserData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import userinformation from '../../components/newUserinformation';
export default {
    components: {
        userinformation
    },
    inject: ['reload'],
    data() {
        const { renderControlColumn } = this;
        return {
            personColumns: [
                {
                    key: 'name',
                    title: '姓名',
                },
                {
                    key: 'username',
                    title: '用户名',
                },
                {
                    key: 'roleName',
                    title: '职位',
                },
                {
                    key: 'authName',
                    title: '权限',
                },
                {
                    render: renderControlColumn,
                    title: '操作'
                }
            ],
            rowdata: {},
            operationmode: '',
            dialogNewUserVisible: false,
            persontableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            showNewUser: false,
        };
    },
    created() {
        //人员详情
        this.$api.task.getAllUser().then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let returndata = responsevalue.data;
                this.persontableData = returndata;
            } else {
                this.$message.success('请联系Admin!');
            }
        });
    },
    methods: {
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        onSizeChange(val) {
            this.pageSize = val;
        },
        onCurrentChange(val) {
            this.pageNum = val;
        },
        updateUserData() {
            var usernameS = this.$refs.sonNewuser.newUserForm.username;
            if (!usernameS) {
                this.$message.success('请输入姓名!');
                return false;
            }
            var usernameStrn = this.$refs.sonNewuser.newUserForm.usernameString;
            if (!usernameStrn) {
                this.$message.success('请输入用户名!');
                return false;
            } else {
                var reg = new RegExp(/^[a-zA-Z0-9]+$/);
                if (!reg.test(usernameStrn)) {
                    this.$message.success('用户名只能输入字母和数字!');
                    return false;
                }
            }
            var userroleidS = this.$refs.sonNewuser.newUserForm.userroleid;
            if (!userroleidS) {
                this.$message.success('请选择职位!');
                return false;
            }
            var userauthidS = this.$refs.sonNewuser.newUserForm.userauthid;
            if (!userauthidS) {
                this.$message.success('请选择权限!');
                return false;
            }
            let userObject = {};
            let todaydate = new Date();
            userObject.id = this.$refs.sonNewuser.rowdata.id;
            userObject.name = this.$refs.sonNewuser.newUserForm.username;
            userObject.username = this.$refs.sonNewuser.newUserForm.usernameString;
            userObject.password = this.$refs.sonNewuser.rowdata.password;
            userObject.roleId = this.$refs.sonNewuser.newUserForm.userroleid;
            userObject.authId = this.$refs.sonNewuser.newUserForm.userauthid;
            userObject.state = this.$refs.sonNewuser.rowdata.state;
            userObject.inserttime = this.$refs.sonNewuser.rowdata.inserttime;
            userObject.updatetime = todaydate;
            userObject.workList = this.$refs.sonNewuser.rowdata.workList;
            userObject.taskList= this.$refs.sonNewuser.rowdata.taskList;
            userObject.deleteFlg = 0;
            this.$api.task.changedataUser(userObject).then(() => {
                this.dialogNewUserVisible=false;
                this.reload();
                this.$message.success('更新成功!');
            });
        },
        onRowLookButtonClick(row){
            this.rowdata = row;
            this.operationmode = 'edit';
            this.dialogNewUserVisible=true;
        },
        onRowremoveButtonClick(row){
            let userObject = {};
            let todaydate = new Date();
            userObject.id = row.id;
            userObject.name = row.name;
            userObject.username = row.username;
            userObject.password = row.password;
            userObject.roleId = row.roleId;
            userObject.authId = row.authId;
            userObject.state = row.state;
            userObject.inserttime = row.inserttime;
            userObject.updatetime = todaydate;
            userObject.workList = row.workList;
            userObject.taskList= row.taskList;
            userObject.deleteFlg = 1;
            let couruser=row.id;
            let loginuser=localStorage.getItem('ms_id');

            let messageStr="确认删除"+row.roleName+":"+row.name+"?";
            let tital="删除用户";
            this.$confirm(tital,messageStr).then(() => {
                this.$api.task.changedataUser(userObject).then(() => {
                    this.reload();
                    this.$message.success('删除成功!');
                    if(couruser === loginuser){
                        this.$message.success('你已被删除，请重新登录!');
                        this.$router.push('/login');
                    }
                });
            }).catch(() => {
                this.$message.success('取消删除!');
            });
        },
        renderControlColumn({ row }) {
           const { onRowLookButtonClick, onRowremoveButtonClick } = this;
            const ret = [];
            ret.push(
                <div>
                    <el-button type="text" icon="el-icon-folder-opened" onClick={() => onRowLookButtonClick(row)}>
                        编辑
                    </el-button>
                    <el-button type="text" icon="el-icon-edit" onClick={() => onRowremoveButtonClick(row)}>
                        删除
                    </el-button>
                </div>
            );
            return <div>{ret}</div>;
        }
    }
};
</script>
<style scoped>
</style>