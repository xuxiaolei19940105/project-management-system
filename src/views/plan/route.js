const Project = () => import(/* webpackChunkName: "task-context" */ './projectList.vue');

const PROJECT = [
    {
        path: 'projectList',
        name: 'project1',
        component: Project,
        meta: {
            title: '项目列表'
        }
    },
];

export default PROJECT;
