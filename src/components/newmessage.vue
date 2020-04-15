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
                            <el-input v-model="newmessageForm.title" v-bind:disabled="disabledtitle"></el-input>
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
    props:{
        rowdata:Object,
        operationmode:String
    },
    data() {
        return {
            disabledtitle:false,
            newmessageForm: {
                title:'',
                username: '',
                messagecreateDate: '',
                comments: ''
            },
            labelPosition: 'left'
        };
    },
    methods: {},
    created(){
        if(this.operationmode=='edit'){
            this.newmessageForm.title=this.rowdata.content;
            this.disabledtitle=false;
        }else if(this.operationmode=='consult'){
            this.newmessageForm.title=this.rowdata.content;
            this.disabledtitle=true;
        }else if(this.operationmode=='new'){
            this.newmessageForm.title='';
            this.disabledtitle=false;
        }else{
            this.newmessageForm.title='';
            this.disabledtitle=false;
        }
    }
};
</script>