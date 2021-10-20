<script setup>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { appConfig } from '../config/app';
import { useAuthStore } from '../stores/auth';
import { useMovieStore } from '../stores/movies';
import { useSearchStore } from '../stores/search';
import { posterURL } from '../utils/mdb-image-utils';
import { getYearFromSeconds } from '../utils/utils';

const router = useRouter();
const showSearchResults = ref(false);
const searchStore = useSearchStore();
const authStore = useAuthStore();
const movieStore = useMovieStore();

const performSearch = () => {
    searchStore.performSearch().then(() => {
        showSearchResults.value = true;
    });
};

const getReleaseYear = (movie) => {
    const dateStr = movie.release_date || movie.first_air_date;

    return new Date(dateStr).getFullYear();
};

const closeSearchResults = () => {
    showSearchResults.value = false;
};

const openDetails = (movie) => {
    closeSearchResults();

    const { id } = movie;

    switch (movie.media_type) {
        case 'movie':
            router.push({ name: 'MovieDetails', params: { id } });
            break;
        case 'tv':
            router.push({ name: 'TvShowDetails', params: { id } });
            break;
        default:
            console.error("Unknown movie media type '%s'", movie.media_type, movie);
            router.push({ to: '/' });
            break;
    }
};
</script>
<template>
    <header class="bg-dark header navbar navbar-dark navbar-fixed-top box-shadow">
        <div class="container-fluid">
            <router-link :to="{ name: 'Home' }" class="navbar-brand">
                <img src="../assets/logo.png" alt="Logo" width="30" height="24" class="logo-img" />
                <span
                    >{{ appConfig.APP_NAME }}
                    <sup
                        ><small>v{{ appConfig.APP_VERSION }}</small></sup
                    ></span
                >
            </router-link>
            <div class="search position-relative">
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control border-0"
                        v-model="searchStore.searchTerm"
                        placeholder="Search by movie name"
                        @keyup.enter="performSearch"
                    />
                    <button
                        type="button"
                        class="btn btn-outline-secondary border-0 text-light"
                        @click="performSearch"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-search"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    class="search-results w-100 position-absolute top-100 bg-dark shadow px-3 py-2"
                    v-show="showSearchResults"
                >
                    <button
                        class="btn btn-dark text-danger position-absolute top-0 end-0 close-btn"
                        type="button"
                        @click="closeSearchResults"
                    >
                        &times;
                    </button>
                    <h4>Резултати от търсенето ({{ searchStore.results_max }})</h4>
                    <div class="container-fluid">
                        <div class="row">
                            <div
                                class="col-sm-4 mb-3"
                                v-for="movie in searchStore.movieList"
                                :key="'search-' + movie.id"
                            >
                                <div class="card movie text-light bg-dark shadow">
                                    <div class="poster" @click="openDetails(movie)">
                                        <img
                                            :src="posterURL(movie.poster_path, true)"
                                            :alt="movie.title + ' Poster'"
                                            class="card-img-top"
                                            v-if="movie.poster_path"
                                        />
                                    </div>
                                    <div class="card-body movie-content">
                                        <div
                                            class="
                                                top
                                                d-flex
                                                justify-content-between
                                                align-items-center
                                            "
                                        >
                                            <h5 class="card-title title">{{ movie.title }}</h5>
                                            <span class="date">{{ getReleaseYear(movie) }}</span>
                                        </div>
                                        <div class="bottom">
                                            <ul
                                                class="
                                                    list-unstyled
                                                    d-flex
                                                    justify-content-between
                                                    align-items-center
                                                "
                                            >
                                                <li>
                                                    <span class="quality text-uppercase">{{
                                                        movie.media_type
                                                    }}</span>
                                                </li>
                                                <li>
                                                    <button
                                                        class="btn btn-secondary"
                                                        type="button"
                                                        @click="openDetails(movie)"
                                                    >
                                                        Details
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="searchStore.hasNextPage">
                            <div class="col">
                                <div class="text-center">
                                    <button
                                        class="btn btn-secondary mb-2"
                                        type="button"
                                        @click="searchStore.nextPage()"
                                    >
                                        Зареди другите Резултати
                                    </button>
                                </div>
                                <div class="text-center">
                                    <small class="text-muted"
                                        >Страница {{ searchStore.page }} от
                                        {{ searchStore.page_max }}</small
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-box d-flex align-items-center">
                <span class="text-light">{{ authStore.name }}</span>
                <div class="rounded-circle border border-3 mx-2">
                    <img :src="authStore.avatar" class="rounded-circle" width="35" height="35" />
                </div>
            </div>
        </div>
    </header>
</template>
