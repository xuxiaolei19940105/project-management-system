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
                            <el-table-column prop="content" label="内容"></el-table-column>
                            <el-table-column prop="name" label="人员" width="180"></el-table-column>
                            <el-table-column prop="time" label="时间"></el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
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