<template>
    <div v-if="newprojectshow">
        <el-card class="box-card">
            <div>
                <el-form
                    label-width="150px"
                    v-model="projectForm"
                    class="dataForm"
                    :label-position="labelPosition"
                    size="mini"
                    v-bind:disabled="disabled"
                >
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="所属项目" required>
                                <el-select
                                    v-model="projectForm.belongPro"
                                    @change="selectGet"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in proOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :id="item.id"
                                        :name="item.name"
                                        :level="item.level"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="项目名称" required>
                                <el-input v-model="projectForm.projectName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="项目编号" required>
                                <el-input v-model="projectForm.projectNumber" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8" :offset="2">
                            <el-form-item label="项目状态" required>
                                <el-select v-model="projectForm.state" placeholder="请选择项目状态">
                                    <el-option
                                        v-for="item in stateOptions"
                                        :key="item.lable"
                                        :label="item.value"
                                        :value="item.lable"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="开始日期" required>
                                <el-date-picker
                                    v-model="projectForm.projectStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="结束时间" required>
                                <el-date-picker
                                    v-model="projectForm.projectEndDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="2">
                            <el-form-item label="项目负责人" required>
                                <el-input
                                    prefix-icon="el-icon-search"
                                    v-model="projectForm.projectLeader"
                                    @focus="showPersonPage(1)"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="实施开始时间" required>
                                <el-date-picker
                                    v-model="projectForm.implStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="实施结束时间" required>
                                <el-date-picker v-model="projectForm.implEndDate" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="2">
                            <el-form-item label="实施人员" required>
                                <el-input
                                    prefix-icon="el-icon-search"
                                    v-model="projectForm.implementers"
                                    @focus="showPersonPage(2)"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="开发开始时间" required>
                                <el-date-picker
                                    v-model="projectForm.develStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="开发结束时间" required>
                                <el-date-picker
                                    v-model="projectForm.develEndDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8" :offset="2">
                            <el-form-item label="开发人员" required>
                                <el-input
                                    prefix-icon="el-icon-search"
                                    v-model="projectForm.developers"
                                    @focus="showPersonPage(3)"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="测试开始时间" required>
                                <el-date-picker
                                    v-model="projectForm.testerStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="测试结束时间" required>
                                <el-date-picker
                                    v-model="projectForm.testerEndDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="2">
                            <el-form-item label="测试人员" required>
                                <el-input
                                    prefix-icon="el-icon-search"
                                    v-model="projectForm.testers"
                                    @focus="showPersonPage(4)"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="打包时间" required>
                                <el-date-picker
                                    v-model="projectForm.packagerStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="10">
                            <el-form-item label="打包人员" required>
                                <el-input
                                    prefix-icon="el-icon-search"
                                    v-model="projectForm.packagers"
                                    @focus="showPersonPage(5)"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>

        <el-dialog
            title="人员选择"
            :visible.sync="dialogVisible"
            width="680px"
            :append-to-body="true"
            :close-on-click-modal="false"
        >
            <el-card>
                <el-transfer
                    filterable
                    v-model="checkedPerson"
                    :props="{key: 'id',label: 'name'}"
                    :titles="['未选择', '已选择']"
                    @change="handleChange"
                    :data="personOptions"
                ></el-transfer>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPerson">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="人员占用提醒"
            :visible.sync="tipDialogVisible"
            width="80%"
            :append-to-body="true"
        >
            <el-form
                label-width="150px"
                v-model="projectForm"
                :label-position="labelPosition"
                size="mini"
                disabled
            >
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="项目开始日期">
                            <el-date-picker
                                v-model="projectForm.projectStartDate"
                                placeholder="请选择"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="项目结束时间">
                            <el-date-picker v-model="projectForm.projectEndDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="tipTable" border style="width: 100%">
                <el-table-column prop="userName" label="人员" width="180"></el-table-column>
                <el-table-column prop="belongProName" label="任务所属项目"></el-table-column>
                <el-table-column prop="workName" label="任务名称"></el-table-column>
                <el-table-column prop="startTime" label="任务开始时间"></el-table-column>
                <el-table-column prop="endTime" label="任务结束时间"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="tipDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getProjectData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    <div v-else>
        <el-card class="box-card">
            项目名称: {{projectName}}
        </el-card>
    </div>
</template>
<script>
export default {
    inject: ['reload'],
    props: {
        proOptions: Array,
        tipTable: Array,
        tipDialogVisible: Boolean
    },
    data() {
        return {
            projectName:'',
            disabled: false,
            newprojectshow: false,
            //人员选择弹窗
            personOptions01: [],
            personOptions02: [],
            personOptions: [],
            checkedPerson: [],
            checkedLeaderId: [],
            checkedImplementerId: [],
            checkedDeveloperId: [],
            checkedTesterId: [],
            checkedPackagerId: [],
            oldLeaderId: [],
            oldImplementerId: [],
            oldDeveloperId: [],
            oldTesterId: [],
            oldPackagerId: [],
            checkedPersonValue: [],
            dialogVisible: false,
            openfrom: '',

            projectForm: {
                id: '',
                projectName: '',
                projectCategory: '',
                // comments:'',
                implementers: '',
                developers: '',
                projectLeader: '',
                projectStartDate: '',
                projectEndDate: '',
                implStartDate: '',
                implEndDate: '',
                develStartDate: '',
                develEndDate: '',
                testerStartDate: '',
                testerEndDate: '',
                packagerStartDate: '',
                testers: '',
                packagers: '',
                projectNumber: '',
                state: '',
                belongPro: '',
                level: '',
                belongProId: ''
            },
            labelPosition: 'left',
            stateOptions: [
                {
                    value: '进行中',
                    lable: '进行中'
                },
                {
                    value: '暂停',
                    lable: '暂停'
                },
                {
                    value: '已作废',
                    lable: '已作废'
                },
                {
                    value: '已完结',
                    lable: '已完结'
                }
            ]
        };
    },
    created() {
        //获取管理员用户列表
        this.$api.task.getSystemUserList().then(response => {
            let responsevalue = response.data;
            if (responsevalue) {
                let personOptions = [];
                for (var i = 0; i < responsevalue.length; i++) {
                    let proObject = {};
                    proObject.id = responsevalue[i].id;
                    proObject.name = responsevalue[i].name;
                    personOptions.push(proObject);
                }
                this.personOptions01 = personOptions;
            } else {
                this.$message.success('请联系Admin!');
            }
        });
        //获取人员
        this.$api.task.getAllUser().then(response => {
            let responsevalue = response.data;
            if (responsevalue) {
                let personOptions = [];
                for (var i = 0; i < responsevalue.length; i++) {
                    let proObject = {};
                    proObject.id = responsevalue[i].id;
                    proObject.name = responsevalue[i].name;
                    personOptions.push(proObject);
                }
                this.personOptions02 = personOptions;
            } else {
                this.$message.success('请联系Admin!');
            }
        });

        //添加项目信息
        let pro_id = localStorage.getItem('pro_id');
        let disabled = localStorage.getItem('list');
        let roleId = localStorage.getItem('ms_roleId');
        let username = localStorage.getItem('ms_name');
        let NewFlag = localStorage.getItem('New');
        let authId = localStorage.getItem('ms_authId');
        let pro_name = localStorage.getItem('pro_name');
        this.projectName =pro_name;
        let projectObjectId = {};
        projectObjectId.id = pro_id;
        if (pro_id) {
            this.$api.task.initProData(projectObjectId).then(response => {
                let responseValue = response.data;
                this.projectForm.id = responseValue.id;
                this.projectForm.level = responseValue.projectLv;
                this.projectForm.belongPro = responseValue.belongProId;

                this.projectForm.projectName = responseValue.proName;
                this.projectForm.projectNumber = responseValue.proNum;

                if (responseValue.proState === 0) {
                    this.projectForm.state = '进行中';
                } else if (responseValue.proState === 1) {
                    this.projectForm.state = '暂停';
                } else if (responseValue.proState === 2) {
                    this.projectForm.state = '已作废';
                } else if (responseValue.proState === 3) {
                    this.projectForm.state = '已完结';
                }
                /*
                //时间少一天
                function updateDate(date){
                    let DateS=new Date(date);
                    let ovwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate()-1)).toISOString().slice(0, 10);
                    return ovwerS;
                }
                //this.projectForm.projectStartDate = responseValue.overallStartTime;
                this.projectForm.projectStartDate = updateDate(responseValue.overallStartTime);
                this.projectForm.projectEndDate = updateDate(responseValue.overallEndTime);
                */
                this.projectForm.projectStartDate = responseValue.overallStartTime;
                this.projectForm.projectEndDate = responseValue.overallEndTime;
                this.projectForm.projectLeader = '';
                let projectLeadeStr = '';
                let leaderNameList = [];
                for (let i = 0; i < responseValue.leaderUserList.length; i++) {
                    leaderNameList.push(responseValue.leaderUserList[i].name);
                    this.projectForm.projectLeader = leaderNameList.toString();
                    this.checkedLeaderId.push(responseValue.leaderUserList[i].id);
                    this.oldLeaderId.push(responseValue.leaderUserList[i].id);
                    projectLeadeStr += responseValue.leaderUserList[i].name + ',';
                }
                this.projectForm.implStartDate = responseValue.effectStartTime;
                this.projectForm.implEndDate = responseValue.effectEndTime;
                this.projectForm.implementers = '';
                let effectNameList = [];
                let effectidList = [];
                for (let j = 0; j < responseValue.effectUserList.length; j++) {
                    effectNameList.push(responseValue.effectUserList[j].name);
                    this.projectForm.implementers = effectNameList.toString();
                    this.checkedImplementerId.push(responseValue.effectUserList[j].id);
                    effectidList.push(responseValue.effectUserList[j].id);
                }
                this.oldImplementerId=effectidList;
                this.projectForm.develStartDate = responseValue.exploitStartTime;
                this.projectForm.develEndDate = responseValue.exploitEndTime;
                this.projectForm.developers = '';
                let exploitNameList = [];
                for (let k = 0; k < responseValue.exploitUserList.length; k++) {
                    exploitNameList.push(responseValue.exploitUserList[k].name);
                    this.projectForm.developers = exploitNameList.toString();
                    this.checkedDeveloperId.push(responseValue.exploitUserList[k].id);
                    this.oldDeveloperId.push(responseValue.exploitUserList[k].id);                
                }
                    this.projectForm.testerStartDate = responseValue.testStartTime;
                    this.projectForm.testerEndDate = responseValue.testEndTime;
                    this.projectForm.testers = '';
                    let testNameList = [];
                for (let g = 0; g < responseValue.testUserList.length; g++) {
                    testNameList.push(responseValue.testUserList[g].name);
                    this.projectForm.testers = testNameList.toString();
                    this.checkedTesterId.push(responseValue.testUserList[g].id);
                    this.oldTesterId.push(responseValue.testUserList[g].id);                
                }
                this.projectForm.packagerStartDate = responseValue.packageTime;
                this.projectForm.packagers = '';
                let packageNameList = [];
                for (let h = 0; h < responseValue.packageUserList.length; h++) {
                    packageNameList.push(responseValue.packageUserList[h].name);
                    this.projectForm.packagers = packageNameList.toString();
                    this.checkedPackagerId.push(responseValue.packageUserList[h].id);
                    this.oldPackagerId.push(responseValue.packageUserList[h].id);                
                }
                //项目负责人权限控制
                if (NewFlag === 'false') {
                    if (authId === '0' || authId === '1' || authId === '3') {
                        this.newprojectshow = true;
                    } else {
                        this.newprojectshow = false;
                    }
                } else {
                    this.newprojectshow = true;
                }
                if (disabled === 'false') {
                    if (roleId === '0' || roleId === '1') {
                        this.disabled = false;
                    } else {
                        if (projectLeadeStr.indexOf(username) > -1) {
                            this.disabled = false;
                        } else {
                            this.disabled = true;
                        }
                    }
                } else {
                    this.disabled = JSON.parse(disabled);
                }
            });
        }
    },
    mounted() {
        //权限控制
        let disabled = localStorage.getItem('list');
        let NewFlag = localStorage.getItem('New');
        let roleId = localStorage.getItem('ms_roleId');
        let authId = localStorage.getItem('ms_authId');
        if (NewFlag === 'false') {
            if (authId === '0' || authId === '1' || authId === '3') {
                this.newprojectshow = true;
            } else {
                this.newprojectshow = false;
            }
        } else {
            this.newprojectshow = true;
        }
        if (disabled === 'false') {
            if (roleId === '0' || roleId === '1') {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        } else {
            this.disabled = JSON.parse(disabled);
        }
    },
    methods: {
        //新建项目
        getProjectData() {
            let projectObject = {};
            if (projectObject.id == '') {
                projectObject.id = '';
            } else {
                projectObject.id = this.projectForm.id;
            }

            projectObject.projectLv = this.projectForm.level;
            projectObject.belongProId = this.projectForm.belongPro;
            projectObject.proName = this.projectForm.projectName;
            projectObject.proNum = this.projectForm.projectNumber;
            projectObject.leaderUserIdList = this.checkedLeaderId;
            projectObject.overallStartTime = this.projectForm.projectStartDate;
            projectObject.overallEndTime = this.projectForm.projectEndDate;
            if (this.projectForm.state === '进行中') {
                projectObject.proState = 0;
            } else if (this.projectForm.state === '暂停') {
                projectObject.proState = 1;
            } else if (this.projectForm.state === '已作废') {
                projectObject.proState = 2;
            } else if (this.projectForm.state === '已完结') {
                projectObject.proState = 3;
            }
            projectObject.effectStartTime = this.projectForm.implStartDate;
            projectObject.effectEndTime = this.projectForm.implEndDate;
            projectObject.effectUserIdList = this.checkedImplementerId;
            projectObject.exploitStartTime = this.projectForm.develStartDate;
            projectObject.exploitEndTime = this.projectForm.develEndDate;
            projectObject.exploitUserIdList = this.checkedDeveloperId;
            projectObject.testStartTime = this.projectForm.testerStartDate;
            projectObject.testEndTime = this.projectForm.testerEndDate;
            projectObject.testUserIdList = this.checkedTesterId;
            projectObject.packageTime = this.projectForm.packagerStartDate;
            projectObject.packageUserIdList = this.checkedPackagerId;
            if (projectObject.id == '') {
                this.$api.task.setProject(projectObject).then(response => {
                    var responsevalue = response;
                    if (responsevalue) {
                        this.$message.success('创建成功');
                        this.dialogNewprojectVisible = false;
                        this.tipDialogVisible = false;
                        this.reload();
                    } else {
                        this.$message.error('创建失败,请重新创建!');
                        this.dialogNewprojectVisible = true;
                        return false;
                    }
                });
            } else {
                this.$api.task.updateProject(projectObject).then(response => {
                    var responsevalue = response;
                    if (responsevalue) {
                        this.$message.success('更新成功');
                        this.dialogNewprojectVisible = false;
                        this.reload();
                    } else {
                        this.$message.error('更新失败!');
                        this.dialogNewprojectVisible = true;
                        return false;
                    }
                });
            }
        },
        //编辑项目

        handleChange(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
        },

        getval() {
            let checkedPersonValue = [];
            for (var i = 0; i < this.checkedPerson.length; i++) {
                for (var j = 0; j < this.personOptions.length; j++) {
                    if (this.checkedPerson[i] == this.personOptions[j].id) {
                        checkedPersonValue.push(this.personOptions[j].name);
                    }
                }
            }
            this.checkedPersonValue = checkedPersonValue;
        },

        showPersonPage(openfrom) {
            this.checkedPerson = [];
            this.openfrom = openfrom;
            //获取相关权限人员
            /*this.$api.task.getAllUser().then(response => {
                let responsevalue = response.data;
                if (responsevalue) {
                    let personOptions = [];
                    for (var i = 0; i < responsevalue.length; i++) {
                        let proObject = {};
                        if(openfrom === 1){
                            if(responsevalue[i].roleId === "0" || responsevalue[i].roleId === "1"){
                                proObject.id = responsevalue[i].id;
                                proObject.name = responsevalue[i].name;
                                personOptions.push(proObject);
                            }
                        }else if(openfrom === 5){
                            proObject.id = responsevalue[i].id;
                            proObject.name = responsevalue[i].name;
                            personOptions.push(proObject);
                        }else{
                            if(responsevalue[i].roleId === openfrom.toString()){
                                proObject.id = responsevalue[i].id;
                                proObject.name = responsevalue[i].name;
                                personOptions.push(proObject);
                            }
                        }
                    }
                    this.personOptions = personOptions;
                } else {
                    this.$message.success('请联系Admin!');
                }
            });*/
            if (this.openfrom == 1) {
                this.personOptions = this.personOptions01;
            } else {
                this.personOptions = this.personOptions02;
            }
            this.dialogVisible = true;
            // if (this.openfrom == 1 && this.projectForm.projectLeader) {
            //     this.checkedPerson = this.checkedLeaderId;
            // } else if (this.openfrom == 2 && this.projectForm.implementers) {
            //     this.checkedPerson = this.checkedImplementerId;
            // } else if (this.openfrom == 3 && this.projectForm.developers) {
            //     this.checkedPerson = this.checkedDeveloperId;
            // } else if (this.openfrom == 4 && this.projectForm.testers) {
            //     this.checkedPerson = this.checkedTesterId;
            // } else if (this.openfrom == 5 && this.projectForm.packagers) {
            //     this.checkedPerson = this.checkedPackagerId;
            // }
        },
        addPerson: function() {
            this.dialogVisible = false;
            this.getval();
            if (this.openfrom == 1) {
                this.checkedLeaderId = this.checkedPerson;
                this.projectForm.projectLeader = this.checkedPersonValue.toString();
            } else if (this.openfrom == 2) {
                this.checkedImplementerId = this.checkedPerson;
                this.projectForm.implementers = this.checkedPersonValue.toString();
            } else if (this.openfrom == 3) {
                this.checkedDeveloperId = this.checkedPerson;
                this.projectForm.developers = this.checkedPersonValue.toString();
            } else if (this.openfrom == 4) {
                this.checkedTesterId = this.checkedPerson;
                this.projectForm.testers = this.checkedPersonValue.toString();
            } else {
                this.checkedPackagerId = this.checkedPerson;
                this.projectForm.packagers = this.checkedPersonValue.toString();
            }
        },
        selectGet(vId) {
            //这个vId也就是value值
            let obj = {};
            obj = this.proOptions.find(item => {
                //这里的userList就是上面遍历的数据源
                return item.id === vId; //筛选出匹配数据
            });
            //获取level
            if (this.projectForm.belongPro == '无') {
                this.projectForm.level = 0;
            } else {
                debugger;
                this.projectForm.level = obj.level + 1;
            }
        }
    }
};
</script>
<style scoped>
.titalS {
    font-size: 15px;
    height: 40px;
    width: 100%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 100%;
}
.el-select {
    width: 100%;
}
</style>