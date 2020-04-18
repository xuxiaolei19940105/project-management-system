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

        <el-dialog title="人员选择" :visible.sync="dialogVisible" width="680px" :append-to-body="true">
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
                    lable: '001'
                },
                {
                    value: '暂停',
                    lable: '002'
                },
                {
                    value: '已作废',
                    lable: '003'
                },
                {
                    value: '已完结',
                    lable: '004'
                }
            ]
        };
    },
    created() {
        // this.$api.task.getAllUser().then((response)=>{
        //     console.log(response);
        //     let responsevalue=response;
        //     if(responsevalue){
        //         let personOptions=[];
        //         for(var i=0;i<responsevalue.length;i++){
        //             let proObject={};
        //             proObject.id=responsevalue[i].id;
        //             proObject.name=responsevalue[i].name;
        //             personOptions.push(proObject);
        //         }
        //         this.personOptions=personOptions;
        //     }else{
        //         this.$message.success('请联系Admin!');
        //     }
        // });
    },
    mounted() {
        let disabled = localStorage.getItem('list');
        this.disabled = JSON.parse(disabled);
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
            debugger;
            this.checkedPerson = [];
            this.openfrom = openfrom;
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
            debugger;
            this.dialogVisible = false;
            this.getval();
            console.log(this.checkedPerson);
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