<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="search" class="demo-form-inline" size="mini">
                <el-form-item label="打包人">
                    <el-input v-model="search.name"></el-input>
                </el-form-item>
                <el-form-item label="打包时间">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="search.time"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="版本号">
                    <el-input v-model="search.number"></el-input>
                </el-form-item>
                <el-button
                    type="primary"
                    style="float:right"
                    icon="el-icon-search"
                    @click="searchBug"
                    size="mini"
                >查询</el-button>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <!-- <el-table-column prop="date" label="序号" width="50"></el-table-column> -->
                <el-table-column prop="version" label="版本号"></el-table-column>

                <el-table-column prop="packageTime" label="打包时间" :formatter="renderPackageTime"></el-table-column>

                <el-table-column prop="describe" label="描述"></el-table-column>
                <el-table-column prop="packageUserId" label="打包人"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button
                            @click="see(scope.row)"
                            type="text"
                            size="small"
                            :disabled="!seeShow"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <bug-information
            :showFrom="showFrom"
            ref="buginformation"
            :tableSelect="tableSelect"
            v-if="showChild"
            :packageId="packageId"
        />
    </div>
</template>
<script>
import bugInformation from '../../components/bugInformation.vue';
export default {
    components: {
        bugInformation
    },
    created() {
        this.$api.task.getPackageList().then(response => {
            this.tableData = response.data;
        });

        let roleList = JSON.parse(localStorage.getItem('ms_role'));
        this.seeShow = roleList.includes('26');
    },
    data() {
        return {
            //查询条件
            search: {
                name: '',
                time: '',
                number: ''
            },
            seeShow: false,
            tableSelect: [],
            tableData: [],
            showFrom: 4,
            showChild: false,
            packageId: ''
        };
    },
    methods: {
        //根据条件查询项目列表
        searchBug() {
            let projectCondition = {};
            projectCondition.packageUserId = this.search.name;
            projectCondition.packageTime = this.search.time;
            projectCondition.version = this.search.number;
            if (projectCondition) {
                this.$api.task.packageConditionSearch(projectCondition).then(response => {
                    this.tableData = response.data;
                });
            }
        },
        see(row) {
            this.tableSelect = row.bugList;
            // this.$refs.buginformation.dialogVisible = false;
            // this.$refs.buginformation.dialogVisible = true;
            this.packageId = row.id;
            this.showChild = true;
        },

        renderPackageTime(row) {
            if (row.packageTime) {
                let DateS = new Date(row.packageTime);
                let ovwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate())).toISOString().slice(0, 10);
                return <div>{ovwerS}</div>;
            }
        }
    }
};
</script>