<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>留言板</span>
                <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="Newmessagetask()"
                    :disabled="disabled"
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
                            <el-table-column prop="guestbookTitle" label="标题"></el-table-column>
                            <el-table-column prop="userName" label="人员" width="100"></el-table-column>
                            <el-table-column prop="insertTime" label="时间"></el-table-column>
                            <el-table-column label="操作" width="70">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="handleClick(scope.row,scope.$index)"
                                        type="text"
                                        size="small"
                                    >查看</el-button>
                                    <!-- <el-button
                                        type="text"
                                        size="small"
                                        @click="editleclick(scope.row)"
                                    >编辑</el-button>-->
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
            :close-on-click-modal="false"
        >
            <newmessagepage
                ref="sonNewmessinform"
                :rowdata="rowdata"
                :index="index"
                :operationmode="operationmode"
            ></newmessagepage>
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
            disabled: false,

            dialogNewmesaagetaskVisible: false,
            rowdata: {},
            index: '',
            operationmode: '',
            tableData: []
        };
    },
    created() {
        let pro_id = localStorage.getItem('pro_id');
        let projectObjectId = {};
        projectObjectId.id = pro_id;
        this.$api.task.initProData(projectObjectId).then(response => {
            //时间转换
            for (let i = 0; i < response.data.guestbookList.length; i++) {
                let DateS = new Date(response.data.guestbookList[i].insertTime);
                let OvwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate())).toISOString().slice(0, 10);
                response.data.guestbookList[i].insertTime = OvwerS;
            }
            this.tableData = response.data.guestbookList;
        });
    },
    mounted() {
        let disabled = localStorage.getItem('list');
        this.disabled = JSON.parse(disabled);
    },
    methods: {
        Newmessagetask() {
            this.rowdata = {};
            this.operationmode = 'new';
            this.dialogNewmesaagetaskVisible = true;
        },
        handleClick(row, index) {
            this.rowdata = row;
            this.index = index;
            this.operationmode = 'consult';
            this.dialogNewmesaagetaskVisible = true;
        },
        editleclick(row) {
            this.rowdata = row;
            this.operationmode = 'edit';
            this.dialogNewmesaagetaskVisible = true;
        },
        saveNewmesaage() {
            let savedata = {};
            savedata.guestbookTitle = this.$refs.sonNewmessinform.newmessageForm.title;
            savedata.detail = this.$refs.sonNewmessinform.newmessageForm.comments;
            savedata.belongProId = localStorage.getItem('pro_id');
            this.$api.task.insertGuestbook(savedata).then(() => {
                let pro_id = localStorage.getItem('pro_id');
                let projectObjectId = {};
                projectObjectId.id = pro_id;
                this.$api.task.initProData(projectObjectId).then(response => {
                    this.tableData = response.data.guestbookList;
                });
            });
            this.dialogNewmesaagetaskVisible = false;
        }
    }
};
</script>  
<style scoped>
</style>