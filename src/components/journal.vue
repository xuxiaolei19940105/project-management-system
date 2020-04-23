<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>日志</span>
            </div>
            <el-row>
                <el-col :span="24">
                    <div class="tablebox">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%"
                            height="250"
                            size="mini"
                        >
                            <el-table-column prop="operationDescribe" label="内容"></el-table-column>
                            <el-table-column prop="operationUserName" label="人员" width="180"></el-table-column>
                            <el-table-column prop="inserttime" label="时间">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.inserttime.slice(0, 10)}}</span><span>&nbsp;</span><span>{{ scope.row.inserttime.slice(11, 19)}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
    created() {
        let pro_id = localStorage.getItem('pro_id');
        let projectObjectId = {};
        projectObjectId.id = pro_id;
        this.$api.task.initProData(projectObjectId).then(response => {
            console.log(response);
            this.tableData = response.data.logList;
        });
    },
    data() {
        return {
            tableData: [
                {
                    content: 'bug修改',
                    time: '2016-05-02',
                    name: '王小虎'
                },
                {
                    content: 'bug修改',
                    time: '2016-05-02',
                    name: '王小虎'
                },
                {
                    content: 'bug修改',
                    time: '2016-05-02',
                    name: '王小虎'
                },
                {
                    content: 'bug修改',
                    time: '2016-05-02',
                    name: '王小虎'
                },
                {
                    content: 'bug修改',
                    time: '2016-05-02',
                    name: '王小虎'
                },
                {
                    content: 'bug修改',
                    time: '2016-05-02',
                    name: '王小虎'
                }
            ]
        };
    },
    methods: {}
};
</script>  
<style scoped>
</style>