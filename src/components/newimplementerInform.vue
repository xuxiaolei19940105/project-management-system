<template>
    <div>
        <el-card>
            <el-form
                label-width="100px"
                v-model="implrmrntForm"
                ref="implrmrntForm"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="发布人" required>
                            <el-input v-model="implrmrntForm.sendUserName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="执行人" required>
                            <el-input
                                v-bind:disabled="disabledlevel"
                                prefix-icon="el-icon-search"
                                v-model="implrmrntForm.userName"
                                @focus="showPersonPage"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="任务概述" required>
                            <el-input v-model="implrmrntForm.taskdetail" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始时间" required>
                            <el-date-picker
                                v-model="implrmrntForm.implementStartDate"
                                placeholder="请选择"
                                v-bind:disabled="disabled"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束时间" required>
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
                            ref="upload"
                            action
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false"
                            :http-request="uploadSectionFile"
                            v-bind:disabled="disabled"
                        >
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

                            <el-button
                                style="margin-left: 10px;"
                                size="small"
                                type="success"
                                @click="showDownloadPage"
                            >下载</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传不超过500kb的文件</div>
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

        <el-dialog
            title="下载文件"
            :visible.sync="downloadDialogVisible"
            width="680px"
            :append-to-body="true"
            :close-on-click-modal="false"
        >
            <el-card>
                <el-table :data="fileList" border style="width: 100%">
                    <el-table-column prop="name" label="文件名"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button
                                @click="download(scope.row,scope.$index)"
                                type="text"
                                size="small"
                            >下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
        index: Number,
        rowdata: Object,
        operationmode: String,
        belongTaskId: String,
        workId: String
    },
    data() {
        return {
            //下载弹窗
            downloadDialogVisible: false,

            //执行人选择权限level
            disabledlevel: true,

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
            fileList: [],
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
            let pro_id = localStorage.getItem('pro_id');
            let projectObjectId = {};
            projectObjectId.id = pro_id;
            let _this = this;
            this.$api.task.initProData(projectObjectId).then(response => {
                let rowdata = response.data.taskList[1].workList[_this.index];
                _this.implrmrntForm.id = rowdata.id;
                _this.implrmrntForm.userId = rowdata.userId;
                _this.implrmrntForm.userName = rowdata.userName;
                _this.implrmrntForm.sendUserId = rowdata.sendUserId;
                _this.implrmrntForm.sendUserName = rowdata.sendUserName;
                _this.implrmrntForm.taskdetail = rowdata.workDescribe;
                _this.implrmrntForm.implementStartDate = rowdata.starttime;
                _this.implrmrntForm.implementEndDate = rowdata.endtime;
                _this.implrmrntForm.belongProId = rowdata.belongProId;
                _this.implrmrntForm.belongTaskId = rowdata.belongTaskId;
            });

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
            this.implrmrntForm.userName = this.rowdata.userName;
            this.implrmrntForm.sendUserName = this.rowdata.sendUserName;
            this.implrmrntForm.taskdetail = this.rowdata.workDescribe;
            this.implrmrntForm.implementStartDate = this.rowdata.starttime;
            this.implrmrntForm.implementEndDate = this.rowdata.endtime;
            this.disabled = true;
            this.itialize();
        } else if (this.operationmode == 'new') {
            this.implrmrntForm.sendUserName = localStorage.getItem('ms_name');
            this.implrmrntForm.userName = localStorage.getItem('ms_name');
            this.implrmrntForm.userid = localStorage.getItem('ms_id');
            this.implrmrntForm.sendUserid = localStorage.getItem('ms_id');
            if (JSON.parse(localStorage.getItem('ms_data')).authId == 0 || JSON.parse(localStorage.getItem('ms_data')).authId == 1) {
                this.disabledlevel = false;
            }
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
        //初始化附件显示
        itialize() {
            let workList = {};
            workList.id = this.workId;
            this.$api.task.getFileListByWork(workList).then(response => {
                let responsevalue = response.data;
                for (var i = 0; i < responsevalue.length; i++) {
                    let work = {};
                    work.name = responsevalue[i].fileName;
                    work.url = responsevalue[i].fileUrl;
                    work.id = responsevalue[i].id;
                    this.fileList.push(work);
                }
            });
        },

        //上传
        submitUpload() {
            this.$refs.upload.submit();
        },
        uploadSectionFile(param) {
            // FormData 对象
            var form = new FormData();
            // 文件对象
            //通过append向form对象添加数据
            form.append('workId', this.workId);
            form.append('fileList', param.file);
            this.$api.task.uploadFile(form).then(
                this.$message({
                    type: 'success',
                    message: '附件上传成功'
                })
            );
            this.itialize();
        },
        showDownloadPage() {
            this.downloadDialogVisible = true;
        },
        download(row, index) {
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = 'http://192.168.85.170:8099/StaticFile/downloadFile?fileId='+this.fileList[index].id;
            link.click();
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
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
            this.checkedimplrmrntId = this.checkedPerson;
            this.implrmrntForm.userid = this.checkedPerson.toString();
            this.implrmrntForm.userName = this.checkedPersonValue.toString();
        }
    }
};
</script>
<style lang="stylus">
.el-upload--text {
  vertical-align: bottom;
  width: auto;
  height: auto;
  border: none;
}
</style>