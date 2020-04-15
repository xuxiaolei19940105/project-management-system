<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>留言板</span>
                <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="Newmessagetask()"
                >新建留言</el-button>
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
                            <el-table-column prop="name" label="人员" width="80"></el-table-column>
                            <el-table-column prop="time" label="时间"></el-table-column>
                            <el-table-column label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="handleClick(scope.row)"
                                        type="text"
                                        size="small"
                                    >查看</el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="editleclick(scope.row)"
                                    >编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog
            title="新建提问"
            :visible.sync="dialogNewmesaagetaskVisible"
            v-if="dialogNewmesaagetaskVisible"
            width="50%"
            :append-to-body="true"
        >
            <newmessagepage ref='sonNewmessinform' :rowdata="rowdata" :operationmode="operationmode"></newmessagepage>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogNewmesaagetaskVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveNewmesaage()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import newmessagepage from './newmessage.vue';
export default {
    components: {
        newmessagepage
    },
    data() {
        return {
            dialogNewmesaagetaskVisible: false,
            rowdata:{},
            operationmode:'',
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
                },
                {
                    content: 'bug修改',
                    time: '2016-05-02',
                    name: '王小虎'
                }
            ]
        };
    },
    methods: {
        Newmessagetask(){
            this.rowdata={};
            this.operationmode="new";
            this.dialogNewmesaagetaskVisible = true;
        },
        handleClick(row) {
            this.rowdata=row;
            this.operationmode="consult";
            this.dialogNewmesaagetaskVisible = true;
        },
        editleclick(row){
            this.rowdata=row;
            this.operationmode="edit";
            this.dialogNewmesaagetaskVisible = true;
        },
        saveNewmesaage(){
            console.log(this.$refs.sonNewmessinform.newmessageForm.title);
            this.dialogNewmesaagetaskVisible = false
        }
    }
};
</script>  
<style scoped>
</style>