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
    //更新项目
    updateProject(params) {
        return httpReqest.post('/api/Project/updateProject', params);
    },
    //获取项目信息
    getProjectMess(params) {
        return httpReqest.post('/api/Project/getProList', params);
    },
    //获取人员情况
    getAllUser() {
        return httpReqest.post('/api/User/findAll');
    },
    //获取项目情况
    initProData(params) {
        return httpReqest.post('/api/Project/initProData', params);
    },
    //标记已读
    updateMessage(params) {
        return httpReqest.post('/api/Message/markedAsRead', params);
    },
    //更新消息
    rejectOrconfirmMessage(params) {
        return httpReqest.post('/api/Message/updateState', params);
    },
    //新建消息
    newMessage(params) {
        return httpReqest.post('/api/Message/insertMessage', params);
    },
    //新建工作任务
    newWork(params) {
        return httpReqest.post('/api/Work/createWork', params);
    },
    //更新工作内容
    updataWork(params) {
        return httpReqest.post('/api/Work/updateWork', params);
    }
};

export default task;