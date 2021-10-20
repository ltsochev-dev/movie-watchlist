import './scss/app.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { getConfigStorage } from './api/getConfigStorage';
import dayjs from 'dayjs';
import { createMovieDBApi } from './api/moviedb';

const pinia = createPinia();

const mdbConfig = getConfigStorage();
if (dayjs().diff(mdbConfig.lastUpdated, 'hours') > 2) {
    const mdbApiClient = createMovieDBApi(mdbConfig);
    (async () => await mdbApiClient.loadConfig())();
}

createApp(App).use(pinia).use(router).mount('#app');
