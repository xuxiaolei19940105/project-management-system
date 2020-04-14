<template>
    <div>
        <div>
            <project-information />
        </div>
        <div>
            <implementers-information />
        </div>
        <div>
            <developer-information />
        </div>
        <div>
            <testers-information />
        </div>
        <div>
            <el-card>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="留言板" name="first">
                        <message />
                    </el-tab-pane>
                    <el-tab-pane label="日志" name="second">
                        <journal />
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
        <el-dialog title="提示" :visible.sync="personDialogVisible" width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="personDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="personDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import projectInformation from './projectInformation.vue';
import implementersInformation from './implementersInformation.vue';
import developerInformation from './developerInformation.vue';
import testersInformation from './testersInformation.vue';
import message from './message.vue';
import journal from './journal.vue';
export default {
    components: {
        projectInformation,
        implementersInformation,
        developerInformation,
        testersInformation,
        message,
        journal
    },
    data() {
        return {
            activeName: 'first',
            personDialogVisible: false
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>  
<style scoped>
.box-card {
    margin-top: 10px;
}
</style>
