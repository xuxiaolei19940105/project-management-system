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
                taskdetail: '',
                implementStartDate: '',
                implementEndDate: ''
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
            this.implrmrntForm.taskdetail = this.rowdata.task;
            this.implrmrntForm.implementStartDate = this.rowdata.starttime;
            this.implrmrntForm.implementEndDate = this.rowdata.endtime;
            this.disabled = false;
        } else if (this.operationmode == 'consult') {
            this.implrmrntForm.taskdetail = this.rowdata.task;
            this.implrmrntForm.implementStartDate = this.rowdata.starttime;
            this.implrmrntForm.implementEndDate = this.rowdata.endtime;
            this.disabled = true;
        } else if (this.operationmode == 'new') {
            this.implrmrntForm.taskdetail = '';
            this.implrmrntForm.implementStartDate = '';
            this.implrmrntForm.implementEndDate = '';
            this.disabled = false;
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
        }
    }
};
</script>