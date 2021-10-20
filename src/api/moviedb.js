import ApiClient from './ApiClient';
import { getConfigStorage } from './getConfigStorage';

export function createMovieDBApi(config) {
    const settings = config || getConfigStorage();
    return new ApiClient(settings);
}
