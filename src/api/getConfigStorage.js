import dayjs from 'dayjs';

export const localStorageKey = 'movie.backlog.config';

export const configFallback = {
    change_keys: [],
    images: {
        backdrop_sizes: [],
        base_url: '',
        secure_base_url: '',
        logo_sizes: [],
        poster_sizes: [],
        profile_sizes: [],
        still_sizes: [],
    },
    lastUpdated: dayjs().subtract(1, 'year').toDate(),
};

export function getConfigStorage() {
    try {
        const configJson = window.localStorage.getItem(localStorageKey);

        const config = JSON.parse(configJson);

        return config ?? configFallback;
    } catch (e) {
        return configFallback;
    }
}
