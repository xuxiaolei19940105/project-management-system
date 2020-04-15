<template>
    <div>
        <el-card>
            <div style="text-align:right;padding-bottom:10px;">
                <el-button size="mini" @click="dialogNewprojectVisible = true">新建项目</el-button>
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
        <el-dialog title="项目信息" :visible.sync="dialogVisible" width="80%" :append-to-body="true">
            <projectPage></projectPage>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新建项目" :visible.sync="dialogNewprojectVisible" width="80%" :append-to-body="true">
           <project-information />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogNewprojectVisible = false">取 消</el-button>
                <el-button type="primary" @click="getNewProjectData()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import projectPage from '../../components/projectPage.vue';
import projectInformation from '../../components/projectInformation.vue'
export default {
    components: {
        projectPage,
        projectInformation
    },
    data() {
        const { renderControlColumn } = this;
        return {
            dialogVisible: false,
            dialogNewprojectVisible:false,
            dialogNewImpltaskVisible:false,
            columns: [
                {
                    key: 'projectNo',
                    title: '项目编号'
                },
                {
                    key: 'name',
                    title: '项目名称'
                },
                {
                    key: 'state',
                    title: '项目状态'
                },
                {
                    key: 'leader',
                    title: '项目负责人'
                },
                {
                    key: 'starttime',
                    title: '项目开始时间'
                },
                {
                    key: 'endtime',
                    title: '项目结束时间'
                },
                {
                    title: '操作',
                    render: renderControlColumn,
                    width: '150px'
                }
            ],
            table: [
                {
                    projectNo: 'fj20201',
                    name: '项目1',
                    state: '已完结',
                    leader: '张三',
                    starttime: '2020-04-02',
                    endtime: '2020-05-02'
                },
                {
                    projectNo: 'fj20201',
                    name: '项目1',
                    state: '已作废',
                    leader: '张三',
                    starttime: '2020-04-02',
                    endtime: '2020-05-02'
                },
                {
                    projectNo: 'fj20201',
                    name: '项目1',
                    state: '暂停',
                    leader: '张三',
                    starttime: '2020-04-02',
                    endtime: '2020-05-02'
                },
                {
                    projectNo: 'fj20201',
                    name: '项目1',
                    state: '进行中',
                    leader: '张三',
                    starttime: '2020-04-02',
                    endtime: '2020-05-02'
                }
            ],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            projectFormData:[
                {
                    projectName:''
                }
            ],
            NewprojectVisibleFlag:''
        };
    },
    created() {},
    methods: {
        getNewProjectData(){
            console.log(this);
            this.dialogNewprojectVisible = true;
        },
        // 查看
        onRowLookButtonClick(row) {
            console.log(row, '查看');
            this.dialogVisible = true;
        },
        //编辑
        onRowUpdateButtonClick(row) {
            console.log(row, '编辑');
            this.dialogVisible = true;
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
        renderControlColumn({ row }) {
            const { onRowLookButtonClick, onRowUpdateButtonClick } = this;
            const ret = [];
            ret.push(
                <div>
                    <el-button type="text" icon="el-icon-folder-opened" onClick={() => onRowLookButtonClick(row)}>
                        查看
                    </el-button>
                    <el-button type="text" icon="el-icon-edit" onClick={() => onRowUpdateButtonClick(row)}>
                        编辑
                    </el-button>
                </div>
            );
            return <div>{ret}</div>;
        }
    }
};
</script>
<style scoped>

</style>
<style>
textarea {
  height: 100%;
}
.titalS{
    font-size: 15px;
    height: 40px;
    width: 100%;
}
.el-dialog__body{
    max-height: 500px;
    overflow: auto;
}
</style>