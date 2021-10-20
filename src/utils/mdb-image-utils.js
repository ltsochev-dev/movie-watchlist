import { getConfigStorage } from '../api/getConfigStorage';

let config = getConfigStorage();

export function maxPosterSize() {
    return [...config.images.poster_sizes].pop();
}

export function maxBackdropSize() {
    return [...config.images.backdrop_sizes].pop();
}

export function maxLogoSize() {
    return [...config.images.logo_sizes].pop();
}

export function maxProfileSize() {
    return [...config.images.profile_sizes].pop();
}

export function maxStillSize() {
    return [...config.images.still_sizes].pop();
}

export function minImageSize(type) {
    if (!config.images.hasOwnProperty(type + '_sizes')) {
        throw new Error(`There is no image type of '${type}' in the current configuration.`);
    }

    return config.images[type + '_sizes'][0];
}

export function avgImageSize(type) {
    if (!config.images.hasOwnProperty(type + '_sizes')) {
        throw new Error(`There is no image type of '${type}' in the current configuration.`);
    }

    if (config.images[type + '_sizes'].length < 3) {
        return minImageSize(type);
    }

    return config.images[type + '_sizes'][
        Math.round((config.images[type + '_sizes'].length - 1) / 2)
    ];
}

export function maxImageSize(type) {
    if (!config.images.hasOwnProperty(type + '_sizes')) {
        throw new Error(`There is no image type of '${type}' in the current configuration.`);
    }

    return [...config.images[type + '_sizes']].pop();
}

export function mdbGenerateImagePath(path, size, secure) {
    let settings = getConfigStorage();
    const baseUrlKey = secure ? 'secure_base_url' : 'base_url';
    const imageSize = settings.images.poster_sizes.indexOf(size) === -1 ? 'w500' : size;

    return `${settings.images[baseUrlKey]}${imageSize}${path}`;
}

export function posterURL(path, secure) {
    if (!path) return;
    return mdbGenerateImagePath(path, avgImageSize('poster'), secure);
}

export function backdropURL(path, secure) {
    if (!path) return;
    return mdbGenerateImagePath(path, maxBackdropSize(), secure);
}
