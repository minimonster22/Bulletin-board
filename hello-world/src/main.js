import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import AppMenu from 'primevue/menu';
import ToastService from 'primevue/toastservice';
import store from './store';
import axios from 'axios';

import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'normalize.css';
import router from "@/router";

const app = createApp(App);
axios.defaults.withCredentials = true;
app.use(PrimeVue);
app.use(store);
app.use(router);
app.use(ToastService);
app.component('AppMenu', AppMenu);

app.mount('#app');