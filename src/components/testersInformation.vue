<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix" v-if="newtestshow">
                <span>测试任务概况</span>
                <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="Newtesttask()"
                    :disabled="disabled"
                >新建任务</el-button>
            </div>
            <el-row>
                <el-col :span="6">
                    <div class="left">
                        <el-form v-model="projectForm" class="dataForm" size="mini" disabled>
                            <el-form-item label="开始时间">
                                <el-date-picker
                                    v-model="projectForm.testStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>

                            <el-form-item label="结束时间">
                                <el-date-picker v-model="projectForm.testEndDate" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="测试任务参与人员">
                                <el-input
                                    type="textarea"
                                    v-model="projectForm.testers"
                                    style="height:70px"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="tablebox">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%"
                            height="250"
                            size="mini"
                        >
                            <el-table-column prop="userName" label="人员" width="100"></el-table-column>
                            <el-table-column prop="workDescribe" label="任务"></el-table-column>
                            <el-table-column label="开始时间">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.starttime.slice(0, 10) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="endtime" label="结束时间时间">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.endtime.slice(0, 10) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="want" label="预计结果"></el-table-column>
                            <el-table-column prop="actual" label="实际结果"></el-table-column>
                            <el-table-column label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="handleClick(scope.row)"
                                        type="text"
                                        size="small"
                                        :disabled="disabled"
                                    >查看</el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="editleclick(scope.row,scope.$index)"
                                        :disabled="disabled"
                                    >编辑</el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="deleteClick(scope.row,scope.$index)"
                                        :disabled="disabled"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog
            title="新建实施任务"
            :visible.sync="dialogNewtesttaskVisible"
            v-if="dialogNewtesttaskVisible"
            width="50%"
            :append-to-body="true"
            :close-on-click-modal='false'
        >
            <newtesttaskpage
                ref="sonNewtestinform"
                :rowdata="rowdata"
                :operationmode="operationmode"
            ></newtesttaskpage>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogNewtesttaskVisible = false">取 消</el-button>
                <el-button type="primary" @click="savenewTester()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import newtesttaskpage from './newtestersinform.vue';
export default {
    components: {
        newtesttaskpage
    },
    data() {
        return {
            disabled: false,
            newtestshow: false,
            dialogNewtesttaskVisible: false,
            projectForm: {
                testStartDate: '',
                testEndDate: '',
                testers: ''
            },
            rowdata: {},
            operationmode: '',
            tableData: [],
            index: ''
        };
    },
    created() {
        let pro_id = localStorage.getItem('pro_id');
        let projectObjectId = {};
        projectObjectId.id = pro_id;
        this.$api.task.initProData(projectObjectId).then(response => {
            let responseValue = response.data;
            // 初始化表
            this.tableData = responseValue.taskList[2].workList;
            //初始化基本信息
            this.projectForm.testStartDate = responseValue.testStartTime;
            this.projectForm.testEndDate = responseValue.testEndTime;
            this.projectForm.testers = responseValue.testUserIdList;
            this.projectForm.testers = '';
            for (let i = 0; i < responseValue.taskList[2].userList.length; i++) {
                this.projectForm.testers += responseValue.taskList[2].userList[i].name + ',';
            }
            //储存所属项目id和所属任务id
            this.belongProId = responseValue.id;
            this.belongTaskId = responseValue.taskList[2].id;
        });
    },
    mounted() {
        //按钮权限
        let disabled = localStorage.getItem('list');
        this.disabled = JSON.parse(disabled);
        let roleId= localStorage.getItem('ms_roleId');
        if(roleId ==="0" || roleId ==="1" || roleId ==="4"){
            this.newtestshow =true;
        }else{
            this.newtestshow =false;
        }
    },
    methods: {
        //新建工作任务
        Newtesttask() {
            this.rowdata = {};
            this.operationmode = 'new';
            this.dialogNewtesttaskVisible = true;
        },
        //查看工作任务
        handleClick(row) {
            this.rowdata = row;
            this.operationmode = 'consult';
            this.dialogNewtesttaskVisible = true;
        },
        //编辑工作任务
        editleclick(row, index) {
            this.index = index;
            this.rowdata = row;
            this.operationmode = 'edit';
            this.dialogNewtesttaskVisible = true;
        },
        //删除工作任务
        deleteClick(row, index) {
            this.tableData.splice(index, 1);
        },
        // 确定新建工作任务
        savenewTester() {
            let savedata = {};
            let userData = JSON.parse(localStorage.getItem('ms_data'));
            savedata.userName = userData.name;
            savedata.workDescribe = this.$refs.sonNewtestinform.newtesterForm.taskdetail;
            savedata.starttime = this.$refs.sonNewtestinform.newtesterForm.testerStartDate;
            savedata.endtime = this.$refs.sonNewtestinform.newtesterForm.testerEndDate;
            savedata.belongProId = this.belongProId;
            savedata.belongTaskId = this.belongTaskId;
            savedata.want = this.$refs.sonNewtestinform.newtesterForm.expectedresults;
            savedata.actual = this.$refs.sonNewtestinform.newtesterForm.actualresults;
            this.$api.task.newWork(savedata).then(() => {
                //刷新表
                debugger;
                let pro_id = localStorage.getItem('pro_id');
                let projectObjectId = {};
                projectObjectId.id = pro_id;
                this.$api.task.initProData(projectObjectId).then(response => {
                    this.responseValue = response.data;
                    this.tableData = this.responseValue.taskList[1].workList;
                });
            });
            //关闭弹窗
            this.dialogNewtesttaskVisible = false;
        }
    }
};
</script>  
<style scoped>
.el-form {
    padding-right: 10px;
}
</style>