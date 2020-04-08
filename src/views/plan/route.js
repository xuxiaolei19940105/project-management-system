const TaskContext = () => import(/* webpackChunkName: "task-context" */ './task-context/task-context.vue');
const Annually = () => import(/* webpackChunkName: "annually" */ './annually.vue');
const MouthCooperate = () => import(/* webpackChunkName: "mouth-cooperate" */ './mouth-cooperate.vue');
const YearCooperate = () => import(/* webpackChunkName: "year-cooperate" */ './year-cooperate.vue');
const PlanMouth = () => import(/* webpackChunkName: "plan-mouth" */ './plan-mouth.vue');
const CompanyPlanYear = () => import(/* webpackChunkName: "company-plan-year" */ './company-plan-year.vue');
const CompanyPlanMouth = () => import(/* webpackChunkName: "company-plan-mouth" */ './company-plan-mouth.vue');

const PLAN = [
    {
        path: 'taskContext',
        name: 'taskContext',
        component: TaskContext,
        meta: {
            title: '任务结构编制'
        }
    },
    {
        path: 'annually',
        name: 'annually',
        component: Annually,
        meta: {
            title: '部门年度计划'
        }
    },
    {
        path: 'plan-mouth',
        name: 'plan-mouth',
        component: PlanMouth,
        meta: {
            title: '部门月度计划'
        }
    },
    {
        path: 'company-plan-year',
        name: 'company-plan-year',
        component: CompanyPlanYear,
        meta: {
            title: '公司年度计划汇总'
        }
    },
    {
        path: 'company-plan-mouth',
        name: 'company-plan-mouth',
        component: CompanyPlanMouth,
        meta: {
            title: '公司月度计划汇总'
        }
    },
    {
        path: 'year-cooperate',
        name: 'year-cooperate',
        component: YearCooperate,
        meta: {
            title: '部门年度配合任务'
        }
    },
    {
        path: 'mouth-cooperate',
        name: 'mouth-cooperate',
        component: MouthCooperate,
        meta: {
            title: '部门月度配合任务'
        }
    }
];

export default PLAN;
