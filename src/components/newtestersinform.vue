<template>
    <div>
        <el-card>
            <el-form
                label-width="70px"
                v-model="newtesterForm"
                ref="newtesterForm"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="任务详情" >
                            <el-input v-model="newtesterForm.taskdetail" v-bind:disabled="disabledtaskdetail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="是否bug" >
                            <el-radio v-model="newtesterForm.radio" label="Yes" v-bind:disabled="disabledradioYes"></el-radio>
                            <el-radio v-model="newtesterForm.radio" label="No" v-bind:disabled="disabledradioNo"></el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="预计结果" >
                            <el-input v-model="newtesterForm.expectedresults" v-bind:disabled="disabledexpectedresults"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="bug标题" >
                            <el-input v-model="newtesterForm.bugtital" v-bind:disabled="disabledbugtital"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="实际结果" >
                            <el-input v-model="newtesterForm.actualresults" v-bind:disabled="disabledactualresults"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="bug编号" >
                            <el-input v-model="newtesterForm.bugnumber" v-bind:disabled="disabledbugnumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="开始时间" >
                            <el-date-picker v-model="newtesterForm.testerStartDate" placeholder="请选择" v-bind:disabled="disabledtesterStartDate"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="抄送">
                            <el-select v-model="newtesterForm.developers" multiple placeholder="请选择开发人员" v-bind:disabled="disableddevelopers">
                                <el-option v-for="item in developersOptions"
                                    :key="item.lable"
                                    :label="item.value"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="结束时间" >
                            <el-date-picker v-model="newtesterForm.testerEndDate" placeholder="请选择" v-bind:disabled="disabledtesterEndDate"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="bug说明">
                            <el-input type="textarea" v-model="newtesterForm.comments" :rows="8"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-upload 
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :limit="3"
                            v-bind:disabled="disableduploaddemo"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        >
                        <el-button size="small" type="primary" v-bind:disabled="disabledbutton">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    props:{
        rowdata:Object,
        operationmode:String
    },
    data(){
        return {
            disabledtaskdetail:false,
            disabledradioYes:false,
            disabledradioNo:false,
            disabledexpectedresults:false,
            disabledbugtital:false,
            disabledactualresults:false,
            disabledbugnumber:false,
            disabledtesterStartDate:false,
            disableddevelopers:false,
            disabledtesterEndDate:false,
            disabledcomments:false,
            disableduploaddemo:false,
            disabledbutton:false,
            newtesterForm:{
                taskdetail:'',
                expectedresults:'',
                actualresults:'',
                testerStartDate:'',
                testerEndDate:'',
                developers:'',
                comments:'',
                bugtital:'',
                bugnumber:'',
                radio:''
            },
            labelPosition:'left',
            fileList:[
                {
                    name:'小鹿',
                    url:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
                }
            ],
            developersOptions:[
                {
                    value:'张一名',
                    lable:'001'
                },
                {
                    value:'李四嘉',
                    lable:'002'
                },
                {
                    value:'王波',
                    lable:'003'
                }
            ],
        }
    },
    created(){
        console.log(this.rowdata);
        console.log(this.operationmode);
        if(this.operationmode=='edit'){
            this.newtesterForm.taskdetail=this.rowdata.task;
            this.newtesterForm.expectedresults=this.rowdata.want;
            this.newtesterForm.actualresults=this.rowdata.actual;
            this.newtesterForm.testerStartDate=this.rowdata.starttime;
            this.newtesterForm.testerEndDate=this.rowdata.endtime;
            this.disabledtaskdetail=false;
            this.disabledradioYes=false;
            this.disabledradioNo=false;
            this.disabledexpectedresults=false;
            this.disabledbugtital=false;
            this.disabledactualresults=false;
            this.disabledbugnumber=false;
            this.disabledtesterStartDate=false;
            this.disableddevelopers=false;
            this.disabledtesterEndDate=false;
            this.disabledcomments=false;
            this.disableduploaddemo=false;
            this.disabledbutton=false;
        }else if(this.operationmode=='consult'){
            this.newtesterForm.taskdetail=this.rowdata.task;
            this.newtesterForm.expectedresults=this.rowdata.want;
            this.newtesterForm.actualresults=this.rowdata.actual;
            this.newtesterForm.testerStartDate=this.rowdata.starttime;
            this.newtesterForm.testerEndDate=this.rowdata.endtime;
            this.disabledtaskdetail=true;
            this.disabledradioYes=true;
            this.disabledradioNo=true;
            this.disabledexpectedresults=true;
            this.disabledbugtital=true;
            this.disabledactualresults=true;
            this.disabledbugnumber=true;
            this.disabledtesterStartDate=true;
            this.disableddevelopers=true;
            this.disabledtesterEndDate=true;
            this.disabledcomments=false;
            this.disableduploaddemo=true;
            this.disabledbutton=true;
        }else if(this.operationmode=='new'){
            this.newtesterForm.taskdetail='';
            this.newtesterForm.expectedresults='';
            this.newtesterForm.actualresults='';
            this.newtesterForm.testerStartDate='';
            this.newtesterForm.testerEndDate='';
            this.disabledtaskdetail=false;
            this.disabledradioYes=false;
            this.disabledradioNo=false;
            this.disabledexpectedresults=false;
            this.disabledbugtital=false;
            this.disabledactualresults=false;
            this.disabledbugnumber=false;
            this.disabledtesterStartDate=false;
            this.disableddevelopers=false;
            this.disabledtesterEndDate=false;
            this.disabledcomments=false;
            this.disableduploaddemo=false;
            this.disabledbutton=false;
        }else{
            this.newtesterForm.taskdetail='';
            this.newtesterForm.expectedresults='';
            this.newtesterForm.actualresults='';
            this.newtesterForm.testerStartDate='';
            this.newtesterForm.testerEndDate='';
            this.disabledtaskdetail=false;
            this.disabledradioYes=false;
            this.disabledradioNo=false;
            this.disabledexpectedresults=false;
            this.disabledbugtital=false;
            this.disabledactualresults=false;
            this.disabledbugnumber=false;
            this.disabledtesterStartDate=false;
            this.disableddevelopers=false;
            this.disabledtesterEndDate=false;
            this.disabledcomments=false;
            this.disableduploaddemo=false;
            this.disabledbutton=false;
        }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(files.length + fileList.length);
      },
      beforeRemove(file) {
        return this.$confirm(file.name);
      }
    }
}
</script>