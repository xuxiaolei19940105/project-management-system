<template>
    <div>
        <el-card>
            <el-form
                label-width="100px"
                v-model="newmessageForm"
                ref="newmessageForm"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="留言标题">
                            <el-input v-model="newmessageForm.title" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="详细内容">
                            <el-input
                                type="textarea"
                                v-model="newmessageForm.comments"
                                :rows="8"
                                v-bind:disabled="disabled"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card>
            <reply />
        </el-card>
    </div>
</template>
<script>
import reply from './reply.vue';
export default {
    components: {
        reply
    },
    props: {
        index: Number,
        rowdata: Object,
        operationmode: String
    },
    data() {
        return {
            disabled: false,
            newmessageForm: {
                title: '',
                username: '',
                messagecreateDate: '',
                comments: ''
            },
            labelPosition: 'left'
        };
    },
    methods: {},
    created() {
        if (this.operationmode == 'edit') {
            this.newmessageForm.title = this.rowdata.content;
            this.disabled = false;
        } else if (this.operationmode == 'consult') {
            let pro_id = localStorage.getItem('pro_id');
            let index = this.index;
            let projectObjectId = {};
            projectObjectId.id = pro_id;
            this.$api.task.initProData(projectObjectId).then(response => {
                this.newmessageForm.title = response.data.guestbookList[index].guestbookTitle;
                this.newmessageForm.comments = response.data.guestbookList[index].detail;
            });

            this.disabled = true;
        } else if (this.operationmode == 'new') {
            this.newmessageForm.title = '';
            this.disabled = false;
        } else {
            this.newmessageForm.title = '';
            this.disabled = false;
        }
    }
};
</script>