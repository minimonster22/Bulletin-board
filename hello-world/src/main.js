import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import AppMenu from 'primevue/menu';

import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'normalize.css';

const app = createApp(App);

app.use(PrimeVue);
app.component('AppMenu', AppMenu);

app.mount('#app');