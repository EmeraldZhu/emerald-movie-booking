import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles';
//import './style.css'
import router from './router';
import { pinia } from './store';
import './firebase';

const vuetify = createVuetify();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount('#app')
