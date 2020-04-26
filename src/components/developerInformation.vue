<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix" v-if="newdevelopshow">
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
                        <el-form v-model="projectForm" class="dataForm" size="mini" disabled>
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
                                        @click="editleclick(scope.row, scope.$index)"
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
            title="新建开发任务"
            v-if="dialogNewDeveltaskVisible"
            :visible.sync="dialogNewDeveltaskVisible"
            width="50%"
            :append-to-body="true"
            :close-on-click-modal="false"
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
            newdevelopshow: false,
            dialogNewDeveltaskVisible: false,
            projectForm: {
                developStartDate: '',
                developEndDate: '',
                developers: '',
                testers: '',
                belongProId: '',
                belongTaskId: ''
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
            //初始化表
            let responseValue = response.data;
            //初始化基本信息

            //时间转换
            for (let i = 0; i < responseValue.taskList[2].workList.length; i++) {
                let startDateS = new Date(responseValue.taskList[2].workList[i].startTime);
                let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate())).toISOString().slice(0, 10);
                responseValue.taskList[2].workList[i].starttime = startOvwerS;

                let endDateS = new Date(responseValue.taskList[2].workList[i].endTime);
                let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate())).toISOString().slice(0, 10);
                responseValue.taskList[2].workList[i].endtime = endOvwerS;
            }
            this.tableData = responseValue.taskList[2].workList;

            this.projectForm.developStartDate = responseValue.exploitStartTime;
            this.projectForm.developEndDate = responseValue.exploitEndTime;
            //储存所属项目id和所属任务id
            this.projectForm.belongProId = responseValue.id;
            this.projectForm.belongTaskId = responseValue.taskList[2].id;
            this.projectForm.developers = '';
            let userslsit = '';
            for (let i = 0; i < responseValue.taskList[2].userList.length; i++) {
                userslsit += responseValue.taskList[2].userList[i].name + ',';
            }
            userslsit = userslsit.slice(0, userslsit.length - 1);
            this.projectForm.developers += userslsit;
            let projectLeadeStr="";
            for (let i = 0; i < responseValue.taskList[0].userList.length; i++) {
                projectLeadeStr+=responseValue.taskList[0].userList[i].name + ',';
            }
            //按钮权限
            let disabled = localStorage.getItem('list');
            this.disabled = JSON.parse(disabled);
            let roleId = localStorage.getItem('ms_roleId');
            let username = localStorage.getItem('ms_name');
            if (roleId === '0' || roleId === '1') {
                this.newdevelopshow = true;
            } else {
                if (userslsit.indexOf(username) > -1) {
                    this.newdevelopshow = true;
                }else if(projectLeadeStr.indexOf(username) > -1){
                    this.newdevelopshow = true;
                }else {
                    let sssd = JSON.parse(disabled) + '';
                    if (sssd === 'false') {
                        this.disabled = true;
                    }
                    this.newdevelopshow = false;
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
            this.newdevelopshow = true;
        } else {
            this.newdevelopshow = false;
        }
    },
    methods: {
        //新建工作任务
        newdevelopList() {
            this.rowdata = {};
            this.operationmode = 'new';
            this.dialogNewDeveltaskVisible = true;
        },
        //查看工作任务
        handleClick(row) {
            this.rowdata = row;
            this.operationmode = 'consult';
            this.dialogNewDeveltaskVisible = true;
        },
        //编辑工作任务
        editleclick(row, index) {
            this.index = index;
            this.rowdata = row;
            this.operationmode = 'edit';
            this.dialogNewDeveltaskVisible = true;
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
                    //时间转换
                    for (let i = 0; i < responseValue.taskList[2].workList.length; i++) {
                        let startDateS = new Date(responseValue.taskList[2].workList[i].startTime);
                        let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate())).toISOString().slice(0, 10);
                        responseValue.taskList[2].workList[i].starttime = startOvwerS;

                        let endDateS = new Date(responseValue.taskList[2].workList[i].endTime);
                        let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate())).toISOString().slice(0, 10);
                        responseValue.taskList[2].workList[i].endtime = endOvwerS;
                    }
                    this.tableData = responseValue.taskList[2].workList;
                });
            });
        },

        // 校验
        check() {
            if (this.$refs.sonNewdevop.newdevelopForm.userid == '') {
                this.$message.error('请输入执行人');
                this.checkflag = false;
            } else if (this.$refs.sonNewdevop.newdevelopForm.taskdetail == '') {
                this.$message.error('请输入任务概述');
                this.checkflag = false;
            } else if (this.$refs.sonNewdevop.newdevelopForm.developStartDate == '') {
                this.$message.error('请选择开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewdevop.newdevelopForm.developEndDate == '') {
                this.$message.error('请选择结束时间');
                this.checkflag = false;
            } else {
                this.checkflag = true;
            }
        },
        // 确定新建工作任务
        savenewDevelop() {
            this.check();
            if (this.checkflag) {
                let savedata = {};
                let userData = JSON.parse(localStorage.getItem('ms_data'));
                savedata.sendUserId = userData.id;
                // savedata.userId = this.$refs.sonNewdevop.checkedUseNameId.toString();
                savedata.userId = this.$refs.sonNewdevop.newdevelopForm.userid;
                savedata.workName = this.$refs.sonNewdevop.newdevelopForm.taskdetail;
                savedata.workDescribe = this.$refs.sonNewdevop.newdevelopForm.taskdetail;
                savedata.startTime = this.$refs.sonNewdevop.newdevelopForm.developStartDate;
                savedata.endTime = this.$refs.sonNewdevop.newdevelopForm.developEndDate;
                savedata.belongProId = this.projectForm.belongProId;
                savedata.belongTaskId = this.projectForm.belongTaskId;
                savedata.deleteFlg = 0;
                if (this.operationmode == 'new') {
                    //抄送人ID
                    let chaosongID = [];
                    chaosongID = this.$refs.sonNewdevop.checkedPostId;
                    //登录用户
                    let crueateid = localStorage.getItem('ms_id');
                    let crueatename = localStorage.getItem('ms_name');
                    let crueateusername = localStorage.getItem('ms_username');
                    var dates = new Date();
                    let taskdetail = this.$refs.sonNewdevop.newdevelopForm.taskdetail;
                    this.$api.task.newWork(savedata).then(() => {
                        //刷新表
                        let pro_id = localStorage.getItem('pro_id');
                        let projectObjectId = {};
                        projectObjectId.id = pro_id;
                        this.$api.task.initProData(projectObjectId).then(response => {
                            let responseValue = response.data;
                            //时间转换
                            for (let i = 0; i < responseValue.taskList[2].workList.length; i++) {
                                let startDateS = new Date(responseValue.taskList[2].workList[i].startTime);
                                let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate())).toISOString().slice(0, 10);
                                responseValue.taskList[2].workList[i].starttime = startOvwerS;

                                let endDateS = new Date(responseValue.taskList[2].workList[i].endTime);
                                let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate())).toISOString().slice(0, 10);
                                responseValue.taskList[2].workList[i].endtime = endOvwerS;
                            }
                            this.tableData = responseValue.taskList[2].workList;
                        });
                        //发任务消息
                        if (chaosongID.length > 0) {
                            for (var i = 0; i < chaosongID.length; i++) {
                                if (chaosongID[i]) {
                                    let messageObject = {};
                                    messageObject.id = '';
                                    messageObject.messageType = '0';
                                    messageObject.messageName = '任务邀请:' + taskdetail;
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
                    //抄送人ID
                    let chaosongID = [];
                    chaosongID = this.$refs.sonNewdevop.checkedPostId;
                    //登录用户
                    let crueateid = localStorage.getItem('ms_id');
                    let crueatename = localStorage.getItem('ms_name');
                    let crueateusername = localStorage.getItem('ms_username');
                    var dates1 = new Date();
                    let savedata = this.tableData[this.index];
                    savedata.workName = this.$refs.sonNewdevop.newdevelopForm.taskdetail;
                    savedata.starttime = this.$refs.sonNewdevop.newdevelopForm.implementStartDate;
                    savedata.endtime = this.$refs.sonNewdevop.newdevelopForm.implementEndDate;
                    let taskdetail1 = this.$refs.sonNewdevop.newdevelopForm.taskdetail;
                    this.$api.task.updataWork(savedata).then(() => {
                        //刷新表
                        let pro_id = localStorage.getItem('pro_id');
                        let projectObjectId = {};
                        projectObjectId.id = pro_id;
                        this.$api.task.initProData(projectObjectId).then(response => {
                            let responseValue = response.data;

                            //时间转换
                            for (let i = 0; i < responseValue.taskList[2].workList.length; i++) {
                                let startDateS = new Date(responseValue.taskList[2].workList[i].startTime);
                                let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate())).toISOString().slice(0, 10);
                                responseValue.taskList[2].workList[i].starttime = startOvwerS;

                                let endDateS = new Date(responseValue.taskList[2].workList[i].endTime);
                                let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate())).toISOString().slice(0, 10);
                                responseValue.taskList[2].workList[i].endtime = endOvwerS;
                            }
                            this.tableData = responseValue.taskList[2].workList;
                        });
                        //发任务消息
                        if (chaosongID.length > 0) {
                            for (var i = 0; i < chaosongID.length; i++) {
                                if (chaosongID[i]) {
                                    let messageObject = {};
                                    messageObject.id = '';
                                    messageObject.messageType = '0';
                                    messageObject.messageName = '任务邀请:' + taskdetail1;
                                    messageObject.messageDescribe = crueatename + '给你配发任务.';
                                    messageObject.sendUserid = crueateid;
                                    messageObject.receiveUserid = chaosongID[i];
                                    messageObject.state = '0';
                                    messageObject.inserttime = dates1;
                                    messageObject.updatetime = dates1;
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
                this.dialogNewDeveltaskVisible = false;
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