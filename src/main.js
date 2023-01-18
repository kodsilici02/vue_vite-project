import { createApp } from "vue";
import App from "./App.vue";
import { MotionPlugin } from "@vueuse/motion";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@/assets/tailwind.css";
import { loadFonts } from "./plugins/webfontloader";
import "@fortawesome/fontawesome-free/css/all.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { dom } from "@fortawesome/fontawesome-svg-core";
import store from "./store";
import VWave from "v-wave";

dom.watch();
library.add(faPhone);

loadFonts();
const app = createApp(App);
app.use(VWave);
app.use(store);
app.use(router);
app.use(MotionPlugin);
app.use(vuetify);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
