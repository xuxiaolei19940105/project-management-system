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
                            <el-table-column prop="sendUserName" label="发布人" width="180"></el-table-column>
                            <el-table-column prop="userName" label="执行人" width="180"></el-table-column>
                            <el-table-column prop="workDescribe" label="任务"></el-table-column>
                            <el-table-column prop="starttime" label="开始时间"></el-table-column>
                            <el-table-column prop="endtime" label="结束时间"></el-table-column>
                            <el-table-column prop="estimatedResult" label="预计结果"></el-table-column>
                            <el-table-column prop="actualResult" label="实际结果"></el-table-column>
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
                                        @click="editleclick(scope.row,scope.$index)"
                                        :disabled="disabled"
                                    >编辑</el-button>-->
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
            title="新建测试任务"
            :visible.sync="dialogNewtesttaskVisible"
            v-if="dialogNewtesttaskVisible"
            width="50%"
            :append-to-body="true"
            :close-on-click-modal="false"
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
            index: '',
            checkflag: true
        };
    },
    created() {
        let pro_id = localStorage.getItem('pro_id');
        let projectObjectId = {};
        projectObjectId.id = pro_id;
        this.$api.task.initProData(projectObjectId).then(response => {
            debugger
            let responseValue = response.data;
            // 初始化表
            //时间转换
            for (let i = 0; i < responseValue.taskList[3].workList.length; i++) {
                let startDateS = new Date(responseValue.taskList[3].workList[i].starttime);
                let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate()))
                    .toISOString()
                    .slice(0, 10);
                responseValue.taskList[3].workList[i].starttime = startOvwerS;

                let endDateS = new Date(responseValue.taskList[3].workList[i].endtime);
                let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                    .toISOString()
                    .slice(0, 10);
                responseValue.taskList[3].workList[i].endtime = endOvwerS;
            }
            this.tableData = responseValue.taskList[3].workList;

            //初始化基本信息
            this.projectForm.testStartDate = responseValue.testStartTime;
            this.projectForm.testEndDate = responseValue.testEndTime;
            this.projectForm.testers = responseValue.testUserIdList;
            this.projectForm.testers = '';
            let testuser = '';
            for (let i = 0; i < responseValue.taskList[3].userList.length; i++) {
                testuser += responseValue.taskList[3].userList[i].name + ',';
            }
            testuser = testuser.slice(0, testuser.length - 1);
            this.projectForm.testers += testuser;
            //按钮权限
            let disabled = localStorage.getItem('list');
            this.disabled = JSON.parse(disabled);
            let roleId = localStorage.getItem('ms_roleId');
            let username = localStorage.getItem('ms_name');
            if (roleId === '0' || roleId === '1' || roleId === '4') {
                this.newtestshow = true;
            } else {
                if (testuser.indexOf(username) > -1) {
                    this.newtestshow = true;
                } else {
                    let sssd = JSON.parse(disabled) + '';
                    if (sssd === 'false') {
                        this.disabled = true;
                    }
                    this.newtestshow = false;
                }
            }
            //储存所属项目id和所属任务id
            this.belongProId = responseValue.id;
            this.belongTaskId = responseValue.taskList[3].id;
        });
    },
    mounted() {
        //按钮权限
        let disabled = localStorage.getItem('list');
        this.disabled = JSON.parse(disabled);
        let roleId = localStorage.getItem('ms_roleId');
        if (roleId === '0' || roleId === '1' || roleId === '4') {
            this.newtestshow = true;
        } else {
            this.newtestshow = false;
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
                    for (let i = 0; i < responseValue.taskList[3].workList.length; i++) {
                        let startDateS = new Date(responseValue.taskList[3].workList[i].starttime);
                        let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate()))
                            .toISOString()
                            .slice(0, 10);
                        responseValue.taskList[3].workList[i].starttime = startOvwerS;

                        let endDateS = new Date(responseValue.taskList[3].workList[i].endtime);
                        let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                            .toISOString()
                            .slice(0, 10);
                        responseValue.taskList[3].workList[i].endtime = endOvwerS;
                    }
                    this.tableData = responseValue.taskList[3].workList;
                });
            });
        },

        // 校验
        check() {
            if (this.$refs.sonNewtestinform.newtesterForm.userid == '') {
                this.$message.error('请输入执行人');
                this.checkflag = false;
            } else if (this.$refs.sonNewtestinform.newtesterForm.taskdetail == '') {
                this.$message.error('请输入任务概述');
                this.checkflag = false;
            } else if (this.$refs.sonNewtestinform.newtesterForm.testerStartDate == '') {
                this.$message.error('请选择开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewtestinform.newtesterForm.testerEndDate == '') {
                this.$message.error('请选择结束时间');
                this.checkflag = false;
            } else {
                this.checkflag = true;
            }
        },

        // 确定新建工作任务
        savenewTester() {
            this.check();
            if (this.checkflag) {
                let savedata = {};
                let userData = JSON.parse(localStorage.getItem('ms_data'));
                savedata.sendUserId = userData.id;
                savedata.userId = this.$refs.sonNewtestinform.newtesterForm.userid;
                // savedata.userId = this.$refs.sonNewtestinform.checkedUseNameId.toString();
                savedata.workName = this.$refs.sonNewtestinform.newtesterForm.taskdetail;
                savedata.workDescribe = this.$refs.sonNewtestinform.newtesterForm.taskdetail;
                savedata.starttime = this.$refs.sonNewtestinform.newtesterForm.testerStartDate;
                savedata.endtime = this.$refs.sonNewtestinform.newtesterForm.testerEndDate;
                savedata.belongProId = this.belongProId;
                savedata.belongTaskId = this.belongTaskId;
                savedata.estimatedResult = this.$refs.sonNewtestinform.newtesterForm.expectedresults;
                savedata.actualResult = this.$refs.sonNewtestinform.newtesterForm.actualresults;
                //抄送人ID
                let chaosongID = [];
                chaosongID = this.$refs.sonNewtestinform.checkedPostId;
                //登录用户
                let crueateid = localStorage.getItem('ms_id');
                let crueatename = localStorage.getItem('ms_name');
                let crueateusername = localStorage.getItem('ms_username');
                var dates = new Date();
                let radioValue = this.$refs.sonNewtestinform.newtesterForm.radio;
                let taskdetail = '';
                let meesagetype = '';
                if (radioValue === 'Yes') {
                    taskdetail = this.$refs.sonNewtestinform.newtesterForm.bugtital;
                    taskdetail = '测试BUG:' + taskdetail;
                    meesagetype = '1';
                } else {
                    taskdetail = this.$refs.sonNewtestinform.newtesterForm.taskdetail;
                    taskdetail = '测试任务邀请:' + taskdetail;
                    meesagetype = '0';
                }
                if (this.operationmode == 'new') {
                    this.$api.task.newWork(savedata).then(() => {
                        //刷新表
                        let pro_id = localStorage.getItem('pro_id');
                        let projectObjectId = {};
                        projectObjectId.id = pro_id;
                        this.$api.task.initProData(projectObjectId).then(response => {
                            let responseValue = response.data;
                            for (let i = 0; i < responseValue.taskList[3].workList.length; i++) {
                                let startDateS = new Date(responseValue.taskList[3].workList[i].starttime);
                                let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate()))
                                    .toISOString()
                                    .slice(0, 10);
                                responseValue.taskList[3].workList[i].starttime = startOvwerS;

                                let endDateS = new Date(responseValue.taskList[3].workList[i].endtime);
                                let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                                    .toISOString()
                                    .slice(0, 10);
                                responseValue.taskList[3].workList[i].endtime = endOvwerS;
                            }
                            this.tableData = responseValue.taskList[3].workList;
                        });
                        //发任务消息
                        if (chaosongID.length > 0) {
                            for (var i = 0; i < chaosongID.length; i++) {
                                if (chaosongID[i]) {
                                    let messageObject = {};
                                    messageObject.id = '';
                                    messageObject.messageType = meesagetype;
                                    messageObject.messageName = taskdetail;
                                    messageObject.messageDescribe = crueatename + '给你配发任务.';
                                    messageObject.sendUserid = crueateid;
                                    messageObject.receiveUserid = chaosongID[i];
                                    messageObject.state = '0';
                                    messageObject.inserttime = dates;
                                    messageObject.updatetime = dates;
                                    messageObject.readTag = '0';
                                    messageObject.sendUserName = crueateusername;
                                    messageObject.receiveUserName = '';
                                    this.$api.task.newMessage(messageObject).then(() => {});
                                }
                            }
                        }
                    });
                } else if (this.operationmode == 'edit') {
                    let savedata = this.tableData[this.index];
                    savedata.workName = this.$refs.sonNewtestinform.newtesterForm.taskdetail;
                    savedata.starttime = this.$refs.sonNewtestinform.newtesterForm.implementStartDate;
                    savedata.endtime = this.$refs.sonNewtestinform.newtesterForm.implementEndDate;
                    this.$api.task.updataWork(savedata).then(() => {
                        //刷新表
                        let pro_id = localStorage.getItem('pro_id');
                        let projectObjectId = {};
                        projectObjectId.id = pro_id;
                        this.$api.task.initProData(projectObjectId).then(response => {
                            let responseValue = response.data;
                            for (let i = 0; i < responseValue.taskList[3].workList.length; i++) {
                                let startDateS = new Date(responseValue.taskList[3].workList[i].starttime);
                                let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate()))
                                    .toISOString()
                                    .slice(0, 10);
                                responseValue.taskList[3].workList[i].starttime = startOvwerS;

                                let endDateS = new Date(responseValue.taskList[3].workList[i].endtime);
                                let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                                    .toISOString()
                                    .slice(0, 10);
                                responseValue.taskList[3].workList[i].endtime = endOvwerS;
                            }
                            this.tableData = responseValue.taskList[3].workList;
                        });
                        //发任务消息
                        if (chaosongID.length > 0) {
                            for (var i = 0; i < chaosongID.length; i++) {
                                if (chaosongID[i]) {
                                    let messageObject = {};
                                    messageObject.id = '';
                                    messageObject.messageType = meesagetype;
                                    messageObject.messageName = taskdetail;
                                    messageObject.messageDescribe = crueatename + '给你配发任务.';
                                    messageObject.sendUserid = crueateid;
                                    messageObject.receiveUserid = chaosongID[i];
                                    messageObject.state = '0';
                                    messageObject.inserttime = dates;
                                    messageObject.updatetime = dates;
                                    messageObject.readTag = '0';
                                    messageObject.sendUserName = crueateusername;
                                    messageObject.receiveUserName = '';
                                    this.$api.task.newMessage(messageObject).then(() => {});
                                }
                            }
                        }
                    });
                }
                //关闭弹窗
                this.dialogNewtesttaskVisible = false;
            }
        }
    }
};
</script>  
<style scoped>
.el-form {
    padding-right: 10px;
}
</style>