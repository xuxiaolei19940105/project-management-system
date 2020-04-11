<template>
    <div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>测试任务概况</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="dialogNewtesttaskVisible = true">新建任务</el-button>
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
                        <el-form-item label="测试任务参与人员">
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
                                <el-button type="text" size="small" @click="dialogNewtesttaskVisible = true">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </el-card>
    <el-dialog title="新建实施任务"  :visible.sync="dialogNewtesttaskVisible" width="50%" :append-to-body="true">
        <newtesttaskpage></newtesttaskpage>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogNewtesttaskVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogNewtesttaskVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import newtesttaskpage from './newtestersinform.vue'
export default {
    components: {
        newtesttaskpage
    },
    data() {
        return {
            dialogNewtesttaskVisible:false,
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
        this.dialogNewtesttaskVisible=true;
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