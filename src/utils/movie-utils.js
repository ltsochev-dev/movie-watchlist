export function getYear(movie, def) {
    if (movie.release_date && movie.release_date.seconds) {
        return new Date(movie.release_date.seconds * 1000).getFullYear();
    } else if (movie.release_date && movie.release_date.length > 0) {
        return new Date(movie.release_date).getFullYear();
    } else if (movie.first_air_date) {
        return new Date(movie.first_air_date).getFullYear();
    } else {
        return def || '0000';
    }
}

export function getRuntime(movie, def) {
    if (movie.runtime) {
        return movie.runtime;
    } else if (movie.episode_run_time && movie.episode_run_time.length > 0) {
        return movie.episode_run_time.join(', ');
    }

    return def || 0;
}

export function getHomepage(movie, def) {
    if (movie.homepage) {
        return movie.homepage;
    } else if (movie.website_url) {
        return movie.website_url;
    }

    return def;
}
