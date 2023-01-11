import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";
import App from "./App.vue";

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import "./assets/scss/app.scss";

import { lightTheme, darkTheme } from "./themes";

// use themes

const vuetify = createVuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  components,
  directives,
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    }
  }
})

const app = createApp(App);

app.use(router)

app.use(vuetify)

app.use(createPinia());

app.mount("#app");

export default app