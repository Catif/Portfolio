import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import i18n from "@/i18n";
import router from "./router";

const app = createApp(App);

app.use(createPinia());

export var I18n = i18n;

app.use(I18n);
app.use(router);

app.mount("#app");
