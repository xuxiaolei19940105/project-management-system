<template>
    <div class="confirm-wrap">
      <el-dialog
            :title="title"
            :visible.sync="dialogNewUserVisible"
            width="20%"
            :append-to-body="true"
            v-if="dialogNewUserVisible"
            :close-on-click-modal="false"
        >
        <div style="text-align: center;font-size: 15px;">
            {{content}}
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleAction('No')">取 消</el-button>
            <el-button type="primary" @click="handleAction('Yes')">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
  export default {
    name: "MyConfirm",
    data() {
      return {
        dialogNewUserVisible:false,
        title:'',
        content:'',
        type:'',
        promiseStatus:null,
      }
    },
    methods: {
      confirm(title,content) {
        let _this = this;
        _this.title=title;
        _this.content=content;
        return new Promise(function (resolve, reject) {
          _this.promiseStatus = {resolve, reject};
          _this.dialogNewUserVisible = true;
       });
      },
      handleAction(action){
        this.dialogNewUserVisible=false;
        if(action=='Yes'){
          this.promiseStatus && this.promiseStatus.resolve();
        }else{
          this.promiseStatus && this.promiseStatus.reject();
        }
      }
    }
  }
</script>