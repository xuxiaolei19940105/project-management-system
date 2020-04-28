import Vue from 'vue'
import Confirm from './message.vue'
const ConfirmBox = Vue.extend(Confirm);
Confirm.install = (title, content) => {
    let instance = new ConfirmBox().$mount();
    return instance.confirm(title, content);
};
export default Confirm