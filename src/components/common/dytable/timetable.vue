<template>
    <div>
        <el-card class="box-card">
            <el-form :model="PersonForm" class="form-inline" inline>
                <el-form-item label="项目">
                    <el-select v-model="PersonForm.project" placeholder="请选择">
                        <el-option v-for="item in PresonOptions"
                            :key="item.lable"
                            :label="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" @click="OnSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>搜索结果</span>
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
        <el-card>
            <el-table :data="persionData" style="width:100%">
                <el-table-column prop="persionname" label="姓名" width="80px"></el-table-column>
                <el-table-column prop="persionjob" label="职务" width="80px"></el-table-column>
                <el-table-column  label="最近30天占用情况">
                    <div class="ul_box">
                        <ul>
                            <li v-for="(item,index) in persionData.persiondate" :key="index" class="my_timeline_item">
                                {{item.lable}}
                            </li>
                        </ul>
                    </div>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            PersonForm:{
                project:''
            },
            columnsA:[
                {
                    key: 'name',
                    title: '姓名',
                    width: '100'
                },
                {
                    key: 'duties',
                    title: '职务',
                    width: '100'
                },
                {
                    key: 'datedetails',
                    title: '最近30天占用情况',
                }
            ],
            persionData:[
                {
                    persionname:'李四',
                    persionjob:'前端',
                    persiondate:[
                        {
                            lable:'10',
                            color:'#F56C6C'
                        },
                        {
                            lable:'11',
                            color:'#F56C6C'
                        },
                        {
                            lable:'12',
                            color:'#F56C6C'
                        },
                        {
                            lable:'13',
                            color:'#F56C6C'
                        },
                        {
                            lable:'14',
                            color:'#F56C6C'
                        },
                        {
                            lable:'15',
                            color:'#F56C6C'
                        },
                        {
                            lable:'16',
                            color:'#F56C6C'
                        },
                        {
                            lable:'17',
                            color:'#F56C6C'
                        },
                        {
                            lable:'18',
                            color:'#F56C6C'
                        },
                        {
                            lable:'19',
                            color:'#F56C6C'
                        },
                        {
                            lable:'20',
                            color:'#909399'
                        },
                        {
                            lable:'21',
                            color:'#909399'
                        },
                        {
                            lable:'22',
                            color:'#909399'
                        },
                        {
                            lable:'23',
                            color:'#909399'
                        },
                        {
                            lable:'24',
                            color:'#909399'
                        },
                        {
                            lable:'25',
                            color:'#909399'
                        },
                        {
                            lable:'26',
                            color:'#909399'
                        },
                        {
                            lable:'27',
                            color:'#909399'
                        },
                        {
                            lable:'28',
                            color:'#909399'
                        },{
                            lable:'29',
                            color:'#909399'
                        },
                        {
                            lable:'30',
                            color:'#909399'
                        },
                        {
                            lable:'31',
                            color:'#909399'
                        },
                        {
                            lable:'1',
                            color:'#909399'
                        },{
                            lable:'2',
                            color:'#F56C6C'
                        },
                        {
                            lable:'3',
                            color:'#F56C6C'
                        },
                        {
                            lable:'4',
                            color:'#F56C6C'
                        },
                        {
                            lable:'5',
                            color:'#F56C6C'
                        },
                        {
                            lable:'6',
                            color:'#F56C6C'
                        },
                        {
                            lable:'7',
                            color:'#F56C6C'
                        },
                        {
                            lable:'8',
                            color:'#F56C6C'
                        },
                        {
                            lable:'9',
                            color:'#F56C6C'
                        }
                    ]
                }
            ],
            columns:[
                {
                    key: 'employeeNumber',
                    title: '员工编号'
                },
                {
                    key: 'employeeName',
                    title: '员工姓名'
                },
                {
                    key: 'employeeCategory',
                    title: '员工分类'
                },
                {
                    key: 'projectName',
                    title: '项目名称'
                },
                {
                    key: 'projectTimeFrom',
                    title: '起始时间'
                },
                {
                    key: 'projectTimeTO',
                    title: '结束时间'
                },
                {
                    key: 'currentTask',
                    title: '当前任务'
                },

                {
                    key: 'taskSpeed',
                    title: '任务进度'
                },
                {
                    key: 'remarks',
                    title: '备注'
                }
            ],
            table:[
                {
                    employeeNumber: 'fj20201',
                    employeeName: '张三',
                    employeeCategory: '实施',
                    projectName: 'ERP系统管理',
                    projectTimeFrom: '2020-04-02',
                    projectTimeTO: '2020-05-02',
                    currentTask: '订单管理',
                    taskSpeed: '80%',
                    remarks: '111111'
                },
                {
                    employeeNumber: 'fj20202',
                    employeeName: '李四',
                    employeeCategory: '开发',
                    projectName: 'ERP系统管理',
                    projectTimeFrom: '2020-04-02',
                    projectTimeTO: '2020-05-12',
                    currentTask: '订单管理',
                    taskSpeed: '70%',
                    remarks: '111111'
                },
                {
                    employeeNumber: 'fj20203',
                    employeeName: '王五',
                    employeeCategory: '测试',
                    projectName: 'ERP系统管理',
                    projectTimeFrom: '2020-04-12',
                    projectTimeTO: '2020-05-02',
                    currentTask: '订单管理',
                    taskSpeed: '60%',
                    remarks: '111111'
                },
                {
                    employeeNumber: 'fj20204',
                    employeeName: '陈六',
                    employeeCategory: '实施',
                    projectName: 'ERP系统管理',
                    projectTimeFrom: '2020-04-22',
                    projectTimeTO: '2020-05-02',
                    currentTask: '订单管理',
                    taskSpeed: '50%',
                    remarks: '111111'
                }
            ],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            PresonOptions:[
                {
                    value:'项目A',
                    lable:'pr001'
                },
                {
                    value:'项目B',
                    lable:'pr002'
                },
                {
                    value:'项目C',
                    lable:'pr003r'
                }
            ]
        }
    },
    created() {},
    methods: {
        OnSearch(){

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
    }
}
</script>
<style scoped>
.ul_box {
    display: inline-block;
    overflow: hidden;
}
.my_timeline_item {
    display: inline-block;
    width: 10px;
    color: #000;
}
</style>