<template>
    <div class="sidebar">
        <!-- <el-menu
            class="sidebar-el-menu"
            :collapse="collapse"
            :default-active="onRoutes"
            background-color="#fff"
            text-color="#000"
            active-text-color="#2d72c9"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}000</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}11111</template>
                                <template v-for="threeItem in subItem.subs">
                                    <el-submenu
                                        v-if="threeItem.subs"
                                        :index="threeItem.index"
                                        :key="threeItem.index"
                                    >
                                        <template slot="title">{{ threeItem.title }}222</template>
                                        <el-menu-item
                                            v-for="(forthitem, i) in threeItem.subs"
                                            :key="i"
                                            :index="forthitem.index"
                                        >{{ forthitem.title }}</el-menu-item>
                                    </el-submenu>
                                    <el-menu-item
                                        v-else
                                        :index="threeItem.index"
                                        :key="threeItem.index"
                                    >{{ threeItem.title }}</el-menu-item>
                                </template>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>-->

        <ElAutoMenu :onRoutes="onRoutes" :collapse="collapse" />
    </div>
</template>
<script>
import ElAutoMenu from './el-auto-menu';
export default {
    inject: ['bus'],
    data() {
        return {
            collapse: false
        };
    },
    components: {
        ElAutoMenu
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        this.bus.$on('collapse', msg => {
            this.collapse = msg;
            this.bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
