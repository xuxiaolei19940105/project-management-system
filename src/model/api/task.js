import base from './base'; // 导入接口域名列表
import { get } from '../../utils/https'; // 导入http中创建的axios实例

const v = base.dev;
const task = {
    test() {
        return get(`${v}/taskStructure/init`, { userCode: '001' });
    }
    // articleDetail(id, params) {
    //     return axios.get(`${v}/topic/${id}`, {
    //         params: params
    //     });
    // },
    // login(params) {
    //     return axios.post(`${v}/accesstoken`, qs.stringify(params));
    // }
};

export default task;
