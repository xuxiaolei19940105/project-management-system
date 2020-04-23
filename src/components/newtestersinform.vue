<template>
    <div>
        <el-card>
            <el-form
                label-width="70px"
                v-model="newtesterForm"
                ref="newtesterForm"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="发布人">
                            <el-input v-model="newtesterForm.sendUserName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="执行人">
                            <el-input
                                v-bind:disabled="disabled"
                                prefix-icon="el-icon-search"
                                v-model="newtesterForm.userName"
                                @focus="showPersonPage(1)"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="任务详情">
                            <el-input v-model="newtesterForm.taskdetail" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="是否bug">
                            <el-radio
                                v-model="newtesterForm.radio"
                                label="Yes"
                                v-bind:disabled="disabled"
                            ></el-radio>
                            <el-radio
                                v-model="newtesterForm.radio"
                                label="No"
                                v-bind:disabled="disabled"
                            ></el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="预计结果">
                            <el-input
                                v-model="newtesterForm.expectedresults"
                                v-bind:disabled="disabled"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="bug标题">
                            <el-input v-model="newtesterForm.bugtital" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="实际结果">
                            <el-input
                                v-model="newtesterForm.actualresults"
                                v-bind:disabled="disabled"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="bug编号">
                            <el-input v-model="newtesterForm.bugnumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="开始时间">
                            <el-date-picker
                                v-model="newtesterForm.testerStartDate"
                                placeholder="请选择"
                                v-bind:disabled="disabled"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="抄送">
                            <el-input
                                v-bind:disabled="disabled"
                                prefix-icon="el-icon-search"
                                v-model="newtesterForm.developers"
                                @focus="showPersonPage(2)"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="结束时间">
                            <el-date-picker
                                v-model="newtesterForm.testerEndDate"
                                placeholder="请选择"
                                v-bind:disabled="disabled"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="bug说明">
                            <el-input
                                type="textarea"
                                v-model="newtesterForm.comments"
                                v-bind:disabled="disabled"
                                :rows="8"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :limit="3"
                            :disabled="disabled"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        >
                            <el-button size="small" type="primary" v-bind:disabled="disabled">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form>
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
    props: {
        rowdata: Object,
        operationmode: String
    },
    data() {
        return {
            //人员选择弹窗
            dialogVisible: false,
            personOptions: [
                { id: 1, name: '测试1' },
                { id: 2, name: '测试2' },
                { id: 3, name: '测试3' }
            ],
            checkedPerson: [],
            checkedUseNameId: [],
            checkedPsotId: [],
            checkedPersonValue: [],
            openfrom: '',

            disabled: false,
            newtesterForm: {
                sendUserid: '',
                sendUserName: '',
                userid: '',
                userName: '',
                taskdetail: '',
                expectedresults: '',
                actualresults: '',
                testerStartDate: '',
                testerEndDate: '',
                developers: '',
                comments: '',
                bugtital: '',
                bugnumber: '',
                radio: ''
            },
            labelPosition: 'left',
            fileList: [
                {
                    name: '',
                    url: ''
                }
            ]
        };
    },
    created() {
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
        if (this.operationmode == 'edit') {
            this.newtesterForm.sendUserName = localStorage.getItem('ms_name');
            this.newtesterForm.userName = this.rowdata.userName;
            this.newtesterForm.taskdetail = this.rowdata.workDescribe;
            this.newtesterForm.expectedresults = this.rowdata.want;
            this.newtesterForm.actualresults = this.rowdata.actual;
            this.newtesterForm.testerStartDate = this.rowdata.starttime;
            this.newtesterForm.testerEndDate = this.rowdata.endtime;
            this.disabled = false;
        } else if (this.operationmode == 'consult') {
            this.newtesterForm.sendUserName = localStorage.getItem('ms_name');
            this.newtesterForm.userName = this.rowdata.userName;
            this.newtesterForm.taskdetail = this.rowdata.workDescribe;
            this.newtesterForm.expectedresults = this.rowdata.want;
            this.newtesterForm.actualresults = this.rowdata.actual;
            this.newtesterForm.testerStartDate = this.rowdata.starttime;
            this.newtesterForm.testerEndDate = this.rowdata.endtime;
            this.disabled = true;
        } else if (this.operationmode == 'new') {
            this.newtesterForm.sendUserName = localStorage.getItem('ms_name');
            this.newtesterForm.sendUserid = '';
            this.newtesterForm.userid = '';
            this.newtesterForm.taskdetail = '';
            this.newtesterForm.expectedresults = '';
            this.newtesterForm.actualresults = '';
            this.newtesterForm.testerStartDate = '';
            this.newtesterForm.testerEndDate = '';
            this.disabled = false;
        } else {
            this.newtesterForm.taskdetail = '';
            this.newtesterForm.expectedresults = '';
            this.newtesterForm.actualresults = '';
            this.newtesterForm.testerStartDate = '';
            this.newtesterForm.testerEndDate = '';
            this.disabled = false;
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(files.length + fileList.length);
        },
        beforeRemove(file) {
            return this.$confirm(file.name);
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
            this.dialogVisible = true;
            if (this.openfrom == 1) {
                if (this.newtesterForm.userName) {
                    this.checkedPerson = this.checkedDeveloperId;
                }
            } else {
                if (this.newtesterForm.developers) {
                    this.checkedPerson = this.checkedDeveloperId;
                }
            }
        },
        addPerson: function() {
            this.dialogVisible = false;
            this.getval();
            if (this.openfrom == 1) {
                this.checkedUseNameId = this.checkedPerson;
                this.newtesterForm.userName = this.checkedPersonValue.toString();
            } else {
                this.checkedPostId = this.checkedPerson;
                this.newtesterForm.developers = this.checkedPersonValue.toString();
            }
        }
    }
};
</script>