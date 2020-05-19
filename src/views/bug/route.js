const bugList = () =>
    import ( /* webpackChunkName: "task-context" */ './bugList.vue');
const bugPack = () =>
    import ( /* webpackChunkName: "task-context" */ './bugPack.vue');

const PROJECT = [{
        path: 'bugList',
        name: 'bugList',
        component: bugList,
        meta: {
            title: 'bug列表'
        }
    },
    {
        path: 'bugPack',
        name: 'bugPack',
        component: bugPack,
        meta: {
            title: 'bug打包'
        }
    },
];

export default PROJECT;