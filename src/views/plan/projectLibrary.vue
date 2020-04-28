<template>
    <div>
        <el-card>
            <div style="text-align:right;padding-bottom:10px;" v-if="showNewProject">
                <el-button size="mini" @click="newprojectVisible">新建项目</el-button>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    row-key="id"
                    border
                    :default-expand-all="defaultexpand"
                    :tree-props="{children: 'proList'}"
                    :default-sort = "{prop: 'proState', order: 'ascending'}"
                >
                    <el-table-column prop="proName" label="项目名称" height="40"></el-table-column>
                    <el-table-column
                        prop="proNum"
                        label="项目编号"
                        :formatter="renderprojectNo"
                        height="40"
                    ></el-table-column>
                    <el-table-column
                        prop="proState"
                        label="项目状态"
                        :formatter="renderproState"
                        height="40"
                    ></el-table-column>
                    <el-table-column
                        prop="leaderUserIdList"
                        label="项目负责人"
                        :formatter="renderleaderUserIdList"
                        height="40"
                    ></el-table-column>
                    <el-table-column
                        prop="overallStartTime"
                        label="项目开始时间"
                        :formatter="renderStartTimeDate"
                        height="40"
                    ></el-table-column>
                    <el-table-column
                        prop="overallEndTime"
                        label="项目结束时间"
                        :formatter="renderEndTimeDate"
                        height="40"
                    ></el-table-column>
                    <el-table-column label="操作" height="40">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-folder-opened"
                                @click="onRowLookButtonClick(scope.row)"
                            >查看</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="onRowUpdateButtonClick(scope.row)"
                            >编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog
            title="项目信息"
            :visible.sync="dialogVisible"
            width="80%"
            :append-to-body="true"
            v-if="dialogVisible"
            :close-on-click-modal="false"
        >
            <projectPage ref="sonEditproject" :proOptions="proOptions"></projectPage>
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
            :close-on-click-modal="false"
        >
            <project-information ref="sonNewproject" :proOptions="proOptions" />
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
        return {
            operationmode: '',
            showNewProject: false,
            dialogVisible: false,
            defaultexpand: false,
            dialogNewprojectVisible: false,
            dialogNewImpltaskVisible: false,
            tableData: [],
            table: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            projectFormData: [
                {
                    projectName: ''
                }
            ],
            NewprojectVisibleFlag: '',
            proOptions: [],
            checkflag: true
        };
    },
    created() {
        //创建项目权限控制
        let roleId = localStorage.getItem('ms_roleId');
        if (roleId === '0' || roleId === '1') {
            this.showNewProject = true;
        }
        //项目列表加载
        let userData = localStorage.getItem('ms_data');
        if (userData) {
            this.$api.task.getprojectTree(userData).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    this.tableData = returndata;
                } else {
                    this.$message.success('没有权限,请联系Admin!');
                }
            });
        }

        //所属项目加载
        this.$api.task.getAllProList().then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let returndata = responsevalue.data;
                let proObject = {};
                proObject.id = '无';
                proObject.name = '该项目为主项目';
                proObject.value = '无';
                proObject.label = '该项目为主项目';
                proObject.level = 0;
                this.proOptions.push(proObject);
                for (var i = 0; i < returndata.length; i++) {
                    if (returndata[i]) {
                        let proObject = {};
                        proObject.id = returndata[i].id;
                        proObject.name = returndata[i].proName;
                        proObject.value = returndata[i].id;
                        proObject.label = returndata[i].proName;
                        proObject.level = returndata[i].projectLv;
                        this.proOptions.push(proObject);
                    }
                }
            } else {
                this.$message.success('所属项目加载失败');
            }
        });
    },
    methods: {
        // 新建
        newprojectVisible() {
            this.dialogNewprojectVisible = true;
            localStorage.setItem('list', JSON.stringify(false));
            localStorage.setItem('New', JSON.stringify(true));
            localStorage.removeItem('pro_id');
        },

        // 校验
        check() {
            if (this.$refs.sonNewproject.projectForm.belongPro == '') {
                this.$message.error('请选择所属项目');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.projectName == '') {
                this.$message.error('请输入项目名称');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.state == '') {
                this.$message.error('请选择项目状态');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.projectStartDate == '') {
                this.$message.error('请选择项目开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.projectEndDate == '') {
                this.$message.error('请选择项目结束时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.checkedLeaderId == '') {
                this.$message.error('请选择项目负责人');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.implStartDate == '') {
                this.$message.error('请选择实施开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.implEndDate == '') {
                this.$message.error('请选择实施结束时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.checkedImplementerId == '') {
                this.$message.error('请选择实施人员');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.develStartDate == '') {
                this.$message.error('请选择开发开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.develEndDate == '') {
                this.$message.error('请选择开发结束时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.checkedDeveloperId == '') {
                this.$message.error('请选择开发人员');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.testerStartDate == '') {
                this.$message.error('请选择测试开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.testerEndDate == '') {
                this.$message.error('请选择测试结束时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.checkedTesterId == '') {
                this.$message.error('请选择测试人员');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.packagerStartDate == '') {
                this.$message.error('请选择打包时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.checkedPackagerId == '') {
                this.$message.error('请选择打包人员');
                this.checkflag = false;
            } else {
                this.checkflag = true;
            }
        },

        // 新建确定
        getNewProjectData() {
            this.check();

            if (this.checkflag) {
                let projectObject = {};
                projectObject.id = '';
                projectObject.projectLv = this.$refs.sonNewproject.projectForm.level;
                projectObject.belongProId = this.$refs.sonNewproject.projectForm.belongPro;
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
            }
        },
        timecomparison() {},
        geteditProjectData() {
            this.$refs.sonEditproject.save();
            //项目名
            let projectObject = {};
            projectObject.id = this.$refs.sonEditproject.projectForm.id;
            projectObject.proName = this.$refs.sonEditproject.projectForm.projectName;
            projectObject.projectLv = this.$refs.sonEditproject.projectForm.level;
            projectObject.belongProId = this.$refs.sonEditproject.projectForm.belongPro;
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
            localStorage.setItem('New', JSON.stringify(false));
            let projectIdS = row.id;
            localStorage.setItem('pro_id', projectIdS);
            this.dialogVisible = true;
        },
        //编辑
        onRowUpdateButtonClick(row) {
            localStorage.setItem('list', JSON.stringify(false));
            localStorage.setItem('New', JSON.stringify(false));
            let projectIdS = row.id;
            localStorage.setItem('pro_id', projectIdS);
            this.dialogVisible = true;
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
        renderproState(row) {
            let state = '';
            if (row.proState === 0) {
                state = '进行中';
            } else if (row.proState === 1) {
                state = '暂停';
            } else if (row.proState === 2) {
                state = '已作废';
            } else if (row.proState === 3) {
                state = '已完结';
            }
            return <div>{state}</div>;
        },
        renderleaderUserIdList(row) {
            let leadername = '';
            if (row.leaderUserList) {
                let leaderS = '';
                let ledaerArr = row.leaderUserList;
                if (ledaerArr.length > 0) {
                    for (var i = 0; i < ledaerArr.length; i++) {
                        if (ledaerArr[i].name) {
                            leaderS += ledaerArr[i].name + ',';
                        }
                    }
                }
                if (leaderS.indexOf(',') > -1) {
                    leadername = leaderS.slice(0, leaderS.length - 1);
                } else {
                    leadername = leaderS;
                }
            }
            return <div>{leadername}</div>;
        },
        renderStartTimeDate(row) {
            if (row.overallStartTime) {
                let DateS = new Date(row.overallStartTime);
                let ovwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate())).toISOString().slice(0, 10);
                return <div>{ovwerS}</div>;
            }
        },
        renderEndTimeDate(row) {
            if (row.overallEndTime) {
                let DateS = new Date(row.overallEndTime);
                let ovwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate())).toISOString().slice(0, 10);
                return <div>{ovwerS}</div>;
            }
        },
        renderprojectNo(row) {
            if (row.proNum) {
                let projectNoS = row.proNum;
                return <div>{projectNoS}</div>;
            }
        }
    }
};
</script>
<style lang="scss">
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
</style>