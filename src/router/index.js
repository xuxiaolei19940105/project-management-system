import Vue from 'vue';
import Router from 'vue-router';

import PROJECT from '../views/plan/route';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/tabs',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: ''
            },
            children: [
                ...PROJECT, //项目管理
                {
                    path: 'tabs',
                    name: 'tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/messageReminder.vue'),
                    meta: {
                        title: '消息'
                    }
                },
                {
                    path: 'person',
                    name: 'person',
                    component: () => import(/* webpackChunkName: "tabs" */ '../views/plan/personInformation.vue'),
                    meta: {
                        title: '人员信息'
                    }
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: {
                title: '登录'
            }
        }
    ]
});
