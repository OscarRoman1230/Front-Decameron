import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import vuetify from './plugins/vuetify'

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = 'https://back-decameron-production.up.railway.app/api'

app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
