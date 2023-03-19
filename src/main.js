import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { createI18n } from "vue-i18n";
import { messages } from "./locales/locales";

const app = createApp(App);

const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: "fr",
	fallbackLocale: "fr",
	messages,
});

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
