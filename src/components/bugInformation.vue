<template>
    <div>
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
        </el-dialog>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose"
        >
            <el-card>
                <el-form
                    ref="formData"
                    :model="formData"
                    label-width="100px"
                    size="mini"
                    :label-position="labelPosition"
                >
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="人员">
                                <el-input v-model="formData.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <el-form-item label="时间">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="formData.time"
                                    style="width: 100%;"
                                    disabled
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6" :offset="1" v-if="showDescribe">
                            <el-form-item label="版本号" required>
                                <el-input v-model="formData.number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="明细">
                                <el-table
                                    :data="tableSelect"
                                    style="width: 100%"
                                    size="mini"
                                    border
                                >
                                    <el-table-column prop="bugNnm" label="序号" width="50"></el-table-column>
                                    <el-table-column prop="belongProId" label="项目名称"></el-table-column>
                                    <el-table-column prop="moduleName" label="模块"></el-table-column>
                                    <el-table-column
                                        prop="bugType"
                                        label="类型"
                                        :formatter="renderBugType"
                                    ></el-table-column>
                                    <el-table-column prop="bugDescribe" label="任务描述"></el-table-column>
                                    <el-table-column
                                        prop="priority"
                                        label="优先级"
                                        :formatter="renderPriority"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="effectUser"
                                        label="实施"
                                        :formatter="renderEffectUser"
                                    ></el-table-column>

                                    <el-table-column
                                        prop="presentTime"
                                        label="提出时间"
                                        :formatter="renderPresentTime"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="anticipatedTime"
                                        label="要求完成时间"
                                        :formatter="renderAnticipatedTime"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="exploitUser"
                                        label="研发"
                                        :formatter="renderExploitUser"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="exploitState"
                                        label="研发状态"
                                        :formatter="renderExploitState"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="testState"
                                        label="测试状态"
                                        :formatter="renderTestState"
                                    ></el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="showDescribe">
                        <el-form-item label="打包任务概述">
                            <el-input type="textarea" v-model="formData.describe"></el-input>
                        </el-form-item>
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
                            >
                                <el-button
                                    slot="trigger"
                                    size="small"
                                    type="primary"
                                    :disabled="disabled"
                                >选取文件</el-button>

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
            <span slot="footer" class="dialog-footer" v-if="!(showFrom == 4)">
                <el-button @click="reload">取 消</el-button>
                <el-button type="primary" @click="define">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import uuidv1 from 'uuid/v1';
export default {
    inject: ['reload'],
    props: {
        showFrom: Number,
        tableSelect: Array,
        title: String,
        showDescribe: Boolean,
        packageId: String
    },
    created() {
        if (this.showFrom == 1 || this.showFrom == 2 || this.showFrom == 4) {
            this.disabled = true;
        }
    },
    mounted() {
        this.formData.name = localStorage.getItem('ms_name');
        var time = new Date();
        this.formData.time = time;

        this.tableSelect.map(v => {
            this.itialize(v.id);
        });
        if (this.showFrom == 4) {
            this.itialize(this.packageId);
        }
    },
    data() {
        return {
            labelPosition: 'left',
            disabled: false,
            bugId: '',
            checkflag: true,
            //组件弹窗
            dialogVisible: true,
            //下载弹窗
            downloadDialogVisible: false,

            //表单
            formData: {
                name: '',
                time: '',
                number: '',
                describe: ''
            },
            fileList: []
        };
    },
    methods: {
        handleClose() {
            this.reload();
        },
        check() {
            if (this.formData.number == '') {
                this.$message.error('请输入版本号');
                this.checkflag = false;
            } else {
                this.checkflag = true;
            }
        },
        //确定
        define() {
            if (this.showFrom == 1) {
                //处理
                for (let i = 0; i < this.tableSelect.length; i++) {
                    this.tableSelect[i].exploitState = 1;
                }
                this.$api.task.disposeBugList(this.tableSelect).then();
                this.reload();
            } else if (this.showFrom == 2) {
                //验证
                for (let i = 0; i < this.tableSelect.length; i++) {
                    this.tableSelect[i].testState = 1;
                }
                this.$api.task.disposeBugList(this.tableSelect).then();
                this.reload();
            } else if (this.showFrom == 3) {
                //打包
                this.check();
                if (this.checkflag) {
                    for (let i = 0; i < this.tableSelect.length; i++) {
                        this.tableSelect[i].packageState = 1;
                    }
                    let packageObject = {};
                    packageObject.id = uuidv1().replace(/-/g, ''); //获取随机id
                    this.bugId = packageObject.id;
                    packageObject.packageUserId = this.formData.name;
                    packageObject.packageTime = this.formData.time;
                    packageObject.version = this.formData.number;
                    packageObject.describe = this.formData.describe;
                    packageObject.bugList = this.tableSelect;
                    let table = this.tableSelect;
                    this.$api.task
                        .insertPackage(packageObject)
                        .then(() => {
                            this.$api.task.disposeBugList(table).then(() => {
                                this.$api.task.disposeBugList(this.tableSelect).then();
                                this.submitUpload();
                                this.reload();
                            });
                        })
                        .catch(() => {
                            this.$message.error('版本号重复！');
                        });
                }
            }
        },

        //初始化附件显示
        itialize(bugId) {
            let workList = {};
            workList.id = bugId;
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
            debugger;
            form.append('workId', this.bugId);
            form.append('fileList', param.file);
            this.$api.task.uploadFile(form).then(
                this.$message({
                    type: 'success',
                    message: '附件上传成功'
                })
            );
        },
        //下载
        showDownloadPage() {
            this.downloadDialogVisible = true;
        },
        download(row, index) {
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = 'http://192.168.85.170:8099/StaticFile/downloadFile?fileId=' + this.fileList[index].id;
            link.click();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
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
                this.projectForm.level = obj.level + 1;
            }
        },
        //初始化表格显示
        renderEffectUser(row) {
            let effectUserValue = [];
            if (row.effectUserList) {
                row.effectUserList.map(v => {
                    effectUserValue.push(v.name);
                });
            }

            return <div>{effectUserValue.toString()}</div>;
        },

        renderExploitUser(row) {
            let exploitUserValue = [];
            if (row.exploitUserList) {
                row.exploitUserList.map(v => {
                    exploitUserValue.push(v.name);
                });
            }

            return <div>{exploitUserValue.toString()}</div>;
        },
        renderExploitState(row) {
            let exploitStateValue;
            if (row.exploitState == 0) {
                exploitStateValue = '未处理';
            } else if (row.exploitState == 1) {
                exploitStateValue = '已处理';
            }
            return <div>{exploitStateValue}</div>;
        },
        renderTestState(row) {
            let testStateValue;
            if (row.testState == 0) {
                testStateValue = '待测';
            } else if (row.testState == 1) {
                testStateValue = '测试通过';
            }
            return <div>{testStateValue}</div>;
        },
        renderBugType(row) {
            let bugTypeValue;
            if (row.bugType == 0) {
                bugTypeValue = '系统BUG';
            } else if (row.bugType == 0) {
                bugTypeValue = '数据处理';
            }
            return <div>{bugTypeValue}</div>;
        },
        renderPriority(row) {
            let priorityValue;
            if (row.priority == 1) {
                priorityValue = '低';
            } else if (row.priority == 2) {
                priorityValue = '中';
            } else if (row.priority == 3) {
                priorityValue = '高';
            }
            return <div>{priorityValue}</div>;
        },
        renderPresentTime(row) {
            let DateS = new Date(row.presentTime);
            let ovwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate())).toISOString().slice(0, 10);
            return <div>{ovwerS}</div>;
        },
        renderAnticipatedTime(row) {
            let DateS = new Date(row.anticipatedTime);
            let ovwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate())).toISOString().slice(0, 10);
            return <div>{ovwerS}</div>;
        }
    }
};
</script>
<style>
.el-select {
    width: 100%;
}
.el-upload--text {
    vertical-align: bottom;
    width: auto;
    height: auto;
    border: none;
}
.el-form-item__label {
    padding: 0 10px;
}
</style>

