import { createApp } from 'vue';
import {Button, Icon, NavBar, Tabbar, TabbarItem } from 'vant';
import App from './App.vue';
import 'vant/es/toast/style';
import 'vant/lib/index.css';
import * as VueRouter from "vue-router";
import routes from "./config/route";

const app = createApp(App);
app.use(Button);
app.use(Icon);
app.use(NavBar);
app.use(Tabbar)
app.use(TabbarItem)

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router);

app.mount('#app');
