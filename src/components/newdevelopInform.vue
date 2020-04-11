<template>
    <div>
        <el-card>
            <el-form
                label-width="100px"
                v-model="newdevelopForm"
                ref="newdevelopForm"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="任务详情" >
                            <el-input v-model="newdevelopForm.taskdetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="抄送">
                            <el-select v-model="newdevelopForm.testers" multiple placeholder="请选择测试人员">
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
                    <el-col :span="12">
                        <el-form-item label="开始时间" >
                            <el-date-picker v-model="newdevelopForm.developStartDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="结束时间" >
                            <el-date-picker v-model="newdevelopForm.developEndDate" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-upload 
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                        >
                        <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
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
            newdevelopForm:{
                taskdetail:'',
                developStartDate:'',
                developEndDate:'',
                testers:''
            },
            labelPosition:'left',
            fileList:[
                {
                    name:'小鹿',
                    url:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
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
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
}
</script>