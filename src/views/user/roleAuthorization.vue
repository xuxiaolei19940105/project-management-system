<template>
    <div>
        <el-card>
            <el-table
                :data="tableData"
                style="width: 100%"
                border
                :default-sort="{prop: 'roleNum', order: 'descending'}"
            >
                <el-table-column prop="roleNum" label="角色编码"></el-table-column>
                <el-table-column prop="roleName" label="角色类型"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button
                            @click="edit(scope.row)"
                            type="text"
                            size="small"
                            :disabled="!editDisabled"
                        >编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="添加人员" :visible.sync="dialogVisible" width="680px">
                <el-transfer v-model="value" :data="data" filterable></el-transfer>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addPerson">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
export default {
    inject: ['reload'],
    created() {
        this.$api.task.getRoleList().then(response => {
            this.tableData = response.data;
        });
        let roleList = JSON.parse(localStorage.getItem('ms_role'));
        this.editDisabled = roleList.includes('31');
    },
    data() {
        //人员选择数据处理
        const generateData = () => {
            let personArr = [];
            this.$api.task.getAllUser().then(response => {
                response.data.map(v => {
                    personArr.push({ key: v.id, label: v.name });
                });
            });
            return personArr;
        };

        return {
            editDisabled: false,
            //角色id
            roleId: '',
            //添加人员穿梭框
            data: generateData(),
            value: [],

            //添加人员弹窗
            dialogVisible: false,

            //角色列表
            tableData: []
        };
    },
    methods: {
        //编辑角色
        edit(row) {
            this.dialogVisible = true;
            this.value = [];
            row.userList.map(v => {
                this.value.push(v.id);
            });
            this.roleId = row.id;
        },

        //添加人员
        addPerson() {
            this.dialogVisible = false;
            // FormData 对象
            var paramsObject = new FormData();
            // 文件对象
            //通过append向form对象添加数据
            paramsObject.append('roleId', this.roleId);
            paramsObject.append('userIdList', this.value);
            this.roleUserRelevance(paramsObject);
            this.reload();
        },

        //角色用户关联接口
        roleUserRelevance(params) {
            this.$api.task.roleUserRelevance(params).then();
        }
    }
};
</script>
