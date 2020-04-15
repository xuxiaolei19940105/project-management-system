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
                    <el-col :span="24">
                        <el-form-item label="任务概述">
                            <el-input
                                v-model="newdevelopForm.taskdetail"
                                v-bind:disabled="disabledtaskdetail"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始时间">
                            <el-date-picker
                                v-model="newdevelopForm.developStartDate"
                                placeholder="请选择"
                                v-bind:disabled="disabledtaskStartDate"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束时间">
                            <el-date-picker
                                v-model="newdevelopForm.developEndDate"
                                placeholder="请选择"
                                v-bind:disabled="disabledtaskEndDate"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="抄送">
                            <el-input
                                v-bind:disabled="disabledtesters"
                                prefix-icon="el-icon-search"
                                v-model="newdevelopForm.testers"
                                @focus="showPersonPage"
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
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                        >
                            <el-button
                                size="small"
                                type="primary"
                                v-bind:disabled="disabledtaskbutton"
                            >点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-dialog title="人员选择" :visible.sync="dialogVisible" width="80%" :append-to-body="true">
            <el-card>
                <el-checkbox-group v-model="checkedPerson">
                    <el-checkbox
                        v-for="person in personOptions"
                        :label="person"
                        :key="person"
                    >{{person}}</el-checkbox>
                </el-checkbox-group>
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
            checkedPerson: [],
            personOptions: ['吴二', '张三', '李四', '王五'],
            openfrom: '',

            disabledtaskdetail: false,
            disabledtaskStartDate: false,
            disabledtaskEndDate: false,
            disabledtesters: false,
            disabledtaskbutton: false,
            newdevelopForm: {
                taskdetail: '',
                developStartDate: '',
                developEndDate: '',
                testers: ''
            },
            labelPosition: 'left',
            fileList: [
                {
                    name: '小鹿',
                    url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
                }
            ]
        };
    },
    created() {
        console.log(this.rowdata);
        console.log(this.operationmode);
        if (this.operationmode == 'edit') {
            this.newdevelopForm.taskdetail = this.rowdata.task;
            this.newdevelopForm.developStartDate = this.rowdata.starttime;
            this.newdevelopForm.developEndDate = this.rowdata.endtime;
            this.disabledtaskdetail = false;
            this.disabledtaskStartDate = false;
            this.disabledtaskEndDate = false;
            this.disabledtesters = false;
            this.disabledtaskbutton = false;
        } else if (this.operationmode == 'consult') {
            this.newdevelopForm.taskdetail = this.rowdata.task;
            this.disabledtaskdetail = true;
            this.newdevelopForm.developStartDate = this.rowdata.starttime;
            this.disabledtaskStartDate = true;
            this.newdevelopForm.developEndDate = this.rowdata.endtime;
            this.disabledtaskEndDate = true;
            this.disabledtesters = true;
            this.disabledtaskbutton = true;
        } else if (this.operationmode == 'new') {
            this.newdevelopForm.taskdetail = '';
            this.disabledtaskdetail = false;
            this.newdevelopForm.developStartDate = '';
            this.disabledtaskStartDate = false;
            this.newdevelopForm.developEndDate = '';
            this.disabledtaskEndDate = false;
            this.disabledtesters = false;
            this.disabledtaskbutton = false;
        } else {
            this.newdevelopForm.taskdetail = '';
            this.newdevelopForm.developStartDate = '';
            this.newdevelopForm.developEndDate = '';
            this.disabledtaskdetail = false;
            this.disabledtaskStartDate = false;
            this.disabledtaskEndDate = false;
            this.disabledtesters = false;
            this.disabledtaskbutton = false;
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

        showPersonPage() {
            this.checkedPerson = [];
            this.dialogVisible = true;
            if (this.newdevelopForm.testers) {
                this.checkedPerson = this.newdevelopForm.testers.split(',');
            }
        },
        addPerson: function() {
            this.dialogVisible = false;
            this.newdevelopForm.testers = this.checkedPerson.toString();
        }
    }
};
</script>