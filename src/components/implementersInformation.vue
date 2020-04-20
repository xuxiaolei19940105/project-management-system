<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>实施任务概况</span>
                <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="NewImpltask()"
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
                                <el-input v-model="projectForm.implStartDate"></el-input>
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-input v-model="projectForm.implEndDate"></el-input>
                            </el-form-item>
                            <el-form-item label="实施任务参与人员">
                                <el-input
                                    type="textarea"
                                    v-model="projectForm.implementers"
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
                                        @click="editleclick(scope.row)"
                                        :disabled="disabled"
                                    >编辑</el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="deleteClick(scope.row)"
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
            :visible.sync="dialogNewImpltaskVisible"
            v-if="dialogNewImpltaskVisible"
            width="50%"
            :append-to-body="true"
        >
            <newImpltaskpage
                ref="sonNewimplement"
                :rowdata="rowdata"
                :operationmode="operationmode"
            ></newImpltaskpage>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogNewImpltaskVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveNewImpltask()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import newImpltaskpage from './newimplementerInform.vue';
export default {
    components: {
        newImpltaskpage
    },

    data() {
        return {
            disabled: false,

            projectForm: {
                implStartDate: '',
                implEndDate: '',
                implementers: ''
            },
            rowdata: {},
            operationmode: '',
            tableData: [
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                }
            ],
            dialogNewImpltaskVisible: false
        };
    },
    created() {
        let pro_id = localStorage.getItem('pro_id');
        let projectObjectId = {};
        projectObjectId.id = pro_id;
        this.$api.task.initProData(projectObjectId).then(response => {
            let responseValue = response.data;
            this.projectForm.implStartDate = responseValue.effectStartTime;
            this.projectForm.implEndDate = responseValue.effectEndTime;
            this.projectForm.implementers = responseValue.effectUserIdList;
        });
    },
    mounted() {
        let disabled = localStorage.getItem('list');
        this.disabled = JSON.parse(disabled);
    },
    methods: {
        NewImpltask() {
            this.rowdata = {};
            this.operationmode = 'new';
            this.dialogNewImpltaskVisible = true;
        },
        handleClick(row) {
            this.rowdata = row;
            this.operationmode = 'consult';
            this.dialogNewImpltaskVisible = true;
        },
        editleclick(row) {
            this.rowdata = row;
            this.operationmode = 'edit';
            this.dialogNewImpltaskVisible = true;
        },
        deleteClick(row) {
            console.log(row);
        },
        saveNewImpltask() {
            console.log(this.$refs.sonNewimplement.implrmrntForm.taskdetail);
            console.log(this.$refs.sonNewimplement.implrmrntForm.implementStartDate);
            console.log(this.$refs.sonNewimplement.implrmrntForm.implementEndDate);
            this.dialogNewImpltaskVisible = false;
        }
    }
};
</script>  
<style scoped>
.el-form {
    padding-right: 10px;
}
</style>