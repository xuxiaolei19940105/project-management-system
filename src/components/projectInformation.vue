<template>
    <div>
        <el-card class="box-card">
            <div>
                <el-form
                    label-width="100px"
                    v-model="projectForm"
                    class="dataForm"
                    :label-position="labelPosition"
                    size="mini"
                >
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
                            <el-form-item label="项目负责人">
                                <el-input v-model="projectForm.projectLeader"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="开始日期">
                                <el-date-picker v-model="projectForm.projectStartDate" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="结束时间">
                                <el-date-picker v-model="projectForm.projectEndDate" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        </el-col>
                         <el-col :span="6" :offset="2">
                            <el-form-item label="项目状态">
                            <el-select v-model="projectForm.state" placeholder="请选择项目状态">
                                    <el-option v-for="item in stateOptions"
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
                    <!-- <el-row>
                        <el-col :span="14">
                             <el-form-item label="项目说明">
                                <el-input type="textarea" v-model="projectForm.comments" :rows="8"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                </el-form>
            </div>
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
                // comments:'',
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
                projectNumber:'',
                state:''
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
              stateOptions:[
                {
                    value:'进行中',
                    lable:'001'
                },
                {
                    value:'暂停',
                    lable:'002'
                },
                {
                    value:'已作废',
                    lable:'003'
                },
                {
                    value:'已完结',
                    lable:'004'
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
        }
    }
}
</script>
<style scoped>
.titalS{
    font-size: 15px;
    height: 40px;
    width: 100%;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
}
.el-select{
    width: 100%;
}
</style>