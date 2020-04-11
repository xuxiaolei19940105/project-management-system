<template>
    <div>
        <el-card>
            <el-form
                label-width="100px"
                v-model="projectForm"
                ref="projectForm"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col>
                        <div class="titalS">项目配置:</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="项目名称" >
                            <el-input v-model="projectForm.projectName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="项目编号">
                            <el-input v-model="projectForm.projectNumber" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="项目负责人" >
                            <el-select v-model="projectForm.projectLeader" placeholder="请选择">
                                <el-option v-for="item in projectLeaderOptions"
                                    :key="item.lable"
                                    :label="item.value"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="项目开始日期">
                            <el-date-picker v-model="projectForm.projectStartDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="项目结束时间">
                            <el-date-picker v-model="projectForm.projectEndDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="titalS">人员配置:</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="实施开始时间" >
                            <el-date-picker v-model="projectForm.implStartDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="实施结束时间">
                            <el-date-picker v-model="projectForm.implEndDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="实施人员">
                            <el-select v-model="projectForm.implementers" multiple placeholder="请选择实施人员">
                                <el-option v-for="item in implementersOptions"
                                    :key="item.lable"
                                    :label="item.value"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="开发开始时间" >
                            <el-date-picker v-model="projectForm.develStartDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="开发结束时间">
                            <el-date-picker v-model="projectForm.develEndDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="开发人员">
                            <el-select v-model="projectForm.developers" multiple placeholder="请选择开发人员">
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
                    <el-col :span="6">
                        <el-form-item label="测试开始时间" >
                            <el-date-picker v-model="projectForm.testerStartDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="测试结束时间">
                            <el-date-picker v-model="projectForm.testerEndDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="测试人员">
                            <el-select v-model="projectForm.testers" multiple placeholder="请选择测试人员">
                                <el-option v-for="item in testerOptions"
                                    :key="item.lable"
                                    :label="item.value"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="打包时间" >
                            <el-date-picker v-model="projectForm.packagerStartDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="10">
                        <el-form-item label="打包人员">
                            <el-select v-model="projectForm.packagers" multiple placeholder="请选择打包人员">
                                <el-option v-for="item in packagersOptions"
                                    :key="item.lable"
                                    :label="item.value"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="项目说明">
                            <el-input type="textarea" v-model="projectForm.comments" :rows="8"></el-input>
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
        return{
            projectForm:{
                projectName:'',
                projectCategory:'',
                comments:'',
                implementers:'',
                developers:'',
                projectLeader:'',
                projectStartDate:'',
                projectEndDate:'',
                implStartDate:'',
                implEndDate:'',
                develStartDate:'',
                develEndDate:'',
                testerStartDate:'',
                testerEndDate:'',
                packagerStartDate:'',
                testers:'',
                packagers:'',
                projectNumber:''
            },
            labelPosition:'left',
            implementersOptions:[
                {
                    value:'张三',
                    lable:'001'
                },
                {
                    value:'李四',
                    lable:'002'
                },
                {
                    value:'王麻子',
                    lable:'003'
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
            projectLeaderOptions:[
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
            testerOptions:[
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
            packagersOptions:[
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
            projectleaveOptions:[
                {
                    value:'重要',
                    lable:'001'
                },
                {
                    value:'紧急',
                    lable:'002'
                },
                {
                    value:'正常',
                    lable:'003'
                }
            ],
            dialogNewImpltaskVisible:false
        }
    },
    created() {
    },
    methods: {
        
    }
}
</script>
<style scoped>
.titalS{
    font-size: 15px;
    height: 40px;
    width: 100%;
}
</style>