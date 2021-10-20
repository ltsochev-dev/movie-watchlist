<script setup>
import { ref, computed } from '@vue/reactivity';
import dayjs from 'dayjs';
import { useAttrs } from 'vue';
import { posterURL } from '../../utils/mdb-image-utils';

const emit = defineEmits(['add']);
const attrs = useAttrs();
const props = defineProps({
    socials: {
        type: Object,
        default: {},
    },
    type: {
        type: String,
        default: 'movie',
    },
});

const movie = computed(() => attrs.modelValue);
const links = ref(attrs.modelValue.links || []);
const socialList = computed(() => {
    let links = {};

    if (props.socials.facebook_id) {
        links.facebook = `https://facebook.com/${props.socials.facebook_id}`;
    }

    if (props.socials.imdb_id) {
        links.imdb = `https://www.imdb.com/title/${props.socials.imdb_id}`;
    }

    if (props.socials.twitter_id) {
        links.twitter = `https://twitter.com/${props.socials.twitter_id}`;
    }

    if (props.socials.instagram_id) {
        links.instagram = `https://www.instagram.com/${props.socials.instagram_id}`;
    }

    return links;
});

const formatTime = (timeStr) => {
    const time = dayjs(timeStr);

    return time.format('DD.MM.YYYY');
};

const getPosterUrl = () => {
    return posterURL(movie.value.poster_path, true);
};

const addToWatchlist = () => {
    emit('add', props.type, JSON.parse(JSON.stringify(movie.value)));
};
</script>
<template>
    <div class="card text-white bg-dark shadow mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img
                    :src="getPosterUrl()"
                    alt="Poster image"
                    class="w-100 rounded"
                    v-if="movie.poster_path"
                />
            </div>
            <div class="col-md-8">
                <div class="card-body position-relative">
                    <h1 class="card-title m-0 d-flex justify-content-between align-items-center">
                        <span v-if="props.type === 'movie'">{{ movie.title }}</span>
                        <span v-else-if="props.type === 'tv'">{{ movie.name }}</span>
                        <span v-else>No title found</span>
                        <button class="btn btn-success" type="button" @click="addToWatchlist">
                            &plus; Add to watchlist
                        </button>
                    </h1>
                    <ul class="list-inline genre-list">
                        <li class="list-inline-item" v-for="genre in movie.genres" :key="genre.id">
                            {{ genre.name }}
                        </li>
                    </ul>
                    <ul class="list-inline social-list">
                        <li class="list-inline-item" v-for="(url, key) in socialList" :key="key">
                            <a
                                :href="url"
                                class="text-capitalize initialism"
                                target="_blank"
                                rel="external"
                                >{{ key }}</a
                            >
                        </li>
                    </ul>
                    <div class="movie-info my-5">
                        <div class="row">
                            <div class="col-sm-6 px-3">
                                <table class="table table-borderless">
                                    <tr>
                                        <td>Movie</td>
                                        <td>{{ movie.genres[0].name }}</td>
                                    </tr>
                                    <tr v-if="props.type === 'movie'">
                                        <td>Time</td>
                                        <td>{{ movie.runtime }}min.</td>
                                    </tr>
                                    <tr v-if="props.type === 'tv'">
                                        <td>Seasons</td>
                                        <td>
                                            {{ movie.number_of_seasons }} ({{
                                                movie.number_of_episodes
                                            }}
                                            episodes)
                                        </td>
                                    </tr>
                                    <tr v-if="props.type === 'tv'">
                                        <td>Status</td>
                                        <td>{{ movie.status }}</td>
                                    </tr>
                                    <tr>
                                        <td>Release date</td>
                                        <td>
                                            {{
                                                new Date(
                                                    props.type === 'movie'
                                                        ? movie.release_date.seconds * 1000
                                                        : movie.first_air_date
                                                ).getFullYear()
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Rating</td>
                                        <td>{{ movie.vote_average }}</td>
                                    </tr>
                                    <tr>
                                        <td>Total voted</td>
                                        <td>
                                            {{
                                                new Intl.NumberFormat('bg-BG').format(
                                                    movie.vote_count
                                                )
                                            }}
                                            voters
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Homepage</td>
                                        <td>
                                            <a
                                                :href="movie.website_url"
                                                target="_blank"
                                                rel="external"
                                                v-if="props.type === 'movie'"
                                                >{{ movie.website_url }}</a
                                            >
                                            <a
                                                :href="movie.homepage"
                                                target="_blank"
                                                rel="external"
                                                v-else-if="props.type === 'tv'"
                                                >{{ movie.homepage }}</a
                                            >
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <h3 class="card-title">Overview</h3>
                                <p class="card-text">{{ movie.overview }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End of movie Card -->
</template>
