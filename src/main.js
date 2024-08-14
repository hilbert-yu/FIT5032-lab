import { createApp } from 'vue'
import App from './App.vue'

// import './assets/main.css'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config';
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';

import Aura from '@primevue/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
// app.component('DataTable', DataTable);
// app.component('Column', Column);


app.mount('#app')
