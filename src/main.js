import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

import router from './router'
import store from './store/store';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ4UB4fwEjdcHrvO7EJU1Av9BneOVnyMs",
  authDomain: "week7-shibo.firebaseapp.com",
  projectId: "week7-shibo",
  storageBucket: "week7-shibo.appspot.com",
  messagingSenderId: "910179128319",
  appId: "1:910179128319:web:04bb72577f4ae093f88dca"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  if (user) {
    store.dispatch('fetchUser', user);
  } else {
    store.dispatch('logout');
  }
});

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(store);
app.use(router);

app.mount('#app')
