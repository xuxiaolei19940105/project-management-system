<template>
    <div>
        <el-card>
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
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        const { renderControlColumn} = this;     
        return{
            articlesReadyColumns:[
                {
                    key: 'employeeName',
                    title: '姓名',
                    width:'80px'
                },
                {
                    key: 'employeeCategory',
                    title: '职务',
                    width:'80px'
                },
                {
                    key: 'employeedetails',
                    render: renderControlColumn,
                    title: '近30天占用情况',
                },
            ],
            articlesReadytableData:[],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            PresonOptions:[
                {
                    value:'项目A',
                    lable:'pr001'
                },
                {
                    value:'项目B',
                    lable:'pr002'
                },
                {
                    value:'项目C',
                    lable:'pr003r'
                }
            ]
        }
    },
    created() {
        this.$api.task.getAllUser().then((response)=>{
            let responsevalue=response;
            if(responsevalue){
                let tabledata=[];
                let returndata =responsevalue.data;
                for(var i=0;i<returndata.length;i++){
                    let proObject={};
                    proObject.employeeName=returndata[i].name;
                    if(returndata[i].roleId ==="1"){
                        proObject.employeeCategory="实施";
                    } else if(returndata[i].roleId ==="2"){
                        proObject.employeeCategory="开发";
                    }else if(returndata[i].roleId ==="3"){
                        proObject.employeeCategory="测试";
                    }else if(returndata[i].roleId ==="4"){
                        proObject.employeeCategory="打包人员";
                    }else{
                        proObject.employeeCategory="admin";
                    }
                    let projec=[];
                    let projectdet=returndata[i].workList;
                    if(projectdet.length>0){
                        for(var j=0;j<projectdet.length;j++){
                            let proObjectdet={};
                            proObjectdet.projectname=projectdet[j].belongProId;
                            var starttime = projectdet[j].starttime;
                            starttime=starttime.split("T")[0];
                            proObjectdet.projectstarttime=starttime;
                            var endtime = projectdet[j].endtime;
                            endtime=endtime.split("T")[0];
                            proObjectdet.projectendtime=endtime;
                            projec.push(proObjectdet);
                        }
                        proObject.projectdetail=projec;
                    }else{
                        proObject.projectdetail=returndata[i].workList;
                    }
                    tabledata.push(proObject);
                }
                this.articlesReadytableData=tabledata;
            }else{
                this.$message.success('请联系Admin!'); 
            }
        });
    },
    methods: {
        onSelectionChange(val) {
            console.log('多选', val);
            this.multipleSelection = val;
        },
        onSizeChange(val) {
            this.pageSize = val;
        },
        onCurrentChange(val) {
            this.pageNum = val;
        },
        /**
         * 格式化时间
         * @param
         */
        dateformate:function(datestring){
            const dateS = datestring;
            var dateAa= [];
            var returnDate='';
            if (dateS === null || dateS === undefined || dateS === '') {
                returnDate="00000000";
            }else{
                if(dateS.indexOf("-") >0){
                    dateAa= dateS.split("-");
                }
                if(dateAa.length > 0){
                    for(var i=0;i< dateAa.length;i++){
                        returnDate+=dateAa[i];
                    }
                }else{
                    returnDate=datestring; 
                }
            }
           return  returnDate+"";
        },
         /**
         * 判断每一天项目的情况
         * @param
         */
        timevalible:function(row){
            const currentdate = new Date();
            var ProjectData = [];
            var rowData = row.projectdetail;
            for(var i=0;i<30;i++){
                var everydate = new Date(currentdate);
                everydate.setDate(currentdate.getDate() + i);
                const dayString=everydate.getDate();
                var dayMon=everydate.getMonth()+1;
                if(dayMon < 10)dayMon = "0"+dayMon;
                var dayDate=everydate.getDate();
                if(dayDate < 10)dayDate = "0"+dayDate;
                var dayNumber = everydate.getFullYear()+''+dayMon+''+dayDate;
                const everyData = {};
                everyData.dayString=dayString+"";
                everyData.ymdString =everydate.getFullYear()+'-'+dayMon+'-'+dayDate; 
                const projectobj = this.projecttimevalible(rowData,dayNumber);
                if(projectobj){
                    if(projectobj.length > 0){
                        everyData.typeflag="true";
                        everyData.projectnameArr=projectobj;
                    }else{
                        everyData.typeflag="false";
                        everyData.projectnameArr=[];
                    }
                }else{
                    everyData.typeflag="false";
                    everyData.projectnameArr=[];
                }
                ProjectData.push(everyData);
            }
            return ProjectData;
        },
        projecttimevalible:function(data,crruetime){
            const projectname=[];
            for(var i=0;i< data.length;i++){
                if(data[i]){
                    const formtime= this.dateformate(data[i].projectstarttime);
                    const totime = this.dateformate(data[i].projectendtime);
                    if(formtime==totime){
                        if(formtime ==="00000000"){
                            // empty
                        }else{
                            if(formtime === crruetime){
                                projectname.push(data[i].projectname);
                            }
                        }
                    }else if(formtime > totime){
                        // empty
                    }else{
                        if(crruetime < formtime){
                            // empty
                        }else if(crruetime >totime){
                            // empty
                        }else{
                            projectname.push(data[i].projectname);
                        }
                    }
                }
            }
            return projectname;
        },
        createtimetable(row){  
            const ret =[];
            var indexf=0;
            const projectData = this.timevalible(row);
            for(var i=0;i<projectData.length;i++){
                indexf=indexf+1;
                var children = projectData[i];
                if(children){
                    if(children.typeflag ==="true"){
                        ret.push(
                        <div style="width:40px;height:30px;line-height:30px;margin-left:2px;text-align:center;float:left;background:#F56C6C;">
                            {children.dayString}
                        </div>
                        );
                    }else{
                        ret.push(
                        <div style="width:40px;height:30px;line-height:30px;margin-left:2px;text-align:center;float:left;background:#67C23A;">
                            {children.dayString}
                        </div>
                        );
                    }  
                }
            }
            return ret;
        },
        renderControlColumn({row}){
            var reutnStr =this.createtimetable(row);
            return <div>{reutnStr}</div>

        }
    }
}
</script>
<style scoped>

</style>