<template>
    <div>
        <el-card>
            <div style="text-align:right;padding-bottom:10px;" v-if="showNewUser">
                <el-button size="mini" @click="dialogNewUserVisible=true">新建人员</el-button>
            </div>
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
        <el-dialog
            title="新建人员"
            :visible.sync="dialogNewUserVisible"
            width="50%"
            :append-to-body="true"
            v-if="dialogNewUserVisible"
            :close-on-click-modal="false"
        >
            <userinformation ref="sonNewuser" :rowdata="rowdata" :operationmode="operationmode"/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogNewUserVisible=false">取 消</el-button>
                <el-button type="primary" @click="getNewUserData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import userinformation from '../../components/newUserinformation';
export default {
    components: {
        userinformation
    },
    inject: ['reload'],
    data() {
        const { renderControlColumn } = this;
        return {
            articlesReadyColumns: [
                {
                    key: 'employeeName',
                    title: '姓名',
                    width: '80px'
                },
                {
                    key: 'employeeCategory',
                    title: '职务',
                    width: '80px'
                },
                {
                    key: 'employeedetails',
                    render: renderControlColumn,
                    title: '近30天占用情况'
                }
            ],
            dialogNewUserVisible: false,
            articlesReadytableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            showNewUser: false,
            rowdata: {},
            operationmode: 'new',
            PresonOptions: [
                {
                    value: '项目A',
                    lable: 'pr001'
                },
                {
                    value: '项目B',
                    lable: 'pr002'
                },
                {
                    value: '项目C',
                    lable: 'pr003r'
                }
            ]
        };
    },
    created() {
        //新建人员权限控制
        let roleId = localStorage.getItem('ms_roleId');
        if (roleId === '0') {
            this.showNewUser = true;
        }
        //人员详情
        this.$api.task.getAllUser().then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let tabledata = [];
                let returndata = responsevalue.data;
                for (var i = 0; i < returndata.length; i++) {
                    if (returndata[i].authId === "0"|| returndata[i].authId === "3") {
                        //
                    } else {
                        let proObject = {};
                        proObject.employeeName = returndata[i].name;
                        proObject.employeeCategory = returndata[i].roleName;
                        let projectdet = returndata[i].workList;
                        if (projectdet.length > 0) {
                            let projec = [];
                            for (var j = 0; j < projectdet.length; j++) {
                                if (projectdet[j].startTime) {
                                    let proObjectdet = {};
                                    proObjectdet.projectname = projectdet[j].belongProId;
                                    let starttime = projectdet[j].startTime;
                                    let DateS = new Date(starttime);
                                    let ovwerS = new Date(Date.UTC(DateS.getFullYear(), DateS.getMonth(), DateS.getDate()))
                                        .toISOString()
                                        .slice(0, 10);
                                    proObjectdet.projectstarttime = ovwerS;
                                    let endtime = projectdet[j].endTime;
                                    let endDateS = new Date(endtime);
                                    let endovwerS = new Date(Date.UTC(endDateS.getFullYear(), endDateS.getMonth(), endDateS.getDate()))
                                        .toISOString()
                                        .slice(0, 10);
                                    proObjectdet.projectendtime = endovwerS;
                                    projec.push(proObjectdet);
                                }
                            }
                            proObject.projectdetail = projec;
                        } else {
                            proObject.projectdetail = returndata[i].workList;
                        }
                        tabledata.push(proObject);
                    }
                }
                this.articlesReadytableData = tabledata;
            } else {
                this.$message.success('请联系Admin!');
            }
        });
    },
    methods: {
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        onSizeChange(val) {
            this.pageSize = val;
        },
        onCurrentChange(val) {
            this.pageNum = val;
        },
        getNewUserData() {
            var usernameS = this.$refs.sonNewuser.newUserForm.username;
            if (!usernameS) {
                this.$message.success('请输入姓名!');
                return false;
            }
            var usernameStrn = this.$refs.sonNewuser.newUserForm.usernameString;
            if (!usernameStrn) {
                this.$message.success('请输入用户名!');
                return false;
            } else {
                var reg = new RegExp(/^[a-zA-Z0-9]+$/);
                if (!reg.test(usernameStrn)) {
                    this.$message.success('用户名只能输入字母和数字!');
                    return false;
                }
            }
            var userroleidS = this.$refs.sonNewuser.newUserForm.userroleid;
            if (!userroleidS) {
                this.$message.success('请选择职位!');
                return false;
            }
            var userauthidS = this.$refs.sonNewuser.newUserForm.userauthid;
            if (!userauthidS) {
                this.$message.success('请选择权限!');
                return false;
            }
            let userObject = {};
            let worlest = [];
            let todaydate = new Date();
            userObject.id = '';
            userObject.name = this.$refs.sonNewuser.newUserForm.username;
            userObject.username = this.$refs.sonNewuser.newUserForm.usernameString;
            userObject.password = '123456';
            userObject.roleId = this.$refs.sonNewuser.newUserForm.userroleid;
            userObject.authId = this.$refs.sonNewuser.newUserForm.userauthid;
            userObject.state = 0;
            userObject.inserttime = todaydate;
            userObject.updatetime = todaydate;
            userObject.workList = worlest;
            userObject.deleteFlg = 0;
            this.$api.task.newdataUser(userObject).then(response => {
                var responsevalue = response;
                if (responsevalue) {
                    if (responsevalue.data) {
                        this.$message.success('创建成功!默认密码:123456');
                        this.dialogNewUserVisible = false;
                        this.reload();
                    } else {
                        this.$message.success('用户已存在,请重新创建!');
                        this.dialogNewUserVisible = true;
                    }
                } else {
                    this.$message.success('创建错误,请重试!');
                    this.dialogNewUserVisible = true;
                }
            });
        },
        /**
         * 格式化时间
         * @param
         */
        dateformate: function(datestring) {
            const dateS = datestring;
            var dateAa = [];
            var returnDate = '';
            if (dateS === null || dateS === undefined || dateS === '') {
                returnDate = '00000000';
            } else {
                if (dateS.indexOf('-') > 0) {
                    dateAa = dateS.split('-');
                }
                if (dateAa.length > 0) {
                    for (var i = 0; i < dateAa.length; i++) {
                        returnDate += dateAa[i];
                    }
                } else {
                    returnDate = datestring;
                }
            }
            return returnDate + '';
        },
        /**
         * 判断每一天项目的情况
         * @param
         */
        timevalible: function(row) {
            const currentdate = new Date();
            var ProjectData = [];
            var rowData = row.projectdetail;
            for (var i = 0; i < 30; i++) {
                var everydate = new Date(currentdate);
                everydate.setDate(currentdate.getDate() + i);
                const dayString = everydate.getDate();
                var dayMon = everydate.getMonth() + 1;
                if (dayMon < 10) dayMon = '0' + dayMon;
                var dayDate = everydate.getDate();
                if (dayDate < 10) dayDate = '0' + dayDate;
                var dayNumber = everydate.getFullYear() + '' + dayMon + '' + dayDate;
                const everyData = {};
                everyData.dayString = dayString + '';
                everyData.ymdString = everydate.getFullYear() + '-' + dayMon + '-' + dayDate;
                const projectobj = this.projecttimevalible(rowData, dayNumber);
                if (projectobj) {
                    if (projectobj.length > 0) {
                        everyData.typeflag = 'true';
                        everyData.projectnameArr = projectobj;
                    } else {
                        everyData.typeflag = 'false';
                        everyData.projectnameArr = [];
                    }
                } else {
                    everyData.typeflag = 'false';
                    everyData.projectnameArr = [];
                }
                ProjectData.push(everyData);
            }
            return ProjectData;
        },
        projecttimevalible: function(data, crruetime) {
            const projectname = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i]) {
                    const formtime = this.dateformate(data[i].projectstarttime);
                    const totime = this.dateformate(data[i].projectendtime);
                    if (formtime == totime) {
                        if (formtime === '00000000') {
                            // empty
                        } else {
                            if (formtime === crruetime) {
                                projectname.push(data[i].projectname);
                            }
                        }
                    } else if (formtime > totime) {
                        // empty
                    } else {
                        if (crruetime < formtime) {
                            // empty
                        } else if (crruetime > totime) {
                            // empty
                        } else {
                            projectname.push(data[i].projectname);
                        }
                    }
                }
            }
            return projectname;
        },
        createtimetable(row) {
            const ret = [];
            var indexf = 0;
            const projectData = this.timevalible(row);
            for (var i = 0; i < projectData.length; i++) {
                indexf = indexf + 1;
                var children = projectData[i];
                if (children) {
                    if (children.typeflag === 'true') {
                        ret.push(
                            <div style="width:40px;height:30px;line-height:30px;margin-left:2px;text-align:center;float:left;background:#F56C6C;">
                                {children.dayString}
                            </div>
                        );
                    } else {
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
        renderControlColumn({ row }) {
            var reutnStr = this.createtimetable(row);
            return <div>{reutnStr}</div>;
        }
    }
};
</script>
<style scoped>
</style>