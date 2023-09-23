import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Ensure that HTML, CSS is loaded before additional
// Bootstrap JS is handled.
import 'bootstrap/dist/js/bootstrap.js'