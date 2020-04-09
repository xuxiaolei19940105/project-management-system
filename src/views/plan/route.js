const Project = () => import(/* webpackChunkName: "task-context" */ './project.vue');

const PROJECT = [
    {
        path: '2-1',
        name: 'project1',
        component: Project,
        meta: {
            title: '项目一'
        }
    },
    {
        path: '2-2',
        name: 'project2',
        component: Project,
        meta: {
            title: '项目二'
        }
    },
];

export default PROJECT;
