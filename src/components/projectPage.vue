<template>
    <div>
        <div>
            <project-information
                ref="sonlookproject"
                :proOptions="proOptions"
                :tipTable="tipTable"
                :tipDialogVisible="tipDialogVisible"
            />
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
    props: {
        rowdata: Object,
        proOptions: Array,
        tipTable: Array,
        tipDialogVisible: Boolean
    },
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
            //时间冲突
            // tipTable: [],
            //人员占用提示窗口
            // tipDialogVisible: false,
            activeName: 'first',
            personDialogVisible: false,
            checkedLeaderId: [],
            checkedImplementerId: [],
            checkedDeveloperId: [],
            checkedTesterId: [],
            checkedPackagerId: [],
            oldLeaderId: [],
            oldImplementerId: [],
            oldDeveloperId: [],
            oldTesterId: [],
            oldPackagerId: [],
            projectForm: {
                id: '',
                projectName: '',
                projectCategory: '',
                // comments:'',
                implementers: '',
                developers: '',
                projectLeader: '',
                projectStartDate: '',
                projectEndDate: '',
                implStartDate: '',
                implEndDate: '',
                develStartDate: '',
                develEndDate: '',
                testerStartDate: '',
                testerEndDate: '',
                packagerStartDate: '',
                testers: '',
                packagers: '',
                projectNumber: '',
                state: '',
                belongPro: '',
                level: '',
                belongProId: ''
            }
        };
    },
    created() {},
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        save() {
            this.tipDialogVisible = this.$refs.sonlookproject.tipDialogVisible;
            this.tipTable = this.$refs.sonlookproject.tipTable;
            this.projectForm.id = this.$refs.sonlookproject.projectForm.id;
            this.projectForm.projectName = this.$refs.sonlookproject.projectForm.projectName;
            this.projectForm.projectNumber = this.$refs.sonlookproject.projectForm.projectNumber;
            this.checkedLeaderId = this.$refs.sonlookproject.checkedLeaderId;
            this.projectForm.projectStartDate = this.$refs.sonlookproject.projectForm.projectStartDate;
            this.projectForm.projectEndDate = this.$refs.sonlookproject.projectForm.projectEndDate;
            this.projectForm.state = this.$refs.sonlookproject.projectForm.state;
            this.projectForm.implStartDate = this.$refs.sonlookproject.projectForm.implStartDate;
            this.projectForm.implEndDate = this.$refs.sonlookproject.projectForm.implEndDate;
            this.checkedImplementerId = this.$refs.sonlookproject.checkedImplementerId;
            this.projectForm.develStartDate = this.$refs.sonlookproject.projectForm.develStartDate;
            this.projectForm.develEndDate = this.$refs.sonlookproject.projectForm.develEndDate;
            this.checkedDeveloperId = this.$refs.sonlookproject.checkedDeveloperId;
            this.projectForm.testerStartDate = this.$refs.sonlookproject.projectForm.testerStartDate;
            this.projectForm.testerEndDate = this.$refs.sonlookproject.projectForm.testerEndDate;
            this.checkedTesterId = this.$refs.sonlookproject.checkedTesterId;
            this.projectForm.packagerStartDate = this.$refs.sonlookproject.projectForm.packagerStartDate;
            this.projectForm.belongPro = this.$refs.sonlookproject.projectForm.belongPro;
            this.projectForm.level = this.$refs.sonlookproject.projectForm.level;
            this.projectForm.belongProId = this.$refs.sonlookproject.projectForm.belongProId;
            this.checkedPackagerId = this.$refs.sonlookproject.checkedPackagerId;
            this.oldLeaderId = this.$refs.sonlookproject.oldLeaderId;
            this.oldImplementerId = this.$refs.sonlookproject.oldImplementerId;
            this.oldDeveloperId = this.$refs.sonlookproject.oldDeveloperId;
            this.oldTesterId = this.$refs.sonlookproject.oldTesterId;
            this.oldPackagerId = this.$refs.sonlookproject.oldPackagerId;
        },
        getProjectData() {
            this.$refs.sonlookproject.getProjectData();
        }
    }
};
</script>  
<style scoped>
.box-card {
    margin-top: 10px;
}
</style>
