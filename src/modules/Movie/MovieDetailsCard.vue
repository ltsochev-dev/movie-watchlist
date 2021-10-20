<script setup>
import { ref, computed } from '@vue/reactivity';
import dayjs from 'dayjs';
import { useAttrs } from 'vue';
import MovieDataService from '../../services/MovieDataService';
import { useMovieStore } from '../../stores/movies';
import LinkList from './LinkList.vue';
import { getRuntime, getYear, getHomepage } from '../../utils/movie-utils';

const attrs = useAttrs();
const props = defineProps(['socials', 'document']);
const movie = computed(() => attrs.modelValue);
const links = ref(attrs.modelValue.links || []);
const notes = ref(attrs.modelValue.notes || '');
const movieId = ref(props.document);
const markAsToggled = ref(false);
const movieStore = useMovieStore();
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

const updateLinks = async (linkList) => {
    const rawData = linkList.map((link) => link);

    links.value = rawData;

    MovieDataService.update(movieId.value, { links: rawData });
};

const deleteLink = async (link) => {
    const index = links.value.findIndex((existingLink) => existingLink === link);

    if (index !== -1) {
        links.value.splice(index, 1);

        await MovieDataService.update(movieId.value, { links: links.value });

        movie.links = links.value;
    }
};

const markMovie = (status) => {
    markAsToggled.value = false;
    movie.marked = status;

    MovieDataService.update(movieId.value, { marked: status });
};

const saveNotes = () => {
    MovieDataService.update(movieId.value, { notes: notes.value });
};
</script>
<template>
    <div class="card text-white bg-dark shadow mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img
                    :src="movieStore.getPosterUrl(movie)"
                    alt="Backdrop"
                    class="w-100 rounded"
                    v-if="movie.poster_path"
                />
            </div>
            <div class="col-md-8">
                <div class="card-body position-relative">
                    <h1 class="card-title m-0 d-flex justify-content-between align-items-center">
                        <span>{{ movie.title }}</span>
                        <div class="dropdown">
                            <button
                                class="btn dropdown-toggle"
                                :class="{
                                    'btn-secondary': !movie.marked,
                                    'btn-info': movie.marked && movie.marked === 'watching',
                                    'btn-success': movie.marked && movie.marked === 'seen',
                                    'btn-danger': movie.marked && movie.marked === 'forgotten',
                                    'btn-warning': movie.marked && movie.marked === 'later',
                                }"
                                type="button"
                                data-bs-toggle="dropdown"
                                v-if="movieStore.hasMovie(movieId)"
                                @click="markAsToggled = !markAsToggled"
                            >
                                <span v-if="!movie.marked">Маркирай като</span>
                                <span v-else-if="movie.marked && movie.marked === 'watching'"
                                    >Започнахме го!</span
                                >
                                <span v-else-if="movie.marked && movie.marked === 'seen'"
                                    >Гледахме го Йее</span
                                >
                                <span v-else-if="movie.marked && movie.marked === 'forgotten'"
                                    >Забравихме :c</span
                                >
                                <span v-else-if="movie.marked && movie.marked === 'later'"
                                    >Остава за по-късно</span
                                >
                            </button>
                            <ul class="dropdown-menu" :class="{ 'd-block': markAsToggled }">
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="#"
                                        @click.prevent="markMovie('watching')"
                                        >Започнахме го!</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="#"
                                        @click.prevent="markMovie('seen')"
                                        >Гледахме го Йее</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="#"
                                        @click.prevent="markMovie('forgotten')"
                                        >Забравихме :с</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="#"
                                        @click.prevent="markMovie('later')"
                                        >Остава за по-късно!</a
                                    >
                                </li>
                            </ul>
                        </div>
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
                                    <tr>
                                        <td>Time</td>
                                        <td>{{ getRuntime(movie) }}min.</td>
                                    </tr>
                                    <tr>
                                        <td>Release date</td>
                                        <td>
                                            {{ getYear(movie) }}
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
                                                :href="getHomepage(movie)"
                                                target="_blank"
                                                rel="external"
                                                >{{ getHomepage(movie) }}</a
                                            >
                                        </td>
                                    </tr>
                                    <tr v-if="movie.created_at">
                                        <td>Watchlist since:</td>
                                        <td>
                                            {{ formatTime(movie.created_at.seconds * 1000) }}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <LinkList
                                    v-model="links"
                                    @change="updateLinks"
                                    @delete="deleteLink"
                                />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col">
                                <h3 class="card-title">Overview</h3>
                                <p class="card-text">{{ movie.overview }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <label for="notes" class="col-sm-2">Notes</label>
                            <div class="col-sm-10">
                                <textarea
                                    name="notes"
                                    id="notes"
                                    rows="4"
                                    class="form-control"
                                    placeholder="Enter notes..."
                                    v-model="notes"
                                    @keyup.enter="saveNotes"
                                ></textarea>
                                <div class="text-end mt-2">
                                    <button
                                        class="btn btn-success"
                                        type="button"
                                        @click="saveNotes"
                                    >
                                        Save notes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End of movie Card -->
</template>
