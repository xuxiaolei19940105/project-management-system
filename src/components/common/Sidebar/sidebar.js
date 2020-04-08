const ITEM = [
    {
        icon: 'el-icon-lx-home',
        index: 'tabs',
        title: '系统首页'
    },
    {
        icon: 'el-icon-lx-calendar',
        index: '2',
        title: '计划任务管理',
        subs: [
            {
                index: '2-1',
                title: '计划管理',
                subs: [
                    {
                        index: 'taskContext',
                        title: '任务结构编制'
                    },
                    {
                        index: 'annually',
                        title: '部门年度计划'
                    },
                    {
                        index: 'plan-mouth',
                        title: '部门月度计划'
                    },
                    {
                        index: 'company-plan-year',
                        title: '公司年度计划汇总'
                    },
                    {
                        index: 'company-plan-mouth',
                        title: '公司月度计划汇总'
                    },
                    {
                        index: 'year-cooperate',
                        title: '部门年度配合任务'
                    },
                    {
                        index: 'mouth-cooperate',
                        title: '部门月度配合任务'
                    }
                ]
            }
        ]
    }
];
export default ITEM;
