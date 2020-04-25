const Projectlist = () => import(/* webpackChunkName: "task-context" */ './projectList.vue');
const Projectlibrary = () => import(/* webpackChunkName: "task-context" */ './projectLibrary.vue');

const PROJECT = [
    {
        path: 'projectList',
        name: 'projectList',
        component: Projectlist,
        meta: {
            title: '项目列表'
        }
    },
    {
        path: 'projectlibrary',
        name: 'projectlibrary',
        component: Projectlibrary,
        meta: {
            title: '项目库'
        }
    },
];

export default PROJECT;
