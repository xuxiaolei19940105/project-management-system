<template>
    <div>
        <el-card class="box-card">
            <div style="text-align:right;padding-bottom:10px;">
                <el-button size="mini" @click="dialogVisible = true">新建项目</el-button>
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
            <el-dialog title="项目信息" :visible.sync="dialogVisible" fullscreen>
                <projectPage></projectPage>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
import projectPage from '../../components/projectPage.vue';
export default {
    components: {
        projectPage
    },
    data() {
        const { renderControlColumn } = this;
        return {
            dialogVisible: false,
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
                    key: 'level',
                    title: '重要级别'
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
                    width: '260px'
                }
            ],
            table: [
                {
                    projectNo: 'fj20201',
                    name: '项目1',
                    level: '1',
                    leader: '张三',
                    starttime: '2020-04-02',
                    endtime: '2020-05-02'
                },
                {
                    projectNo: 'fj20201',
                    name: '项目1',
                    level: '1',
                    leader: '张三',
                    starttime: '2020-04-02',
                    endtime: '2020-05-02'
                },
                {
                    projectNo: 'fj20201',
                    name: '项目1',
                    level: '1',
                    leader: '张三',
                    starttime: '2020-04-02',
                    endtime: '2020-05-02'
                },
                {
                    projectNo: 'fj20201',
                    name: '项目1',
                    level: '1',
                    leader: '张三',
                    starttime: '2020-04-02',
                    endtime: '2020-05-02'
                }
            ],
            pageNum: 1,
            pageSize: 10,
            total: 10
        };
    },
    created() {},
    methods: {
        // 查看
        onRowLookButtonClick(row) {
            console.log(row, '查看');
            this.dialogVisible = true;
        },
        //删除
        onRowDeleteButtonClick(row) {
            console.log(row, '删除');
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
<style scoped>

</style>
<style>
textarea {
  height: 100%;
}
</style>