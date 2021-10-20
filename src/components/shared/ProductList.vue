<script setup>
import { computed, ref } from '@vue/reactivity';
import { useMovieStore } from '../../stores/movies';
import MovieDataService from '../../services/MovieDataService';
import { getRuntime, getYear } from '../../utils/movie-utils';

const activeTab = ref('all');

const movieStore = useMovieStore();

const filteredMovies = computed(() => {
    let movieList = {};

    switch (activeTab.value) {
        case 'all':
            movieList = movieStore.movies;
            break;
        case 'movies':
            movieList = movieStore.movieList;
            break;
        case 'tvShows':
            movieList = movieStore.tvShowList;
            break;
    }

    return movieList;
});

const deleteMovie = (docId) => {
    MovieDataService.delete(docId);
};
</script>
<template>
    <section class="product-list">
        <div class="container">
            <div class="row mb-2 align-items-center">
                <div class="col mb-3">
                    <div class="movie-list-nav-wrap">
                        <ul class="nav nav-tabs border-0 justify-content-end" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a
                                    class="nav-link"
                                    :class="{ active: activeTab == 'all' }"
                                    href="#"
                                    role="tab"
                                    @click.prevent="activeTab = 'all'"
                                    >All</a
                                >
                            </li>
                            <li class="nav-item" role="presentation">
                                <a
                                    class="nav-link"
                                    :class="{ active: activeTab == 'tvShows' }"
                                    href="#"
                                    role="tab"
                                    @click.prevent="activeTab = 'tvShows'"
                                    >TV Shows</a
                                >
                            </li>
                            <li class="nav-item" role="presentation">
                                <a
                                    class="nav-link"
                                    :class="{ active: activeTab == 'movies' }"
                                    href="#"
                                    role="tab"
                                    @click.prevent="activeTab = 'movies'"
                                    >Movies</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row movie-list-active">
                <div
                    class="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two"
                    v-for="[docId, movie] in filteredMovies"
                    :key="movie.id"
                >
                    <div class="movie-item">
                        <div class="movie-poster">
                            <router-link :to="{ name: 'Movie', params: { id: docId } }">
                                <img
                                    :src="movieStore.getPosterUrl(movie)"
                                    class="w-100 rounded-3"
                                    :alt="movie.title + ' Movie poster'"
                                />
                            </router-link>
                            <div class="position-absolute top-0 end-0">
                                <button
                                    class="btn btn-danger rounded-0"
                                    type="button"
                                    @click="deleteMovie(docId)"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                        <div class="movie-content">
                            <div class="top d-flex justify-content-between align-items-center">
                                <h5 class="title">
                                    <router-link :to="{ name: 'Movie', params: { id: docId } }">{{
                                        movie.title
                                    }}</router-link>
                                </h5>
                                <span class="date">{{ getYear(movie) }}</span>
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
                                        <span class="quality">{{ movie.media_type }}</span>
                                    </li>
                                    <li>
                                        <span class="duration"
                                            ><svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                fill="currentColor"
                                                class="bi bi-clock"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                                                />
                                                <path
                                                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
                                                />
                                            </svg>
                                            {{ getRuntime(movie) }} min</span
                                        >
                                        <span class="rating ms-3"
                                            ><svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                fill="currentColor"
                                                class="bi bi-hand-thumbs-up-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
                                                />
                                            </svg>
                                            {{ movie.vote_average }}</span
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
