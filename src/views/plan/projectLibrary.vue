<template>
    <div>
        <el-card v-loading="loading">
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
                    :default-sort="{prop: 'proState', order: 'ascending'}"
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
            <projectPage
                ref="sonEditproject"
                :proOptions="proOptions"
                :tipTable="tipTable"
                :tipDialogVisible="tipDialogVisible"
            ></projectPage>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialogVisible">取 消</el-button>
                <el-button type="primary" @click="editProject">确 定</el-button>
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
            <project-information
                ref="sonNewproject"
                :proOptions="proOptions"
                :tipTable="tipTable"
                :tipDialogVisible="tipDialogVisible"
            />
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialogVisible">取 消</el-button>
                <el-button type="primary" @click="newProject">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang="stylus">
.el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
</style>
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
            loading: false,

            //时间冲突
            tipTable: [],
            //人员占用提示窗口
            tipDialogVisible: false,
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
        let userData = JSON.parse(localStorage.getItem('ms_data'));
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
            } else if (this.$refs.sonNewproject.checkedDeveloperId == '') {
                this.$message.error('请选择开发人员');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.testerStartDate == '') {
                this.$message.error('请选择测试开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.testerEndDate == '') {
                this.$message.error('请选择测试结束时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.checkedTesterId == '') {
                this.$message.error('请选择测试人员');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.projectForm.packagerStartDate == '') {
                this.$message.error('请选择打包时间');
                this.checkflag = false;
            } else if (this.$refs.sonNewproject.checkedPackagerId == '') {
                this.$message.error('请选择打包人员');
                this.checkflag = false;
            } else {
                this.checkflag = true;
            }
        },

        // 校验
        checkEdit() {
            if (this.$refs.sonEditproject.projectForm.belongPro == '') {
                this.$message.error('请选择所属项目');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.projectName == '') {
                this.$message.error('请输入项目名称');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.state == '') {
                this.$message.error('请选择项目状态');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.projectStartDate == '') {
                this.$message.error('请选择项目开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.projectEndDate == '') {
                this.$message.error('请选择项目结束时间');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.checkedLeaderId == '') {
                this.$message.error('请选择项目负责人');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.implStartDate == '') {
                this.$message.error('请选择实施开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.implEndDate == '') {
                this.$message.error('请选择实施结束时间');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.checkedImplementerId == '') {
                this.$message.error('请选择实施人员');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.develStartDate == '') {
                this.$message.error('请选择开发开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.develEndDate == '') {
                this.$message.error('请选择开发结束时间');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.checkedDeveloperId == '') {
                debugger;
                this.$message.error('请选择开发人员');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.testerStartDate == '') {
                this.$message.error('请选择测试开始时间');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.testerEndDate == '') {
                this.$message.error('请选择测试结束时间');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.checkedTesterId == '') {
                this.$message.error('请选择测试人员');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.projectForm.packagerStartDate == '') {
                this.$message.error('请选择打包时间');
                this.checkflag = false;
            } else if (this.$refs.sonEditproject.checkedPackagerId == '') {
                this.$message.error('请选择打包人员');
                this.checkflag = false;
            } else {
                this.checkflag = true;
            }
        },

        // 新建确定
        newProject() {
            this.check();
            if (this.checkflag) {
                //人员占用
                const loading = this.$loading({
                    lock: true
                    // text: 'Loading',
                    // spinner: 'el-icon-loading',
                    // background: 'rgba(0, 0, 0, 0.7)'
                });
                let projectObject = {};
                projectObject.overallStartTime = this.$refs.sonNewproject.projectForm.projectStartDate.toISOString();
                projectObject.overallEndTime = this.$refs.sonNewproject.projectForm.projectEndDate.toISOString();
                projectObject.leaderUserIdList = this.$refs.sonNewproject.checkedLeaderId;
                projectObject.effectUserIdList = this.$refs.sonNewproject.checkedImplementerId;
                projectObject.exploitUserIdList = this.$refs.sonNewproject.checkedDeveloperId;
                projectObject.testUserIdList = this.$refs.sonNewproject.checkedTesterId;
                projectObject.packageUserIdList = this.$refs.sonNewproject.checkedPackagerId;
                var _this = this;
                this.$api.task.getUniteWorkList(projectObject).then(response => {
                    debugger;
                    if (response.data.length !== 0) {
                        for (let i = 0; i < response.data.length; i++) {
                            let startDateS = new Date(response.data[i].startTime);
                            let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate()))
                                .toISOString()
                                .slice(0, 10);
                            response.data[i].startTime = startOvwerS;

                            let endDateS = new Date(response.data[i].endTime);
                            let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                                .toISOString()
                                .slice(0, 10);
                            response.data[i].endTime = endOvwerS;
                        }
                        loading.close();
                        _this.tipTable = response.data;
                        _this.tipDialogVisible = true;
                    } else {
                        _this.$refs.sonNewproject.getProjectData();
                        //_this.getProjectData();
                        loading.close();
                        _this.$refs.sonNewproject.tipDialogVisible = false;
                    }
                });
            }
        },
        // 编辑确定
        editProject() {
            this.$refs.sonEditproject.save();
            this.checkEdit();
            if (this.checkflag) {
                const loading = this.$loading({
                    lock: true
                    // text: 'Loading',
                    // spinner: 'el-icon-loading',
                    // background: 'rgba(0, 0, 0, 0.7)'
                });
                //人员占用
                let projectObject = {};
                projectObject.overallStartTime = this.$refs.sonEditproject.projectForm.projectStartDate;
                projectObject.overallEndTime = this.$refs.sonEditproject.projectForm.projectEndDate;
                projectObject.leaderUserIdList = this.$refs.sonEditproject.checkedLeaderId;
                projectObject.effectUserIdList = this.$refs.sonEditproject.checkedImplementerId;
                projectObject.exploitUserIdList = this.$refs.sonEditproject.checkedDeveloperId;
                projectObject.testUserIdList = this.$refs.sonEditproject.checkedTesterId;
                projectObject.packageUserIdList = this.$refs.sonEditproject.checkedPackagerId;
                var _this = this;
                this.$api.task.getUniteWorkList(projectObject).then(response => {
                    if (response.data.length !== 0) {
                        for (let i = 0; i < response.data.length; i++) {
                            let startDateS = new Date(response.data[i].startTime);
                            let startOvwerS = new Date(Date.UTC(startDateS.getFullYear(), startDateS.getMonth(), startDateS.getDate()))
                                .toISOString()
                                .slice(0, 10);
                            response.data[i].startTime = startOvwerS;

                            let endDateS = new Date(response.data[i].endTime);
                            let endOvwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                                .toISOString()
                                .slice(0, 10);
                            response.data[i].endTime = endOvwerS;
                        }

                        _this.$refs.sonEditproject.tipTable = response.data;
                        _this.$refs.sonEditproject.tipDialogVisible = true;
                        loading.close();
                    } else {
                        _this.$refs.sonEditproject.getProjectData();
                        _this.$refs.sonEditproject.tipDialogVisible = false;
                        loading.close();
                    }
                });
            }
        },
        // 查看
        onRowLookButtonClick(row) {
            localStorage.setItem('list', JSON.stringify(true));
            localStorage.setItem('New', JSON.stringify(false));
            localStorage.setItem('Edit', JSON.stringify(false));
            let projectIdS = row.id;
            localStorage.setItem('pro_id', projectIdS);
            let projectName = row.proName;
            localStorage.setItem('pro_name', projectName);
            this.dialogVisible = true;
        },
        //编辑
        onRowUpdateButtonClick(row) {
            localStorage.setItem('list', JSON.stringify(false));
            localStorage.setItem('New', JSON.stringify(false));
            localStorage.setItem('Edit', JSON.stringify(true));
            let projectIdS = row.id;
            localStorage.setItem('pro_id', projectIdS);
            let projectName = row.proName;
            localStorage.setItem('pro_name', projectName);
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