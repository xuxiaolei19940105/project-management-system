import base from './base'; // 导入接口域名列表
import QS from 'qs';
import {get, post } from '../../utils/https'; // 导入http中创建的axios实例

const v = base.dev;
//const testV = base.test;
const task = {
    test() {
        return get(`${v}/taskStructure/init`, { userCode: '001' });
    },
    // articleDetail(id, params) {
    //     return axios.get(`${v}/topic/${id}`, {
    //         params: params
    //     });
    // },
    login(params) {
        //return post(`${testV}/User/login`, QS.stringify(params));
        console.log(QS.stringify(params));
        return post('/api/User/login', QS.stringify(params));
        //return post(`${testV}/User/login`, QS.stringify(params));

    }
};

export default task;