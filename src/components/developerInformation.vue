<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>开发任务概况</span>
            <el-button style="float: right; padding: 3px 0" type="text">新建任务</el-button>
        </div>
        <el-row>
            <el-col :span="6">
                <div class="left">
                    <el-form v-model="projectForm" class="dataForm" size="mini">
                        <el-form-item label="开始时间">
                            <el-input v-model="projectForm.implStartDate"></el-input>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <el-input v-model="projectForm.implEndDate"></el-input>
                        </el-form-item>
                        <el-form-item label="开发任务参与人员">
                            <el-input
                                type="textarea"
                                v-model="projectForm.implementers"
                                style="height:70px"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="tablebox">
                    <el-table :data="tableData" border style="width: 100%" height="250" size = mini>
                        <el-table-column prop="name" label="人员" width="180"></el-table-column>
                        <el-table-column prop="task" label="任务"></el-table-column>
                        <el-table-column prop="starttime" label="开始时间"></el-table-column>
                        <el-table-column prop="endtime" label="结束时间时间"></el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button
                                    @click="handleClick(scope.row)"
                                    type="text"
                                    size="small"
                                >查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            projectForm: {
                implStartDate: '',
                implEndDate: '',
                implementers: ''
            },
            tableData: [
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                },
                {
                    task: 'bug修改',
                    starttime: '2016-05-02',
                    endtime: '2016-05-02',
                    name: '王小虎'
                }
            ]
        };
    },
     methods: {
      handleClick(row) {
        console.log(row);
      }
    },
};
</script>  
<style scoped>
.el-form {
    padding-right: 10px;
}
</style>