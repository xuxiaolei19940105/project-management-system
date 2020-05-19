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
            innerData: []
        };
    },
    created() {
        this.innerData = new ITEM().ITEMAdmin;
        let roleList = JSON.parse(localStorage.getItem('ms_role'));
        this.innerData[1].menuShow = roleList.includes('01');
        this.innerData[1].subs[0].menuShow = roleList.includes('02');
        this.innerData[1].subs[1].menuShow = roleList.includes('07');
        this.innerData[2].menuShow = roleList.includes('12');
        this.innerData[3].menuShow = roleList.includes('14');
        this.innerData[4].menuShow = roleList.includes('17');
        this.innerData[4].subs[0].menuShow = roleList.includes('18');
        this.innerData[4].subs[1].menuShow = roleList.includes('25');
        this.innerData[5].menuShow = roleList.includes('27');
        this.innerData[5].subs[0].menuShow = roleList.includes('28');
        this.innerData[5].subs[1].menuShow = roleList.includes('30');
        this.innerData[5].subs[2].menuShow = roleList.includes('32');
    },
    props: ['onRoutes', 'collapse']
};
</script>