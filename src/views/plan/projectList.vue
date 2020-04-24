<template>
    <div>
        <el-card>
            <div style="text-align:right;padding-bottom:10px;" v-if="showNewProject">
                <el-button size="mini" @click="newprojectVisible">新建项目</el-button>
            </div>
            <dytable
                :columns="columns"
                :table-data="table"
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
            title="项目信息"
            :visible.sync="dialogVisible"
            width="80%"
            :append-to-body="true"
            v-if="dialogVisible"
            :close-on-click-modal='false'
        >
            <projectPage ref="sonEditproject" ></projectPage>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialogVisible">取 消</el-button>
                <el-button type="primary" @click="geteditProjectData">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="新建项目"
            :visible.sync="dialogNewprojectVisible"
            width="80%"
            :append-to-body="true"
            v-if="dialogNewprojectVisible"
            :close-on-click-modal='false'
        >
            <project-information ref="sonNewproject" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialogVisible">取 消</el-button>
                <el-button type="primary" @click="getNewProjectData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import projectPage from '../../components/projectPage.vue';
import projectInformation from '../../components/projectInformation.vue';
export default {
    components: {
        projectPage,
        projectInformation
    },
    inject: ['reload'],
    data() {
        const { renderControlColumn } = this;
        const { renderStartTimeDate } = this;
        const { renderEndTimeDate } = this;
        const { renderprojectNo } = this;
        return {
            operationmode: '',
            showNewProject: false,
            dialogVisible: false,
            dialogNewprojectVisible: false,
            dialogNewImpltaskVisible: false,
            columns: [
                {
                    key: 'projectNo',
                    title: '项目编号',
                    render: renderprojectNo
                },
                {
                    key: 'name',
                    title: '项目名称'
                },
                {
                    key: 'state',
                    title: '项目状态'
                },
                {
                    key: 'leader',
                    title: '项目负责人'
                },
                {
                    key: 'starttime',
                    title: '项目开始时间',
                    render: renderStartTimeDate
                },
                {
                    key: 'endtime',
                    title: '项目结束时间',
                    render: renderEndTimeDate
                },
                {
                    title: '操作',
                    render: renderControlColumn,
                    width: '150px'
                }
            ],
            table: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            projectFormData: [
                {
                    projectName: ''
                }
            ],
            NewprojectVisibleFlag: ''
        };
    },
    created() {
        //创建项目权限控制
        let roleId= localStorage.getItem('ms_roleId');
        if(roleId ==='0' || roleId ==='1'){
            this.showNewProject=true;
        }
        //项目列表加载
        let userData = localStorage.getItem('ms_data');
        if (userData) {
            this.$api.task.getProjectMess(userData).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let tabledata = [];
                    let returndata = responsevalue.data;
                    for (var i = 0; i < returndata.length; i++) {
                        if (returndata[i]) {
                            let proObject = {};
                            proObject.projectNo = returndata[i].proNum + '-(' + returndata[i].id + ')';
                            proObject.name = returndata[i].proName;
                            if (returndata[i].proState === 0) {
                                proObject.state = '进行中';
                            } else if (returndata[i].proState === 1) {
                                proObject.state = '暂停';
                            } else if (returndata[i].proState === 2) {
                                proObject.state = '已作废';
                            } else if (returndata[i].proState === 3) {
                                proObject.state = '已完结';
                            }
                            //proObject.state = returndata[i].proState;
                            proObject.leader = '';
                            for (var j = 0; j < returndata[i].leaderUserList.length; j++) {
                                if (returndata[i].leaderUserList[j]) {
                                    proObject.leader += returndata[i].leaderUserList[j].name + ',';
                                }
                            }
                            var starttime = returndata[i].overallStartTime;
                            // starttime = starttime.split('T')[0];
                            proObject.starttime = starttime;
                            var endtime = returndata[i].overallEndTime;
                            // endtime = endtime.split('T')[0];
                            proObject.endtime = endtime;
                            tabledata.push(proObject);
                        }
                    }
                    this.table = tabledata;
                } else {
                    this.$message.success('没有权限,请联系Admin!');
                }
            });
        }
    },
    methods: {
        // 新建
        newprojectVisible() {
            this.dialogNewprojectVisible = true;
            localStorage.setItem('list', JSON.stringify(false));
            localStorage.removeItem('pro_id');
        },
        // 新建确定
        getNewProjectData() {
            let projectObject = {};
            projectObject.id = '';
            projectObject.proName = this.$refs.sonNewproject.projectForm.projectName;
            projectObject.proNum = this.$refs.sonNewproject.projectForm.projectNumber;
            projectObject.leaderUserIdList = this.$refs.sonNewproject.checkedLeaderId;
            projectObject.overallStartTime = this.$refs.sonNewproject.projectForm.projectStartDate;
            projectObject.overallEndTime = this.$refs.sonNewproject.projectForm.projectEndDate;
            if (this.$refs.sonNewproject.projectForm.state === '进行中') {
                projectObject.proState = 0;
            } else if (this.$refs.sonNewproject.projectForm.state === '暂停') {
                projectObject.proState = 1;
            } else if (this.$refs.sonNewproject.projectForm.state === '已作废') {
                projectObject.proState = 2;
            } else if (this.$refs.sonNewproject.projectForm.state === '已完结') {
                projectObject.proState = 3;
            }
            projectObject.effectStartTime = this.$refs.sonNewproject.projectForm.implStartDate;
            projectObject.effectEndTime = this.$refs.sonNewproject.projectForm.implEndDate;
            projectObject.effectUserIdList = this.$refs.sonNewproject.checkedImplementerId;
            projectObject.exploitStartTime = this.$refs.sonNewproject.projectForm.develStartDate;
            projectObject.exploitEndTime = this.$refs.sonNewproject.projectForm.develEndDate;
            projectObject.exploitUserIdList = this.$refs.sonNewproject.checkedDeveloperId;
            projectObject.testStartTime = this.$refs.sonNewproject.projectForm.testerStartDate;
            projectObject.testEndTime = this.$refs.sonNewproject.projectForm.testerEndDate;
            projectObject.testUserIdList = this.$refs.sonNewproject.checkedTesterId;
            projectObject.packageTime = this.$refs.sonNewproject.projectForm.packagerStartDate;
            projectObject.packageUserIdList = this.$refs.sonNewproject.checkedPackagerId;
            projectObject.effectTaskId = '';
            projectObject.exploitTaskId = '';
            projectObject.testTaskId = '';
            projectObject.guestbookId = '';
            projectObject.logId = '';
            /*
            //新建项目发消息
            let userList=[];
            let alluser=[];
            let leaderList=this.$refs.sonNewproject.checkedLeaderId;
            let effectList=this.$refs.sonNewproject.checkedImplementerId;
            let exploitList=this.$refs.sonNewproject.checkedDeveloperId;
            let testList=this.$refs.sonNewproject.checkedTesterId;
            let packageList=this.$refs.sonNewproject.checkedPackagerId;
            userList=userList.concat(leaderList,effectList,exploitList,testList,packageList);
            if(userList.length >0){
                userList = userList.sort();
                var arrry= [userList[0]];
                for (var i = 1; i < userList.length; i++) {
                    if (userList[i] !== userList[i-1]) {
                        arrry.push(userList[i]);
                    }
                }
            }
            alluser=arrry;
            let crueateid=localStorage.getItem('ms_id');
            let crueatename=localStorage.getItem('ms_name');
            let crueateusername=localStorage.getItem('ms_username');
            */
            this.$api.task.setProject(projectObject).then(response => {
                var responsevalue = response;
                if (responsevalue) {
                    /*
                    //新建项目发消息
                    var dates=new Date();
                    if(alluser.length > 0){
                        for(var i=0;i<alluser.length;i++){
                            let messageObject={};
                            messageObject.id='';
                            messageObject.messageName="项目任务邀请";
                            messageObject.messageDescribe=crueatename+"邀请你进入"+this.$refs.sonNewproject.projectForm.projectName;
                            messageObject.sendUserid=crueateid;
                            messageObject.receiveUserid=alluser[i];
                            messageObject.state="0";
                            messageObject.inserttime=dates;
                            messageObject.updatetime=dates;
                            messageObject.readTag="0";
                            messageObject.sendUserName=crueateusername;
                            messageObject.receiveUserName='';
                            this.$api.task.newMessage(messageObject).then(()=>{
                            }); 
                        }
                    }
                    */
                    this.$message.success('创建成功');
                    this.dialogNewprojectVisible = false;
                    this.reload();
                } else {
                    this.$message.error('创建失败,请重新创建!');
                    this.dialogNewprojectVisible = true;
                    return false;
                }
            });
        },
        timecomparison(){
            
        },
        geteditProjectData() {
            this.$refs.sonEditproject.save();
            //必填项校验
            //项目名
            let projectObject = {};
            projectObject.id = this.$refs.sonEditproject.projectForm.id;
            projectObject.proName = this.$refs.sonEditproject.projectForm.projectName;
            projectObject.proNum = this.$refs.sonEditproject.projectForm.projectNumber;
            projectObject.leaderUserIdList = this.$refs.sonEditproject.checkedLeaderId;
            projectObject.overallStartTime = this.$refs.sonEditproject.projectForm.projectStartDate;
            projectObject.overallEndTime = this.$refs.sonEditproject.projectForm.projectEndDate;
            if (this.$refs.sonEditproject.projectForm.state === '进行中') {
                projectObject.proState = 0;
            } else if (this.$refs.sonEditproject.projectForm.state === '暂停') {
                projectObject.proState = 1;
            } else if (this.$refs.sonEditproject.projectForm.state === '已作废') {
                projectObject.proState = 2;
            } else if (this.$refs.sonEditproject.projectForm.state === '已完结') {
                projectObject.proState = 3;
            }
            projectObject.effectStartTime = this.$refs.sonEditproject.projectForm.implStartDate;
            projectObject.effectEndTime = this.$refs.sonEditproject.projectForm.implEndDate;
            projectObject.effectUserIdList = this.$refs.sonEditproject.checkedImplementerId;
            projectObject.exploitStartTime = this.$refs.sonEditproject.projectForm.develStartDate;
            projectObject.exploitEndTime = this.$refs.sonEditproject.projectForm.develEndDate;
            projectObject.exploitUserIdList = this.$refs.sonEditproject.checkedDeveloperId;
            projectObject.testStartTime = this.$refs.sonEditproject.projectForm.testerStartDate;
            projectObject.testEndTime = this.$refs.sonEditproject.projectForm.testerEndDate;
            projectObject.testUserIdList = this.$refs.sonEditproject.checkedTesterId;
            projectObject.packageTime = this.$refs.sonEditproject.projectForm.packagerStartDate;
            projectObject.packageUserIdList = this.$refs.sonEditproject.checkedPackagerId;
            // projectObject.effectTaskId = '';
            // projectObject.exploitTaskId = '';
            // projectObject.testTaskId = '';
            // projectObject.guestbookId = '';
            // projectObject.logId = '';
            this.$api.task.updateProject(projectObject).then(response => {
                var responsevalue = response;
                if (responsevalue) {
                    this.$message.success('更新成功');
                    this.dialogNewprojectVisible = false;
                    this.reload();
                } else {
                    this.$message.error('创建失败,请重新创建!');
                    this.dialogNewprojectVisible = true;
                    return false;
                }
            });
        },
        // 查看
        onRowLookButtonClick(row) {
            localStorage.setItem('list', JSON.stringify(true));
            let projectS = row.projectNo;
            let projectIdS = projectS.split('-(')[1];
            projectIdS = projectIdS.split(')')[0];
            this.dialogVisible = true;
            // let projectObjectId = {};
            // projectObjectId.id = row.id;
            localStorage.setItem('pro_id', projectIdS);
            // this.$api.task.initProData(projectObjectId).then(response => {
            //     debugger
            //     this.rowdata = response;
            //     console.log(this.rowdata);
            // });
        },
        //编辑
        onRowUpdateButtonClick(row) {
            localStorage.setItem('list', JSON.stringify(false));
            this.dialogVisible = true;
            let projectS = row.projectNo;
            let projectIdS = projectS.split('-(')[1];
            projectIdS = projectIdS.split(')')[0];
            localStorage.setItem('pro_id', projectIdS);
        },

        closeDialogVisible() {
            this.dialogNewprojectVisible = false;
            this.dialogVisible = false;
            localStorage.removeItem('pro_id');
        },

        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        onSizeChange(val) {
            this.pageSize = val;
        },
        onCurrentChange(val) {
            this.pageNum = val;
        },
        renderStartTimeDate(v) {
            if (v.row.starttime) {
                return <div>{v.row.starttime.slice(0, 10)}</div>;
            }
        },
        renderEndTimeDate(v) {
            if (v.row.endtime) {
                return <div>{v.row.endtime.slice(0, 10)}</div>;
            }
        },
        renderprojectNo(v) {
            if (v.row.projectNo) {
                let projectNoS = v.row.projectNo;
                projectNoS = projectNoS.split('-(')[0];
                return <div>{projectNoS}</div>;
            }
        },
        renderControlColumn({ row }) {
            const { onRowLookButtonClick, onRowUpdateButtonClick } = this;
            const ret = [];
            ret.push(
                <div>
                    <el-button type="text" icon="el-icon-folder-opened" onClick={() => onRowLookButtonClick(row)}>
                        查看
                    </el-button>
                    <el-button type="text" icon="el-icon-edit" onClick={() => onRowUpdateButtonClick(row)}>
                        编辑
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
<style>
textarea {
    height: 100%;
}
.titalS {
    font-size: 15px;
    height: 40px;
    width: 100%;
}
.el-dialog__body {
    max-height: 500px;
    overflow: auto;
}
</style>