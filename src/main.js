import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// style
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

// create instance
createApp(App).use(router).mount('#app')
