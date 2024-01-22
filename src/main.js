import { createApp } from 'vue'
import './index.css'
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdContentcopyRound, BiCheckCircle, IoSend } from "oh-vue-icons/icons";

addIcons(MdContentcopyRound, BiCheckCircle, IoSend);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount('#app')