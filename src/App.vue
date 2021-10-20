<script setup>
import NavBar from './layouts/NavBar.vue';
import FooterNav from './layouts/FooterNav.vue';
import Sidebar from './layouts/Sidebar.vue';
import { useMovieStore } from './stores/movies';

document.title = 'Movie Backlog v' + import.meta.env.VITE_APP_VERSION;

const movieStore = useMovieStore();

movieStore.subscribe();
</script>
<template>
    <NavBar />
    <main role="main" class="app-content">
        <router-view v-slot="{ Component }">
            <transition>
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
    <FooterNav />
</template>
