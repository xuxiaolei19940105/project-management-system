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
                    <el-col :span="12">
                        <el-form-item label="人员姓名" >
                            <el-input v-model="newmessageForm.username"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="时间" >
                            <el-date-picker v-model="newmessageForm.messagecreateDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="内容" >
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
    data(){
        return {
            newmessageForm:{
                username:'',
                messagecreateDate:'',
                comments:''
            },
            labelPosition:'left',
        }
    },
    methods: {
    }
}
</script>