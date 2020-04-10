<template>
    <div>
        <el-card class="box-card">
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
    </div>
</template>
<script>
export default {
    data(){
        return{
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

</style>