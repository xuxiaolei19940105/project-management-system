import Vue from 'vue';
import Vuex from 'vuex';
import plan from '../model/module/plan-module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        plan
    }
});
