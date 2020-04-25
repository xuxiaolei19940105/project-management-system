<template>
    <el-menu
        class="sidebar-el-menu"
        :collapse="collapse"
        :default-active="onRoutes"
        background-color="#fff"
        text-color="#000"
        active-text-color="#2d72c9"
        unique-opened
        router
    >
        <el-auto-menu-item
            v-for="(menuItem,index) in innerData"
            :key="index"
            :menu-item-data="menuItem"
        ></el-auto-menu-item>
    </el-menu>
</template>
<script>
import ElAutoMenuItem from './el-auto-menu-item';
import ITEM from './sidebar';
export default {
    components: {
        ElAutoMenuItem
    },
    data() {
        return {
            innerData:[]
        };
    },
    created() {
        let roleId= localStorage.getItem('ms_roleId');
        if(roleId ==='0' || roleId ==='1'){
            this.innerData=new ITEM().ITEMAdmin;
        }else{
            this.innerData=new ITEM().ITEMother;
        }
    },
    props: ['onRoutes', 'collapse']
};
</script>