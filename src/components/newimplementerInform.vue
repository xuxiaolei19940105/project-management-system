<template>
    <div>
        <el-card>
            <el-form
                label-width="70px"
                v-model="implrmrntForm"
                ref="implrmrntForm"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="发布人">
                            <el-input v-model="implrmrntForm.sendUserName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="执行人">
                            <el-input
                                v-bind:disabled="disabled"
                                prefix-icon="el-icon-search"
                                v-model="implrmrntForm.userName"
                                @focus="showPersonPage"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="任务概述">
                            <el-input v-model="implrmrntForm.taskdetail" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始时间">
                            <el-date-picker
                                v-model="implrmrntForm.implementStartDate"
                                placeholder="请选择"
                                v-bind:disabled="disabled"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束时间">
                            <el-date-picker
                                v-model="implrmrntForm.implementEndDate"
                                placeholder="请选择"
                                v-bind:disabled="disabled"
                            ></el-date-picker>
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
                            :disabled="disabled"
                            :before-remove="beforeRemove"
                            :limit="3"
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
            disabled: false,
            implrmrntForm: {
                sendUserid: '',
                sendUserName: '',
                userid: '',
                userName: '',
                taskdetail: '',
                implementStartDate: '',
                implementEndDate: ''
            },
            labelPosition: 'left',
            fileList: [
                {
                    name: '',
                    url: ''
                }
            ],

            //人员选择弹窗
            dialogVisible: false,
            personOptions: [
                { id: 1, name: '测试1' },
                { id: 2, name: '测试2' },
                { id: 3, name: '测试3' }
            ],
            checkedPerson: [],
            checkedimplrmrntId: [],
            checkedPersonValue: [],
            openfrom: ''
        };
    },
    created() {
        if (this.operationmode == 'edit') {
            this.implrmrntForm.sendUserName = localStorage.getItem('ms_name');
            this.implrmrntForm.userName = this.rowdata.userName;
            this.implrmrntForm.taskdetail = this.rowdata.workDescribe;
            this.implrmrntForm.implementStartDate = this.rowdata.starttime;
            this.implrmrntForm.implementEndDate = this.rowdata.endtime;
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
            this.implrmrntForm.taskdetail = this.rowdata.workDescribe;
            this.implrmrntForm.implementStartDate = this.rowdata.starttime;
            this.implrmrntForm.implementEndDate = this.rowdata.endtime;
            this.disabled = true;
        } else if (this.operationmode == 'new') {
            this.implrmrntForm.sendUserName = localStorage.getItem('ms_name');
            this.implrmrntForm.sendUserid = '';
            this.implrmrntForm.userid = '';
            this.implrmrntForm.taskdetail = '';
            this.implrmrntForm.implementStartDate = '';
            this.implrmrntForm.implementEndDate = '';
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
            this.implrmrntForm.taskdetail = '';
            this.implrmrntForm.implementStartDate = '';
            this.implrmrntForm.implementEndDate = '';
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
            if (this.implrmrntForm.userName) {
                this.checkedPerson = this.checkedimplrmrntId;
            }
        },
        addPerson: function() {
            this.dialogVisible = false;
            this.getval();
            console.log(this.checkedPerson);
            this.checkedimplrmrntId = this.checkedPerson;
            this.implrmrntForm.userName = this.checkedPersonValue.toString();
        }
    }
};
</script>