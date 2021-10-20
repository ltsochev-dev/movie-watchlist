import { createRouter, createWebHistory } from 'vue-router';
import { appConfig } from '../config/app';
import HomeComponent from '../modules/Home/Home.vue';
import MovieComponent from '../modules/Movie/Movie.vue';
import MovieDetailComponent from '../modules/MovieDetails/MovieDetails.vue';
import TvShowDetailsComponent from '../modules/TvShowDetails/TvDetails.vue';
import AuthComponent from '../layouts/Auth.vue';
import createAuth from '../utils/createAuth';
import { useAuthStore } from '../stores/auth';

const routes = [
    {
        path: '/login',
        name: 'Auth',
        component: AuthComponent,
    },
    {
        path: '/',
        name: 'Home',
        meta: { auth: true },
        component: HomeComponent,
    },
    {
        path: '/movies/:id',
        name: 'Movie',
        meta: { auth: true },
        component: MovieComponent,
        props: true,
    },
    {
        path: '/details/movie/:id',
        name: 'MovieDetails',
        component: MovieDetailComponent,
        meta: { auth: true },
        props: true,
    },
    {
        path: '/details/tv/:id',
        name: 'TvShowDetails',
        component: TvShowDetailsComponent,
        meta: { auth: true },
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(appConfig.HISTORY_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.auth)) {
        const auth = createAuth();
        auth.onAuthStateChanged((user) => {
            if (!user) {
                next({ path: '/login' });
            } else {
                const authStore = useAuthStore();
                authStore.loginUser(user);
                next();
            }
        });
    } else {
        next();
    }
});

export default router;
