
<template>
    <div>
        <el-card>
            <el-row style="height:500px">
                <el-col :span="6">
                    <el-tree
                        :data="data"
                        :props="defaultProps"
                        @node-click="handleNodeClick"
                        node-key="value"
                        class="tree"
                        ref="rootTree"
                    ></el-tree>
                </el-col>
                <el-col :span="10" style="height:100%"></el-col>
                <el-col :span="8">
                    <el-row>
                        <el-button class="sky" @click="btnshow">新建+</el-button>
                        <!-- <el-button class="sky">修改</el-button>
                        <el-button class="sky">保存</el-button>
                        <el-button class="sky">删除</el-button>
                        <el-button class="sky">作废</el-button>
                        <el-button class="sky">反作废</el-button>-->
                    </el-row>
                    <el-row v-if="isShow">
                        <el-button class="sky" @click="addCom">公司+</el-button>
                        <br />
                        <el-button class="sky" @click="addDev">部门+</el-button>
                        <br />
                        <el-button class="sky" @click="addFir">职位+</el-button>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'annually',
    components: {},
    data() {
        return {
            data: [
                {
                    label: '福佳集团',
                    value: '1',
                    children: [
                        {
                            label: '金州新天地',
                            value: '1-1',
                            type: 'company',
                            children: [
                                {
                                    label: '金州新天地招商部',
                                    value: '1-1-1',
                                    type: 'department',
                                    children: [
                                        {
                                            label: '金州新天地招商部主管',
                                            type: 'firmPosition',
                                            value: '1-1-1-1'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: '经营中心',
                            value: '1-2',
                            type: 'department',
                            children: [
                                {
                                    label: '经营中心执行部',
                                    type: 'firmPosition',
                                    value: '1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            isShow: false,
            treeData: {},
            arr: [
                {
                    msg: '公司',
                    type: 'company'
                },
                {
                    msg: '部门',
                    type: 'department'
                },
                {
                    msg: '人员',
                    type: 'firmPosition'
                }
            ]
        };
    },
    created() {},
    methods: {
        btnshow() {
            this.isShow = !this.isShow;
        },

        addCom() {
            this.isAdd('company');
        },
        addDev() {
            this.isAdd('department');
        },
        addFir() {
            this.isAdd('firmPosition');
        },
        handleNodeClick(data) {
            this.treeData = data;
        },
        isAdd(val) {
            const { type } = this.treeData;
            if (val === 'company' && (type === 'department' || type === 'firmPosition')) {
                return this.$message({
                    message: '不能添加公司',
                    type: 'success'
                });
            }
            if (val === 'department' && type === 'firmPosition') {
                return this.$message({
                    message: '不能添加部门',
                    type: 'success'
                });
            }
        }
    }
};
</script>

<style lang='scss' scoped>
.tree {
    height: 500px;
}
</style>
