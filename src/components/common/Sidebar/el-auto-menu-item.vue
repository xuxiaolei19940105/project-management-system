
<template>
    <el-submenu v-if="menuItemData.subs" :index="menuItemData.index">
        <template>
            <span slot="title">{{ menuItemData.title }}</span>
        </template>
        <el-auto-menu-item
            v-for="(menuChildrenItem,index) in menuItemData.subs"
            :key="index"
            :menuItemData="menuChildrenItem"
        ></el-auto-menu-item>
    </el-submenu>
    <el-menu-item v-else :index="menuItemData.index">
        <i :class="menuItemData.icon"></i>
        <span slot="title">{{ menuItemData.title }}</span>
    </el-menu-item>
</template>
<script>
import ElAutoMenuItem from './el-auto-menu-item';

export default {
    name: 'el-auto-menu-item',
    components: {
        ElAutoMenuItem
    },
    data() {
        return {};
    },
    props: {
        menuItemData: Object
    }
};
</script>