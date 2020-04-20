<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>开发任务概况</span>
                <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="newdevelopList()"
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
                            :disabled="disabled"
                        >
                            <el-form-item label="开始时间">
                                <el-date-picker
                                    v-model="projectForm.developStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-date-picker
                                    v-model="projectForm.developEndDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="开发任务参与人员">
                                <el-input
                                    type="textarea"
                                    v-model="projectForm.developers"
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
                            <el-table-column prop="name" label="人员" width="180"></el-table-column>
                            <el-table-column prop="task" label="任务"></el-table-column>
                            <el-table-column prop="starttime" label="开始时间"></el-table-column>
                            <el-table-column prop="endtime" label="结束时间时间"></el-table-column>
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
                                        @click="editleclick(scope.row, scope.$index)"
                                        :disabled="disabled"
                                    >编辑</el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="deleteClick(scope.row, scope.$index)"
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
            title="新建开发任务"
            v-if="dialogNewDeveltaskVisible"
            :visible.sync="dialogNewDeveltaskVisible"
            width="50%"
            :append-to-body="true"
        >
            <newdeveloppage ref="sonNewdevop" :rowdata="rowdata" :operationmode="operationmode"></newdeveloppage>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogNewDeveltaskVisible = false">取 消</el-button>
                <el-button type="primary" @click="savenewDevelop()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import newdeveloppage from './newdevelopInform.vue';
export default {
    components: {
        newdeveloppage
    },
    data() {
        return {
            disabled: false,

            dialogNewDeveltaskVisible: false,
            projectForm: {
                developStartDate: '',
                developEndDate: '',
                developers: '',
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
            this.projectForm.developStartDate = responseValue.exploitStartTime;
            this.projectForm.developEndDate = responseValue.exploitEndTime;
            this.projectForm.developers = responseValue.exploitUserIdList;
        });
    },
    mounted() {
        let disabled = localStorage.getItem('list');
        this.disabled = JSON.parse(disabled);
    },
    methods: {
        newdevelopList() {
            this.rowdata = {};
            this.operationmode = 'new';
            this.dialogNewDeveltaskVisible = true;
        },
        handleClick(row) {
            this.rowdata = row;
            this.operationmode = 'consult';
            this.dialogNewDeveltaskVisible = true;
        },
        editleclick(row, index) {
            this.index = index;
            this.rowdata = row;
            this.operationmode = 'edit';
            this.dialogNewDeveltaskVisible = true;
        },
        deleteClick(row, index) {
            this.tableData.splice(index, 1);
        },
        savenewDevelop() {
            this.rowdata = {};
            this.rowdata.task = this.$refs.sonNewdevop.newdevelopForm.taskdetail;
            this.rowdata.starttime = this.$refs.sonNewdevop.newdevelopForm.developStartDate;
            this.rowdata.endtime = this.$refs.sonNewdevop.newdevelopForm.developEndDate;
            this.rowdata.testers = this.$refs.sonNewdevop.newdevelopForm.testers;
            this.rowdata.name = localStorage.getItem('ms_name');
            this.dialogNewImpltaskVisible = false;
            if (this.operationmode === 'new') {
                this.tableData.push(this.rowdata);
            } else if (this.operationmode === 'edit') {
                this.tableData.splice(this.index, 1, this.rowdata);
            }

            console.log(this.$refs.sonNewdevop.newdevelopForm.taskdetail);
            console.log(this.$refs.sonNewdevop.newdevelopForm.developStartDate);
            console.log(this.$refs.sonNewdevop.newdevelopForm.developEndDate);
            console.log(this.$refs.sonNewdevop.newdevelopForm.testers);
            this.dialogNewDeveltaskVisible = false;
        }
    }
};
</script>  
<style scoped>
.el-form {
    padding-right: 10px;
}
</style>