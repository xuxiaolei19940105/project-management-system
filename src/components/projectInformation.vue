<template>
    <div>
        <el-card class="box-card">
            <div>
                <el-form
                    label-width="100px"
                    v-model="projectForm"
                    class="dataForm"
                    :label-position="labelPosition"
                    size="mini"
                    v-bind:disabled="disabled"
                >
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="项目名称">
                                <el-input v-model="projectForm.projectName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="项目编号">
                                <el-input v-model="projectForm.projectNumber" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8" :offset="2">
                            <el-form-item label="项目状态">
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
                            <el-form-item label="开始日期">
                                <el-date-picker
                                    v-model="projectForm.projectStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="结束时间">
                                <el-date-picker
                                    v-model="projectForm.projectEndDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="2">
                            <el-form-item label="项目负责人">
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
                            <el-form-item label="实施开始时间">
                                <el-date-picker
                                    v-model="projectForm.implStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="实施结束时间">
                                <el-date-picker v-model="projectForm.implEndDate" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="2">
                            <el-form-item label="实施人员">
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
                            <el-form-item label="开发开始时间">
                                <el-date-picker
                                    v-model="projectForm.develStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="开发结束时间">
                                <el-date-picker
                                    v-model="projectForm.develEndDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8" :offset="2">
                            <el-form-item label="开发人员">
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
                            <el-form-item label="测试开始时间">
                                <el-date-picker
                                    v-model="projectForm.testerStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="测试结束时间">
                                <el-date-picker
                                    v-model="projectForm.testerEndDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="2">
                            <el-form-item label="测试人员">
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
                            <el-form-item label="打包时间">
                                <el-date-picker
                                    v-model="projectForm.packagerStartDate"
                                    placeholder="请选择"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="10">
                            <el-form-item label="打包人员">
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

        <el-dialog title="人员选择" :visible.sync="dialogVisible" width="680px" :append-to-body="true" :close-on-click-modal='false'>
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            disabled: false,
            //人员选择弹窗
            personOptions: [
                { id: 1, name: '测试1' },
                { id: 2, name: '测试2' },
                { id: 3, name: '测试3' }
            ],
            checkedPerson: [],
            checkedLeaderId: [],
            checkedImplementerId: [],
            checkedDeveloperId: [],
            checkedTesterId: [],
            checkedPackagerId: [],
            checkedPersonValue: [],
            dialogVisible: false,
            openfrom: '',

            projectForm: {
                id:'',
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
                state: ''
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
                this.personOptions = personOptions;
            } else {
                this.$message.success('请联系Admin!');
            }
        });
        //添加项目信息
        let pro_id = localStorage.getItem('pro_id');
        let projectObjectId = {};
        projectObjectId.id = pro_id;
        if (pro_id) {
            this.$api.task.initProData(projectObjectId).then(response => {
                let responseValue = response.data;
                this.projectForm.id = responseValue.id;
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
                function updateDate(date){
                    let DateS=new Date(date);
                    let ovwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate()-1)).toISOString().slice(0, 10);
                    return ovwerS;
                }
                //this.projectForm.projectStartDate = responseValue.overallStartTime;
                this.projectForm.projectStartDate = updateDate(responseValue.overallStartTime);
                this.projectForm.projectEndDate = updateDate(responseValue.overallEndTime);
                this.projectForm.projectLeader = '';
                for (let i = 0; i < responseValue.leaderUserList.length; i++) {
                    this.projectForm.projectLeader += responseValue.leaderUserList[i].name + ',';
                }
                for (let i = 0; i < responseValue.leaderUserList.length; i++) {
                    this.checkedLeaderId.push(responseValue.leaderUserList[i].id);
                }

                this.projectForm.implStartDate = responseValue.effectStartTime;
                this.projectForm.implEndDate = responseValue.effectEndTime;
                this.projectForm.implementers = '';
                for (let i = 0; i < responseValue.taskList[0].userList.length; i++) {
                    this.projectForm.implementers += responseValue.taskList[0].userList[i].name + ',';
                }
                for (let i = 0; i < responseValue.taskList[0].userList.length; i++) {
                    this.checkedImplementerId.push(responseValue.taskList[0].userList[i].id);
                }

                this.projectForm.develStartDate = responseValue.exploitStartTime;
                this.projectForm.develEndDate = responseValue.exploitEndTime;
                this.projectForm.developers = '';
                for (let i = 0; i < responseValue.taskList[1].userList.length; i++) {
                    this.projectForm.developers += responseValue.taskList[1].userList[i].name + ',';
                }
                for (let i = 0; i < responseValue.taskList[1].userList.length; i++) {
                    this.checkedDeveloperId.push(responseValue.taskList[1].userList[i].id);
                }

                this.projectForm.testerStartDate = responseValue.testStartTime;
                this.projectForm.testerEndDate = responseValue.testEndTime;
                this.projectForm.testers = '';
                for (let i = 0; i < responseValue.taskList[2].userList.length; i++) {
                    this.projectForm.testers += responseValue.taskList[2].userList[i].name + ',';
                }
                for (let i = 0; i < responseValue.taskList[2].userList.length; i++) {
                    this.checkedTesterId.push(responseValue.taskList[2].userList[i].id);
                }

                this.projectForm.packagerStartDate = responseValue.packageTime;
                this.projectForm.packagers = '';
                for (let i = 0; i < responseValue.taskList[3].userList.length; i++) {
                    this.projectForm.packagers += responseValue.taskList[3].userList[i].name + ',';
                }
                 for (let i = 0; i < responseValue.taskList[3].userList.length; i++) {
                    this.checkedPackagerId.push(responseValue.taskList[3].userList[i].id);
                }
            });
        }
    },
    mounted() {
        //权限控制
        let disabled = localStorage.getItem('list');
        if(disabled === "false"){
            let roleId= localStorage.getItem('ms_roleId');
            if(roleId ==="0" || roleId ==="1"){
                this.disabled =false;
            }else{
                this.disabled =true;
            }
        }else{
            this.disabled = JSON.parse(disabled);
        }
    },
    methods: {
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
            this.dialogVisible = true;
            if (this.openfrom == 1 && this.projectForm.projectLeader) {
                this.checkedPerson = this.checkedLeaderId;
            } else if (this.openfrom == 2 && this.projectForm.implementers) {
                this.checkedPerson = this.checkedImplementerId;
            } else if (this.openfrom == 3 && this.projectForm.developers) {
                this.checkedPerson = this.checkedDeveloperId;
            } else if (this.openfrom == 4 && this.projectForm.testers) {
                this.checkedPerson = this.checkedTesterId;
            } else if (this.openfrom == 5 && this.projectForm.packagers) {
                this.checkedPerson = this.checkedPackagerId;
            }
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