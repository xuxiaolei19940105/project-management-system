<template>
    <div>
        <el-card>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-copy"></i> 消息中心
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div>
                <el-tabs v-model="atctiveName" >
                    <el-tab-pane label="待办消息" name="first" >
                        <dytable
                            :columns="articlesReadyColumns"
                            :table-data="articlesReadytableData"
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
                    </el-tab-pane>
                    <el-tab-pane label="已办消息" name="second" >
                        <dytable
                            :columns="articlesDoneColumns"
                            :table-data="articlesDonetableData"
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
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'tabs',
    data(){
        const { renderControlColumn } = this;
        return{
            atctiveName: 'first',
            pageNum: 1,
            pageSize: 2,
            total: 10,
            articlesReadyColumns: [
                {
                    key: 'taskno',
                    title: '编号',
                    width: '100'
                },
                {
                    key: 'taskname',
                    title: '任务名称',
                    width: '100'
                },
                {
                    key: 'publisher',
                    title: '发布者',
                    width: '100'
                },
                {
                    key: 'publishdate',
                    title: '发布时间'
                },
                {
                    key: 'project',
                    title: '项目'
                },
                {
                    key: 'taskdetail',
                    title: '任务详情'
                },
                {
                    title: '操作',
                    render: renderControlColumn,
                    width: '260px'
                }
            ],
            articlesReadytableData:[
                {
                    taskno: '001',
                    taskname: '功能修改',
                    publisher: '李伟',
                    publishdate: '2020-04-12',
                    project: '福佳集团eas',
                    taskdetail: '添加功能详情',
                },
                {
                    taskno: '002',
                    taskname: '新建页面修改',
                    publisher: '李金',
                    publishdate: '2020-04-11',
                    project: '福佳集团eas',
                    taskdetail: '添加详情',
                },
            ],
            articlesDoneColumns: [
                {
                    key: 'taskno',
                    title: '编号',
                    width: '100'
                },
                {
                    key: 'taskname',
                    title: '任务名称',
                    width: '100'
                },
                {
                    key: 'publisher',
                    title: '发布者',
                    width: '100'
                },
                {
                    key: 'publishdate',
                    title: '发布时间'
                },
                {
                    key: 'project',
                    title: '项目'
                },
                {
                    key: 'taskdetail',
                    title: '任务详情'
                },
                {
                    title: '操作',
                    render: renderControlColumn,
                    width: '260px'
                }
            ],
            articlesDonetableData:[
                {
                    taskno: '001',
                    taskname: 'bug',
                    publisher: '张三',
                    publishdate: '2020-04-12',
                    project: '福佳集团eas',
                    taskdetail: '添加功能详情',
                },
                {
                    taskno: '002',
                    taskname: '新建页面修改bug',
                    publisher: '小明',
                    publishdate: '2020-04-11',
                    project: 'eas',
                    taskdetail: '详情111',
                },
            ]
        }
    },
    created(){
        let userData = localStorage.getItem('ms_data');
        if(userData){
            this.$api.task.getMessagelist(userData).then((response)=>{
                console.log(response)
            });
        }
    },
    mounted(){},
    methods:{
        //分页
        onSizeChange(val) {
            console.log(val);
            this.pageSize = val;
        },
        onCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
        },
        onSelectionChange(val) {
            console.log('多选', val);
            this.multipleSelection = val;
        },
        //拒绝
        onRowRefuseButtonClick(row) {
            console.log(row, '删除');
        },
        //确认
        onRowAgreeButtonClick(row) {
            console.log(row, '编辑');
        },
        renderControlColumn({row}){
            const { onRowRefuseButtonClick, onRowAgreeButtonClick } = this;
            const  ret =[];
            ret.push(
                <div>
                    <el-button type="text" icon="el-icon-edit" onClick={() => onRowAgreeButtonClick(row)}>
                        确认
                    </el-button>
                    <el-button type="text" style="color:red" icon="el-icon-delete" onClick={() => onRowRefuseButtonClick(row)}>
                        拒绝
                    </el-button>
                </div>
            );
             return <div>{ret}</div>;
        }
    }
}
</script>