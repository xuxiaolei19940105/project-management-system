import base from './base'; // 导入接口域名列表
//import {get, post } from '../../utils/https'; // 导入http中创建的axios实例
import httpReqest from '../../utils/https';

const v = base.dev;
//const testV = base.test;
const task = {
    test() {
        return httpReqest.get(`${v}/taskStructure/init`, { userCode: '001' });
    },
    test1() {
        return httpReqest.post(`${v}/taskStructure/init`, { userCode: '001' });
    },
    // articleDetail(id, params) {
    //     return axios.get(`${v}/topic/${id}`, {
    //         params: params
    //     });
    // },
    login(params) {
        //return post(`${testV}/User/login`, QS.stringify(params));
        //return httpReqest.post('/api/User/login', QS.stringify(params));
        return httpReqest.post('/api/User/login', params);
        //return post(`${testV}/User/login`, QS.stringify(params));

    }
};

export default task;