<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
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
                        <el-form
                            v-model="projectForm"
                            class="dataForm"
                            size="mini"
                            disabled=""
                        >
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
                            <el-table-column prop="name" label="人员" width="100"></el-table-column>
                            <el-table-column prop="task" label="任务"></el-table-column>
                            <el-table-column prop="starttime" label="开始时间"></el-table-column>
                            <el-table-column prop="endtime" label="结束时间时间"></el-table-column>
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
            this.projectForm.testStartDate = responseValue.testStartTime;
            this.projectForm.testEndDate = responseValue.testEndTime;
            this.projectForm.testers = responseValue.testUserIdList;
            this.projectForm.testers = '';
            for (let i = 0; i < responseValue.taskList[2].userList.length; i++) {
                this.projectForm.testers += responseValue.taskList[2].userList[i].name + ',';
            }
        });
    },
    mounted() {
        let disabled = localStorage.getItem('list');
        this.disabled = JSON.parse(disabled);
    },
    methods: {
        Newtesttask() {
            this.rowdata = {};
            this.operationmode = 'new';
            this.dialogNewtesttaskVisible = true;
        },
        handleClick(row) {
            this.rowdata = row;
            this.operationmode = 'consult';
            this.dialogNewtesttaskVisible = true;
        },
        editleclick(row, index) {
            this.index = index;
            this.rowdata = row;
            this.operationmode = 'edit';
            this.dialogNewtesttaskVisible = true;
        },
        deleteClick(row, index) {
            this.tableData.splice(index, 1);
        },
        savenewTester() {
            this.rowdata = {};
            this.rowdata.task = this.$refs.sonNewtestinform.newtesterForm.taskdetail;
            this.rowdata.starttime = this.$refs.sonNewtestinform.newtesterForm.testerStartDate;
            this.rowdata.endtime = this.$refs.sonNewtestinform.newtesterForm.testerEndDate;
            this.rowdata.name = localStorage.getItem('ms_name');
            this.rowdata.want = this.$refs.sonNewtestinform.newtesterForm.expectedresults;
            this.rowdata.actual = this.$refs.sonNewtestinform.newtesterForm.actualresults;
            this.dialogNewImpltaskVisible = false;
            if (this.operationmode === 'new') {
                this.tableData.push(this.rowdata);
            } else if (this.operationmode === 'edit') {
                this.tableData.splice(this.index, 1, this.rowdata);
            }

            console.log(this.$refs.sonNewtestinform.newtesterForm.taskdetail);
            console.log(this.$refs.sonNewtestinform.newtesterForm.radio);
            console.log(this.$refs.sonNewtestinform.newtesterForm.expectedresults);
            console.log(this.$refs.sonNewtestinform.newtesterForm.actualresults);
            console.log(this.$refs.sonNewtestinform.newtesterForm.testerStartDate);
            console.log(this.$refs.sonNewtestinform.newtesterForm.testerEndDate);
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