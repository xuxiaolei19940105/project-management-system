import Vue from 'vue';
import Router from 'vue-router';

import PLAN from '../views/plan/route';

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
                ...PLAN, //计划管理
                {
                    path: 'tabs',
                    name: 'tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: {
                        title: '消息'
                    }
                }
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
