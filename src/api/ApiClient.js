import dayjs from 'dayjs';
import { localStorageKey } from '../api/getConfigStorage';
import httpClient from '../utils/moviedb-client';

export default class ApiClient {
    constructor(config) {
        this.loaded = false;
        this.config = config || {};

        this.httpClient = httpClient;

        if (
            !this.config.hasOwnProperty('lastUpdated') ||
            dayjs().diff(dayjs(this.config.lastUpdated), 'hour') >= 1
        ) {
            this.loadConfig();
        } else {
            this.loaded = true;
        }
    }

    getShow(id) {
        return this.httpClient.get(`tv/${id}`);
    }

    get(id) {
        return this.httpClient.get(`movie/${id}`);
    }

    socials(id) {
        return this.httpClient.get(`movie/${id}/external_ids`);
    }

    socialsTv(id) {
        return this.httpClient.get(`tv/${id}/external_ids`);
    }

    credits(id) {
        return this.httpClient.get(`movie/${id}/credits`);
    }

    search(query, page) {
        return this.httpClient.get(
            'search/multi?query=' + encodeURIComponent(query) + '&page=' + page
        );
    }

    discover() {
        return this.httpClient.get('discover/movie');
    }

    async loadConfig() {
        if (this.loaded) return this.config;

        return await this.httpClient
            .get('configuration')
            .then((res) => {
                this.config = res.data;
                this.config.lastUpdated = dayjs();
                window.localStorage.setItem(localStorageKey, JSON.stringify(res.data));
                return this.config;
            })
            .finally(() => (this.loaded = true));
    }
}
