<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix" v-if="newimpshowhide">
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
                        <el-form v-model="projectForm" class="dataForm" size="mini" disabled>
                            <el-form-item label="开始时间">
                                <el-date-picker
                                    v-model="projectForm.implStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-date-picker v-model="projectForm.implEndDate" placeholder="请选择"></el-date-picker>
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
                            <el-table-column prop="sendUserName" label="发布人" width="180"></el-table-column>
                            <el-table-column prop="userName" label="执行人" width="180"></el-table-column>
                            <el-table-column prop="workDescribe" label="任务"></el-table-column>
                            <el-table-column prop="starttime" label="开始时间"></el-table-column>
                            <el-table-column prop="endtime" label="结束时间"></el-table-column>
                            <el-table-column label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="handleClick(scope.row)"
                                        type="text"
                                        size="small"
                                        :disabled="disabled"
                                    >查看</el-button>
                                    <!-- <el-button
                                        type="text"
                                        size="small"
                                        @click="editleclick(scope.row , scope.$index)"
                                        :disabled="disabled"
                                    >编辑</el-button>-->
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
            title="新建实施任务"
            :visible.sync="dialogNewImpltaskVisible"
            v-if="dialogNewImpltaskVisible"
            width="50%"
            :append-to-body="true"
            :close-on-click-modal="false"
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
            newimpshowhide: false,
            projectForm: {
                implStartDate: '',
                implEndDate: '',
                implementers: '',
                belongProId: '',
                belongTaskId: ''
            },
            rowdata: {},
            operationmode: '',
            tableData: [],
            dialogNewImpltaskVisible: false,
            index: ''
        };
    },
    created() {
        let pro_id = localStorage.getItem('pro_id');
        let projectObjectId = {};
        projectObjectId.id = pro_id;
        this.$api.task.initProData(projectObjectId).then(response => {
            //初始化表
            let responseValue = response.data;
            //初始化基本信息
            //时间转换
            for (let i = 0; i < responseValue.taskList[1].workList.length; i++) {
                let startDateS = new Date(responseValue.taskList[1].workList[i].starttime);
                let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate()))
                    .toISOString()
                    .slice(0, 10);
                responseValue.taskList[1].workList[i].starttime = startOvwerS;

                let endDateS = new Date(responseValue.taskList[1].workList[i].endtime);
                let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                    .toISOString()
                    .slice(0, 10);
                responseValue.taskList[1].workList[i].endtime = endOvwerS;
            }
            this.tableData = responseValue.taskList[1].workList;

            this.projectForm.implStartDate = responseValue.effectStartTime;
            this.projectForm.implEndDate = responseValue.effectEndTime;
            //储存所属项目id和所属任务id
            this.projectForm.belongProId = responseValue.id;
            this.projectForm.belongTaskId = responseValue.taskList[1].id;

            let implementerslsit = '';
            for (let i = 0; i < responseValue.taskList[1].userList.length; i++) {
                implementerslsit += responseValue.taskList[1].userList[i].name + ',';
            }
            implementerslsit = implementerslsit.slice(0, implementerslsit.length - 1);
            this.projectForm.implementers += implementerslsit;
            //按钮权限
            let disabled = localStorage.getItem('list');
            this.disabled = JSON.parse(disabled);
            let roleId = localStorage.getItem('ms_roleId');
            let username = localStorage.getItem('ms_name');
            let impleList = implementerslsit;
            if (roleId === '0' || roleId === '1') {
                this.newimpshowhide = true;
            } else {
                if (impleList.indexOf(username) > -1) {
                    this.newimpshowhide = true;
                } else {
                    let sssd = JSON.parse(disabled) + '';
                    if (sssd === 'false') {
                        this.disabled = true;
                    }
                    this.newimpshowhide = false;
                }
            }
        });
    },
    mounted() {
        //按钮权限
        let disabled = localStorage.getItem('list');
        this.disabled = JSON.parse(disabled);
        let roleId = localStorage.getItem('ms_roleId');
        if (roleId === '0' || roleId === '1') {
            this.newimpshowhide = true;
        } else {
            this.newimpshowhide = false;
        }
    },
    methods: {
        //新建工作任务
        NewImpltask() {
            this.rowdata = {};
            this.operationmode = 'new';
            this.dialogNewImpltaskVisible = true;
        },
        //查看工作任务
        handleClick(row) {
            this.rowdata = row;
            this.operationmode = 'consult';
            this.dialogNewImpltaskVisible = true;
        },
        //编辑工作任务
        editleclick(row, index) {
            this.index = index;
            this.rowdata = row;
            this.operationmode = 'edit';
            this.dialogNewImpltaskVisible = true;
        },
        //删除工作任务
        deleteClick(row, index) {
            this.index = index;
            this.rowdata = row;
            this.operationmode = 'delete';
            this.tableData[this.index].deleteFlg = 1;
            this.$api.task.updataWork(this.tableData[this.index]).then(() => {
                //刷新表
                let pro_id = localStorage.getItem('pro_id');
                let projectObjectId = {};
                projectObjectId.id = pro_id;
                this.$api.task.initProData(projectObjectId).then(response => {
                    let responseValue = response.data;
                    for (let i = 0; i < responseValue.taskList[1].workList.length; i++) {
                        let startDateS = new Date(responseValue.taskList[1].workList[i].starttime);
                        let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate()))
                            .toISOString()
                            .slice(0, 10);
                        responseValue.taskList[1].workList[i].starttime = startOvwerS;

                        let endDateS = new Date(responseValue.taskList[1].workList[i].endtime);
                        let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                            .toISOString()
                            .slice(0, 10);
                        responseValue.taskList[1].workList[i].endtime = endOvwerS;
                    }
                    this.tableData = responseValue.taskList[1].workList;
                });
            });
        },

        // 确定新建工作任务
        saveNewImpltask() {
            let savedata = {};
            let userData = JSON.parse(localStorage.getItem('ms_data'));
            savedata.sendUserId = userData.id;
            //  savedata.userId = this.$refs.sonNewimplement.checkedimplrmrntId.toString();
            savedata.userId = this.$refs.sonNewimplement.implrmrntForm.userid;
            savedata.workName = this.$refs.sonNewimplement.implrmrntForm.taskdetail;
            savedata.workDescribe = this.$refs.sonNewimplement.implrmrntForm.taskdetail;
            savedata.starttime = this.$refs.sonNewimplement.implrmrntForm.implementStartDate;
            savedata.endtime = this.$refs.sonNewimplement.implrmrntForm.implementEndDate;
            savedata.belongProId = this.projectForm.belongProId;
            savedata.belongTaskId = this.projectForm.belongTaskId;
            savedata.deleteFlg = 0;
            if (this.operationmode == 'new') {
                this.$api.task.newWork(savedata).then(() => {
                    //刷新表
                    let pro_id = localStorage.getItem('pro_id');
                    let projectObjectId = {};
                    projectObjectId.id = pro_id;
                    this.$api.task.initProData(projectObjectId).then(response => {
                        let responseValue = response.data;
                        for (let i = 0; i < responseValue.taskList[1].workList.length; i++) {
                            let startDateS = new Date(responseValue.taskList[1].workList[i].starttime);
                            let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate()))
                                .toISOString()
                                .slice(0, 10);
                            responseValue.taskList[1].workList[i].starttime = startOvwerS;

                            let endDateS = new Date(responseValue.taskList[1].workList[i].endtime);
                            let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                                .toISOString()
                                .slice(0, 10);
                            responseValue.taskList[1].workList[i].endtime = endOvwerS;
                        }
                        this.tableData = responseValue.taskList[1].workList;
                    });
                });
            } else if (this.operationmode == 'edit') {
                let savedata = this.tableData[this.index];
                savedata.workName = this.$refs.sonNewimplement.implrmrntForm.taskdetail;
                savedata.starttime = this.$refs.sonNewimplement.implrmrntForm.implementStartDate;
                savedata.endtime = this.$refs.sonNewimplement.implrmrntForm.implementEndDate;
                this.$api.task.updataWork(savedata).then(() => {
                    //刷新表
                    let pro_id = localStorage.getItem('pro_id');
                    let projectObjectId = {};
                    projectObjectId.id = pro_id;
                    this.$api.task.initProData(projectObjectId).then(response => {
                        let responseValue = response.data;
                        for (let i = 0; i < responseValue.taskList[1].workList.length; i++) {
                            let startDateS = new Date(responseValue.taskList[1].workList[i].starttime);
                            let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate()))
                                .toISOString()
                                .slice(0, 10);
                            responseValue.taskList[1].workList[i].starttime = startOvwerS;

                            let endDateS = new Date(responseValue.taskList[1].workList[i].endtime);
                            let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                                .toISOString()
                                .slice(0, 10);
                            responseValue.taskList[1].workList[i].endtime = endOvwerS;
                        }
                        this.tableData = responseValue.taskList[1].workList;
                    });
                });
            }

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