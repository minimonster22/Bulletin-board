import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import AppMenu from 'primevue/menu';
import ToastService from 'primevue/toastservice';
import store from './store';
import axios from 'axios';
import 'quill/dist/quill.snow.css';

import FileUpload from 'primevue/fileupload';
import AppToast  from 'primevue/toast';

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
app.component('FileUpload', FileUpload);
app.component('AppToast', AppToast);
app.mount('#app');