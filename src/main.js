import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles';
//import './style.css'
import router from './router';
import { pinia } from './store';
import './firebase';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

const vuetify = createVuetify();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(vuetify);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
