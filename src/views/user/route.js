const roleSetting = () =>
    import( /* webpackChunkName: "task-context" */ './roleSetting.vue');
const roleAuthorization = () =>
    import( /* webpackChunkName: "task-context" */ './roleAuthorization.vue');
const userAuthorization = () =>
    import( /* webpackChunkName: "task-context" */ './userAuthorization.vue');

const Bug = [{
    path: 'roleSetting',
    name: 'roleSetting',
    component: roleSetting,
    meta: {
        title: '角色维护'
    }
},
{
    path: 'roleAuthorization',
    name: 'roleAuthorization',
    component: roleAuthorization,
    meta: {
        title: '角色授权'
    }
},
{
    path: 'userAuthorization',
    name: 'userAuthorization',
    component: userAuthorization,
    meta: {
        title: '用户授权'
    }
},
];

export default Bug;