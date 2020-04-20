<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    data() {
        return {
            eventBus: new Vue(),
            isRouterAlive: true
        };
    },
    provide: function() {
        return {
            bus: this.eventBus,
            reload: this.reload
        };
    },
    methods: {
        reload () {
            this.isRouterAlive = false;            //先关闭，
            this.$nextTick(function () {
                this.isRouterAlive = true;         //再打开
            }) 
        }
    }
};
</script>
<style>
@import './assets/css/main.scss';
@import './assets/css/color-dark.css'; /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>