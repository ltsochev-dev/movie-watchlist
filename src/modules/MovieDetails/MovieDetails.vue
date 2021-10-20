<script setup>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { createMovieDBApi } from '../../api/moviedb';
import { useMovieStore } from '../../stores/movies';
import MovieDetailsCard from '../../components/shared/MovieDetailsCard.vue';
import { backdropURL } from '../../utils/mdb-image-utils';
import MovieDataService from '../../services/MovieDataService';

const router = useRouter();
const props = defineProps(['id']);
const movieStore = useMovieStore();
const movie = ref({});
const loaded = ref(false);

const existingDocId = movieStore.findDocId('movie', props.id);
if (existingDocId !== -1) {
    router.push({ name: 'Movie', params: { id: existingDocId } });
}

const fetchMovie = () => {
    const apiClient = createMovieDBApi();

    apiClient
        .get(props.id)
        .then((res) => res.data)
        .then((mdbData) => {
            movie.value = mdbData;
            loaded.value = true;
        });
};

const onAdded = async (mediaType, mdbMovie) => {
    const res = await MovieDataService.addMovie(mediaType, mdbMovie);

    if (res && res.id) {
        router.push({ name: 'Movie', params: { id: res.id } });
    }
};

fetchMovie();
</script>
<template>
    <section class="movie-details" v-if="movieStore.loaded">
        <div
            class="backdrop"
            :style="{
                backgroundImage: 'url(' + backdropURL(movie.backdrop_path) + ')',
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
                        type="movie"
                        v-if="loaded"
                        @add="onAdded"
                    ></MovieDetailsCard>
                </div>
            </div>
        </div>
    </section>
</template>
