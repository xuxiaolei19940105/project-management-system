<template>
    <div class="task-context">
        <el-card class="box-card">
            <el-form :model="formInline" class="form-inline" inline>
                <el-form-item label="单据号">
                    <el-input v-model="formInline.voucherId"></el-input>
                </el-form-item>
                <el-form-item label="年度">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="onSubmit">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="pd-5 mgt-10">
            <div slot="header" class="clearfix">
                <span>搜索结果</span>
                <div class="fr">
                    <el-button size="small" icon="el-icon-folder-add" @click="addButtonClick">新增</el-button>
                </div>
            </div>
            <dytable
                :columns="columns"
                :table-data="table"
                :total="total"
                ref="multipleTable"
                :page-num="pageNum"
                :page-size="pageSize"
                @current-change="onCurrentChange"
                @on-selection-change="onSelectionChange"
                @size-change="onSizeChange"
                v-loading="false"
                element-loading-text="加载中"
            ></dytable>
        </el-card>
        <el-dialog title="任务结构编制" :visible.sync="dialogVisible" width="70%" class="dialog-show">
            <el-form
                label-width="100px"
                v-model="dialogformdata"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="公司" prop="number">
                            <el-select v-model="companyValue" placeholder="请选择">
                                <el-option
                                    v-for="item in companyOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="单据号" prop="number">
                            <el-input v-model="dialogformdata.number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="部门" prop="department">
                            <el-input v-model="dialogformdata.department"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="年度" prop="years">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="经办人" prop="agent">
                            <el-input v-model="dialogformdata.agent"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="单据日期" prop="date">
                            <el-input v-model="dialogformdata.number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="note">
                            <el-input type="textarea" v-model="dialogformdata.note"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-col :span="24">
                    <el-form-item label="附件上传" prop="phone">
                        <el-col>
                            <el-upload
                                class="upload-demo"
                                action
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList"
                            >
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>任务结构编制行</span>
                    <el-button
                        size="small"
                        icon="el-icon-delete"
                        @click="addButtonClick"
                        style="float: right;margin-left: 10px"
                    >删除</el-button>
                    <el-button
                        size="small"
                        icon="el-icon-folder-add"
                        @click="addButtonClick"
                        style="float: right;"
                    >新增</el-button>
                </div>
                <el-table
                    ref="singleTable"
                    :data="table1"
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    style="width: 100%"
                    max-height="230"
                    size="small"
                    border
                >
                    <el-table-column fixed property="note" label="任务编码"></el-table-column>
                    <el-table-column property="note" label="任务类型"></el-table-column>
                    <el-table-column property="note" label="年计划调整"></el-table-column>
                    <el-table-column property="note" label="任务名称"></el-table-column>
                    <el-table-column property="note" label="工作标准"></el-table-column>
                    <el-table-column property="note" label="周期性任务"></el-table-column>
                    <el-table-column property="note" label="跨月任务"></el-table-column>
                    <el-table-column property="note" label="计划开始日期"></el-table-column>
                    <el-table-column property="note" label="责任人"></el-table-column>
                    <el-table-column property="note" label="检查人"></el-table-column>
                    <el-table-column property="note" label="交办人"></el-table-column>
                    <el-table-column property="note" label="秘书"></el-table-column>
                    <el-table-column property="note" label="备注"></el-table-column>
                </el-table>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">暂存</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'task-context',
    data() {
        const { renderControlColumn } = this;

        return {
            //上传
            fileList: [],

            // 表单文字位置
            labelPosition: 'left',

            //弹窗表单数据
            dialogformdata: {
                number: '',
                department: '',
                years: '',
                agent: '',
                date: '',
                note: ''
            },

            //弹窗是否显示
            dialogVisible: false,

            formInline: {
                voucherId: '', // 单据号
                year: '' // 年度
            },

            //年度下拉
            options: [
                {
                    value: '选项1',
                    label: '2019'
                },
                {
                    value: '选项2',
                    label: '2020'
                },
                {
                    value: '选项3',
                    label: '2021'
                }
            ],
            value: '',

            //公司下拉
            companyOptions: [
                {
                    value: '选项1',
                    label: '福佳集团'
                },
                {
                    value: '选项2',
                    label: '福佳新天地'
                },
                {
                    value: '选项3',
                    label: '福佳地产'
                }
            ],
            companyValue: '',

            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'state',
                    title: '状态',
                    width: '100'
                },
                {
                    key: 'company',
                    title: '公司',
                    width: '100'
                },
                {
                    key: 'department',
                    title: '部门',
                    width: '100'
                },
                {
                    key: 'year',
                    title: '年度'
                },
                {
                    key: 'number',
                    title: '单据号'
                },
                {
                    key: 'agent',
                    title: '经办人'
                },
                {
                    key: 'date',
                    title: '经办日期',
                    width: '140px'
                },
                {
                    key: 'note',
                    title: '备注',
                    width: '140px'
                },
                {
                    title: '操作',
                    render: renderControlColumn,
                    width: '260px'
                }
            ],
            table1: [
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                }
            ],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            table: [
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                },
                {
                    number: '1',
                    agent: '张三',
                    year: '2019',
                    department: '信息中心',
                    company: '福佳集团',
                    state: '2016-05-02',
                    date: '2016-05-02',
                    content: '上海市普陀区金沙江路 1518 弄',
                    note: '11111'
                }
            ]
        };
    },

    methods: {
        //选择数据
        handleCurrentChange(val) {
            this.currentRow = val;
        },

        //上传
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

        onSubmit() {
            console.log('提交');
        },
        onSelectionChange(val) {
            console.log('多选', val);
            this.multipleSelection = val;
        },
        onSizeChange(val) {
            this.pageSize = val;
        },
        onCurrentChange(val) {
            this.pageNum = val;
        },
        // 查看
        addButtonClick() {
            this.dialogVisible = true;
        },
        // 查看
        onRowLookButtonClick(row) {
            console.log(row, '查看');
        },
        //删除
        onRowDeleteButtonClick(row) {
            console.log(row, '删除');
        },
        //编辑
        onRowUpdateButtonClick(row) {
            console.log(row, '编辑');
        },
        renderControlColumn({ row }) {
            const { onRowDeleteButtonClick, onRowLookButtonClick, onRowUpdateButtonClick } = this;
            const ret = [];
            ret.push(
                <div>
                    <el-button type="text" icon="el-icon-folder-opened" onClick={() => onRowLookButtonClick(row)}>
                        查看
                    </el-button>
                    <el-button type="text" icon="el-icon-edit" onClick={() => onRowUpdateButtonClick(row)}>
                        编辑
                    </el-button>
                    <el-button type="text" style="color:red" icon="el-icon-delete" onClick={() => onRowDeleteButtonClick(row)}>
                        删除
                    </el-button>
                </div>
            );
            return <div>{ret}</div>;
        }
    }
};
</script>
<style scoped lang="scss">
.el-select {
    width: 100%;
}
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
}
.clearfix:after {
    clear: both;
}
.dialog-show {
    .el-form-item {
        margin-bottom: 5px;
    }
}
</style>
<style lang="scss">
.el-upload {
    width: auto;
    height: auto;
    border: none;
}
.el-dialog__body {
    max-height: 400px;
    overflow-y: auto;
}
</style>

  
