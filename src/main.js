import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import './style.css'
import App from './App.vue'
import router from './router';
import { pinia } from './store';
import './firebase';

const vuetify = createVuetify();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount('#app')
