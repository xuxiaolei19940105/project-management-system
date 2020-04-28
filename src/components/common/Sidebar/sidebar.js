class ITEMData {
    constructor() {
        this.ITEMAdmin = [{
                // icon: 'el-icon-lx-home',
                index: 'tabs',
                title: '消息'
            },
            {
                // icon: 'el-icon-lx-calendar',
                index: 'project',
                title: '项目管理',
                subs: [{
                        index: 'projectList',
                        title: '项目列表',
                    },
                    {
                        index: 'projectlibrary',
                        title: '项目库',
                    },
                ]
            },
            {
                // icon: 'el-icon-lx-home',
                index: 'person',
                title: '人员占用情况表'
            },
            {
                // icon: 'el-icon-lx-home',
                index: 'persondetail',
                title: '人员信息表'
            }
        ];
        this.ITEMother = [{
                // icon: 'el-icon-lx-home',
                index: 'tabs',
                title: '消息'
            },
            {
                // icon: 'el-icon-lx-calendar',
                index: 'project',
                title: '项目管理',
                subs: [{
                    index: 'projectList',
                    title: '项目列表',
                }]
            },
            {
                // icon: 'el-icon-lx-home',
                index: 'person',
                title: '人员占用情况表'
            },
        ];
    }
}
export default ITEMData