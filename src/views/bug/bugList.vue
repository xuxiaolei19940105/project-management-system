<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="search" class="demo-form-inline" size="mini">
                <el-form-item label="项目名称">
                    <el-input v-model="search.name"></el-input>
                </el-form-item>
                <el-form-item label="优先级">
                    <el-select clearable v-model="search.level" placeholder="请选择优先级">
                        <el-option label="高" value="3"></el-option>
                        <el-option label="中" value="2"></el-option>
                        <el-option label="低" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="研发状态">
                    <el-select clearable v-model="search.developState" placeholder="请选择状态">
                        <el-option label="未处理" value="0"></el-option>
                        <el-option label="已处理" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="测试状态">
                    <el-select clearable v-model="search.testState" placeholder="请选择状态">
                        <el-option label="待测" value="0"></el-option>
                        <el-option label="测试通过" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-button
                    type="primary"
                    style="float:right"
                    icon="el-icon-search"
                    @click="searchBug"
                    size="mini"
                >查询</el-button>
            </el-form>
        </el-card>
        <el-card>
            <div style="text-align:right;padding-bottom:10px;">
                <el-button size="mini" @click="creat" :disabled="!newState">新建</el-button>
                <el-button size="mini" @click="handle" :disabled="!handleState">处理</el-button>
                <el-button size="mini" @click="check" :disabled="!testState">验证</el-button>
                <el-button size="mini" @click="pack" :disabled="!packState">打包</el-button>
            </div>

            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="bugNnm" label="序号" width="50"></el-table-column>
                <el-table-column prop="belongProId" label="项目名称"></el-table-column>
                <el-table-column prop="moduleName" label="模块"></el-table-column>E
                <el-table-column prop="bugType" label="类型" :formatter="renderBugType"></el-table-column>
                <el-table-column prop="bugDescribe" label="任务描述"></el-table-column>
                <el-table-column prop="priority" label="优先级" :formatter="renderPriority"></el-table-column>
                <el-table-column prop="effectUser" label="实施" :formatter="renderEffectUser"></el-table-column>

                <el-table-column prop="presentTime" label="提出时间" :formatter="renderPresentTime"></el-table-column>
                <el-table-column
                    prop="anticipatedTime"
                    label="要求完成时间"
                    :formatter="renderAnticipatedTime"
                ></el-table-column>
                <el-table-column prop="exploitUser" label="研发" :formatter="renderExploitUser"></el-table-column>
                <el-table-column prop="exploitState" label="研发状态" :formatter="renderExploitState"></el-table-column>
                <el-table-column prop="testState" label="测试状态" :formatter="renderTestState"></el-table-column>
                <el-table-column prop="packageState" label="打包状态" :formatter="renderPackState"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button
                            @click="see(scope.row)"
                            type="text"
                            size="small"
                            :disabled="!seeShow"
                        >查看</el-button>
                        <!-- <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button> -->
                        <el-button
                            @click="del(scope.row,scope.$index)"
                            type="text"
                            size="small"
                            :disabled="!delShow"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog :title="title" :visible.sync="creatDialogVisible" width="80%">
            <el-form
                ref="form"
                :model="form"
                label-width="120px"
                size="mini"
                v-bind:disabled="fromDisabled"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="项目名称" required>
                            <el-select v-model="form.name" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.proName"
                                    :label="item.proName"
                                    :value="item.proName"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="BUG提出人">
                            <el-input v-model="form.introducer"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="提出人所在部门">
                            <el-input v-model="form.department"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="优先级" required>
                            <el-select v-model="form.level" placeholder="请选择优先级">
                                <el-option label="高" value="3"></el-option>
                                <el-option label="中" value="2"></el-option>
                                <el-option label="低" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="提出时间" required>
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date2"
                                style="width: 100%;"
                                :picker-options="pickerOptions0"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="要求完成时间" required>
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date1"
                                style="width: 100%;"
                                :picker-options="pickerOptions1"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="类型" required>
                            <el-select v-model="form.type" placeholder="请选择类型">
                                <el-option label="系统bug" value="0"></el-option>
                                <el-option label="数据处理" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="模块" required>
                            <el-input v-model="form.module"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="验证" required>
                            <el-input
                                prefix-icon="el-icon-search"
                                v-model="form.implementers"
                                @focus="showPersonPage(1)"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="研发" required>
                            <el-input
                                prefix-icon="el-icon-search"
                                v-model="form.developers"
                                @focus="showPersonPage(2)"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="打包" required>
                            <el-input
                                prefix-icon="el-icon-search"
                                v-model="form.packers"
                                @focus="showPersonPage(3)"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="任务描述">
                        <el-input type="textarea" v-model="form.describe" :rows="4"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
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
                            :disabled="!disabled"
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="creatDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="creatConfirm">确 定</el-button>
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
        </el-dialog>

        <el-dialog
            title="人员选择"
            :visible.sync="personDialogVisible"
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
                <el-button @click="personDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPerson">确 定</el-button>
            </span>
        </el-dialog>

        <bug-information
            v-if="showChild"
            :showFrom="showFrom"
            ref="buginformation"
            :tableSelect="tableSelect"
            :title="childTitle"
            :showDescribe="showDescribe"
        />
    </div>
</template>
<script>
//引入uuid文件
import uuidv1 from 'uuid/v1';
import bugInformation from '../../components/bugInformation.vue';
export default {
    inject: ['reload'],
    components: {
        bugInformation
    },
    created() {
        let roleList = JSON.parse(localStorage.getItem('ms_role'));
        this.newState = roleList.includes('19');
        this.handleState = roleList.includes('20');
        this.testState = roleList.includes('21');
        this.packState = roleList.includes('22');
        this.seeShow = roleList.includes('23');
        this.delShow = roleList.includes('24');

        //人员加载
        this.$api.task.getAllUser().then(response => {
            this.personOptions = response.data;
        });

        //所属项目加载
        this.$api.task.getAllProList().then(response => {
            this.options = response.data;
        });

        //bug列表
        this.$api.task.getBugList().then(response => {
            this.tableData = response.data;
        });
    },
    data() {
        return {
            pickerOptions0: {
                disabledDate: time => {
                    if (this.form.date1 != '') {
                        return time.getTime() > this.form.date1;
                    }
                }
            },
            pickerOptions1: {
                disabledDate: time => {
                    return time.getTime() < this.form.date2;
                }
            },
            disabled: true,
            labelPosition: 'left',

            newState: false,
            handleState: false,
            testState: false,
            packState: false,

            seeShow: false,
            delShow: false,

            //查询条件
            search: {
                name: '',
                level: '',
                developState: '',
                testState: ''
            },
            //显示子组件
            showChild: false,
            //子组件title
            childTitle: '',
            //子组件是否显示备注
            showDescribe: false,

            fromDisabled: true,
            //项目名称
            options: [],
            value: '',

            //人员选择
            personDialogVisible: false,
            personOptions: [],
            checkedPerson: [],

            checkedImpId: [],
            checkedDevId: [],
            checkedPackId: [],
            checkedPersonValue: '',
            openfrom: '',

            //下载弹窗
            downloadDialogVisible: false,

            //新建弹窗
            creatDialogVisible: false,

            //列表
            tableSelect: [],
            tableData: [],
            bugId: '',
            form: {
                name: '',
                introducer: '',
                department: '',
                level: '',
                date1: '',
                date2: '',
                type: '',
                module: '',
                describe: '',
                implementers: '',
                developers: '',
                packers: ''
            },
            showFrom: 1,
            fileList: [],
            title: '',
            checkflag: true
        };
    },
    methods: {
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
        renderPackState(row) {
            let PackStateValue;
            if (row.packageState == 0) {
                PackStateValue = '未打包';
            } else if (row.packageState == 1) {
                PackStateValue = '已打包';
            }
            return <div>{PackStateValue}</div>;
        },
        renderBugType(row) {
            if (row.bugType) {
                let bugTypeValue;
                if (row.bugType == 0) {
                    bugTypeValue = '系统BUG';
                } else if (row.bugType == 1) {
                    bugTypeValue = '数据处理';
                }
                return <div>{bugTypeValue}</div>;
            }
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
            if (row.presentTime) {
                let DateS = new Date(row.presentTime);
                let ovwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate())).toISOString().slice(0, 10);
                return <div>{ovwerS}</div>;
            }
        },
        renderAnticipatedTime(row) {
            if (row.anticipatedTime) {
                let DateS = new Date(row.anticipatedTime);
                let ovwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate())).toISOString().slice(0, 10);
                return <div>{ovwerS}</div>;
            }
        },

        //根据条件查询项目列表
        searchBug() {
            let projectCondition = {};
            projectCondition.belongProId = this.search.name;
            projectCondition.priority = this.search.level;
            if (this.search.developState == '') {
                projectCondition.exploitState = -1;
            } else {
                projectCondition.exploitState = this.search.developState;
            }

            if (this.search.testState == '') {
                projectCondition.testState = -1;
            } else {
                projectCondition.testState = this.search.testState;
            }

            if (projectCondition) {
                this.$api.task.conditionSearch(projectCondition).then(response => {
                    this.tableData = response.data;
                });
            }
        },
        //新建
        creat() {
            this.creatDialogVisible = true;
            //重置
            this.form.name = '';
            this.form.introducer = '';
            this.form.department = '';
            this.form.level = '';
            this.form.date1 = '';
            this.form.date2 = '';
            this.form.type = '';
            this.form.module = '';
            this.form.describe = '';
            this.form.implementers = '';
            this.form.developers = '';
            this.form.packers = '';
            this.fromDisabled = false;
            this.title = '新建';
            this.disabled = true;
        },

        // 校验
        creatCheck() {
            if (this.form.name == '') {
                this.$message.error('请选择项目名称');
                this.checkflag = false;
            } else if (this.form.level == '') {
                this.$message.error('请选择优先级');
                this.checkflag = false;
            } else if (this.form.date2 == '') {
                this.$message.error('请选择提出时间');
                this.checkflag = false;
            } else if (this.form.date1 == '') {
                this.$message.error('请选择要求完成时间');
                this.checkflag = false;
            } else if (this.form.type == '') {
                this.$message.error('请选择bug类型');
                this.checkflag = false;
            } else if (this.form.module == '') {
                this.$message.error('请输入bug模块');
                this.checkflag = false;
            } else if (this.form.implementers == '') {
                this.$message.error('请选择实施人员');
                this.checkflag = false;
            } else if (this.form.developers == '') {
                this.$message.error('请选择开发人员');
                this.checkflag = false;
            } else if (this.form.packers == '') {
                this.$message.error('请选择打包人员');
                this.checkflag = false;
            } else {
                this.checkflag = true;
            }
        },
        //新建确定
        creatConfirm() {
            this.creatCheck();
            if (this.checkflag) {
                this.creatAPI();
                this.creatDialogVisible = false;
                this.submitUpload();
            }
        },
        //新建接口
        creatAPI() {
            let object = {};
            object.id = uuidv1().replace(/-/g, ''); //获取随机id
            this.bugId = object.id;
            object.belongProId = this.form.name;
            object.presenterName = this.form.introducer;
            object.presenterDepartment = this.form.department;
            object.priority = this.form.level;
            object.anticipatedTime = this.form.date1;
            object.presentTime = this.form.date2;
            object.bugType = this.form.type;
            object.moduleName = this.form.module;
            object.bugDescribe = this.form.describe;
            let effectUserList = [];
            let exploitUserList = [];
            let packageUserList = [];
            let effectUserObject = {};
            let exploitUserObject = {};
            let packageUserObject = {};
            this.checkedImpId.map(v => {
                effectUserObject.id = v;
                effectUserList.push(effectUserObject);
            });
            this.checkedDevId.map(v => {
                exploitUserObject.id = v;
                exploitUserList.push(exploitUserObject);
            });
            this.checkedPackId.map(v => {
                packageUserObject.id = v;
                packageUserList.push(packageUserObject);
            });
            object.effectUserList = effectUserList;
            object.exploitUserList = exploitUserList;
            object.packageUserList = packageUserList;
            this.$api.task.insertBug(object).then(() => {
                this.reload();
            });
        },

        //处理
        handle() {
            this.showFrom = 1;
            if (this.tableSelect == '') {
                this.$message.error('请选择bug');
            } else {
                this.showChild = true;
                this.childTitle = '处理';
                this.showDescribe = false;

                this.tableSelect.map(v => {
                    this.itialize(v.id);
                });
            }
        },
        //验证
        check() {
            this.showFrom = 2;
            if (this.tableSelect == '') {
                this.$message.error('请选择bug');
            } else {
                this.showChild = true;
                this.childTitle = '验证';
                this.showDescribe = false;

                this.tableSelect.map(v => {
                    this.itialize(v.id);
                });
            }
        },
        //打包
        pack() {
            this.showFrom = 3;
            if (this.tableSelect == '') {
                this.$message.error('请选择bug');
            } else {
                this.showChild = true;
                this.childTitle = '打包';
                this.showDescribe = true;
            }
        },
        //查看
        see(row) {
            this.title = '查看';

            this.itialize(row.id);
            this.form.name = row.belongProId;
            this.form.introducer = row.presenterName;
            this.form.department = row.presenterDepartment;
            this.form.level = row.priority;
            this.form.date1 = row.presentTime;
            this.form.date2 = row.anticipatedTime;
            this.form.type = row.bugType;
            this.form.module = row.moduleName;
            this.form.describe = row.bugDescribe;

            let effectUserValue = [];
            row.effectUserList.map(v => {
                effectUserValue.push(v.name);
            });
            let exploitUserValue = [];
            row.exploitUserList.map(v => {
                exploitUserValue.push(v.name);
            });
            let packageUserValue = [];
            row.packageUserList.map(v => {
                packageUserValue.push(v.name);
            });
            this.form.implementers = effectUserValue.toString();
            this.form.developers = exploitUserValue.toString();
            this.form.packers = packageUserValue.toString();
            this.fromDisabled = true;
            this.disabled = false;
            this.creatDialogVisible = true;
        },
        //编辑
        // edit() {},
        //删除
        del(row) {
            if (row.exploitState == 1) {
                this.$message.error('bug已处理,无法删除');
            } else {
                row.deleteFlg = 1;
                this.$api.task.updateBug(row).then(() => {
                    this.reload();
                });
            }
        },

        //获取选中
        handleSelectionChange(val) {
            let roleList = JSON.parse(localStorage.getItem('ms_role'));
            this.newState = roleList.includes('19');
            this.handleState = roleList.includes('20');
            this.testState = roleList.includes('21');
            this.packState = roleList.includes('22');

            this.tableSelect = val;
            for (let i = 0; i < val.length; i++) {
                if (val[i].exploitState == 0) {
                    this.testState = false;
                    this.packState = false;
                }
                if (val[i].exploitState == 1) {
                    this.handleState = false;
                }
                if (val[i].testState == 0) {
                    this.packState = false;
                }
                if (val[i].testState == 1) {
                    this.testState = false;
                }

                if (val[i].packageState == 1) {
                    this.packState = false;
                }
            }

            // if (v.packageState == 0) {
            //     this.packState = false;
            //     console.log('未打包');
            // } else {
            //     this.packState = true;
            // }
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
        //人员选择弹窗
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
            this.personDialogVisible = true;
        },
        addPerson: function() {
            this.personDialogVisible = false;
            this.getval();

            if (this.openfrom == 1) {
                this.checkedImpId = this.checkedPerson;
                this.form.implementers = this.checkedPersonValue.toString();
            } else if (this.openfrom == 2) {
                this.checkedDevId = this.checkedPerson;
                this.form.developers = this.checkedPersonValue.toString();
            } else if (this.openfrom == 3) {
                this.checkedPackId = this.checkedPerson;
                this.form.packers = this.checkedPersonValue.toString();
            }
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
</style>
