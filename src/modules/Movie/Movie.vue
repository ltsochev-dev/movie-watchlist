<script setup>
import { computed, ref, reactive } from '@vue/reactivity';
import { onMounted, watch } from 'vue-demi';
import { createMovieDBApi } from '../../api/moviedb';
import { useMovieStore } from '../../stores/movies';
import MovieDetailsCard from './MovieDetailsCard.vue';

const socials = reactive({});

const movieStore = useMovieStore();

const props = defineProps(['id']);

const movie = computed(() => movieStore.get(props.id));

const fetchSocials = () => {
    let axiosPromise;
    const apiClient = createMovieDBApi();

    if (movie.value.media_type === 'movie') {
        axiosPromise = apiClient.socials(movie.value.mdb_id);
    } else if (movie.value.media_type === 'tv') {
        axiosPromise = apiClient.socialsTv(movie.value.mdb_id);
    }

    axiosPromise.then((res) => {
        delete res.dataid;
        Object.assign(socials, res.data);
    });
};

watch(movie, (newMovie) => {
    if (newMovie.mdb_id) {
        fetchSocials();
    }
});
</script>
<template>
    <section class="movie-details" v-if="movieStore.loaded">
        <div
            class="backdrop"
            :style="{
                backgroundImage: 'url(' + movieStore.getBackdropUrl(movie) + ')',
            }"
        ></div>
        <div class="container">
            <div class="row mb-3">
                <div class="col">
                    <h2 class="text-center fw-bold my-3">Movie Details</h2>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <MovieDetailsCard
                        v-model="movie"
                        :document="props.id"
                        :socials="socials"
                    ></MovieDetailsCard>
                </div>
            </div>
        </div>
    </section>
</template>
