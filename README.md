# 福佳集团 ERP 管理系统

## 前言

系统是福佳集团 ERP 管理系统，基于 vue-cli3 和 element-UI 开发，待完善介绍。

## 功能

[x] Element UI
[x] 登录/注销

## 安装步骤

```git
git clone https://github.com/darkerFa/fj-erp.git      // 把项目下载到本地

npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn

npm run serve

// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

## 组件使用说明与演示

待完善

### 如何切换主题色呢

第一步：打开 src/main.js 文件，找到引入 element 样式的地方，换成浅绿色主题。

```javascript
import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import './assets/css/theme-green/index.css';       // 浅绿色主题
```

第二步：打开 src/App.vue 文件，找到 style 标签引入样式的地方，切换成浅绿色主题。

```javascript
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";     /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```
