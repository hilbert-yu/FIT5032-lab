import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

import router from './router'
import store from './store/store';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Import Firebase initialization from firebase/init.js
import { initFirebaseAuth } from './firebase/init';

// Initialize Firebase auth state listener
initFirebaseAuth(store);

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(store);
app.use(router);

app.mount('#app')
