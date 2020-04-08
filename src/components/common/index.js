import dytable from './dytable/dytable.vue';
import JsonForm from './jsonform/json-form';

const components = {
    dytable,
    JsonForm
};
const install = Vue => {
    Object.keys(components).forEach(com => {
        Vue.component(components[com].name, components[com]);
    });
};
const comIstall = {
    ...components,
    install
};
export default comIstall;
