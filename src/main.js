import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"

import router from "./router"
import i18n from "@/i18n"

const app = createApp(App)
export const I18n = i18n

app.use(createPinia())

app.use(I18n)
app.use(router)

app.mount("#app")
