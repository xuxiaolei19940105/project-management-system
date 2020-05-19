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

            <el-dialog title="权限设置" :visible.sync="dialogVisible" width="30%">
                <el-tree
                    :data="data"
                    :props="defaultProps"
                    show-checkbox
                    ref="tree"
                    node-key="id"
                    :default-checked-keys="checkedKey"
                    default-expand-all
                    :check-strictly="true"
                ></el-tree>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="define">确 定</el-button>
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
        this.editDisabled = roleList.includes('33');
    },
    data() {
        return {
            editDisabled: false,
            //树
            data: [],
            defaultProps: {
                children: 'menuList',
                label: 'menuName'
            },
            checkedKey: [],

            //新建角色
            form: {
                type: '',
                describe: ''
            },
            //新建角色弹窗
            dialogVisible: false,

            //角色列表
            tableData: []
        };
    },
    methods: {
        //编辑角色
        edit(row) {
            this.roleId = row.id;
            this.getMenuTree();
            console.log(row);
            this.initTree(row);
            this.dialogVisible = true;
        },

        //树
        // handleCheckChange(data, checked, indeterminate) {
        //     console.log(data, checked, indeterminate);
        // },

        //初始化树
        initTree(row) {
            this.checkedKey = [];
            row.menuList.map(v => {
                this.checkedKey.push(v.id);
            });
        },

        //获取树
        getMenuTree() {
            this.$api.task.getMenuTree().then(response => {
                this.data = response.data;
            });
        },

        //确定
        define() {
            this.dialogVisible = false;
            let object = {
                id: this.roleId,
                menuList: this.$refs.tree.getCheckedNodes()
            };
            this.$api.task.roleMenuRelevance(object).then();
            this.reload();
        }
    }
};
</script>
// <style lang="scss">
// .el-checkbox__inner {
//     display: none;
// }
// .is-leaf + .el-checkbox .el-checkbox__inner {
//     display: inline-block;
// }
//
</style>