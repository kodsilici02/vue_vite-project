import { createApp } from "vue";
import App from "./App.vue";
import { MotionPlugin } from "@vueuse/motion";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VWave from "v-wave";
import "./main.css";
import "./main.css";

import "@fortawesome/fontawesome-free/css/all.css";
import { loadFonts } from "./plugins/webfontloader";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
library.add(faPhone);
library.add(fas);

loadFonts();
const app = createApp(App);
app.use(VWave);
app.use(router);
app.use(MotionPlugin);
app.use(vuetify);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
