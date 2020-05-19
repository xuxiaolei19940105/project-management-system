class ITEMData {
    constructor() {
        this.ITEMAdmin = [{
            // icon: 'el-icon-lx-home',
            index: 'tabs',
            title: '消息',
            menuShow: true
        },
        {
            // icon: 'el-icon-lx-calendar',
            index: 'project',
            title: '项目管理',
            menuShow: false,
            subs: [{
                index: 'projectList',
                title: '项目列表',
                menuShow: false
            },
            {
                index: 'projectlibrary',
                title: '项目库',
                menuShow: false
            },
            ]
        },
        {
            // icon: 'el-icon-lx-home',
            index: 'person',
            title: '人员占用情况表',
            menuShow: false
        },
        {
            // icon: 'el-icon-lx-home',
            index: 'persondetail',
            title: '人员信息表',
            menuShow: false
        },
        {
            // icon: 'el-icon-lx-calendar',
            index: 'bugfollow',
            title: 'BUG跟踪',
            menuShow: false,
            subs: [{
                index: 'buglist',
                title: 'BUG列表',
                menuShow: false
            },
            {
                index: 'bugpack',
                title: 'BUG打包',
                menuShow: false
            }]
        },
        {
            // icon: 'el-icon-lx-calendar',
            index: 'user',
            title: '用户管理',
            menuShow: false,
            subs: [{
                index: 'roleSetting',
                title: '角色维护',
                menuShow: false
            },
            {
                index: 'roleAuthorization',
                title: '角色绑定',
                menuShow: false
            },
            {
                index: 'userAuthorization',
                title: '角色授权',
                menuShow: false
            }]
        },
        ];
    }
}
export default ITEMData