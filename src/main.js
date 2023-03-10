import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'amfe-flexible/index.js'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
