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
    //登录
    login(params) {
        //return post(`${testV}/User/login`, QS.stringify(params));
        return httpReqest.post('/api/User/login', params);
    },
    //查询消息列表
    getMessagelist(params) {
        return httpReqest.post('/api/Message/getMessageList', params);
    },
    //新建项目
    setProject(params) {
        return httpReqest.post('/api/Project/createProject', params);
    },
    //获取项目信息
    getProjectMess(params) {
        return httpReqest.post('/api/Project/getProList', params);
    },
    //获取人员情况
    getAllUser() {
        return httpReqest.post('/api/User/findAll');
    }
};

export default task;