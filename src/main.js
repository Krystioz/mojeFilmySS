import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import moviesTableVue from "./components/moviesTable.vue";
import headerVue from "./components/header.vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.component("moviesTableVue", moviesTableVue);
app.component("headerVue", headerVue);
app.provide("axios", app.config.globalProperties.axios);

app.mount("#app");
