export function mdbMovieToFirebaseDocument(mdbData) {
    return {
        added_by: 'Lachezar Tsochev',
        backdrop_path: mdbData.backdrop_path,
        firebase_id: 'uV7GRsmauvH6wH0yVKJx',
        genres: mdbData.genres,
        imdb_id: mdbData.imdb_id,
        mdb_id: parseFloat(mdbData.id),
        original_title: mdbData.original_title,
        overview: mdbData.overview,
        popularity: parseFloat(mdbData.popularity),
        poster_path: mdbData.poster_path,
        release_date: new Date(mdbData.release_date),
        status: mdbData.status,
        tagline: mdbData.tagline,
        title: mdbData.title,
        vote_average: parseFloat(mdbData.vote_average),
        vote_count: parseFloat(mdbData.vote_count),
        website_url: mdbData.homepage,
        runtime: parseFloat(mdbData.runtime),
    };
}
