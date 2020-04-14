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
                            <el-input v-model="newmessageForm.title"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="人员姓名">
                            <el-input v-model="newmessageForm.username"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="详细内容">
                            <el-input type="textarea" v-model="newmessageForm.comments" :rows="8"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newmessageForm: {
                title:'',
                username: '',
                messagecreateDate: '',
                comments: ''
            },
            labelPosition: 'left'
        };
    },
    methods: {}
};
</script>