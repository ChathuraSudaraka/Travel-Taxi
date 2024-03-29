import { createApp } from "vue";
import "toastify-js/src/toastify.css";
import "./index.css";

import { router } from "./router";
import App from "./App.vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  MdContentcopyRound,
  BiCheckCircle,
  IoSend,
  FaPhoneAlt,
  IoMail,
  FaGlobe,
} from "oh-vue-icons/icons";

addIcons(
  MdContentcopyRound,
  BiCheckCircle,
  IoSend,
  FaPhoneAlt,
  IoMail,
  FaGlobe
);

const app = createApp(App);
app.use(router);
app.component("v-icon", OhVueIcon);
app.mount("#app");
