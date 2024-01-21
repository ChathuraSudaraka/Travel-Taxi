import { createApp } from 'vue'
import './index.css'
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdContentcopyRound, BiCheckCircle } from "oh-vue-icons/icons";

addIcons(MdContentcopyRound, BiCheckCircle);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount('#app')