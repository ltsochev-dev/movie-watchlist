import { defineStore } from 'pinia';
import { createMovieDBApi } from '../api/moviedb';

const mediaTypes = ['movie', 'tv'];

export const useSearchStore = defineStore('search', {
    state: () => {
        return {
            searchTerm: '',
            total: 0,
            results: [],
            page: 1,
            page_max: 1,
            results_max: 0,
            loading: false,
            lastSearchTerm: '',
        };
    },
    getters: {
        hasNextPage: (state) => state.page_max > state.page,
        hasPrevPage: (state) => state.page > 1,
        prevPageNum: (state) => Math.min(1, state.page - 1),
        nextPageNum: (state) => Math.max(state.page_max, state.page + 1),
        movieList: (state) =>
            state.results.filter((result) => mediaTypes.indexOf(result.media_type) !== -1),
        otherResults: (state) =>
            state.results.filter((result) => mediaTypes.indexOf(result.media_type) === -1),
    },
    actions: {
        performSearch() {
            if (
                this.loading ||
                this.searchTerm.length === 0 ||
                this.lastSearchTerm === this.searchTerm
            ) {
                return Promise.resolve();
            }

            const apiClient = createMovieDBApi();
            const term = this.searchTerm;
            const pageNum = this.page;

            this.loading = true;

            return apiClient
                .search(term, pageNum)
                .then((res) => {
                    // this.results = [].concat(res.data.results, this.results);
                    this.results = res.data.results;
                    this.page = res.data.page;
                    this.page_max = res.data.total_pages;
                    this.results_max = res.data.total_results;
                })
                .finally(() => {
                    this.loading = false;
                    this.lastSearchTerm = term;
                });
        },
        prevPage() {
            this.page = this.prevPageNum;

            this.performSearch();
        },
        nextPage() {
            if (this.hasNextPage) {
                this.page = this.nextPageNum;

                this.performSearch();
            }
        },
    },
});
