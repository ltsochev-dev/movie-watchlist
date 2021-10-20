import { defineStore } from 'pinia';
import { mdbGenerateImagePath, avgImageSize, maxBackdropSize } from '../utils/mdb-image-utils';
import MovieDataService from '../services/MovieDataService';

export const useMovieStore = defineStore('movies', {
    state: () => {
        return {
            movies: new Map(),
            loading: false,
            loaded: false,
            unsubscribe: null,
        };
    },
    getters: {
        movieList: (state) => {
            let movies = new Map();

            for (const [key, value] of state.movies.entries()) {
                if (value.media_type && value.media_type === 'movie') {
                    movies.set(key, value);
                }
            }

            return movies;
        },
        tvShowList: (state) => {
            let movies = new Map();

            for (const [key, value] of state.movies.entries()) {
                if (value.media_type && value.media_type === 'tv') {
                    movies.set(key, value);
                }
            }

            return movies;
        },
    },
    actions: {
        async fetchMovies() {
            if (this.loaded) return;

            this.loading = true;

            this.movies = await MovieDataService.getAll();

            this.loading = false;

            this.loaded = true;
        },
        subscribe() {
            this.unsubscribeDb();

            this.unsubscribe = MovieDataService.subscribe((docs) => {
                this.movies.clear();

                docs.forEach((doc) => {
                    this.movies.set(doc.id, doc.data());
                });

                if (!this.loaded) {
                    this.loaded = true;
                }
            });
        },
        unsubscribeDb() {
            return this.unsubscribe && this.unsubscribe();
        },
        hasMovie(id) {
            return this.movies.has(id);
        },
        get(id) {
            return this.movies.get(id);
        },
        findDocId(type, id) {
            const list = type === 'movie' ? this.movieList : this.tvShowList;

            for (const [key, value] of list.entries()) {
                if (value.mdb_id == id) {
                    return key;
                }
            }

            return -1;
        },
        getPosterUrl(movie) {
            return mdbGenerateImagePath(movie.poster_path, avgImageSize('poster'), true);
        },
        getBackdropUrl(movie) {
            return mdbGenerateImagePath(movie.backdrop_path, maxBackdropSize(), true);
        },
    },
});
