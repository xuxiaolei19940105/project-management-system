<template>
    <div>
        <project-information />
        <implementers-information />
        <developer-information />
        <testers-information />
        <el-row>
            <el-col :span="12">
                <message />
            </el-col>
            <el-col :span="12">
                <journal />
            </el-col>
        </el-row>
    </div>
</template>
<script>
import projectInformation from './projectInformation.vue';
import implementersInformation from './implementersInformation.vue';
import developerInformation from './developerInformation.vue';
import testersInformation from './testersInformation.vue';
import message from './message.vue';
import journal from './journal.vue';
export default {
    components: {
        projectInformation,
        implementersInformation,
        developerInformation,
        testersInformation,
        message,
        journal
    },
    data() {
        return {};
    }
};
</script>  
<style scoped>
.box-card{
    margin-top: 10px;
}
</style>
