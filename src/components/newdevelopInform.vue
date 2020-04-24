<template>
    <div>
        <el-card>
            <el-form
                label-width="70px"
                v-model="newdevelopForm"
                ref="newdevelopForm"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="发布人">
                            <el-input v-model="newdevelopForm.sendUserName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="执行人">
                            <el-input
                                v-bind:disabled="disabledlevel"
                                prefix-icon="el-icon-search"
                                v-model="newdevelopForm.userName"
                                @focus="showPersonPage(1)"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="任务概述">
                            <el-input
                                v-model="newdevelopForm.taskdetail"
                                v-bind:disabled="disabled"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="开始时间">
                            <el-date-picker
                                v-model="newdevelopForm.developStartDate"
                                placeholder="请选择"
                                v-bind:disabled="disabled"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="结束时间">
                            <el-date-picker
                                v-model="newdevelopForm.developEndDate"
                                placeholder="请选择"
                                v-bind:disabled="disabled"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="抄送">
                            <el-input
                                v-bind:disabled="disabled"
                                prefix-icon="el-icon-search"
                                v-model="newdevelopForm.testers"
                                @focus="showPersonPage(2)"
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

            disabledlevel: true,
            disabled: false,
            newdevelopForm: {
                sendUserid: '',
                sendUserName: '',
                userid: '',
                userName: '',
                taskdetail: '',
                developStartDate: '',
                developEndDate: '',
                testers: ''
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
        if (this.operationmode == 'edit') {
            this.newdevelopForm.sendUserName = localStorage.getItem('ms_name');
            this.newdevelopForm.userName = this.rowdata.userName;
            this.newdevelopForm.taskdetail = this.rowdata.workDescribe;
            this.newdevelopForm.developStartDate = this.rowdata.starttime;
            this.newdevelopForm.developEndDate = this.rowdata.endtime;
            this.disabled = false;

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
        } else if (this.operationmode == 'consult') {
            this.newdevelopForm.userName = this.rowdata.userName;
            this.newdevelopForm.sendUserName = this.rowdata.sendUserName;
            this.newdevelopForm.taskdetail = this.rowdata.workDescribe;
            this.disabledtaskdetail = true;
            this.newdevelopForm.developStartDate = this.rowdata.starttime;
            this.newdevelopForm.developEndDate = this.rowdata.endtime;
            this.disabled = true;
        } else if (this.operationmode == 'new') {
            this.newdevelopForm.sendUserName = localStorage.getItem('ms_name');
            this.newdevelopForm.userName = localStorage.getItem('ms_name');
            this.newdevelopForm.userid = localStorage.getItem('ms_id');
            this.newdevelopForm.sendUserid = localStorage.getItem('ms_id');
            if (JSON.parse(localStorage.getItem('ms_data')).authId == 0 || JSON.parse(localStorage.getItem('ms_data')).authId == 1) {
                this.disabledlevel = false;
            }
            this.newdevelopForm.taskdetail = '';
            this.newdevelopForm.developStartDate = '';
            this.newdevelopForm.developEndDate = '';
            this.disabled = false;
            //人员选择
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
        } else {
            this.newdevelopForm.taskdetail = '';
            this.newdevelopForm.developStartDate = '';
            this.newdevelopForm.developEndDate = '';
            this.disabled = false;
        }
    },
    methods: {
        opennewdevoppage(rowdata, mode) {
            console.log(rowdata);
            console.log(mode);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${file.name}？`);
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
                if (this.newdevelopForm.userName) {
                    this.checkedPerson = this.checkedDeveloperId;
                }
            } else {
                if (this.newdevelopForm.testers) {
                    this.checkedPerson = this.checkedDeveloperId;
                }
            }
        },
        addPerson: function() {
            this.dialogVisible = false;
            this.getval();

            if (this.openfrom == 1) {
                this.checkedUseNameId = this.checkedPerson;
                this.newdevelopForm.userid = this.checkedPerson.toString();
                this.newdevelopForm.userName = this.checkedPersonValue.toString();
            } else {
                this.checkedPostId = this.checkedPerson;
                this.newdevelopForm.testers = this.checkedPersonValue.toString();
            }
        }
    }
};
</script>