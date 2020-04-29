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
    //获取项目信息
    getProjectMessByCondition(params) {
        return httpReqest.post('/api/Project/getProListByCondition', params);
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
    },
    //创建用户
    newdataUser(params) {
        return httpReqest.post('/api/User/insertUser', params);
    },
    //更新用户信息
    changedataUser(params) {
        return httpReqest.post('/api/User/updateUser', params);
    },
    //新建留言
    insertGuestbook(params) {
        return httpReqest.post('/api/Guestbook/insertGuestbook', params);
    },
    //获取项目树
    getprojectTree(params) {
        return httpReqest.post('/api/Project/getProTree', params);
    },
    //获取人员角色
    getUserRole() {
        return httpReqest.post('/api/Role/getRoleList');
    },
    //获取人员权限
    getUserAuth() {
        return httpReqest.post('/api/Auth/getAuthList');
    },
    //获取管理员用户列表
    getSystemUserList() {
        return httpReqest.post('/api/User/getSystemUserList');
    },
    //获取所有项目集合
    getAllProList() {
        return httpReqest.post('/api/Project/getAllProList');
    },
    //获取时间冲突工作集合
    getUniteWorkList(params) {
        return httpReqest.post('/api/Work/getUniteWorkList', params);
    }
};

export default task;