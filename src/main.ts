import { createApp } from 'vue'
import {Button, Icon, NavBar, Tabbar, TabbarItem } from 'vant'
import App from './App.vue'
import 'vant/es/toast/style';

const app = createApp(App);
app.use(Button);
app.use(Icon);
app.use(NavBar);
app.use(Tabbar)
app.use(TabbarItem)
app.mount('#app');
