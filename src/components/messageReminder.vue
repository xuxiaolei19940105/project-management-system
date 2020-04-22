<template>
    <div>
        <el-card>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-copy"></i> 消息中心
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div>
                <el-tabs v-model="atctiveName" @tab-click="handleClick">
                    <el-tab-pane label="待办消息" name="first" >
                        <dytable
                            :columns="articlesReadyColumns"
                            :table-data="articlesReadytableData"
                            :total="total"
                            ref="multipleTable"
                            :page-num="pageNum"
                            :page-size="pageSize"
                            @current-change="onCurrentChange"
                            @on-selection-change="onSelectionChange"
                            @size-change="onSizeChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dytable>
                    </el-tab-pane>
                    <el-tab-pane label="已办消息" name="second" >
                        <dytable
                            :columns="articlesDoneColumns"
                            :table-data="articlesDonetableData"
                            :total="total"
                            ref="multipleTable"
                            :page-num="pageNum"
                            :page-size="pageSize"
                            @current-change="onCurrentChange"
                            @on-selection-change="onSelectionChange"
                            @size-change="onSizeChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dytable>
                    </el-tab-pane>
                    <el-tab-pane label="拒绝消息" name="Third" >
                        <dytable
                            :columns="articlesRejectColumns"
                            :table-data="articlesRejecttableData"
                            :total="total"
                            ref="multipleTable"
                            :page-num="pageNum"
                            :page-size="pageSize"
                            @current-change="onCurrentChange"
                            @on-selection-change="onSelectionChange"
                            @size-change="onSizeChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dytable>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'tabs',
    inject:['reload'],
    data(){
        const { renderControlColumn } = this;
        const { rendermessagesender } = this;
        return{
            atctiveName: 'first',
            pageNum: 1,
            pageSize: 2,
            total: 10,
            articlesReadyColumns: [
                {
                    key: 'taskno',
                    title: '编号',
                    width: '100'
                },
                {
                    key: 'taskname',
                    title: '任务名称',
                    width: '100'
                },
                {
                    key: 'publisher',
                    title: '发布者',
                    width: '100',
                    render: rendermessagesender
                },
                {
                    key: 'publishdate',
                    title: '发布时间'
                },
                {
                    key: 'taskdetail',
                    title: '任务详情'
                },
                {
                    title: '操作',
                    render: renderControlColumn,
                    width: '260px'
                }
            ],
            articlesRejectColumns:[
                {
                    key: 'taskno',
                    title: '编号',
                    width: '100'
                },
                {
                    key: 'taskname',
                    title: '任务名称',
                    width: '100'
                },
                {
                    key: 'publisher',
                    title: '发布者',
                    render: rendermessagesender,
                    width: '100'
                },
                {
                    key: 'publishdate',
                    title: '发布时间'
                },
                {
                    key: 'taskdetail',
                    title: '任务详情'
                },
                {
                    title: '操作',
                    render: renderControlColumn,
                    width: '260px'
                }
            ],
            articlesReadytableData:[],
            articlesRejecttableData:[],
            articlesDoneColumns: [
                {
                    key: 'taskno',
                    title: '编号',
                    width: '100'
                },
                {
                    key: 'taskname',
                    title: '任务名称',
                    width: '100'
                },
                {
                    key: 'publisher',
                    title: '发布者',
                    render: rendermessagesender,
                    width: '100'
                },
                {
                    key: 'publishdate',
                    title: '发布时间'
                },
                {
                    key: 'taskdetail',
                    title: '任务详情'
                },
                {
                    title: '操作',
                    render: renderControlColumn,
                    width: '260px'
                }
            ],
            articlesDonetableData:[]
        }
    },
    created(){
        let userid = localStorage.getItem('ms_id');
        if(userid){
            let paramdata={};
            paramdata.receiveUserid=userid;
            paramdata.state=0;
            this.$api.task.getMessagelist(paramdata).then((response)=>{
                let paramReadydata=[];
                let param=[];
                param=response.data;
                if(param.length > 0){
                    for(var i=0;i<param.length;i++){
                        let mdata={};
                        mdata.taskno=param[i].id;
                        mdata.taskname=param[i].messageName;
                        mdata.publisher=param[i].sendUserName+"-("+param[i].sendUserid+")";
                        var senddate=param[i].inserttime;
                        senddate=senddate.split("T")[0];
                        mdata.publishdate=senddate;
                        mdata.taskdetail=param[i].messageDescribe;
                        paramReadydata.push(mdata);
                    }
                }
                this.articlesReadytableData=paramReadydata;
            });
        }
    },
    mounted(){},
    methods:{
        //切换待办和已办消息
        handleClick(tab){
            var tabsname =tab.paneName;
            if(tabsname){
                if(tabsname ==="first"){
                    //待办消息
                    let userid = localStorage.getItem('ms_id');
                    let paramdata={};
                    paramdata.receiveUserid=userid;
                    paramdata.state=0;
                    this.$api.task.getMessagelist(paramdata).then((response)=>{
                        let paramReadydata=[];
                        let param=[];
                        param=response.data;
                        if(param.length > 0){
                            for(var i=0;i<param.length;i++){
                                let mdata={};
                                mdata.taskno=param[i].id;
                                mdata.taskname=param[i].messageName;
                                mdata.publisher=param[i].sendUserName+"-("+param[i].sendUserid+")";
                                var senddate=param[i].inserttime;
                                senddate=senddate.split("T")[0];
                                mdata.publishdate=senddate;
                                mdata.taskdetail=param[i].messageDescribe;
                                paramReadydata.push(mdata);
                            }
                        }
                        this.articlesReadytableData=paramReadydata;
                        this.reload();
                    });
                }else if(tabsname ==="second"){
                    //已办消息的已接收消息
                    let userid = localStorage.getItem('ms_id');
                    let paramdata={};
                    paramdata.receiveUserid=userid;
                    paramdata.state=1;
                    this.$api.task.getMessagelist(paramdata).then((response)=>{
                        let paramOKdata=[];
                        let param=[];
                        param=response.data;
                        if(param.length > 0){
                            for(var i=0;i<param.length;i++){
                                let mdata={};
                                mdata.taskno=param[i].id;
                                mdata.taskname=param[i].messageName;
                                mdata.publisher=param[i].sendUserName+"-("+param[i].sendUserid+")";
                                var senddate=param[i].inserttime;
                                senddate=senddate.split("T")[0];
                                mdata.publishdate=senddate;
                                mdata.taskdetail=param[i].messageDescribe;
                                paramOKdata.push(mdata);
                            }
                        }
                        this.articlesDonetableData=paramOKdata;
                        this.reload();
                    });
                }
            }else{
                //已拒绝消息
                let userid = localStorage.getItem('ms_id');
                let paramdatare={};
                paramdatare.receiveUserid=userid;
                paramdatare.state=2;
                this.$api.task.getMessagelist(paramdatare).then((response)=>{
                    let paramrejdata=[];
                    let param=[];
                    param=response.data;
                    if(param.length > 0){
                        for(var i=0;i<param.length;i++){
                            let mdata={};
                            mdata.taskno=param[i].id;
                            mdata.taskname=param[i].messageName;
                            mdata.publisher=param[i].sendUserName+"-("+param[i].sendUserid+")";
                            var senddate=param[i].inserttime;
                            senddate=senddate.split("T")[0];
                            mdata.publishdate=senddate;
                            mdata.taskdetail=param[i].messageDescribe;
                            paramrejdata.push(mdata);
                        }
                    }
                    this.articlesRejecttableData=paramrejdata;
                    this.reload();
                });
            }
        },
        //分页
        onSizeChange(val) {
            console.log(val);
            this.pageSize = val;
        },
        onCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
        },
        onSelectionChange(val) {
            console.log('多选', val);
            this.multipleSelection = val;
        },
        //拒绝
        onRowRefuseButtonClick(row) {
            let paramdata={};
            paramdata.id=row.taskno;
            paramdata.state='2';
            let crueateid=localStorage.getItem('ms_id');
            let crueatename=localStorage.getItem('ms_name');
            let crueateusername=localStorage.getItem('ms_username');
             var userS=row.publisher;
             var userid ="";
             var userename="";
            if(userS.indexOf("-(")>-1){
                userid=userS.split("-(")[1];
                userid=userid.split(")")[0];
                userename=userS.split("(")[0];
            }else{
                userid=row.publisher;
                userename=row.publisher;
            }
            var dates=new Date();
            let messageObject={};
            messageObject.id=row.taskno;
            messageObject.messageName=crueatename+" 已经拒绝了任务: "+row.taskname;
            messageObject.messageDescribe=row.taskdetail;
            messageObject.sendUserid=crueateid;
            messageObject.receiveUserid=userid;
            messageObject.state="0";
            messageObject.inserttime=dates;
            messageObject.updatetime=dates;
            messageObject.readTag="0";
            messageObject.sendUserName=crueateusername;
            messageObject.receiveUserName=userename;
            this.$api.task.rejectOrconfirmMessage(paramdata).then(()=>{
                this.$api.task.newMessage(messageObject).then(()=>{
                    this.$message.success('任务已拒绝.');
                    this.reload();
                }); 
            });
        },
        //确认
        onRowAgreeButtonClick(row) {
            let paramdata={};
            paramdata.id=row.taskno;
            paramdata.state='1';
            this.$api.task.rejectOrconfirmMessage(paramdata).then(()=>{
                this.$message.success('任务已确认.');
                this.reload();
            });
        },
        rendermessagesender(v) {
            if (v.row.publisher) {
                var userid=v.row.publisher;
                userid=userid.split("-(")[0];
                return <div>{userid}</div>;
            }
        },
        renderControlColumn({row}){
            const { onRowRefuseButtonClick, onRowAgreeButtonClick } = this;
            const  ret =[];
            ret.push(
                <div>
                    <el-button type="text" icon="el-icon-edit" onClick={() => onRowAgreeButtonClick(row)}>
                        确认
                    </el-button>
                    <el-button type="text" style="color:red" icon="el-icon-delete" onClick={() => onRowRefuseButtonClick(row)}>
                        拒绝
                    </el-button>
                </div>
            );
             return <div>{ret}</div>;
        }
    }
}
</script>