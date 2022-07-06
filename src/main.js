import { createApp } from 'vue'
import App from './App.vue'
import i18n from './util';
const app = createApp(App).use(i18n);
app.mount('#app')
