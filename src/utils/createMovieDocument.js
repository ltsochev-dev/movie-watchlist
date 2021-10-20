import { useAuthStore } from '../stores/auth';
import { timeNow } from './createFirebase';

class MovieDocument {
    constructor(user, movie, mediaType) {
        this.user = user;
        this.movie = movie;
        this.mediaType = mediaType;
    }

    toDocumentObject() {
        let doc = {};

        // Global props
        doc.firebase_id = this.user.id;
        doc.added_by = this.user.name;
        doc.created_at = timeNow();
        doc.marked = '';
        doc.mdb_id = this.movie.id;
        doc.media_type = this.mediaType;
        doc.links = [];
        doc.title = this.movie.title ?? this.movie.name;

        for (const key in this.movie) {
            doc[key] = this.movie[key];
        }

        return doc;
    }
}

export function createDocFromMovie(movie) {
    const store = useAuthStore();

    return new MovieDocument(store.getBasicUser(), movie, 'movie');
}

export function createDocFromTvShow(tvShow) {
    const store = useAuthStore();

    return new MovieDocument(store.getBasicUser(), tvShow, 'tv');
}
