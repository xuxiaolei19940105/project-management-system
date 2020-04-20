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
                <el-tabs v-model="atctiveName" >
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
        let userData = localStorage.getItem('ms_data');
        if(userData){
            this.$api.task.getMessagelist(userData).then((response)=>{
                let paramReadydata=[];
                let paramDonedata=[];
                let param=[];
                param=response.data;
                if(param.length > 0){
                    for(var i=0;i<param.length;i++){
                        let mdata={};
                        mdata.taskno=param[i].id;
                        mdata.taskname=param[i].messageName;
                        mdata.publisher=param[i].sendUserName+"("+param[i].sendUserid+")";
                        var senddate=param[i].inserttime;
                        senddate=senddate.split("T")[0];
                        mdata.publishdate=senddate;
                        mdata.taskdetail=param[i].messageDescribe;
                        if(param[i].state==="1"){
                            paramDonedata.push(mdata);
                        }else{
                            paramReadydata.push(mdata);
                        }
                    }
                }
                this.articlesReadytableData=paramReadydata;
                this.articlesDonetableData=paramDonedata;
            });
        }
    },
    mounted(){},
    methods:{
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
            if(userS.indexOf("(")>-1){
                userid=userS.split("(")[1];
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
            console.log(messageObject);
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